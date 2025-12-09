import React from 'react';
import { Network, Database, Server, RefreshCw, ArrowRightLeft, AlertCircle, CheckCircle2, Clock, Search, Filter } from 'lucide-react';
import { MOCK_TRANSMISSION_LOGS } from '../constants';
import { Language } from '../App';

const SyncStatusBadge = ({ status }: { status: string }) => {
  const getStyles = (s: string) => {
    switch (s.toLowerCase()) {
      case 'synced':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getIcon = (s: string) => {
    switch (s.toLowerCase()) {
      case 'synced': return <CheckCircle2 size={12} />;
      case 'failed': return <AlertCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStyles(status)}`}>
      {getIcon(status)}
      {status}
    </span>
  );
};

interface ViewProps {
  language: Language;
}

export const DataTransmissionView: React.FC<ViewProps> = ({ language }) => {
  const t = {
    en: {
      title: 'Data Transmission',
      desc: 'System Synchronization module. Monitor the automatic transmission of SPK, PKK, and RPKOP data to InaPortNet.',
      forceSync: 'Force Sync',
      local: 'Local System',
      localDesc: 'Port Ops & Billing',
      remote: 'InaPortNet',
      remoteDesc: 'Central Authority',
      synced: 'Synced Today',
      pending: 'Pending Queue',
      errors: 'Sync Errors',
      log: 'Transmission Log',
      search: 'Search Ref ID...',
      headers: {
        id: 'Transaction ID',
        time: 'Timestamp',
        type: 'Doc Type',
        ref: 'Reference ID',
        vessel: 'Vessel',
        status: 'Sync Status',
        retry: 'Retry'
      }
    },
    id: {
      title: 'Transmisi Data',
      desc: 'Modul Sinkronisasi Sistem. Memantau pengiriman otomatis data SPK, PKK, dan RPKOP ke InaPortNet.',
      forceSync: 'Paksa Sinkronisasi',
      local: 'Sistem Lokal',
      localDesc: 'Ops Pelabuhan & Billing',
      remote: 'InaPortNet',
      remoteDesc: 'Otoritas Pusat',
      synced: 'Tersinkronisasi Hari Ini',
      pending: 'Antrian Tertunda',
      errors: 'Gagal Sinkronisasi',
      log: 'Log Transmisi',
      search: 'Cari ID Referensi...',
      headers: {
        id: 'ID Transaksi',
        time: 'Waktu',
        type: 'Jenis Dok',
        ref: 'ID Referensi',
        vessel: 'Kapal',
        status: 'Status Sync',
        retry: 'Ulang'
      }
    }
  }[language];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.title}</h2>
          <p className="text-slate-500 max-w-2xl">{t.desc}</p>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 text-sm font-medium shadow-sm transition-colors shadow-indigo-200">
                <RefreshCw size={18} /> {t.forceSync}
            </button>
        </div>
      </div>

      {/* Network Topology Visual */}
      <div className="bg-slate-900 rounded-xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Local Node */}
            <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 border-2 border-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <Server size={32} className="text-blue-400" />
                </div>
                <h3 className="font-bold text-blue-100">{t.local}</h3>
                <p className="text-xs text-blue-300">{t.localDesc}</p>
            </div>

            {/* Connection Line */}
            <div className="flex-1 flex flex-col items-center">
                 <div className="flex items-center gap-3 text-emerald-400 text-sm font-mono mb-2 animate-pulse">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    DATA STREAM ACTIVE
                 </div>
                 <div className="h-0.5 w-full bg-slate-700 relative">
                     <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-blue-500 h-1 w-1/3 rounded-full blur-[2px] animate-[slide-right_2s_infinite]"></div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-2 border border-slate-700 rounded-full">
                        <ArrowRightLeft size={20} className="text-slate-400" />
                     </div>
                 </div>
                 <div className="mt-2 text-xs text-slate-500">HTTPS / REST API v2</div>
            </div>

            {/* Remote Node */}
            <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    <Database size={32} className="text-emerald-400" />
                </div>
                <h3 className="font-bold text-emerald-100">{t.remote}</h3>
                <p className="text-xs text-emerald-300">{t.remoteDesc}</p>
            </div>
        </div>
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <CheckCircle2 size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.synced}</h3>
            </div>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-slate-900">142</span>
                <span className="text-sm text-slate-500 font-medium mb-1.5">Documents</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full">
                <div className="bg-emerald-500 h-1.5 rounded-full w-[98%]"></div>
            </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                    <Clock size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.pending}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">4</span>
                <span className="text-sm text-slate-500 mb-1.5">Items</span>
            </div>
             <p className="text-xs text-slate-400 mt-3">Est. clear time: &lt; 1 min</p>
        </div>

         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                    <AlertCircle size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.errors}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">1</span>
                <span className="text-sm text-slate-500 mb-1.5">Needs Attention</span>
            </div>
             <p className="text-xs text-red-400 mt-3">Error 502 Bad Gateway</p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
                <Network size={20} className="text-indigo-600" />
                <span>{t.log}</span>
            </div>
            <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder={t.search}
                        className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                    />
                </div>
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 bg-white">
                    <Filter size={18} />
                </button>
            </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">{t.headers.id}</th>
                <th className="px-6 py-4">{t.headers.time}</th>
                <th className="px-6 py-4">{t.headers.type}</th>
                <th className="px-6 py-4">{t.headers.ref}</th>
                <th className="px-6 py-4">{t.headers.vessel}</th>
                <th className="px-6 py-4">{t.headers.status}</th>
                <th className="px-6 py-4 text-right">{t.headers.retry}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_TRANSMISSION_LOGS.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-slate-400" />
                      {item.timestamp}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                         item.documentType === 'SPK' ? 'bg-purple-100 text-purple-700' :
                         item.documentType === 'PKK' ? 'bg-blue-100 text-blue-700' :
                         'bg-slate-100 text-slate-700'
                     }`}>
                         {item.documentType}
                     </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-600">
                    {item.referenceId}
                  </td>
                  <td className="px-6 py-4 text-slate-900 font-medium">
                    {item.vesselName}
                  </td>
                  <td className="px-6 py-4">
                    <SyncStatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500">
                    {item.retryCount > 0 ? (
                        <span className="text-orange-500 font-bold">{item.retryCount}</span>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};