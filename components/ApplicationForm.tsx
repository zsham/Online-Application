
import React, { useState } from 'react';
import { ApplicationFormData, WorkExperience, Referee } from '../types';
import { 
  PROGRAMS, STATES, RACES, INCOME_BRACKETS, 
  SPONSOR_TYPES, PAYMENT_METHODS, YEARS 
} from '../constants';

interface ApplicationFormProps {
  initialIc: string;
  onSubmit: (data: ApplicationFormData) => void;
  onCancel: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ initialIc, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    program1: '',
    program2: '',
    studyMode: 'FULL TIME',
    name: '',
    icNumber: initialIc,
    dob: '',
    address1: '',
    address2: '',
    town: '',
    postcode: '',
    state: '',
    race: '',
    maritalStatus: '',
    gender: 'M',
    familyIncome: '',
    mobile: '',
    email: '',
    workExperience: [
      { position: '', startYear: '', endYear: '', organization: '' },
      { position: '', startYear: '', endYear: '', organization: '' },
      { position: '', startYear: '', endYear: '', organization: '' }
    ],
    sponsorType: '',
    sponsorName: '',
    paymentMethod: '',
    referees: [
      { name: '', address: '', postcode: '', city: '', state: '', mobile: '', email: '' },
      { name: '', address: '', postcode: '', city: '', state: '', mobile: '', email: '' }
    ],
    declarationVerified: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleWorkChange = (index: number, field: keyof WorkExperience, value: string) => {
    const updatedWork = [...formData.workExperience];
    updatedWork[index][field] = value.toUpperCase();
    setFormData(prev => ({ ...prev, workExperience: updatedWork }));
  };

  const handleRefereeChange = (index: number, field: keyof Referee, value: string) => {
    const updatedReferees = [...formData.referees];
    updatedReferees[index][field] = value.toUpperCase();
    setFormData(prev => ({ ...prev, referees: updatedReferees }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.declarationVerified) {
      alert("Please verify the declaration checkbox before submitting.");
      return;
    }
    onSubmit(formData);
  };

  const SectionHeader = ({ title, icon }: { title: string, icon: string }) => (
    <div className="bg-slate-900 p-4 flex items-center gap-3 mb-6 rounded-t-xl">
      <i className={`fas ${icon} text-orange-500`}></i>
      <h3 className="text-white font-bold uppercase tracking-wider">{title}</h3>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in duration-700">
      {/* Disclaimer */}
      <div className="bg-amber-100 p-4 border-b border-amber-200 flex items-center gap-4 text-amber-800 text-sm italic">
        <i className="fas fa-exclamation-triangle text-amber-600 text-xl"></i>
        <p>The University reserves the right to withdraw the OFFER if any information given is found to be false or misleading or if entry requirements are not met.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-0">
        
        {/* Step 1: Program Selection */}
        <section className="p-0 border-b border-slate-100">
          <SectionHeader title="CHOOSE PROGRAM" icon="fa-graduation-cap" />
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700"><span className="text-red-500">*</span> 1st Choice</label>
              <select 
                required
                name="program1"
                value={formData.program1}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              >
                <option value="">Please select option program 1</option>
                {PROGRAMS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700"><span className="text-red-500">*</span> 2nd Choice</label>
              <select 
                required
                name="program2"
                value={formData.program2}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              >
                <option value="">Please select option program 2</option>
                {PROGRAMS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div className="md:col-span-2 flex items-center gap-8 mt-2 p-4 bg-slate-50 rounded-xl">
              <span className="text-sm font-semibold text-slate-700">Mode of Study:</span>
              <div className="flex gap-6">
                {['FULL TIME', 'PART TIME'].map(mode => (
                  <label key={mode} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="studyMode" 
                      value={mode} 
                      checked={formData.studyMode === mode}
                      onChange={handleChange}
                      className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{mode}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Personal Particulars */}
        <section className="p-0 border-b border-slate-100">
          <SectionHeader title="PERSONAL PARTICULARS" icon="fa-user" />
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-700"><span className="text-red-500">*</span> Full Name</label>
              <input 
                required
                type="text" 
                name="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">IC Number</label>
              <input 
                readOnly
                type="text" 
                value={formData.icNumber}
                className="w-full p-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700"><span className="text-red-500">*</span> Date of Birth</label>
              <input 
                required
                type="date" 
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-700"><span className="text-red-500">*</span> Postal Address</label>
              <input 
                required
                type="text" 
                name="address1"
                placeholder="Address Line 1"
                value={formData.address1}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none uppercase mb-2"
              />
              <input 
                type="text" 
                name="address2"
                placeholder="Address Line 2"
                value={formData.address2}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700"><span className="text-red-500">*</span> Town / City</label>
              <input 
                required
                type="text" 
                name="town"
                value={formData.town}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700"><span className="text-red-500">*</span> Postcode</label>
              <input 
                required
                type="text" 
                name="postcode"
                maxLength={5}
                value={formData.postcode}
                onChange={(e) => setFormData(prev => ({ ...prev, postcode: e.target.value.replace(/\D/g, '') }))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700"><span className="text-red-500">*</span> State</label>
              <select 
                required
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="">Please Select</option>
                {STATES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700"><span className="text-red-500">*</span> Race</label>
              <select 
                required
                name="race"
                value={formData.race}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="">Please Select</option>
                {RACES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700"><span className="text-red-500">*</span> Marital Status</label>
              <select 
                required
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="">Please Select</option>
                <option value="1">Single</option>
                <option value="2">Married</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700"><span className="text-red-500">*</span> Gender</label>
              <div className="flex gap-6 p-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="M" 
                    checked={formData.gender === 'M'}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-600"
                  />
                  <span className="text-sm">Male</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="F" 
                    checked={formData.gender === 'F'}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-600"
                  />
                  <span className="text-sm">Female</span>
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Family Income</label>
              <select 
                name="familyIncome"
                value={formData.familyIncome}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="">Please Select</option>
                {INCOME_BRACKETS.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Mobile Number</label>
              <input 
                type="tel" 
                name="mobile"
                placeholder="012XXXXXXX"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-700">E-mail Address</label>
              <input 
                type="email" 
                name="email"
                placeholder="yourname@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Step 3: Working Experience */}
        <section className="p-0 border-b border-slate-100">
          <SectionHeader title="WORKING EXPERIENCE" icon="fa-briefcase" />
          <div className="p-8 overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-xs uppercase font-bold text-center">
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Position</th>
                  <th className="p-3 border w-24">From</th>
                  <th className="p-3 border w-24">To</th>
                  <th className="p-3 border">Employer / Organization</th>
                </tr>
              </thead>
              <tbody>
                {formData.workExperience.map((work, idx) => (
                  <tr key={idx} className="bg-white">
                    <td className="p-3 border text-center font-bold text-slate-400">{idx + 1}</td>
                    <td className="p-3 border">
                      <input 
                        type="text"
                        value={work.position}
                        onChange={(e) => handleWorkChange(idx, 'position', e.target.value)}
                        className="w-full p-2 bg-slate-50 rounded border-none focus:ring-1 focus:ring-orange-500 uppercase text-sm"
                      />
                    </td>
                    <td className="p-3 border">
                      <select 
                        value={work.startYear}
                        onChange={(e) => handleWorkChange(idx, 'startYear', e.target.value)}
                        className="w-full p-2 bg-slate-50 rounded border-none focus:ring-1 focus:ring-orange-500 text-sm"
                      >
                        <option value="">Year</option>
                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </td>
                    <td className="p-3 border">
                      <select 
                        value={work.endYear}
                        onChange={(e) => handleWorkChange(idx, 'endYear', e.target.value)}
                        className="w-full p-2 bg-slate-50 rounded border-none focus:ring-1 focus:ring-orange-500 text-sm"
                      >
                        <option value="">Year</option>
                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </td>
                    <td className="p-3 border">
                      <input 
                        type="text"
                        value={work.organization}
                        onChange={(e) => handleWorkChange(idx, 'organization', e.target.value)}
                        className="w-full p-2 bg-slate-50 rounded border-none focus:ring-1 focus:ring-orange-500 uppercase text-sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Step 4: Financial Support */}
        <section className="p-0 border-b border-slate-100">
          <SectionHeader title="FINANCIAL SUPPORT" icon="fa-hand-holding-usd" />
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700"><span className="text-red-500">*</span> Type of Sponsoring</label>
              <select 
                required
                name="sponsorType"
                value={formData.sponsorType}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="">Please Select</option>
                {SPONSOR_TYPES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Sponsor Name</label>
              <input 
                type="text" 
                name="sponsorName"
                value={formData.sponsorName}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none uppercase"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700"><span className="text-red-500">*</span> Preferred Method of Payment</label>
              <select 
                required
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="">Please Select</option>
                {PAYMENT_METHODS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Step 5: Document Attachments */}
        <section className="p-0 border-b border-slate-100">
          <SectionHeader title="DOCUMENT ATTACHMENTS" icon="fa-paperclip" />
          <div className="p-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "1 copy of IC (particulars pages)", name: "file1" },
                { label: "1 copy of Degree level academic certificate", name: "file2" },
                { label: "1 copy of academic transcript", name: "file3" },
                { label: "Research Proposal (Master/PhD only)", name: "file4" }
              ].map((doc, idx) => (
                <div key={idx} className="flex flex-col gap-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-sm font-semibold text-slate-700">{doc.label}</span>
                  <input type="file" className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                </div>
              ))}
            </div>
            <div className="bg-slate-900/5 p-4 rounded-lg text-[10px] text-slate-500 leading-relaxed">
              <p className="font-bold text-slate-700 mb-1 uppercase">Guidelines:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Please attach the relevant document(s) with regards to your academic qualifications.</li>
                <li>Each file must be less than <strong>2 MB</strong>.</li>
                <li>Allowed file types: <strong>gif, jpg, png, pdf, rar, zip</strong>.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step 6: Referees */}
        <section className="p-0 border-b border-slate-100">
          <SectionHeader title="REFEREES" icon="fa-users" />
          <div className="p-8 space-y-8">
            <p className="text-xs text-slate-500 leading-relaxed italic border-l-4 border-orange-500 pl-4">
              Give names and addresses of two senior persons acquainted with your academic work that you have asked to write on your behalf indicating your academic fitness and general suitability to undertake the course for which you are applying.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {formData.referees.map((ref, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="font-bold text-slate-900 border-b-2 border-slate-100 pb-2">Referee {idx + 1}</h4>
                  <div className="space-y-3">
                    <input 
                      required
                      placeholder="Full Name *"
                      className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-orange-500"
                      value={ref.name}
                      onChange={(e) => handleRefereeChange(idx, 'name', e.target.value)}
                    />
                    <textarea 
                      required
                      placeholder="Full Address *"
                      rows={2}
                      className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-orange-500"
                      value={ref.address}
                      onChange={(e) => handleRefereeChange(idx, 'address', e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        required
                        placeholder="Postcode *"
                        className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-orange-500"
                        value={ref.postcode}
                        onChange={(e) => handleRefereeChange(idx, 'postcode', e.target.value)}
                      />
                      <input 
                        required
                        placeholder="City *"
                        className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-orange-500"
                        value={ref.city}
                        onChange={(e) => handleRefereeChange(idx, 'city', e.target.value)}
                      />
                    </div>
                    <select 
                      required
                      className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-orange-500"
                      value={ref.state}
                      onChange={(e) => handleRefereeChange(idx, 'state', e.target.value)}
                    >
                      <option value="">Select State *</option>
                      {STATES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                    <input 
                      required
                      placeholder="Mobile Number *"
                      className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-orange-500"
                      value={ref.mobile}
                      onChange={(e) => handleRefereeChange(idx, 'mobile', e.target.value)}
                    />
                    <input 
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-orange-500"
                      value={ref.email}
                      onChange={(e) => handleRefereeChange(idx, 'email', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step 7: Declaration */}
        <section className="p-0">
          <SectionHeader title="DECLARATION" icon="fa-file-signature" />
          <div className="p-8 space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-sm text-slate-700 leading-relaxed shadow-inner">
              <p>I hereby declare that all information stated in this form is correct and true and I understand that UNISEL has the right to reject this application, revoke the course offered or terminate my studies in UNISEL at any time if any information or certificates given are found to be false.</p>
              
              <div className="mt-6 flex items-start gap-3">
                <input 
                  type="checkbox" 
                  name="declarationVerified"
                  checked={formData.declarationVerified}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-orange-600 rounded focus:ring-orange-500 cursor-pointer"
                />
                <label className="font-bold text-slate-900 cursor-pointer">
                  I Verify My Declaration and Confirm the above terms.
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-slate-100 rounded-xl">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Applicant Name</span>
                <span className="font-mono text-slate-800 font-bold">{formData.name || 'PLEASE FILL NAME'}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Date / Time</span>
                <span className="font-mono text-slate-800">{new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className="p-8 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row gap-4 justify-center">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-8 py-3 bg-white border border-slate-300 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-all active:scale-[0.98]"
          >
            CANCEL / EXIT
          </button>
          <button 
            type="reset" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-all active:scale-[0.98]"
          >
            RESET FORM
          </button>
          <button 
            type="submit"
            className="px-12 py-3 bg-orange-600 text-white font-extrabold rounded-xl shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all active:scale-[0.98]"
          >
            SUBMIT APPLICATION
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
