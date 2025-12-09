import React from 'react';
import { Receipt, FileText, CheckCircle2, Clock, MoreHorizontal, Filter, Search, DollarSign, AlertCircle, AlertTriangle } from 'lucide-react';
import { MOCK_BILLING_DATA } from '../constants';
import { Language } from '../App';

const BillingStatusBadge = ({ status }: { status: string }) => {
  const getStyles = (s: string) => {
    switch (s.toLowerCase()) {
      case 'paid':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'issued':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'draft':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getIcon = (s: string) => {
    switch (s.toLowerCase()) {
      case 'paid': return <CheckCircle2 size={12} />;
      case 'issued': return <Clock size={12} />;
      case 'overdue': return <AlertCircle size={12} />;
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

export const BillingView: React.FC<ViewProps> = ({ language }) => {
  const t = {
    en: {
      title: 'Billing & Documentation',
      desc: 'Billing Unit module for generating Pre-Invoices (DTJK/DPJKV) and Final Invoices (Nota).',
      batch: 'Generate Batch Pre-Invoice',
      issue: 'Issue Final Invoice',
      revenue: 'Total Revenue',
      pending: 'Pending Invoices',
      overdue: 'Overdue',
      registry: 'Invoice Registry',
      search: 'Search Invoice ID or Agent...',
      headers: {
        id: 'Invoice ID',
        type: 'Type',
        vessel: 'Vessel & Agent',
        amount: 'Amount',
        dates: 'Dates',
        status: 'Status',
        actions: 'Actions'
      }
    },
    id: {
      title: 'Penagihan & Dokumentasi',
      desc: 'Modul Unit Penagihan untuk membuat Pra-Nota (DTJK/DPJKV) dan Nota Final.',
      batch: 'Buat Batch Pra-Nota',
      issue: 'Terbitkan Nota Final',
      revenue: 'Total Pendapatan',
      pending: 'Tagihan Tertunda',
      overdue: 'Jatuh Tempo',
      registry: 'Registri Tagihan',
      search: 'Cari ID Tagihan atau Agen...',
      headers: {
        id: 'ID Tagihan',
        type: 'Tipe',
        vessel: 'Kapal & Agen',
        amount: 'Jumlah',
        dates: 'Tanggal',
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
                <FileText size={16} /> {t.batch}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 text-sm font-medium shadow-sm transition-colors shadow-indigo-200">
                <Receipt size={18} /> {t.issue}
            </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <DollarSign size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.revenue}</h3>
            </div>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-slate-900">1.2B</span>
                <span className="text-sm text-slate-500 font-medium mb-1.5">IDR (This Month)</span>
            </div>
             <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
                +8% vs last month
             </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Clock size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.pending}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">14</span>
                <span className="text-sm text-slate-500 mb-1.5">Active</span>
            </div>
             <p className="text-xs text-slate-400 mt-3">Total Value: IDR 350M</p>
        </div>

         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                    <AlertTriangle size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.overdue}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">2</span>
                <span className="text-sm text-slate-500 mb-1.5">Invoices</span>
            </div>
             <p className="text-xs text-red-500 mt-3 flex items-center gap-1">
                Action required
             </p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
                <Receipt size={20} className="text-indigo-600" />
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
                <th className="px-6 py-4">{t.headers.type}</th>
                <th className="px-6 py-4">{t.headers.vessel}</th>
                <th className="px-6 py-4">{t.headers.amount}</th>
                <th className="px-6 py-4">{t.headers.dates}</th>
                <th className="px-6 py-4">{t.headers.status}</th>
                <th className="px-6 py-4 text-right">{t.headers.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_BILLING_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">
                    {item.id}
                    <div className="text-xs text-slate-400 mt-0.5">Ref: {item.spkRef}</div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                         item.type === 'Final Invoice' ? 'bg-indigo-100 text-indigo-700' :
                         'bg-slate-100 text-slate-700'
                     }`}>
                         {item.type}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{item.vesselName}</div>
                    <div className="text-xs text-slate-500">{item.agent}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {item.amount}
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-xs">
                     <div className="flex items-center gap-1 mb-1">
                        <span className="text-slate-400 w-10">Issued:</span> {item.issueDate}
                     </div>
                     <div className="flex items-center gap-1">
                        <span className="text-slate-400 w-10">Due:</span> {item.dueDate}
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <BillingStatusBadge status={item.status} />
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