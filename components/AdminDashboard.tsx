
import React, { useState } from 'react';
import { ApplicationFormData, ApplicationStatus } from '../types';
import { PROGRAMS } from '../constants';
import OfferLetter from './OfferLetter';
import { GoogleGenAI } from "@google/genai";

interface AdminDashboardProps {
  applications: ApplicationFormData[];
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ applications, onUpdateStatus }) => {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [viewingLetter, setViewingLetter] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);

  const getProgramLabel = (val: string) => PROGRAMS.find(p => p.value === val)?.label || val;
  const selectedApp = applications.find(app => app.id === selectedAppId) || null;

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

  const getPercentage = (count: number) => stats.total > 0 ? (count / stats.total) * 100 : 0;

  const generateAIInsight = async () => {
    if (!selectedApp) return;
    setIsGeneratingInsight(true);
    setAiInsight(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this applicant profile: ${selectedApp.name}. Program: ${getProgramLabel(selectedApp.program1)}. Work: ${JSON.stringify(selectedApp.workExperience)}. Recommend Approve/Reject in 2 sentences.`,
      });
      setAiInsight(response.text || "Insight generation failed.");
    } catch (e) {
      setAiInsight("Unable to generate AI insight at this time.");
    } finally {
      setIsGeneratingInsight(false);
    }
  };

  if (viewingLetter && selectedApp) {
    return (
      <div className="animate-in fade-in duration-500">
        <div className="mb-6 flex justify-between items-center print:hidden">
          <button onClick={() => setViewingLetter(false)} className="flex items-center gap-2 text-slate-600 font-bold">
            <i className="fas fa-arrow-left"></i> Back
          </button>
          <button onClick={() => window.print()} className="bg-orange-600 text-white px-6 py-2 rounded-lg font-bold">
            Print Offer Letter
          </button>
        </div>
        <OfferLetter application={selectedApp} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: stats.total, icon: 'fa-users', color: 'bg-indigo-500' },
          { label: 'Pending', value: stats.pending, icon: 'fa-clock', color: 'bg-amber-500' },
          { label: 'Approved', value: stats.approved, icon: 'fa-check-circle', color: 'bg-emerald-500' },
          { label: 'Rejected', value: stats.rejected, icon: 'fa-times-circle', color: 'bg-rose-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className={`${stat.color} w-10 h-10 rounded-xl text-white flex items-center justify-center`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-xl font-black text-slate-900 leading-none">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center bg-slate-50 gap-4">
          <h2 className="text-lg font-black text-slate-900">Application Register</h2>
          <div className="relative w-full md:w-80">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input type="text" placeholder="Search..." className="w-full pl-12 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest font-black">
                <th className="px-6 py-5 border-b">Applicant</th>
                <th className="px-6 py-5 border-b">Program</th>
                <th className="px-6 py-5 border-b">Status</th>
                <th className="px-6 py-5 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900">{app.name}</span>
                      <span className="font-mono text-[10px] text-slate-400">{app.icNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-700">{getProgramLabel(app.program1)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                      app.status === 'REJECTED' ? 'bg-rose-100 text-rose-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { setSelectedAppId(app.id); setAiInsight(null); }} className="px-4 py-2 border rounded-xl font-bold text-[10px] uppercase">
                      Process
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white w-full max-w-3xl max-h-[92vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white/20 animate-in slide-in-from-bottom-12">
            <div className="p-8 border-b flex justify-between items-center bg-slate-900 text-white">
              <h3 className="font-black text-xl tracking-tight uppercase">Application Details</h3>
              <button onClick={() => setSelectedAppId(null)} className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-10 space-y-8 custom-scrollbar">
              <div className="p-6 bg-slate-900 text-white rounded-[2rem] space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <i className="fas fa-magic text-orange-500"></i> AI Insight
                  </h4>
                  {!aiInsight && !isGeneratingInsight && (
                    <button onClick={generateAIInsight} className="text-[10px] font-black uppercase bg-white/10 px-4 py-2 rounded-xl">Analyze</button>
                  )}
                </div>
                {isGeneratingInsight ? <p className="text-xs animate-pulse">Thinking...</p> : <p className="text-sm italic">{aiInsight || "No analysis yet."}</p>}
              </div>
              <div className="flex justify-center gap-4">
                <button onClick={() => onUpdateStatus(selectedApp.id, 'APPROVED')} className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold uppercase text-xs">Approve</button>
                <button onClick={() => onUpdateStatus(selectedApp.id, 'REJECTED')} className="px-8 py-3 bg-rose-600 text-white rounded-xl font-bold uppercase text-xs">Reject</button>
                {selectedApp.status === 'APPROVED' && (
                  <button onClick={() => setViewingLetter(true)} className="px-8 py-3 bg-orange-600 text-white rounded-xl font-bold uppercase text-xs">Issue Letter</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
