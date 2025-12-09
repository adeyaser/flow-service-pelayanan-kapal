import React from 'react';
import { FileText, Ship, Anchor, AlertCircle, Search, Filter, MoreHorizontal, Calendar, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { MOCK_ARRIVAL_NOTICES, MOCK_PKK_DATA } from '../constants';
import { Language } from '../App';

const StatusBadge = ({ status }: { status: string }) => {
  const getStyles = (s: string) => {
    switch (s.toLowerCase()) {
      case 'verified':
      case 'active':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'draft':
      case 'pending':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'rejected':
      case 'expired':
      case 'suspended':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getIcon = (s: string) => {
     switch (s.toLowerCase()) {
      case 'verified':
      case 'active':
        return <CheckCircle2 size={12} />;
      case 'rejected':
      case 'expired':
        return <XCircle size={12} />;
      default:
        return <Clock size={12} />;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStyles(status)}`}>
      {getIcon(status)}
      {status}
    </span>
  );
};

interface DashboardProps {
  language: Language;
}

export const Dashboard: React.FC<DashboardProps> = ({ language }) => {
  const t = {
    en: {
      arrivals: 'Arrivals Today',
      activePKKs: 'Active PKKs',
      pending: 'Pending Approvals',
      performance: 'Service Performance',
      onTime: 'On Time',
      wartaTitle: 'Ship Arrival Notifications (Warta)',
      wartaDesc: 'Recent arrival submissions from shipping agents.',
      searchPlaceholder: 'Search vessel...',
      viewAll: 'View All Notifications',
      pkkTitle: 'Port Clearance Cards (PKK)',
      pkkDesc: 'Active and processed clearance documents.',
      export: 'Export Data',
      headers: {
        noticeId: 'Notice ID',
        vessel: 'Vessel / Call Sign',
        voyage: 'Voyage (In/Out)',
        eta: 'ETA (Local)',
        agent: 'Agent',
        status: 'Status',
        actions: 'Actions',
        pkkNumber: 'PKK Number',
        port: 'Port Location',
        validity: 'Validity'
      }
    },
    id: {
      arrivals: 'Kedatangan Hari Ini',
      activePKKs: 'PKK Aktif',
      pending: 'Menunggu Persetujuan',
      performance: 'Kinerja Layanan',
      onTime: 'Tepat Waktu',
      wartaTitle: 'Pemberitahuan Kedatangan Kapal (Warta)',
      wartaDesc: 'Pengajuan kedatangan terbaru dari agen pelayaran.',
      searchPlaceholder: 'Cari kapal...',
      viewAll: 'Lihat Semua Notifikasi',
      pkkTitle: 'Persetujuan Keagenan Kapal (PKK)',
      pkkDesc: 'Dokumen persetujuan aktif dan yang telah diproses.',
      export: 'Ekspor Data',
      headers: {
        noticeId: 'ID Warta',
        vessel: 'Kapal / Call Sign',
        voyage: 'Voyage (Msk/Klr)',
        eta: 'ETA (Lokal)',
        agent: 'Agen',
        status: 'Status',
        actions: 'Aksi',
        pkkNumber: 'Nomor PKK',
        port: 'Lokasi Pelabuhan',
        validity: 'Masa Berlaku'
      }
    }
  }[language];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Ship size={20} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-1">24</h3>
          <p className="text-sm text-slate-500">{t.arrivals}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <FileText size={20} />
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded">Active</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-1">18</h3>
          <p className="text-sm text-slate-500">{t.activePKKs}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <AlertCircle size={20} />
            </div>
            <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">Action Needed</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-1">5</h3>
          <p className="text-sm text-slate-500">{t.pending}</p>
        </div>

         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Anchor size={20} />
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">98%</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-1">{t.onTime}</h3>
          <p className="text-sm text-slate-500">{t.performance}</p>
        </div>
      </div>

      {/* Arrival Notification Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{t.wartaTitle}</h2>
            <p className="text-sm text-slate-500">{t.wartaDesc}</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
              <Filter size={18} />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">{t.headers.noticeId}</th>
                <th className="px-6 py-4">{t.headers.vessel}</th>
                <th className="px-6 py-4">{t.headers.voyage}</th>
                <th className="px-6 py-4">{t.headers.eta}</th>
                <th className="px-6 py-4">{t.headers.agent}</th>
                <th className="px-6 py-4">{t.headers.status}</th>
                <th className="px-6 py-4 text-right">{t.headers.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ARRIVAL_NOTICES.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-slate-600">{item.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{item.vesselName}</div>
                    <div className="text-xs text-slate-500">{item.callSign}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div>{item.voyageIn}</div>
                    <div className="text-xs text-slate-400">{item.voyageOut}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      {item.eta}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.agent}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
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
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-center">
          <button className="text-sm text-blue-600 font-medium hover:text-blue-700">{t.viewAll}</button>
        </div>
      </div>

      {/* PKK Data Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
             <h2 className="text-lg font-bold text-slate-900">{t.pkkTitle}</h2>
             <p className="text-sm text-slate-500">{t.pkkDesc}</p>
          </div>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50">
            {t.export}
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">{t.headers.pkkNumber}</th>
                <th className="px-6 py-4">{t.headers.vessel}</th>
                <th className="px-6 py-4">{t.headers.port}</th>
                <th className="px-6 py-4">{t.headers.validity}</th>
                <th className="px-6 py-4">{t.headers.agent}</th>
                <th className="px-6 py-4">{t.headers.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_PKK_DATA.map((item) => (
                <tr key={item.pkkNumber} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-600 font-medium cursor-pointer hover:underline">{item.pkkNumber}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{item.vesselName}</td>
                  <td className="px-6 py-4 text-slate-600">{item.portLocation}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="text-xs">Valid Until</div>
                    <div>{item.validUntil}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.agent}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
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