import React from 'react';
import { Ship, MapPin, Calendar, Flag, Anchor, Activity, User } from 'lucide-react';
import { VESSEL_DATA } from '../constants';
import { Actor } from '../types';

interface InfoSidebarProps {
  currentStepIndex: number;
  totalSteps: number;
  currentActor: Actor;
}

export const InfoSidebar: React.FC<InfoSidebarProps> = ({ currentStepIndex, totalSteps, currentActor }) => {
  const progress = Math.round(((currentStepIndex) / totalSteps) * 100);

  return (
    <div className="w-full lg:w-80 flex-shrink-0 lg:h-[calc(100vh-5rem)] lg:sticky lg:top-24 space-y-6">
      
      {/* Vessel Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <Ship size={24} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">{VESSEL_DATA.name}</h2>
            <p className="text-xs text-slate-500">IMO: {VESSEL_DATA.imo}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-500">
              <Flag size={14} /> Flag
            </span>
            <span className="font-medium text-slate-700">{VESSEL_DATA.flag}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-500">
              <Calendar size={14} /> Arrival
            </span>
            <span className="font-medium text-slate-700 text-right">{VESSEL_DATA.arrivalDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-500">
              <MapPin size={14} /> Port
            </span>
            <span className="font-medium text-slate-700">Tanjung Priok</span>
          </div>
           <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-500">
              <Anchor size={14} /> Status
            </span>
            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">
              {VESSEL_DATA.status}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg p-5 text-white">
        <div className="flex items-center gap-2 mb-4 text-slate-300 text-sm uppercase tracking-wider font-semibold">
          <Activity size={16} /> Service Progress
        </div>
        
        <div className="text-4xl font-bold mb-1">{progress}%</div>
        <div className="text-slate-400 text-sm mb-4">Completed</div>
        
        <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-400 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
          <p className="text-xs text-slate-400 mb-1">Current Active Stakeholder</p>
          <p className="font-semibold text-blue-200 flex items-center gap-2">
            <User size={16} />
            {currentActor}
          </p>
        </div>
      </div>

      {/* Helper Card */}
      <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
         <h3 className="font-semibold text-blue-900 mb-2 text-sm">System Note</h3>
         <p className="text-xs text-blue-700 leading-relaxed">
           This prototype simulates the data exchange between InaPortNet, the internal Port Management System (KCN), and external stakeholders (PBM, Agents).
         </p>
      </div>

    </div>
  );
};