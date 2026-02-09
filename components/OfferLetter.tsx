
import React from 'react';
import { ApplicationFormData } from '../types';
import { PROGRAMS } from '../constants';

interface OfferLetterProps {
  application: ApplicationFormData;
}

const OfferLetter: React.FC<OfferLetterProps> = ({ application }) => {
  const getProgramLabel = (val: string) => PROGRAMS.find(p => p.value === val)?.label || val;
  const currentYear = new Date().getFullYear();
  const today = new Date().toLocaleDateString('en-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-white p-12 shadow-2xl max-w-4xl mx-auto font-serif min-h-[1100px] border-t-8 border-orange-500">
      {/* Letterhead */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-10">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 p-4 rounded-xl text-white">
            <i className="fas fa-university text-4xl"></i>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tighter">UNISEL UNIVERSITY</h1>
            <p className="text-sm font-sans font-semibold text-slate-500 uppercase tracking-widest">Office of Graduate Studies</p>
          </div>
        </div>
        <div className="text-right text-xs font-sans text-slate-400">
          <p>Main Campus: Bestari Jaya</p>
          <p>45600 Batang Berjuntai</p>
          <p>Selangor Darul Ehsan</p>
          <p>www.unisel.edu.my</p>
        </div>
      </div>

      {/* Date and Ref */}
      <div className="space-y-1 mb-8 font-sans text-sm">
        <p>Ref: <span className="font-bold">UNISEL/GS/{application.id}/{currentYear}</span></p>
        <p>Date: <span className="font-bold">{today}</span></p>
      </div>

      {/* Recipient */}
      <div className="mb-10 font-sans space-y-1 uppercase font-bold">
        <p>{application.name}</p>
        <p>{application.address1}</p>
        <p>{application.address2}</p>
        <p>{application.postcode} {application.town}</p>
        <p>{application.state}</p>
      </div>

      {/* Subject */}
      <div className="mb-8">
        <h2 className="text-xl font-bold uppercase border-b border-slate-200 pb-2">
          OFFER OF ADMISSION TO POSTGRADUATE PROGRAMME (BY RESEARCH)
        </h2>
      </div>

      {/* Body */}
      <div className="space-y-6 text-sm leading-relaxed text-slate-800">
        <p>Dear <span className="font-bold">{application.name}</span>,</p>
        
        <p>
          We are pleased to inform you that the Postgraduate Committee of UNISEL University has approved your application for admission to the following postgraduate programme:
        </p>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-3 font-sans">
          <div className="grid grid-cols-3">
            <span className="font-bold text-slate-500">Programme:</span>
            <span className="col-span-2 font-bold text-slate-900">{getProgramLabel(application.program1)}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="font-bold text-slate-500">Field of Study:</span>
            <span className="col-span-2">Research and Development</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="font-bold text-slate-500">Mode of Study:</span>
            <span className="col-span-2">{application.studyMode}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="font-bold text-slate-500">Intake:</span>
            <span className="col-span-2">NOVEMBER {currentYear}</span>
          </div>
        </div>

        <p>
          Your admission is subject to the terms and conditions set out in the Graduate Student Handbook. You are required to confirm your acceptance of this offer by completing the Acceptance Form and paying the required registration fees by 30th October {currentYear}.
        </p>

        <p>
          We look forward to welcoming you to UNISEL and wish you success in your research endeavors.
        </p>

        <p className="font-bold">Yours sincerely,</p>

        <div className="pt-12">
          <p className="font-bold uppercase border-b-2 border-slate-900 w-fit pr-10">PROF. DR. MOHAMAD SALLEH</p>
          <p className="text-slate-500 font-sans text-xs">Registrar</p>
          <p className="text-slate-500 font-sans text-xs">UNISEL University</p>
        </div>
      </div>

      {/* Letter Footer */}
      <div className="mt-20 border-t pt-4 text-[10px] text-slate-400 font-sans text-center">
        <p>This is a computer-generated letter. No signature is required.</p>
        <p>UNISEL University is a member of the Malaysian Association of Private Colleges and Universities.</p>
      </div>
    </div>
  );
};

export default OfferLetter;
