import React from 'react';
import { Ship, Stamp, CheckCircle2, Clock, MoreHorizontal, Filter, Search, FileBadge, ArrowRight, XCircle } from 'lucide-react';
import { MOCK_CLEARANCE_DATA } from '../constants';
import { Language } from '../App';

const ClearanceStatusBadge = ({ status }: { status: string }) => {
  const getStyles = (s: string) => {
    switch (s.toLowerCase()) {
      case 'issued':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending approval':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getIcon = (s: string) => {
    switch (s.toLowerCase()) {
      case 'issued': return <CheckCircle2 size={12} />;
      case 'pending approval': return <Clock size={12} />;
      case 'rejected': return <XCircle size={12} />;
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

export const ClearanceView: React.FC<ViewProps> = ({ language }) => {
  const t = {
    en: {
      title: 'Clearance Issuance (SPOG/SPB)',
      desc: 'Port Authority (KSOP) module for issuing Ship Service Requests (PPK) and final clearances (SPOG/SPB).',
      issue: 'Issue Clearance',
      spb: 'SPB Issued Today',
      pending: 'Pending PPK',
      active: 'SPOG Active',
      registry: 'Clearance Registry',
      search: 'Search Document ID...',
      headers: {
        id: 'Document ID',
        type: 'Type',
        vessel: 'Vessel & Agent',
        port: 'Port Details',
        date: 'Issue Date',
        status: 'Status',
        actions: 'Actions'
      }
    },
    id: {
      title: 'Penerbitan Persetujuan (SPOG/SPB)',
      desc: 'Modul Otoritas Pelabuhan (KSOP) untuk menerbitkan Permintaan Pelayanan Kapal (PPK) dan persetujuan akhir (SPOG/SPB).',
      issue: 'Terbitkan Persetujuan',
      spb: 'SPB Terbit Hari Ini',
      pending: 'PPK Tertunda',
      active: 'SPOG Aktif',
      registry: 'Registri Persetujuan',
      search: 'Cari ID Dokumen...',
      headers: {
        id: 'ID Dokumen',
        type: 'Tipe',
        vessel: 'Kapal & Agen',
        port: 'Detail Pelabuhan',
        date: 'Tanggal Terbit',
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
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-lg text-white hover:bg-emerald-700 text-sm font-medium shadow-sm transition-colors shadow-emerald-200">
                <Stamp size={18} /> {t.issue}
            </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <FileBadge size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.spb}</h3>
            </div>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-slate-900">8</span>
                <span className="text-sm text-slate-500 font-medium mb-1.5">Outbound</span>
            </div>
             <p className="text-xs text-slate-400 mt-2">All departures cleared</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                    <Clock size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.pending}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">2</span>
                <span className="text-sm text-slate-500 mb-1.5">Requests</span>
            </div>
             <p className="text-xs text-slate-400 mt-3">Avg time: 15 mins</p>
        </div>

         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <Ship size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.active}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">14</span>
                <span className="text-sm text-slate-500 mb-1.5">Vessels</span>
            </div>
             <p className="text-xs text-emerald-500 mt-3 flex items-center gap-1">
                Port operations normal
             </p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
                <Stamp size={20} className="text-emerald-600" />
                <span>{t.registry}</span>
            </div>
            <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder={t.search} 
                        className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
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
                <th className="px-6 py-4">{t.headers.type}</th>
                <th className="px-6 py-4">{t.headers.vessel}</th>
                <th className="px-6 py-4">{t.headers.port}</th>
                <th className="px-6 py-4">{t.headers.date}</th>
                <th className="px-6 py-4">{t.headers.status}</th>
                <th className="px-6 py-4 text-right">{t.headers.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_CLEARANCE_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">
                    {item.id}
                  </td>
                   <td className="px-6 py-4">
                     <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                         item.type === 'SPOG' ? 'bg-blue-100 text-blue-700' :
                         item.type === 'SPB' ? 'bg-orange-100 text-orange-700' :
                         'bg-purple-100 text-purple-700'
                     }`}>
                         {item.type}
                     </span>
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
                    <div className="flex items-center gap-2">
                        <ArrowRight size={14} className="text-slate-400" />
                        {item.portDetails}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                     {item.issueDate !== '-' ? (
                         <div className="flex items-center gap-2">
                             <Clock size={14} className="text-slate-400" />
                             {item.issueDate}
                         </div>
                     ) : (
                         <span className="text-slate-400">-</span>
                     )}
                  </td>
                  <td className="px-6 py-4">
                    <ClearanceStatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-emerald-600 p-1 rounded-full hover:bg-emerald-50">
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