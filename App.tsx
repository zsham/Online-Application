
import React, { useState, useEffect } from 'react';
import { AppStep, ApplicationFormData, ApplicationStatus } from './types';
import ValidationForm from './components/ValidationForm';
import ApplicationForm from './components/ApplicationForm';
import SuccessScreen from './components/SuccessScreen';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import SmartAssistant from './components/SmartAssistant';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.VALIDATION);
  const [icNumber, setIcNumber] = useState<string>('');
  const [applications, setApplications] = useState<ApplicationFormData[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('isAdminAuth') === 'true';
  });

  // Initialize with mock data
  useEffect(() => {
    const mockApps: ApplicationFormData[] = [
      {
        id: 'APP-1001',
        status: 'PENDING',
        submissionDate: new Date().toISOString(),
        name: 'AHMAD BIN ZULKIFLI',
        icNumber: '960101105544',
        program1: 'IT603',
        program2: 'EN601',
        studyMode: 'FULL TIME',
        email: 'ahmad@example.com',
        mobile: '0123456789',
        dob: '1996-01-01',
        address1: 'No 45, Jalan Indah',
        address2: 'Taman Melati',
        town: 'Kuala Lumpur',
        postcode: '50000',
        state: 'W00',
        race: '1',
        maritalStatus: '1',
        gender: 'M',
        familyIncome: '3',
        sponsorType: '5',
        sponsorName: 'SELF',
        paymentMethod: '1',
        workExperience: [
          { position: 'Software Engineer', startYear: '2018', endYear: '2023', organization: 'TechCorp' }
        ],
        referees: [],
        declarationVerified: true
      }
    ];
    setApplications(mockApps);
  }, []);

  const handleValidate = (ic: string) => {
    setIcNumber(ic);
    setStep(AppStep.APPLICATION);
  };

  const handleFinalSubmit = (data: Partial<ApplicationFormData>) => {
    const newApp: ApplicationFormData = {
      ...(data as ApplicationFormData),
      id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'PENDING',
      submissionDate: new Date().toISOString(),
    };
    setApplications(prev => [newApp, ...prev]);
    setStep(AppStep.SUCCESS);
  };

  const updateAppStatus = (id: string, newStatus: ApplicationStatus) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('isAdminAuth', 'true');
    setStep(AppStep.ADMIN_DASHBOARD);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('isAdminAuth');
    setStep(AppStep.VALIDATION);
  };

  const toggleAdminView = () => {
    if (step === AppStep.ADMIN_DASHBOARD || step === AppStep.ADMIN_LOGIN) {
      setStep(AppStep.VALIDATION);
    } else {
      if (isAdminAuthenticated) {
        setStep(AppStep.ADMIN_DASHBOARD);
      } else {
        setStep(AppStep.ADMIN_LOGIN);
      }
    }
  };

  const resetApp = () => {
    setStep(AppStep.VALIDATION);
    setIcNumber('');
  };

  const isAdminView = step === AppStep.ADMIN_DASHBOARD || step === AppStep.ADMIN_LOGIN;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isAdminView ? 'bg-slate-100' : 'bg-slate-50'}`}>
      <header className="bg-slate-900 text-white shadow-lg p-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={resetApp}>
            <div className="bg-orange-500 p-2 rounded-lg">
              <i className="fas fa-university text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">ONLINE ADMISSION PORTAL</h1>
              <p className="text-slate-400 text-xs uppercase tracking-widest">Master by Research Application</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleAdminView}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                isAdminView 
                ? 'bg-orange-600 text-white shadow-lg' 
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <i className={`fas ${isAdminView ? 'fa-user-graduate' : 'fa-lock'}`}></i>
              {isAdminView ? 'Back to Student Portal' : 'Admin Portal'}
            </button>
            {isAdminAuthenticated && isAdminView && (
              <button 
                onClick={handleAdminLogout}
                className="px-4 py-2 bg-slate-800 text-red-400 hover:text-red-300 rounded-lg text-sm font-bold transition-all"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center py-10 px-4">
        <div className={`w-full ${step === AppStep.ADMIN_DASHBOARD ? 'max-w-7xl' : 'max-w-4xl'}`}>
          {step === AppStep.VALIDATION && <ValidationForm onValidate={handleValidate} />}
          {step === AppStep.APPLICATION && <ApplicationForm initialIc={icNumber} onSubmit={handleFinalSubmit} onCancel={resetApp} />}
          {step === AppStep.SUCCESS && <SuccessScreen onReset={resetApp} />}
          {step === AppStep.ADMIN_LOGIN && <AdminLogin onLoginSuccess={handleAdminLogin} />}
          {step === AppStep.ADMIN_DASHBOARD && <AdminDashboard applications={applications} onUpdateStatus={updateAppStatus} />}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-10 print:hidden">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} University Admission System. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating AI Assistant for Students */}
      {!isAdminView && step !== AppStep.SUCCESS && <SmartAssistant />}
    </div>
  );
};

export default App;
