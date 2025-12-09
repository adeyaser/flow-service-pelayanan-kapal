import React from 'react';
import { ClipboardList, Printer, CheckCircle2, Clock, MoreHorizontal, Filter, Search, StopCircle, PlayCircle, User } from 'lucide-react';
import { MOCK_REALIZATION_DATA } from '../constants';
import { Language } from '../App';

const RealizationStatusBadge = ({ status }: { status: string }) => {
  const getStyles = (s: string) => {
    switch (s.toLowerCase()) {
      case 'verified':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'recorded':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending recording':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getIcon = (s: string) => {
    switch (s.toLowerCase()) {
      case 'verified': return <CheckCircle2 size={12} />;
      case 'recorded': return <CheckCircle2 size={12} />;
      case 'pending recording': return <Clock size={12} />;
      default: return null;
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

export const RealizationView: React.FC<ViewProps> = ({ language }) => {
  const t = {
    en: {
      title: 'Realization Recording',
      desc: 'JAI and Rendal module for printing SPK and recording the actual execution (proof) of services.',
      print: 'Print Batch SPK',
      record: 'Record New Service',
      recorded: 'Services Recorded',
      pending: 'Pending Realization',
      verified: 'Verified by JAI',
      registry: 'Service Logs',
      search: 'Search SPK or Vessel...',
      headers: {
        id: 'Realization ID',
        spk: 'SPK Reference',
        vessel: 'Vessel',
        details: 'Service Details',
        time: 'Execution Time',
        by: 'Recorded By',
        status: 'Status',
        actions: 'Actions'
      }
    },
    id: {
      title: 'Perekaman Realisasi',
      desc: 'Modul JAI dan Rendal untuk mencetak SPK dan merekam pelaksanaan (bukti) layanan yang sebenarnya.',
      print: 'Cetak Batch SPK',
      record: 'Rekam Layanan Baru',
      recorded: 'Layanan Terekam',
      pending: 'Realisasi Tertunda',
      verified: 'Diverifikasi oleh JAI',
      registry: 'Log Layanan',
      search: 'Cari SPK atau Kapal...',
      headers: {
        id: 'ID Realisasi',
        spk: 'Ref SPK',
        vessel: 'Kapal',
        details: 'Detail Layanan',
        time: 'Waktu Pelaksanaan',
        by: 'Direkam Oleh',
        status: 'Status',
        actions: 'Aksi'
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
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium shadow-sm transition-colors">
                <Printer size={16} /> {t.print}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 text-sm font-medium shadow-sm transition-colors shadow-indigo-200">
                <ClipboardList size={18} /> {t.record}
            </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <ClipboardList size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.recorded}</h3>
            </div>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-slate-900">32</span>
                <span className="text-sm text-slate-500 font-medium mb-1.5">Today</span>
            </div>
             <p className="text-xs text-slate-400 mt-2">100% completion rate</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                    <Clock size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.pending}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">5</span>
                <span className="text-sm text-slate-500 mb-1.5">Jobs</span>
            </div>
             <p className="text-xs text-slate-400 mt-3">Require immediate action</p>
        </div>

         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <CheckCircle2 size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.verified}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">28</span>
                <span className="text-sm text-slate-500 mb-1.5">Valid Proofs</span>
            </div>
             <p className="text-xs text-emerald-500 mt-3 flex items-center gap-1">
                Data quality high
             </p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
                <ClipboardList size={20} className="text-indigo-600" />
                <span>{t.registry}</span>
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
                <th className="px-6 py-4">{t.headers.spk}</th>
                <th className="px-6 py-4">{t.headers.vessel}</th>
                <th className="px-6 py-4">{t.headers.details}</th>
                <th className="px-6 py-4">{t.headers.time}</th>
                <th className="px-6 py-4">{t.headers.by}</th>
                <th className="px-6 py-4">{t.headers.status}</th>
                <th className="px-6 py-4 text-right">{t.headers.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_REALIZATION_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-600">
                    {item.spkRef}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {item.vesselName}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {item.serviceType}
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-xs">
                     <div className="flex items-center gap-1 mb-1">
                        <PlayCircle size={10} className="text-green-500" /> {item.startTime}
                     </div>
                     <div className="flex items-center gap-1">
                        <StopCircle size={10} className="text-red-500" /> {item.endTime}
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-1.5 text-slate-700">
                        <User size={14} className="text-slate-400" />
                        {item.recordedBy}
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <RealizationStatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 p-1 rounded-full hover:bg-indigo-50">
                      <MoreHorizontal size={18} />
                    </button>
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