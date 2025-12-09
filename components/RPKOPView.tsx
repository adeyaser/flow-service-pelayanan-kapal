import React from 'react';
import { ClipboardCheck, Anchor, Calendar, MoreHorizontal, Filter, Search, Wrench, Ship, CheckSquare } from 'lucide-react';
import { MOCK_RPKOP_DATA } from '../constants';
import { Language } from '../App';

const RPKOPStatusBadge = ({ status }: { status: string }) => {
  const getStyles = (s: string) => {
    switch (s.toLowerCase()) {
      case 'approved':
      case 'active':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'pending review':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'draft':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStyles(status)}`}>
      {status}
    </span>
  );
};

interface ViewProps {
  language: Language;
}

export const RPKOPView: React.FC<ViewProps> = ({ language }) => {
  const t = {
    en: {
      title: 'RPKOP Creation',
      desc: 'Port Operations Planner (Rendal) module for reviewing RKBMs and creating Port Operational Activity Plans (RPKOP).',
      review: 'Review Pending RKBMs',
      berth: 'Berth Occupancy',
      pending: 'Pending Review',
      active: 'Active RPKOPs',
      registry: 'Operational Plans Registry',
      search: 'Search Plan ID or Vessel...',
      headers: {
        id: 'RPKOP ID',
        vessel: 'Vessel & RKBM Ref',
        location: 'Berth Location',
        schedule: 'Operational Schedule',
        resources: 'Resources',
        status: 'Status',
        actions: 'Actions'
      }
    },
    id: {
      title: 'Pembuatan RPKOP',
      desc: 'Modul Perencana Operasi Pelabuhan (Rendal) untuk meninjau RKBM dan membuat Rencana Kegiatan Operasional Pelabuhan (RPKOP).',
      review: 'Tinjau RKBM Tertunda',
      berth: 'Okupansi Tambatan',
      pending: 'Menunggu Tinjauan',
      active: 'RPKOP Aktif',
      registry: 'Registri Rencana Operasional',
      search: 'Cari ID Rencana atau Kapal...',
      headers: {
        id: 'ID RPKOP',
        vessel: 'Ref Kapal & RKBM',
        location: 'Lokasi Tambat',
        schedule: 'Jadwal Operasional',
        resources: 'Sumber Daya',
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
                <CheckSquare size={18} /> {t.review}
            </button>
        </div>
      </div>

      {/* Stats Cards for Ops */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Anchor size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.berth}</h3>
            </div>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-slate-900">78%</span>
                <span className="text-sm text-green-600 font-medium mb-1.5">Optimal</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full">
                <div className="bg-indigo-500 h-1.5 rounded-full w-[78%]"></div>
            </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                    <ClipboardCheck size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.pending}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">5</span>
                <span className="text-sm text-slate-500 mb-1.5">RKBMs waiting</span>
            </div>
             <p className="text-xs text-slate-400 mt-3">2 High Priority</p>
        </div>

         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Wrench size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.active}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">14</span>
                <span className="text-sm text-slate-500 mb-1.5">Plans in execution</span>
            </div>
             <p className="text-xs text-slate-400 mt-3">Next update in 20m</p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
                <ClipboardCheck size={20} className="text-indigo-600" />
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
                <th className="px-6 py-4">{t.headers.location}</th>
                <th className="px-6 py-4">{t.headers.schedule}</th>
                <th className="px-6 py-4">{t.headers.resources}</th>
                <th className="px-6 py-4">{t.headers.status}</th>
                <th className="px-6 py-4 text-right">{t.headers.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_RPKOP_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-medium text-slate-900">
                        <Ship size={14} className="text-slate-400" />
                        {item.vesselName}
                    </div>
                    <div className="text-xs text-indigo-600 mt-1 pl-5.5 hover:underline cursor-pointer">
                        Ref: {item.rkbmRef}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                        <Anchor size={14} className="text-slate-400" />
                        {item.berthLocation}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      {item.schedule}
                    </div>
                  </td>
                   <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                        <Wrench size={14} className="text-slate-400" />
                        {item.resources}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <RPKOPStatusBadge status={item.status} />
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