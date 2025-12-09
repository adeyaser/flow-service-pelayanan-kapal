import React, { useState } from 'react';
import { WorkflowSimulator } from './components/WorkflowSimulator';
import { Dashboard } from './components/Dashboard';
import { RKBMView } from './components/RKBMView';
import { RPKOPView } from './components/RPKOPView';
import { PPKBView } from './components/PPKBView';
import { SPKView } from './components/SPKView';
import { DataTransmissionView } from './components/DataTransmissionView';
import { PilotSPKView } from './components/PilotSPKView';
import { ClearanceView } from './components/ClearanceView';
import { RealizationView } from './components/RealizationView';
import { BillingView } from './components/BillingView';
import { Box, LayoutDashboard, Activity, Package, ClipboardCheck, FileSignature, CreditCard, Network, ShieldCheck, Stamp, ClipboardList, Receipt, Languages } from 'lucide-react';

type ViewMode = 'dashboard' | 'workflow' | 'rkbm' | 'rpkop' | 'ppkb' | 'spk' | 'sync' | 'pilot' | 'clearance' | 'realization' | 'billing';
export type Language = 'en' | 'id';

const MENU_ITEMS = {
  dashboard: { en: 'Dashboard', id: 'Dashboard' },
  rkbm: { en: 'RKBM Prep', id: 'Persiapan RKBM' },
  rpkop: { en: 'RPKOP Creation', id: 'Pembuatan RPKOP' },
  ppkb: { en: 'PPKB Submit', id: 'Pengajuan PPKB' },
  spk: { en: 'Payment & SPK', id: 'Pembayaran & SPK' },
  sync: { en: 'Data Sync', id: 'Sinkronisasi Data' },
  pilot: { en: 'Pilot SPK', id: 'SPK Pandu' },
  realization: { en: 'Realization', id: 'Realisasi' },
  billing: { en: 'Billing & Doc', id: 'Penagihan & Dok' },
  clearance: { en: 'Clearance (SPOG/SPB)', id: 'Persetujuan (SPOG/SPB)' },
  workflow: { en: 'Workflow Simulator', id: 'Simulasi Alur Kerja' },
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-inter">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Box size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">InaPortNet <span className="text-slate-400 font-light">Simulator</span></h1>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-lg border border-slate-200 overflow-x-auto">
            {(Object.keys(MENU_ITEMS) as ViewMode[]).map((key) => (
              <button 
                key={key}
                onClick={() => setCurrentView(key)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                  currentView === key 
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {/* Icons mapped manually to ensure correct Lucide icons */}
                {key === 'dashboard' && <LayoutDashboard size={16} />}
                {key === 'rkbm' && <Package size={16} />}
                {key === 'rpkop' && <ClipboardCheck size={16} />}
                {key === 'ppkb' && <FileSignature size={16} />}
                {key === 'spk' && <CreditCard size={16} />}
                {key === 'sync' && <Network size={16} />}
                {key === 'pilot' && <ShieldCheck size={16} />}
                {key === 'realization' && <ClipboardList size={16} />}
                {key === 'billing' && <Receipt size={16} />}
                {key === 'clearance' && <Stamp size={16} />}
                {key === 'workflow' && <Activity size={16} />}
                {MENU_ITEMS[key][language]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
             <button
              onClick={() => setLanguage(l => l === 'en' ? 'id' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              <Languages size={16} />
              {language === 'en' ? 'EN' : 'ID'}
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                System Online
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {currentView === 'dashboard' && <Dashboard language={language} />}
        {currentView === 'rkbm' && <RKBMView language={language} />}
        {currentView === 'rpkop' && <RPKOPView language={language} />}
        {currentView === 'ppkb' && <PPKBView language={language} />}
        {currentView === 'spk' && <SPKView language={language} />}
        {currentView === 'sync' && <DataTransmissionView language={language} />}
        {currentView === 'pilot' && <PilotSPKView language={language} />}
        {currentView === 'realization' && <RealizationView language={language} />}
        {currentView === 'billing' && <BillingView language={language} />}
        {currentView === 'clearance' && <ClearanceView language={language} />}
        {currentView === 'workflow' && <WorkflowSimulator language={language} />}
      </main>
    </div>
  );
};

export default App;