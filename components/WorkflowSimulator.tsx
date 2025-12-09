import React, { useState, useEffect, useRef } from 'react';
import { StepCard } from './StepCard';
import { InfoSidebar } from './InfoSidebar';
import { WORKFLOW_STEPS } from '../constants';
import { StepStatus } from '../types';
import { RefreshCw, CheckCircle } from 'lucide-react';
import { Language } from '../App';

interface WorkflowProps {
  language: Language;
}

export const WorkflowSimulator: React.FC<WorkflowProps> = ({ language }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isAutoProcessing, setIsAutoProcessing] = useState(false);
  const stepsEndRef = useRef<HTMLDivElement>(null);

  const currentStep = WORKFLOW_STEPS[currentStepIndex];
  const isComplete = currentStepIndex >= WORKFLOW_STEPS.length;

  const t = {
    en: {
      title: 'Service Workflow',
      desc: 'Track the real-time status of vessel arrival, document verification, and billing issuance.',
      reset: 'Reset',
      completeTitle: 'Process Complete',
      completeDesc: 'All vessel services have been processed, clearances issued, and billing finalized successfully.',
      startNew: 'Start New Vessel Process'
    },
    id: {
      title: 'Alur Kerja Layanan',
      desc: 'Lacak status real-time kedatangan kapal, verifikasi dokumen, dan penerbitan tagihan.',
      reset: 'Reset',
      completeTitle: 'Proses Selesai',
      completeDesc: 'Semua layanan kapal telah diproses, persetujuan diterbitkan, dan penagihan diselesaikan dengan sukses.',
      startNew: 'Mulai Proses Kapal Baru'
    }
  }[language];

  useEffect(() => {
    if (stepsEndRef.current) {
        // Auto-scroll could go here
    }
  }, [currentStepIndex]);

  useEffect(() => {
    if (!isComplete && !currentStep.requiresAction && !isAutoProcessing) {
      handleStepAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepIndex, isComplete]);

  const handleStepAction = () => {
    setIsAutoProcessing(true);
    
    // Simulate API/Network latency or System processing time
    const delay = currentStep.autoDelay || 800;

    setTimeout(() => {
      setCompletedSteps(prev => [...prev, currentStep.id]);
      
      if (currentStepIndex < WORKFLOW_STEPS.length) {
        setCurrentStepIndex(prev => prev + 1);
      }
      setIsAutoProcessing(false);
    }, delay);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setCompletedSteps([]);
    setIsAutoProcessing(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Left Column: Timeline */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="mb-8 pb-6 border-b border-slate-100 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.title}</h2>
                <p className="text-slate-500">{t.desc}</p>
              </div>
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors bg-slate-50 px-3 py-2 rounded-lg"
              >
                <RefreshCw size={16} /> {t.reset}
              </button>
            </div>

            {isComplete ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.completeTitle}</h3>
                <p className="text-slate-600 max-w-md mx-auto mb-8">{t.completeDesc}</p>
                <button 
                  onClick={handleReset}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  {t.startNew}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {WORKFLOW_STEPS.map((step, index) => {
                  let status = StepStatus.PENDING;
                  if (completedSteps.includes(step.id)) status = StepStatus.COMPLETED;
                  if (index === currentStepIndex) status = StepStatus.ACTIVE;
                  
                  return (
                    <StepCard 
                      key={step.id} 
                      step={step} 
                      status={status}
                      isCurrent={index === currentStepIndex}
                      onAction={handleStepAction}
                      isAutoProcessing={isAutoProcessing}
                    />
                  );
                })}
                <div ref={stepsEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Info & Status */}
        <InfoSidebar 
          currentStepIndex={currentStepIndex} 
          totalSteps={WORKFLOW_STEPS.length}
          currentActor={isComplete ? WORKFLOW_STEPS[WORKFLOW_STEPS.length - 1].actor : currentStep.actor}
        />
      </div>
    </div>
  );
};