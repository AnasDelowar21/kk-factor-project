import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, PlusCircle, Pencil, Trash2, Star,
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
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-white text-sm font-semibold transition-all ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
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
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Top Bar */}
      <header className="bg-white border-b border-[#E8E8E8] px-6 h-[60px] flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FF1F8E] flex items-center justify-center">
            <span className="text-white font-black text-xs">KK</span>
          </div>
          <span className="font-extrabold text-sm tracking-tight text-[#1A1A1A]">THE KK FACTOR</span>
          <span className="text-[#AAAAAA] text-sm">/ Newsroom Admin</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl text-[#888888] text-xs font-bold hover:border-[#FF1F8E]/40 hover:text-[#FF1F8E] transition-colors"
        >
          <LogOut size={13} /> Logout
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tab Nav */}
        <div className="flex gap-1 mb-8 border-b border-[#E8E8E8] pb-0">
          {[
            { id: 'compose', label: editId ? '✏️ Edit Article' : '✍️ Compose' },
            { id: 'manage', label: `📋 Manage (${news.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); if (tab.id === 'compose' && !editId) resetForm(); }}
              className={`px-5 py-3 text-sm font-bold border-b-2 transition-all mb-[-1px] ${
                activeTab === tab.id
                  ? 'border-[#FF1F8E] text-[#FF1F8E]'
                  : 'border-transparent text-[#888888] hover:text-[#1A1A1A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* COMPOSE TAB */}
        {activeTab === 'compose' && (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
              {/* Left — Main Content */}
              <div className="flex flex-col gap-5">
                {/* Title */}
                <div>
                  <label className={labelStyle}>Headline *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    required
                    placeholder="Write a compelling headline..."
                    className={`${inputStyle} text-lg font-bold`}
                  />
                </div>

                {/* Summary */}
                <div>
                  <label className={labelStyle}>Summary / Excerpt <span className="text-[#AAAAAA] normal-case font-normal">(shown in news cards)</span></label>
                  <textarea
                    value={form.summary}
                    onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}
                    placeholder="Write a 1-2 sentence preview of the story..."
                    rows={2}
                    maxLength={220}
                    className={inputStyle}
                  />
                  <div className="text-[11px] text-[#AAAAAA] mt-1 text-right">{form.summary.length}/220</div>
                </div>

                {/* Content */}
                <div>
                  <label className={labelStyle}>Full Article *</label>
                  <textarea
                    value={form.content}
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    required
                    placeholder="Write the full article here..."
                    rows={16}
                    className={`${inputStyle} resize-y leading-7`}
                  />
                </div>
              </div>

              {/* Right — Metadata & Media */}
              <div className="flex flex-col gap-4">

                {/* Publish / Draft */}
                <div className={cardStyle}>
                  <label className={labelStyle}>Status</label>
                  <div className="flex gap-2">
                    {['published', 'draft'].map(s => (
                      <button key={s} type="button"
                        onClick={() => setForm(f => ({ ...f, status: s }))}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wide border-2 transition-all ${
                          form.status === s
                            ? 'border-[#FF1F8E] bg-[#FF1F8E] text-white'
                            : 'border-[#E8E8E8] bg-white text-[#888888] hover:border-[#FF1F8E]/40'
                        }`}
                      >
                        {s === 'published' ? '🟢 Publish' : '📝 Draft'}
                      </button>
                    ))}
                  </div>
                  {/* Featured toggle */}
                  <div className="mt-3">
                    <button type="button"
                      onClick={() => setForm(f => ({ ...f, isFeatured: !f.isFeatured }))}
                      className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border-2 text-xs font-bold transition-all ${
                        form.isFeatured
                          ? 'border-amber-400 bg-amber-50 text-amber-600'
                          : 'border-[#E8E8E8] bg-white text-[#888888] hover:border-amber-300'
                      }`}
                    >
                      <Star size={13} fill={form.isFeatured ? '#d97706' : 'none'} />
                      {form.isFeatured ? 'Featured Story' : 'Mark as Featured'}
                    </button>
                  </div>
                </div>

                {/* Category */}
                <div className={cardStyle}>
                  <label className={labelStyle}>Category</label>
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className={`${inputStyle} appearance-none pr-8 cursor-pointer`}
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAAAAA] pointer-events-none" />
                  </div>
                </div>

                {/* Author */}
                <div className={cardStyle}>
                  <label className={labelStyle}>Author / Byline</label>
                  <input
                    type="text"
                    value={form.authorName}
                    onChange={e => setForm(f => ({ ...f, authorName: e.target.value }))}
                    placeholder="e.g. Jane Smith"
                    className={inputStyle}
                  />
                </div>

                {/* Tags */}
                <div className={cardStyle}>
                  <label className={labelStyle}>Tags <span className="text-[#AAAAAA] normal-case font-normal">(comma-separated)</span></label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                    placeholder="e.g. music, australia, culture"
                    className={inputStyle}
                  />
                </div>

                {/* Cover Image */}
                <div className={cardStyle}>
                  <label className={labelStyle}>Cover Image</label>
                  <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  {imagePreview ? (
                    <div className="relative rounded-xl overflow-hidden">
                      <img src={imagePreview} alt="Preview" className="w-full h-36 object-cover" />
                      <button type="button" onClick={() => { setImagePreview(null); setForm(f => ({ ...f, image: null })); }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white border border-[#E8E8E8] shadow flex items-center justify-center text-[#888888] hover:text-red-500 transition-colors"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => imageInputRef.current.click()}
                      className="w-full py-6 border-2 border-dashed border-[#E8E8E8] rounded-xl bg-[#FAFAFA] text-[#AAAAAA] hover:border-[#FF1F8E]/40 hover:text-[#FF1F8E] flex flex-col items-center gap-2 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Image size={20} />
                      Click to upload image
                    </button>
                  )}
                </div>

                {/* Video */}
                <div className={cardStyle}>
                  <label className={labelStyle}>Video</label>
                  <input ref={videoInputRef} type="file" accept="video/*" onChange={handleVideoChange} className="hidden" />
                  <button type="button" onClick={() => videoInputRef.current.click()}
                    className={`w-full py-4 border-2 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-colors cursor-pointer ${
                      form.video
                        ? 'border-[#FF1F8E]/40 bg-[#FF1F8E]/5 text-[#FF1F8E]'
                        : 'border-dashed border-[#E8E8E8] bg-[#FAFAFA] text-[#AAAAAA] hover:border-[#FF1F8E]/40 hover:text-[#FF1F8E]'
                    }`}
                  >
                    <Video size={16} />
                    {form.video ? `✓ ${form.video.name}` : 'Upload Video'}
                  </button>
                </div>

                {/* Submit */}
                <div className="flex gap-2">
                  <button type="submit" disabled={loading}
                    className="flex-1 py-3 bg-[#FF1F8E] hover:bg-[#C4006A] text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition shadow-md shadow-[#FF1F8E]/20 disabled:opacity-60 disabled:cursor-wait"
                  >
                    {loading ? 'Saving...' : editId ? 'Save Changes' : '🚀 Publish'}
                  </button>
                  {editId && (
                    <button type="button" onClick={resetForm}
                      className="px-4 py-3 bg-white border border-[#E8E8E8] rounded-xl text-[#888888] text-xs font-bold hover:border-[#D0D0D0] transition"
                    >
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
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#FFF0F7] border border-[#FF1F8E]/20 flex items-center justify-center mx-auto mb-4">
                  <PlusCircle className="w-7 h-7 text-[#FF1F8E]" />
                </div>
                <p className="text-[#888888] text-sm">No articles yet. Go to Compose to write your first story.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {news.map(item => (
                  <div key={item._id} className="bg-white border border-[#E8E8E8] rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-[#FF1F8E]/20 hover:shadow-sm transition-all">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="px-2 py-0.5 bg-[#FF1F8E]/10 border border-[#FF1F8E]/20 rounded-full text-[#FF1F8E] text-[10px] font-extrabold uppercase tracking-wide">
                          {item.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          item.status === 'published'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                            : 'bg-amber-50 border-amber-200 text-amber-600'
                        }`}>
                          {item.status === 'published' ? '🟢 Published' : '📝 Draft'}
                        </span>
                        {item.isFeatured && <span className="text-amber-500 text-xs">⭐ Featured</span>}
                        {item.videoUrl && <span className="text-[#7B5EA7] text-[10px] font-bold">🎬 Has video</span>}
                      </div>
                      <h3 className="font-extrabold text-sm text-[#1A1A1A] truncate">{item.title}</h3>
                      <div className="text-[11px] text-[#AAAAAA] mt-0.5">
                        {item.authorName && <span>By {item.authorName} · </span>}
                        {new Date(item.createdAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => handleEdit(item)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl text-[#888888] text-xs font-bold hover:border-[#FF1F8E]/40 hover:text-[#FF1F8E] transition-colors"
                      >
                        <Pencil size={12} /> Edit
                      </button>
                      <button onClick={() => handleDelete(item._id)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-red-50 border border-red-200 rounded-xl text-red-500 text-xs font-bold hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={12} /> Delete
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
const inputStyle = "w-full px-4 py-3 bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl text-[#1A1A1A] text-sm placeholder-[#AAAAAA] focus:outline-none focus:border-[#FF1F8E] focus:ring-2 focus:ring-[#FF1F8E]/10 transition box-border";
const labelStyle = "block text-[11px] font-extrabold uppercase tracking-widest text-[#888888] mb-2";
const cardStyle = "bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-sm";

export default AdminDashboard;
