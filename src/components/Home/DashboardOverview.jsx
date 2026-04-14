import React from 'react';
import { Users, Clock, Zap } from 'lucide-react';

const DashboardOverview = ({ globalStats }) => {
  const occupancyPercentage = Math.round((globalStats.totalAttendees / globalStats.maxCapacity) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="glass-panel p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
        <div className="p-3 bg-brand-50 rounded-xl text-brand-600">
          <Users size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Current Attendance</p>
          <div className="flex items-end gap-2 mt-1">
            <h2 className="text-3xl font-bold text-slate-800">{globalStats.totalAttendees.toLocaleString()}</h2>
            <span className="text-sm font-medium text-slate-400 pb-1">/ {globalStats.maxCapacity.toLocaleString()}</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-brand h-full rounded-full" style={{ width: `${occupancyPercentage}%` }}></div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
          <Clock size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Avg Wait Time</p>
          <div className="flex items-end gap-2 mt-1">
            <h2 className="text-3xl font-bold text-slate-800">{globalStats.averageWait}</h2>
            <span className="text-sm font-medium text-slate-400 pb-1">mins</span>
          </div>
          <p className="text-sm text-slate-500 mt-2 flex items-center gap-1">
            <span className="text-brand flex items-center"><Zap size={14} /> -2m</span> since last hour
          </p>
        </div>
      </div>

      <div className="glass-panel p-6 bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-float flex flex-col justify-between">
         <div>
            <h3 className="font-semibold text-lg">AI Recommendation Engine</h3>
            <p className="text-sm text-brand-100 mt-1">System is actively re-routing foot traffic from Gate D to Gate B.</p>
         </div>
         <button className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm self-start px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            View Traffic Map
         </button>
      </div>
    </div>
  );
};

export default DashboardOverview;
