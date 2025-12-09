import React from 'react';
import { FileSignature, Ship, Calendar, MoreHorizontal, Filter, Search, CheckCircle2, Clock, Plus, Anchor, Flag } from 'lucide-react';
import { MOCK_PPKB_DATA } from '../constants';
import { Language } from '../App';

const PPKBStatusBadge = ({ status }: { status: string }) => {
  const getStyles = (s: string) => {
    switch (s.toLowerCase()) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'draft':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getIcon = (s: string) => {
    switch (s.toLowerCase()) {
      case 'confirmed': return <CheckCircle2 size={12} />;
      case 'submitted': return <Clock size={12} />;
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

export const PPKBView: React.FC<ViewProps> = ({ language }) => {
   const t = {
    en: {
      title: 'PPKB Submission',
      desc: 'Shipping Agent module for submitting Ship Service Requests (PPKB) based on approved Operational Plans (RPKOP).',
      newRequest: 'New Request',
      total: 'Total Requests',
      pending: 'Pending Confirmation',
      scheduled: 'Scheduled Services',
      registry: 'Request Registry',
      search: 'Search ID or Vessel...',
      headers: {
        id: 'PPKB ID',
        vessel: 'Vessel & RPKOP',
        service: 'Service Type',
        date: 'Requested Date',
        priority: 'Priority',
        status: 'Status',
        actions: 'Actions'
      }
    },
    id: {
      title: 'Pengajuan PPKB',
      desc: 'Modul Agen Pelayaran untuk mengajukan Permintaan Pelayanan Kapal dan Barang (PPKB) berdasarkan RPKOP yang disetujui.',
      newRequest: 'Permintaan Baru',
      total: 'Total Permintaan',
      pending: 'Menunggu Konfirmasi',
      scheduled: 'Layanan Terjadwal',
      registry: 'Registri Permintaan',
      search: 'Cari ID atau Kapal...',
      headers: {
        id: 'ID PPKB',
        vessel: 'Kapal & RPKOP',
        service: 'Jenis Layanan',
        date: 'Tanggal Diminta',
        priority: 'Prioritas',
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
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 text-sm font-medium shadow-sm transition-colors shadow-blue-200">
                <Plus size={18} /> {t.newRequest}
            </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <FileSignature size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.total}</h3>
            </div>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-slate-900">28</span>
                <span className="text-sm text-slate-500 font-medium mb-1.5">This Month</span>
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
                <span className="text-3xl font-bold text-slate-900">3</span>
                <span className="text-sm text-slate-500 mb-1.5">Awaiting SPK</span>
            </div>
             <p className="text-xs text-slate-400 mt-3">Avg. wait time: 4h</p>
        </div>

         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <CheckCircle2 size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.scheduled}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">12</span>
                <span className="text-sm text-slate-500 mb-1.5">Upcoming</span>
            </div>
             <p className="text-xs text-slate-400 mt-3">Next: MV. OCEAN GIANT</p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
                <FileSignature size={20} className="text-blue-600" />
                <span>{t.registry}</span>
            </div>
            <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder={t.search} 
                        className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
                <th className="px-6 py-4">{t.headers.service}</th>
                <th className="px-6 py-4">{t.headers.date}</th>
                <th className="px-6 py-4">{t.headers.priority}</th>
                <th className="px-6 py-4">{t.headers.status}</th>
                <th className="px-6 py-4 text-right">{t.headers.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_PPKB_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-medium text-slate-900">
                        <Ship size={14} className="text-slate-400" />
                        {item.vesselName}
                    </div>
                    <div className="text-xs text-blue-600 mt-1 pl-5.5 hover:underline cursor-pointer">
                        Ref: {item.rpkopRef}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex flex-wrap gap-1">
                        {item.serviceType.map((service, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs text-slate-600">
                                {service}
                            </span>
                        ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      {item.requestedDate}
                    </div>
                  </td>
                   <td className="px-6 py-4">
                     {item.priority === 'High' ? (
                        <div className="flex items-center gap-1 text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded w-fit">
                            <Flag size={10} fill="currentColor" /> High
                        </div>
                     ) : (
                        <span className="text-slate-500 text-xs">Normal</span>
                     )}
                  </td>
                  <td className="px-6 py-4">
                    <PPKBStatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50">
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