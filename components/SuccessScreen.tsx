
import React from 'react';

interface SuccessScreenProps {
  onReset: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ onReset }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden text-center p-12 animate-in zoom-in duration-500">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
        <i className="fas fa-check-circle text-5xl"></i>
      </div>
      
      <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Submitted!</h2>
      <p className="text-slate-600 max-w-md mx-auto mb-10 leading-relaxed">
        Your application for the Master by Research program has been successfully received. 
        A confirmation email has been sent to your registered address. 
        Our admissions team will review your documents and contact you within 7-14 working days.
      </p>

      <div className="flex flex-col gap-4 max-w-xs mx-auto">
        <button 
          className="bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all"
          onClick={() => window.print()}
        >
          <i className="fas fa-print mr-2"></i> Print Application Slip
        </button>
        <button 
          className="text-orange-600 font-bold py-3 hover:underline transition-all"
          onClick={onReset}
        >
          Return to Admission Portal
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
