import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, PlusCircle, Pencil, Trash2, Eye, EyeOff, Star,
  Upload, X, CheckCircle, AlertCircle, ChevronDown, Image, Video
} from 'lucide-react';

const API = 'http://localhost:5000/api';

const CATEGORIES = ['NEWS', 'WORLD', 'ENTERTAINMENT', 'TECHNOLOGY', 'MUSIC', 'SPORTS'];

const EMPTY_FORM = {
  title: '',
  content: '',
  summary: '',
  category: 'NEWS',
  authorName: '',
  status: 'published',
  isFeatured: false,
  tags: '',
  video: null,
  image: null,
};

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-white text-sm font-semibold transition-all ${type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
      {type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {message}
    </div>
  );
}

const AdminDashboard = () => {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('compose'); // 'compose' | 'manage'
  const imageInputRef = useRef();
  const videoInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/login');
    else fetchNews();
  }, [navigate]);

  const showToast = (message, type = 'success') => setToast({ message, type });

  const fetchNews = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${API}/news?all=true`, {
        headers: { 'x-auth-token': token }
      });
      setNews(res.data);
    } catch {
      showToast('Failed to load articles', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm(f => ({ ...f, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm(f => ({ ...f, video: file }));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setImagePreview(null);
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      content: item.content,
      summary: item.summary || '',
      category: item.category || 'NEWS',
      authorName: item.authorName || '',
      status: item.status || 'published',
      isFeatured: item.isFeatured || false,
      tags: (item.tags || []).join(', '),
      video: null,
      image: null,
    });
    setEditId(item._id);
    setImagePreview(item.imageUrl ? `http://localhost:5000${item.imageUrl}` : null);
    setActiveTab('compose');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === 'video' || key === 'image') return;
      formData.append(key, val);
    });
    if (form.video) formData.append('video', form.video);
    if (form.image) formData.append('image', form.image);

    try {
      if (editId) {
        await axios.put(`${API}/news/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': token }
        });
        showToast('Article updated successfully!');
      } else {
        await axios.post(`${API}/news`, formData, {
          headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': token }
        });
        showToast('Article published successfully!');
      }
      resetForm();
      fetchNews();
      setActiveTab('manage');
    } catch {
      showToast('Failed to save article', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article permanently?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API}/news/${id}`, { headers: { 'x-auth-token': token } });
      showToast('Article deleted');
      fetchNews();
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Top Bar */}
      <header style={{ borderBottom: '1px solid #222', backgroundColor: '#111', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', animation: 'pulse 2s infinite' }} />
          <span style={{ fontWeight: 800, fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>KK Factor</span>
          <span style={{ color: '#555', fontSize: '14px' }}>/ Newsroom</span>
        </div>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#aaa', fontSize: '13px', cursor: 'pointer' }}>
          <LogOut size={14} /> Logout
        </button>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Tab Nav */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem', borderBottom: '1px solid #222', paddingBottom: '0' }}>
          {[
            { id: 'compose', label: editId ? '✏️ Edit Article' : '✍️ Compose' },
            { id: 'manage', label: `📋 Manage (${news.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); if (tab.id === 'compose' && !editId) resetForm(); }}
              style={{
                padding: '10px 20px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer',
                backgroundColor: 'transparent', borderBottom: activeTab === tab.id ? '2px solid #ef4444' : '2px solid transparent',
                color: activeTab === tab.id ? 'white' : '#666', transition: 'all 0.2s', marginBottom: '-1px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* COMPOSE TAB */}
        {activeTab === 'compose' && (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}>
              {/* Left — Main Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Title */}
                <div>
                  <label style={labelStyle}>Headline *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    required
                    placeholder="Write a compelling headline..."
                    style={{ ...inputStyle, fontSize: '18px', fontWeight: '700' }}
                  />
                </div>

                {/* Summary */}
                <div>
                  <label style={labelStyle}>Summary / Excerpt <span style={{ color: '#555' }}>(shown in news cards)</span></label>
                  <textarea
                    value={form.summary}
                    onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}
                    placeholder="Write a 1-2 sentence preview of the story..."
                    rows={2}
                    maxLength={220}
                    style={inputStyle}
                  />
                  <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', textAlign: 'right' }}>{form.summary.length}/220</div>
                </div>

                {/* Content */}
                <div>
                  <label style={labelStyle}>Full Article *</label>
                  <textarea
                    value={form.content}
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    required
                    placeholder="Write the full article here..."
                    rows={16}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.7' }}
                  />
                </div>
              </div>

              {/* Right — Metadata & Media */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {/* Publish / Draft */}
                <div style={cardStyle}>
                  <label style={labelStyle}>Status</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['published', 'draft'].map(s => (
                      <button key={s} type="button"
                        onClick={() => setForm(f => ({ ...f, status: s }))}
                        style={{
                          flex: 1, padding: '8px', borderRadius: '8px', fontWeight: 700,
                          fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px',
                          border: form.status === s ? '2px solid #ef4444' : '2px solid #333',
                          backgroundColor: form.status === s ? '#ef4444' : '#1a1a1a',
                          color: 'white', cursor: 'pointer', transition: 'all 0.2s'
                        }}>
                        {s === 'published' ? '🟢 Publish' : '📝 Draft'}
                      </button>
                    ))}
                  </div>
                  {/* Featured toggle */}
                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button type="button"
                      onClick={() => setForm(f => ({ ...f, isFeatured: !f.isFeatured }))}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px',
                        borderRadius: '8px', border: form.isFeatured ? '2px solid #f59e0b' : '2px solid #333',
                        backgroundColor: form.isFeatured ? '#f59e0b22' : '#1a1a1a', color: form.isFeatured ? '#f59e0b' : '#666',
                        fontSize: '12px', fontWeight: 700, cursor: 'pointer', width: '100%', justifyContent: 'center'
                      }}>
                      <Star size={13} fill={form.isFeatured ? '#f59e0b' : 'none'} />
                      {form.isFeatured ? 'Featured Story' : 'Mark as Featured'}
                    </button>
                  </div>
                </div>

                {/* Category */}
                <div style={cardStyle}>
                  <label style={labelStyle}>Category</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      style={{ ...inputStyle, appearance: 'none', paddingRight: '32px', cursor: 'pointer' }}
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* Author */}
                <div style={cardStyle}>
                  <label style={labelStyle}>Author / Byline</label>
                  <input
                    type="text"
                    value={form.authorName}
                    onChange={e => setForm(f => ({ ...f, authorName: e.target.value }))}
                    placeholder="e.g. Jane Smith"
                    style={inputStyle}
                  />
                </div>

                {/* Tags */}
                <div style={cardStyle}>
                  <label style={labelStyle}>Tags <span style={{ color: '#555' }}>(comma-separated)</span></label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                    placeholder="e.g. music, australia, culture"
                    style={inputStyle}
                  />
                </div>

                {/* Cover Image */}
                <div style={cardStyle}>
                  <label style={labelStyle}>Cover Image</label>
                  <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                  {imagePreview ? (
                    <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                      <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />
                      <button type="button" onClick={() => { setImagePreview(null); setForm(f => ({ ...f, image: null })); }}
                        style={{ position: 'absolute', top: '6px', right: '6px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#000', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => imageInputRef.current.click()}
                      style={{ width: '100%', padding: '24px', border: '2px dashed #333', borderRadius: '8px', backgroundColor: '#111', color: '#555', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontSize: '12px', transition: 'border-color 0.2s' }}>
                      <Image size={20} />
                      Click to upload image
                    </button>
                  )}
                </div>

                {/* Video */}
                <div style={cardStyle}>
                  <label style={labelStyle}>Video</label>
                  <input ref={videoInputRef} type="file" accept="video/*" onChange={handleVideoChange} style={{ display: 'none' }} />
                  <button type="button" onClick={() => videoInputRef.current.click()}
                    style={{ width: '100%', padding: '16px', border: `2px dashed ${form.video ? '#ef4444' : '#333'}`, borderRadius: '8px', backgroundColor: '#111', color: form.video ? '#ef4444' : '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px', fontWeight: 700 }}>
                    <Video size={16} />
                    {form.video ? `✓ ${form.video.name}` : 'Upload Video'}
                  </button>
                </div>

                {/* Submit */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="submit" disabled={loading}
                    style={{ flex: 1, padding: '12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 800, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.2s' }}>
                    {loading ? 'Saving...' : editId ? 'Save Changes' : '🚀 Publish'}
                  </button>
                  {editId && (
                    <button type="button" onClick={resetForm}
                      style={{ padding: '12px 16px', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '10px', color: '#aaa', cursor: 'pointer', fontSize: '13px' }}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}

        {/* MANAGE TAB */}
        {activeTab === 'manage' && (
          <div>
            {news.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#555' }}>
                <p style={{ fontSize: '16px' }}>No articles yet. Go to Compose to write your first story.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {news.map(item => (
                  <div key={item._id} style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '12px', padding: '1.25rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <span style={{ padding: '2px 8px', backgroundColor: '#ef444422', border: '1px solid #ef444440', borderRadius: '20px', color: '#ef4444', fontSize: '10px', fontWeight: 800, letterSpacing: '1px' }}>
                          {item.category}
                        </span>
                        <span style={{ padding: '2px 8px', backgroundColor: item.status === 'published' ? '#10b98122' : '#f59e0b22', border: `1px solid ${item.status === 'published' ? '#10b98140' : '#f59e0b40'}`, borderRadius: '20px', color: item.status === 'published' ? '#10b981' : '#f59e0b', fontSize: '10px', fontWeight: 700 }}>
                          {item.status === 'published' ? '🟢 Published' : '📝 Draft'}
                        </span>
                        {item.isFeatured && <span style={{ color: '#f59e0b', fontSize: '12px' }}>⭐ Featured</span>}
                      </div>
                      <h3 style={{ fontWeight: 800, fontSize: '15px', margin: '0 0 4px 0', color: 'white' }}>{item.title}</h3>
                      <div style={{ fontSize: '11px', color: '#555' }}>
                        {item.authorName && <span>By {item.authorName} · </span>}
                        {new Date(item.createdAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {item.videoUrl && <span style={{ color: '#ef4444', marginLeft: '8px' }}>🎬 Has video</span>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleEdit(item)}
                        style={{ padding: '8px 14px', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 700 }}>
                        <Pencil size={13} /> Edit
                      </button>
                      <button onClick={() => handleDelete(item._id)}
                        style={{ padding: '8px 14px', backgroundColor: '#1a0000', border: '1px solid #440000', borderRadius: '8px', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 700 }}>
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  backgroundColor: '#111',
  border: '1px solid #2a2a2a',
  borderRadius: '8px',
  color: 'white',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};
const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: '#888',
  marginBottom: '6px',
};
const cardStyle = {
  backgroundColor: '#0f0f0f',
  border: '1px solid #1e1e1e',
  borderRadius: '12px',
  padding: '1rem',
};

export default AdminDashboard;
