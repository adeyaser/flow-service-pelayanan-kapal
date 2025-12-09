import React from 'react';
import { CreditCard, FileCheck, CheckCircle2, Clock, MoreHorizontal, Filter, Search, Wallet, Receipt, ChevronRight, DollarSign } from 'lucide-react';
import { MOCK_SPK_DATA } from '../constants';
import { Language } from '../App';

const PaymentBadge = ({ status }: { status: string }) => {
  const isPaid = status.toLowerCase() === 'paid';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
      isPaid ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'
    }`}>
      {isPaid ? <CheckCircle2 size={12} /> : <Clock size={12} />}
      {status}
    </span>
  );
};

const SPKStatusBadge = ({ status }: { status: string }) => {
  const isIssued = status.toLowerCase() === 'issued';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
      isIssued 
        ? 'bg-blue-100 text-blue-700 border-blue-200' 
        : status === 'Ready' 
          ? 'bg-purple-100 text-purple-700 border-purple-200' 
          : 'bg-slate-100 text-slate-500 border-slate-200'
    }`}>
      {status}
    </span>
  );
};

interface ViewProps {
  language: Language;
}

export const SPKView: React.FC<ViewProps> = ({ language }) => {
  const t = {
    en: {
      title: 'Payment & SPK Issuance',
      desc: 'One-Stop Service (PPSAP) module for verifying payments and issuing Work Orders (SPK) to Agents.',
      verify: 'Verify Payment',
      pending: 'Pending Payments',
      issued: 'SPKs Issued',
      revenue: 'Revenue Today',
      registry: 'Transaction Registry',
      search: 'Search SPK ID or PPKB Ref...',
      headers: {
        id: 'SPK Number',
        vessel: 'Vessel & Agent',
        ref: 'PPKB Reference',
        amount: 'Amount',
        payment: 'Payment',
        status: 'SPK Status',
        actions: 'Actions'
      }
    },
    id: {
      title: 'Pembayaran & Penerbitan SPK',
      desc: 'Modul Pusat Pelayanan Satu Atap (PPSAP) untuk memverifikasi pembayaran dan menerbitkan Surat Perintah Kerja (SPK) kepada Agen.',
      verify: 'Verifikasi Pembayaran',
      pending: 'Pembayaran Tertunda',
      issued: 'SPK Diterbitkan',
      revenue: 'Pendapatan Hari Ini',
      registry: 'Registri Transaksi',
      search: 'Cari No SPK atau Ref PPKB...',
      headers: {
        id: 'Nomor SPK',
        vessel: 'Kapal & Agen',
        ref: 'Referensi PPKB',
        amount: 'Jumlah',
        payment: 'Pembayaran',
        status: 'Status SPK',
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
                <Receipt size={18} /> {t.verify}
            </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                    <Wallet size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.pending}</h3>
            </div>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-slate-900">8</span>
                <span className="text-sm text-slate-500 font-medium mb-1.5">Invoices</span>
            </div>
             <p className="text-xs text-slate-400 mt-2">Total: IDR 145.5M</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <FileCheck size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.issued}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">15</span>
                <span className="text-sm text-slate-500 mb-1.5">Today</span>
            </div>
             <p className="text-xs text-slate-400 mt-3">Target: 20 Daily</p>
        </div>

         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <DollarSign size={20} />
                </div>
                <h3 className="font-semibold text-slate-700">{t.revenue}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">450M</span>
                <span className="text-sm text-slate-500 mb-1.5">IDR</span>
            </div>
             <p className="text-xs text-green-500 mt-3 flex items-center gap-1">
                +12% vs Yesterday
             </p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
                <CreditCard size={20} className="text-emerald-600" />
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
                <th className="px-6 py-4">{t.headers.vessel}</th>
                <th className="px-6 py-4">{t.headers.ref}</th>
                <th className="px-6 py-4 text-right">{t.headers.amount}</th>
                <th className="px-6 py-4">{t.headers.payment}</th>
                <th className="px-6 py-4">{t.headers.status}</th>
                <th className="px-6 py-4 text-right">{t.headers.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_SPK_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-mono font-medium text-slate-900">{item.id}</div>
                    {item.issueDate && <div className="text-xs text-slate-400 mt-1">{item.issueDate}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{item.vesselName}</div>
                    <div className="text-xs text-slate-500">{item.agent}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                     <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200">
                        {item.ppkbRef}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">
                    {item.amount}
                  </td>
                  <td className="px-6 py-4">
                    <PaymentBadge status={item.paymentStatus} />
                  </td>
                   <td className="px-6 py-4">
                    <SPKStatusBadge status={item.spkStatus} />
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