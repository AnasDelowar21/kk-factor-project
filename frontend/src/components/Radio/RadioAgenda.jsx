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
    <aside className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
      {/* Header */}
      <div className="p-4 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-red-500" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Live Agenda
          </h2>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
          {station.frequency}
        </span>
      </div>

      {/* Currently Playing Card */}
      <div className="p-4 bg-gradient-to-b from-red-950/20 to-zinc-950 border-b border-zinc-800/80 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="px-2 py-0.5 bg-red-600 text-white font-bold text-[10px] uppercase tracking-widest rounded">
            ON AIR
          </span>
          <span className="font-mono text-zinc-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-red-500" />
            {currentShow.time}
          </span>
        </div>

        <h3 className="text-base font-bold text-white">
          {currentShow.title}
        </h3>

        <p className="text-xs text-zinc-400 flex items-center gap-1">
          <User className="w-3.5 h-3.5 text-zinc-500" />
          {currentShow.host}
        </p>

        <p className="text-xs text-zinc-300 leading-relaxed pt-1">
          {currentShow.description}
        </p>
      </div>

      {/* Program Schedule List */}
      <div className="p-3 space-y-2 max-h-[420px] overflow-y-auto custom-scrollbar">
        <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider px-1 pb-1">
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
                  ? "bg-zinc-900 border-red-600/60"
                  : "bg-zinc-900/40 border-zinc-800/60 hover:border-zinc-700"
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
                        isCurrent ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {item.time}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-white truncate">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-zinc-500 block truncate">
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
                        isReminded ? "text-red-500" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {isReminded ? <Check className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
                    </button>
                  )}
                  <button className="text-zinc-500">
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-3 pb-3 text-xs text-zinc-400 border-t border-zinc-800/50 bg-zinc-950/40 pt-2 space-y-1">
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
