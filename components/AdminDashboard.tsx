
import React, { useState } from 'react';
import { ApplicationFormData, ApplicationStatus } from '../types';
import { PROGRAMS } from '../constants';
import OfferLetter from './OfferLetter';

interface AdminDashboardProps {
  applications: ApplicationFormData[];
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ applications, onUpdateStatus }) => {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [viewingLetter, setViewingLetter] = useState(false);

  const getProgramLabel = (val: string) => PROGRAMS.find(p => p.value === val)?.label || val;
  const selectedApp = applications.find(app => app.id === selectedAppId) || null;

  // Data Calculations for Charts
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'PENDING').length,
    approved: applications.filter(a => a.status === 'APPROVED').length,
    rejected: applications.filter(a => a.status === 'REJECTED').length,
  };

  const programDistribution = PROGRAMS.map(prog => ({
    label: prog.label,
    count: applications.filter(a => a.program1 === prog.value).length
  })).filter(p => p.count > 0).sort((a, b) => b.count - a.count);

  const studyModeStats = {
    fullTime: applications.filter(a => a.studyMode === 'FULL TIME').length,
    partTime: applications.filter(a => a.studyMode === 'PART TIME').length,
  };

  // Helper for status percentage (for Doughnut Chart)
  const getPercentage = (count: number) => stats.total > 0 ? (count / stats.total) * 100 : 0;

  if (viewingLetter && selectedApp) {
    return (
      <div className="animate-in fade-in duration-500">
        <div className="mb-6 flex justify-between items-center print:hidden">
          <button 
            onClick={() => setViewingLetter(false)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors"
          >
            <i className="fas fa-arrow-left"></i> Back to Dashboard
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-orange-700 transition-all hover:scale-105 active:scale-95"
          >
            <i className="fas fa-print mr-2"></i> Print Offer Letter
          </button>
        </div>
        <OfferLetter application={selectedApp} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Applicants', value: stats.total, icon: 'fa-users', color: 'bg-indigo-500' },
          { label: 'Pending', value: stats.pending, icon: 'fa-clock', color: 'bg-amber-500' },
          { label: 'Approved', value: stats.approved, icon: 'fa-check-circle', color: 'bg-emerald-500' },
          { label: 'Rejected', value: stats.rejected, icon: 'fa-times-circle', color: 'bg-rose-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all">
            <div className={`${stat.color} w-12 h-12 rounded-xl text-white shadow-inner flex items-center justify-center shrink-0`}>
              <i className={`fas ${stat.icon} text-xl`}></i>
            </div>
            <div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900 leading-none">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution Chart (Doughnut style using CSS) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <i className="fas fa-chart-pie text-orange-500"></i>
            Application Status Distribution
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-8 flex-grow">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="4"></circle>
                {/* Pending segment */}
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-amber-500" strokeWidth="4" 
                  strokeDasharray={`${getPercentage(stats.pending)} 100`} strokeDashoffset="0"></circle>
                {/* Approved segment */}
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-emerald-500" strokeWidth="4" 
                  strokeDasharray={`${getPercentage(stats.approved)} 100`} strokeDashoffset={`-${getPercentage(stats.pending)}`}></circle>
                {/* Rejected segment */}
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-rose-500" strokeWidth="4" 
                  strokeDasharray={`${getPercentage(stats.rejected)} 100`} strokeDashoffset={`-${getPercentage(stats.pending) + getPercentage(stats.approved)}`}></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-900 leading-none">{stats.total}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total</span>
              </div>
            </div>
            <div className="flex-grow space-y-3 w-full">
              {[
                { label: 'Pending', count: stats.pending, color: 'bg-amber-500', perc: getPercentage(stats.pending) },
                { label: 'Approved', count: stats.approved, color: 'bg-emerald-500', perc: getPercentage(stats.approved) },
                { label: 'Rejected', count: stats.rejected, color: 'bg-rose-500', perc: getPercentage(stats.rejected) },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                      <span className="text-slate-600">{item.label}</span>
                    </div>
                    <span className="text-slate-900">{item.count} ({item.perc.toFixed(0)}%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.perc}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Program Popularity Chart (Horizontal Bars) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <i className="fas fa-chart-bar text-orange-500"></i>
            Popularity by Program
          </h3>
          <div className="space-y-4 flex-grow overflow-y-auto max-h-[220px] pr-2 custom-scrollbar">
            {programDistribution.length > 0 ? (
              programDistribution.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
                    <span className="text-slate-600 truncate max-w-[80%]">{item.label}</span>
                    <span className="text-slate-900">{item.count}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-900 rounded-full transition-all duration-1000" 
                      style={{ width: `${(item.count / Math.max(...programDistribution.map(d => d.count))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs italic">
                No program data available
              </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Time</p>
              <p className="text-lg font-black text-slate-900">{studyModeStats.fullTime}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Part Time</p>
              <p className="text-lg font-black text-slate-900">{studyModeStats.partTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center bg-slate-50 gap-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">Application Register</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Enrollment Data</p>
          </div>
          <div className="relative w-full md:w-80 group">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors"></i>
            <input 
              type="text" 
              placeholder="Search by ID, Name or IC..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest font-black">
                <th className="px-6 py-5 border-b">Applicant</th>
                <th className="px-6 py-5 border-b">Program Details</th>
                <th className="px-6 py-5 border-b">Status</th>
                <th className="px-6 py-5 border-b">Submission</th>
                <th className="px-6 py-5 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900">{app.name}</span>
                      <span className="font-mono text-[10px] text-slate-400">{app.icNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700 truncate max-w-[200px]">{getProgramLabel(app.program1)}</span>
                      <span className="text-[10px] font-bold text-slate-400">{app.studyMode}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                      app.status === 'REJECTED' ? 'bg-rose-100 text-rose-700 border-rose-200' :
                      'bg-amber-100 text-amber-700 border-amber-200'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{new Date(app.submissionDate).toLocaleDateString()}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">{app.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedAppId(app.id)}
                      className="px-4 py-2 bg-white border border-slate-200 hover:border-orange-500 hover:text-orange-600 font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
                    >
                      Process <i className="fas fa-chevron-right ml-1"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-32 text-center text-slate-400">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-inbox text-3xl"></i>
                    </div>
                    <p className="font-bold uppercase tracking-widest text-xs">No records available</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-3xl max-h-[92vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-12 duration-500 border border-white/20">
            <div className="p-8 border-b flex justify-between items-center bg-slate-900 text-white relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500"></div>
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 p-3 rounded-2xl shadow-lg">
                  <i className="fas fa-id-card text-xl"></i>
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tight">APPLICATION PORTFOLIO</h3>
                  <p className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em]">{selectedApp.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAppId(null)} 
                className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all group"
              >
                <i className="fas fa-times text-xl group-hover:scale-110 transition-transform"></i>
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-10 space-y-10 custom-scrollbar">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center shrink-0 border-2 border-slate-50 shadow-inner">
                  <i className="fas fa-user-graduate text-4xl text-slate-300"></i>
                </div>
                <div className="flex-grow space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{selectedApp.name}</h2>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      selectedApp.status === 'APPROVED' ? 'bg-emerald-500 text-white' :
                      selectedApp.status === 'REJECTED' ? 'bg-rose-500 text-white' :
                      'bg-amber-500 text-white'
                    }`}>
                      {selectedApp.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                      <i className="fas fa-fingerprint text-orange-500"></i>
                      <span className="font-mono font-bold tracking-widest">{selectedApp.icNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <i className="fas fa-envelope text-orange-500"></i>
                      <span className="font-bold">{selectedApp.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <i className="fas fa-phone text-orange-500"></i>
                      <span className="font-bold">{selectedApp.mobile}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">Academic Choice</h4>
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-black text-xs">1</div>
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-tight">{getProgramLabel(selectedApp.program1)}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Primary Choice</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 font-black text-xs">2</div>
                        <div>
                          <p className="text-xs font-black text-slate-700 leading-tight">{getProgramLabel(selectedApp.program2)}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Secondary Choice</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">Address & Location</h4>
                    <p className="text-xs font-bold text-slate-700 uppercase leading-relaxed">
                      {selectedApp.address1}<br/>
                      {selectedApp.address2 && <>{selectedApp.address2}<br/></>}
                      {selectedApp.postcode} {selectedApp.town}<br/>
                      {selectedApp.state}
                    </p>
                  </div>
                </div>
              </div>

              {/* Admin Actions */}
              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-shield-alt text-orange-500 text-xl"></i>
                  <h4 className="font-black tracking-tight text-lg">DECISION CENTER</h4>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => onUpdateStatus(selectedApp.id, 'APPROVED')}
                    className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                      selectedApp.status === 'APPROVED' 
                      ? 'bg-emerald-500 text-white shadow-xl scale-105 border-2 border-emerald-400' 
                      : 'bg-white/10 text-white border border-white/10 hover:bg-emerald-500/20 active:scale-95'
                    }`}
                  >
                    <i className="fas fa-check-circle"></i> Approve
                  </button>
                  <button 
                    onClick={() => onUpdateStatus(selectedApp.id, 'REJECTED')}
                    className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                      selectedApp.status === 'REJECTED' 
                      ? 'bg-rose-500 text-white shadow-xl scale-105 border-2 border-rose-400' 
                      : 'bg-white/10 text-white border border-white/10 hover:bg-rose-500/20 active:scale-95'
                    }`}
                  >
                    <i className="fas fa-times-circle"></i> Reject
                  </button>
                  <button 
                    onClick={() => onUpdateStatus(selectedApp.id, 'PENDING')}
                    className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                      selectedApp.status === 'PENDING' 
                      ? 'bg-amber-500 text-white shadow-xl scale-105 border-2 border-amber-400' 
                      : 'bg-white/10 text-white border border-white/10 hover:bg-amber-500/20 active:scale-95'
                    }`}
                  >
                    <i className="fas fa-clock"></i> Hold
                  </button>

                  {selectedApp.status === 'APPROVED' && (
                    <button 
                      onClick={() => setViewingLetter(true)}
                      className="ml-auto px-10 py-4 bg-orange-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-3 shadow-xl animate-pulse"
                    >
                      <i className="fas fa-file-signature"></i>
                      Issue Offer Letter
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
