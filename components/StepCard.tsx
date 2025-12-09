import React from 'react';
import { CheckCircle2, Circle, Clock, FileText, User, ChevronRight, PlayCircle, Loader2 } from 'lucide-react';
import { WorkflowStep, StepStatus, Actor } from '../types';

interface StepCardProps {
  step: WorkflowStep;
  status: StepStatus;
  isCurrent: boolean;
  onAction: () => void;
  isAutoProcessing: boolean;
}

const getActorColor = (actor: Actor) => {
  switch (actor) {
    case Actor.AGENT: return 'bg-blue-100 text-blue-800 border-blue-200';
    case Actor.KSOP: return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case Actor.BILLING: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case Actor.SYSTEM: return 'bg-slate-100 text-slate-800 border-slate-200';
    default: return 'bg-orange-100 text-orange-800 border-orange-200';
  }
};

export const StepCard: React.FC<StepCardProps> = ({ step, status, isCurrent, onAction, isAutoProcessing }) => {
  
  return (
    <div className={`relative flex gap-6 pb-12 last:pb-0 group`}>
      {/* Timeline Line */}
      <div className="absolute top-0 left-6 h-full w-0.5 bg-slate-200 group-last:hidden transform translate-x-[-1px]"></div>

      {/* Status Icon */}
      <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
        status === StepStatus.COMPLETED 
          ? 'bg-green-500 border-green-100 text-white' 
          : isCurrent 
            ? 'bg-white border-blue-500 text-blue-600 shadow-lg shadow-blue-200' 
            : 'bg-white border-slate-200 text-slate-300'
      }`}>
        {status === StepStatus.COMPLETED ? (
          <CheckCircle2 size={24} />
        ) : isCurrent ? (
           isAutoProcessing ? <Loader2 size={24} className="animate-spin" /> : <PlayCircle size={24} />
        ) : (
          <Circle size={24} />
        )}
      </div>

      {/* Content Card */}
      <div className={`flex-1 rounded-xl border p-5 transition-all duration-300 ${
        isCurrent 
          ? 'bg-white border-blue-200 shadow-xl ring-1 ring-blue-100 transform scale-[1.01]' 
          : status === StepStatus.COMPLETED
            ? 'bg-slate-50 border-slate-200 opacity-80'
            : 'bg-white border-slate-100 opacity-50'
      }`}>
        <div className="flex justify-between items-start mb-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getActorColor(step.actor)}`}>
            {step.actor}
          </span>
          <span className="text-xs font-mono text-slate-400">STEP {step.id.toString().padStart(2, '0')}</span>
        </div>

        <h3 className={`font-bold text-lg mb-2 ${isCurrent ? 'text-slate-900' : 'text-slate-700'}`}>
          {step.title}
        </h3>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          {step.description}
        </p>

        {/* Documents Section */}
        {step.documents.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {step.documents.map((doc, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200 text-slate-600">
                <FileText size={14} className="text-slate-400" />
                <span className="font-medium">{doc.name}</span>
                {status === StepStatus.COMPLETED && <span className="text-green-600">✓</span>}
              </div>
            ))}
          </div>
        )}

        {/* Action Area */}
        {isCurrent && (
          <div className="mt-4 flex items-center gap-3">
            {step.requiresAction ? (
              <button 
                onClick={onAction}
                disabled={isAutoProcessing}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAutoProcessing ? (
                  <>Processing <Loader2 size={16} className="animate-spin" /></>
                ) : (
                  <>
                    {step.actionLabel}
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-2 text-blue-600 text-sm font-medium animate-pulse">
                <Loader2 size={16} className="animate-spin" />
                System Processing...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};