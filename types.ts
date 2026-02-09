
export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface WorkExperience {
  position: string;
  startYear: string;
  endYear: string;
  organization: string;
}

export interface Referee {
  name: string;
  address: string;
  postcode: string;
  city: string;
  state: string;
  mobile: string;
  email: string;
}

export interface ApplicationFormData {
  id: string;
  status: ApplicationStatus;
  submissionDate: string;
  program1: string;
  program2: string;
  studyMode: 'FULL TIME' | 'PART TIME';
  name: string;
  icNumber: string;
  dob: string;
  address1: string;
  address2: string;
  town: string;
  postcode: string;
  state: string;
  race: string;
  maritalStatus: string;
  gender: 'M' | 'F';
  familyIncome: string;
  mobile: string;
  email: string;
  workExperience: WorkExperience[];
  sponsorType: string;
  sponsorName: string;
  paymentMethod: string;
  referees: Referee[];
  declarationVerified: boolean;
}

export enum AppStep {
  VALIDATION = 'VALIDATION',
  APPLICATION = 'APPLICATION',
  SUCCESS = 'SUCCESS',
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD'
}
