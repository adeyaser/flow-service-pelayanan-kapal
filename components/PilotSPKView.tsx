import React from 'react';
import { Ship, Anchor, CheckCircle2, Clock, MoreHorizontal, Filter, Search, ShieldCheck, UserCheck, AlertTriangle } from 'lucide-react';
import { MOCK_PILOT_ORDERS } from '../constants';
import { Language } from '../App';

const PilotStatusBadge = ({ status }: { status: string }) => {
  const getStyles = (s: string) => {
    switch (s.toLowerCase()) {
      case 'pilot assigned':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'approved':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'completed':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'pending verification':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getIcon = (s: string) => {
    switch (s.toLowerCase()) {
      case 'pilot assigned': return <UserCheck size={12} />;
      case 'approved': return <CheckCircle2 size={12} />;
      case 'completed': return <CheckCircle2 size={12} />;
      case 'pending verification': return <Clock size={12} />;
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

export const PilotSPKView: React.FC<ViewProps> = ({ language }) => {
  const t = {
    en: {
      title: 'Verification & Pilot SPK',
      desc: 'Port Authority (KSOP) module for verifying Operational Plans (RPKOP) against PKK data and issuing Pilot Work Orders.',
      batchVerify: 'Batch Verify',
      pending: 'Pending Verifications',
      active: 'Active Pilots',
      issued: 'Orders Issued',
      registry: 'Pilot Order Registry',
      search: 'Search SPK ID or Vessel...',
      headers: {
        id: 'Pilot SPK ID',
        vessel: 'Vessel & Agent',
        refs: 'Verification Refs',
        location: 'Location / Movement',
        pilot: 'Pilot & Time',
        status: 'Status',
        actions: 'Actions'
      }
    },
    id: {
      title: 'Verifikasi & SPK Pandu',
      desc: 'Modul Otoritas Pelabuhan (KSOP) untuk memverifikasi Rencana Operasional (RPKOP) terhadap data PKK dan menerbitkan Surat Perintah Kerja Pandu.',
      batchVerify: 'Verifikasi Batch',
      pending: 'Menunggu Verifikasi',
      active: 'Pandu Aktif',
      issued: 'SPK Diterbitkan',
      registry: 'Registri Order Pandu',
      search: 'Cari ID SPK atau Kapal...',
      headers: {
        id: 'ID SPK Pandu',
        vessel: 'Kapal & Agen',
        refs: 'Ref Verifikasi',
        location: 'Lokasi / Pergerakan',
        pilot: 'Pandu & Waktu',
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
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 text-sm font-medium shadow-sm transition-colors shadow-indigo-200">
                <ShieldCheck size={18} /> {t.batchVerify}
            </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                    <AlertTriangle size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.pending}</h3>
            </div>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-slate-900">3</span>
                <span className="text-sm text-slate-500 font-medium mb-1.5">Requests</span>
            </div>
             <div className="w-full bg-slate-100 h-1.5 rounded-full">
                <div className="bg-amber-500 h-1.5 rounded-full w-[30%]"></div>
            </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <UserCheck size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.active}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">12</span>
                <span className="text-sm text-slate-500 mb-1.5">On Duty</span>
            </div>
             <p className="text-xs text-slate-400 mt-3">Next shift in 2h</p>
        </div>

         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <CheckCircle2 size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.issued}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">24</span>
                <span className="text-sm text-slate-500 mb-1.5">Today</span>
            </div>
             <p className="text-xs text-emerald-500 mt-3 flex items-center gap-1">
                All systems nominal
             </p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
                <ShieldCheck size={20} className="text-indigo-600" />
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
                <th className="px-6 py-4">{t.headers.vessel}</th>
                <th className="px-6 py-4">{t.headers.refs}</th>
                <th className="px-6 py-4">{t.headers.location}</th>
                <th className="px-6 py-4">{t.headers.pilot}</th>
                <th className="px-6 py-4">{t.headers.status}</th>
                <th className="px-6 py-4 text-right">{t.headers.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_PILOT_ORDERS.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-medium text-slate-900">
                        <Ship size={14} className="text-slate-400" />
                        {item.vesselName}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                        {item.agent}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                     <div className="flex flex-col gap-1">
                        <span className="text-xs bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 w-fit">
                            {item.pkkRef}
                        </span>
                        <span className="text-xs bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-100 w-fit">
                            {item.rpkopRef}
                        </span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                        <Anchor size={14} className="text-slate-400" />
                        {item.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{item.pilotName}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      <Clock size={10} />
                      {item.boardingTime}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <PilotStatusBadge status={item.status} />
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