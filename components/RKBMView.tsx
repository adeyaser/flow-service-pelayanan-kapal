import React from 'react';
import { Package, Calendar, MoreHorizontal, Plus, Filter, Search, FileCheck, AlertCircle, ArrowUpRight } from 'lucide-react';
import { MOCK_RKBM_DATA } from '../constants';
import { Language } from '../App';

const RKBMStatusBadge = ({ status }: { status: string }) => {
  const getStyles = (s: string) => {
    switch (s.toLowerCase()) {
      case 'approved':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'draft':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'revision needed':
        return 'bg-amber-100 text-amber-700 border-amber-200';
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

export const RKBMView: React.FC<ViewProps> = ({ language }) => {
  const t = {
    en: {
      title: 'RKBM Preparation',
      desc: 'Stevedoring Company (PBM) module for managing Cargo Handling Activity Plans (RKBM) based on issued Port Clearance Cards (PKK).',
      bulkUpload: 'Bulk Upload',
      create: 'Create New RKBM',
      totalCargo: 'Total Cargo Planned',
      pending: 'Pending Approval',
      approved: 'Approved Plans',
      registry: 'RKBM Registry',
      search: 'Search PKK or Vessel...',
      headers: {
        id: 'RKBM ID / PKK Ref',
        vessel: 'Vessel Information',
        activity: 'Activity',
        cargo: 'Cargo & Tonnage',
        dates: 'Operational Dates',
        status: 'Status',
        actions: 'Actions'
      }
    },
    id: {
      title: 'Persiapan RKBM',
      desc: 'Modul Perusahaan Bongkar Muat (PBM) untuk mengelola Rencana Kegiatan Bongkar Muat (RKBM) berdasarkan PKK yang diterbitkan.',
      bulkUpload: 'Unggah Massal',
      create: 'Buat RKBM Baru',
      totalCargo: 'Total Kargo Direncanakan',
      pending: 'Menunggu Persetujuan',
      approved: 'Rencana Disetujui',
      registry: 'Registri RKBM',
      search: 'Cari PKK atau Kapal...',
      headers: {
        id: 'ID RKBM / Ref PKK',
        vessel: 'Informasi Kapal',
        activity: 'Aktivitas',
        cargo: 'Kargo & Tonase',
        dates: 'Tanggal Operasional',
        status: 'Status',
        actions: 'Aksi'
      }
    }
  }[language];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.title}</h2>
          <p className="text-slate-500 max-w-2xl">{t.desc}</p>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium shadow-sm transition-colors">
                <FileCheck size={16} /> {t.bulkUpload}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 text-sm font-medium shadow-sm transition-colors shadow-blue-200">
                <Plus size={18} /> {t.create}
            </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-xl shadow-lg text-white relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3 text-blue-100 text-sm font-medium">
                    <Package size={18} /> {t.totalCargo}
                </div>
                <div className="text-3xl font-bold mb-1">16,350 <span className="text-lg font-normal text-blue-200">Tons</span></div>
                <div className="text-blue-100 text-xs">For current week</div>
            </div>
            <Package size={80} className="absolute -right-4 -bottom-4 text-blue-400/30 rotate-12" />
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-1">
                        <AlertCircle size={16} /> {t.pending}
                    </div>
                    <div className="text-2xl font-bold text-slate-900">4</div>
                </div>
                <div className="h-8 w-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                    <span className="text-xs font-bold">2</span>
                </div>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4">
                <div className="bg-orange-500 h-1.5 rounded-full w-1/2"></div>
            </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-1">
                        <FileCheck size={16} /> {t.approved}
                    </div>
                    <div className="text-2xl font-bold text-slate-900">12</div>
                </div>
                 <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <ArrowUpRight size={16} />
                </div>
            </div>
             <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4">
                <div className="bg-emerald-500 h-1.5 rounded-full w-3/4"></div>
            </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
                <Package size={20} className="text-blue-600" />
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
                <th className="px-6 py-4">{t.headers.activity}</th>
                <th className="px-6 py-4">{t.headers.cargo}</th>
                <th className="px-6 py-4">{t.headers.dates}</th>
                <th className="px-6 py-4">{t.headers.status}</th>
                <th className="px-6 py-4 text-right">{t.headers.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_RKBM_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-mono font-medium text-slate-900">{item.id}</div>
                    <div className="text-xs text-blue-600 mt-1 hover:underline cursor-pointer flex items-center gap-1">
                        {item.pkkRef} <ArrowUpRight size={10} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{item.vesselName}</div>
                    <div className="text-xs text-slate-500">{item.agent}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${item.activity.includes('Load') ? 'bg-orange-400' : 'bg-blue-400'}`}></span>
                        {item.activity}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{item.tonnage}</div>
                    <div className="text-xs text-slate-500">{item.cargoType}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      {item.operationalDates}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <RKBMStatusBadge status={item.status} />
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
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 flex justify-between items-center">
            <span>Showing 3 of 12 active plans</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white disabled:opacity-50">Prev</button>
                <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};