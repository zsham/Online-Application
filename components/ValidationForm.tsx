
import React, { useState } from 'react';

interface ValidationFormProps {
  onValidate: (ic: string) => void;
}

const ValidationForm: React.FC<ValidationFormProps> = ({ onValidate }) => {
  const [ic, setIc] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ic.length !== 12 || isNaN(Number(ic))) {
      setError('Please enter a valid 12-digit IC number without dashes.');
      return;
    }
    setError('');
    onValidate(ic);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 p-6 text-center">
        <h2 className="text-white text-xl font-bold">APPLY FOR MASTER BY RESEARCH</h2>
      </div>
      
      <div className="p-8 md:p-12">
        <form onSubmit={handleSubmit} className="flex flex-col items-center max-w-sm mx-auto">
          <div className="w-full mb-6">
            <label className="block text-slate-700 font-semibold mb-2 text-center uppercase tracking-wide text-sm">
              Identification Number (IC)
            </label>
            <input 
              required
              type="text" 
              maxLength={12}
              value={ic}
              onChange={(e) => setIc(e.target.value.replace(/\D/g, ''))}
              placeholder="96XXXXXXXXXX"
              className="w-full px-4 py-4 text-center text-2xl font-mono border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
            />
            <p className="mt-3 text-slate-500 text-xs text-center leading-relaxed">
              Please key in your IC No. <strong>without</strong> dashes "-". <br/>
              Format: <strong>96XXXXXXXXXX</strong>
            </p>
          </div>

          {error && (
            <div className="w-full mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all active:scale-[0.98]"
          >
            VALIDATE & PROCEED
          </button>
        </form>
      </div>

      <div className="bg-slate-50 p-6 border-t border-slate-100">
        <div className="flex gap-4 items-center text-slate-500 text-xs">
          <i className="fas fa-info-circle text-orange-500 text-lg"></i>
          <p>This validation step ensures you have not already submitted an application for the current intake. Your information is protected under data privacy laws.</p>
        </div>
      </div>
    </div>
  );
};

export default ValidationForm;
