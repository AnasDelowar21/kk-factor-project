import React, { useState } from "react";
import { Calendar, Clock, User, ChevronDown, ChevronUp, Bell, Check } from "lucide-react";

function RadioAgenda({ station }) {
  const [reminders, setReminders] = useState({});
  const [expandedShowIndex, setExpandedShowIndex] = useState(0);

  if (!station) return null;

  const toggleReminder = (timeSlot) => {
    setReminders((prev) => ({
      ...prev,
      [timeSlot]: !prev[timeSlot],
    }));
  };

  const currentShow = station.schedule.find((s) => s.isCurrent) || station.schedule[0];

  return (
    <aside className="w-full bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden shadow-sm flex flex-col">
      {/* Header */}
      <div className="p-4 bg-[#F8F8F8] border-b border-[#E8E8E8] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#FF1F8E]" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">
            Live Agenda
          </h2>
        </div>
        <span className="text-[11px] font-mono text-[#888888] bg-white px-2 py-0.5 rounded border border-[#E8E8E8]">
          {station.frequency}
        </span>
      </div>

      {/* Currently Playing Card */}
      <div className="p-4 bg-gradient-to-b from-[#FFF0F7] to-white border-b border-[#F0F0F0] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="px-2 py-0.5 bg-[#FF1F8E] text-white font-bold text-[10px] uppercase tracking-widest rounded">
            ON AIR
          </span>
          <span className="font-mono text-[#888888] flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#FF1F8E]" />
            {currentShow.time}
          </span>
        </div>

        <h3 className="text-base font-extrabold text-[#1A1A1A]">
          {currentShow.title}
        </h3>

        <p className="text-xs text-[#888888] flex items-center gap-1">
          <User className="w-3.5 h-3.5 text-[#AAAAAA]" />
          {currentShow.host}
        </p>

        <p className="text-xs text-[#555555] leading-relaxed pt-1">
          {currentShow.description}
        </p>
      </div>

      {/* Program Schedule List */}
      <div className="p-3 space-y-2 max-h-[420px] overflow-y-auto custom-scrollbar">
        <div className="text-[11px] font-bold text-[#AAAAAA] uppercase tracking-wider px-1 pb-1">
          Today's Schedule
        </div>

        {station.schedule.map((item, index) => {
          const isCurrent = item.isCurrent;
          const isExpanded = expandedShowIndex === index;
          const isReminded = reminders[item.time];

          return (
            <div
              key={index}
              className={`rounded-xl border transition-all overflow-hidden ${
                isCurrent
                  ? "bg-[#FFF0F7] border-[#FF1F8E]/40"
                  : "bg-[#F8F8F8] border-[#E8E8E8] hover:border-[#DDDDDD]"
              }`}
            >
              <div
                onClick={() => setExpandedShowIndex(isExpanded ? null : index)}
                className="p-3 cursor-pointer flex items-center justify-between gap-2 select-none"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isCurrent ? "bg-[#FF1F8E] text-white" : "bg-[#E8E8E8] text-[#666666]"
                      }`}
                    >
                      {item.time}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#1A1A1A] truncate">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-[#AAAAAA] block truncate">
                    {item.host}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {!isCurrent && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReminder(item.time);
                      }}
                      className={`p-1 rounded transition-colors ${
                        isReminded ? "text-[#FF1F8E]" : "text-[#AAAAAA] hover:text-[#666666]"
                      }`}
                    >
                      {isReminded ? <Check className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
                    </button>
                  )}
                  <button className="text-[#AAAAAA]">
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-3 pb-3 text-xs text-[#666666] border-t border-[#E8E8E8] bg-white pt-2 space-y-1">
                  <p>{item.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default RadioAgenda;
