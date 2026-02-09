
export const PROGRAMS = [
  { value: "EN601", label: "MASTER IN ENGINEERING" },
  { value: "ED609", label: "MASTER OF EDUCATION" },
  { value: "GS601", label: "MASTER OF LIFE SCIENCE" },
  { value: "MG604", label: "MASTER OF MANAGEMENT" },
  { value: "BT601", label: "MASTER OF SCIENCE (BIOTECHNOLOGY)" },
  { value: "IT603", label: "MASTER OF SCIENCE (COMPUTING)" },
  { value: "GS602", label: "POSTGRADUATE CERTIFICATE IN ISLAMIC CHAPLAINCY" }
];

export const STATES = [
  { value: "A00", label: "PERAK" },
  { value: "B00", label: "SELANGOR" },
  { value: "C00", label: "PAHANG" },
  { value: "D00", label: "KELANTAN" },
  { value: "J00", label: "JOHOR" },
  { value: "K00", label: "KEDAH" },
  { value: "M00", label: "MELAKA" },
  { value: "N00", label: "NEGERI SEMBILAN" },
  { value: "P00", label: "PULAU PINANG" },
  { value: "R00", label: "PERLIS" },
  { value: "S00", label: "SINGAPURA" },
  { value: "T00", label: "TERENGGANU" },
  { value: "U00", label: "W.P. PUTRAJAYA" },
  { value: "W00", label: "W.P. KUALA LUMPUR" },
  { value: "X00", label: "SABAH" },
  { value: "Y00", label: "SARAWAK" },
  { value: "Z00", label: "W.P. LABUAN" },
  { value: "999", label: "Others" }
];

export const RACES = [
  { value: "1", label: "MELAYU" },
  { value: "2", label: "CINA" },
  { value: "3", label: "INDIA" },
  { value: "10", label: "BUMIPUTERA" },
  { value: "11", label: "KADAZAN / DUSUN" },
  { value: "9", label: "IBAN" },
  { value: "14", label: "BAJAU / ILANAU" },
  { value: "7", label: "BIDAYUH" },
  { value: "12", label: "BRUNEI" },
  { value: "13", label: "MELANAU" },
  { value: "15", label: "MURUT" },
  { value: "16", label: "DAYAK" },
  { value: "17", label: "IRANUN" },
  { value: "19", label: "LUNBAWANG" },
  { value: "5", label: "ORG ASLI SEMENANJUNG" },
  { value: "6", label: "PERIBUMI" },
  { value: "8", label: "SIAM" },
  { value: "4", label: "SIKH" },
  { value: "100", label: "LAIN-LAIN - MSIA" },
  { value: "99", label: "LAIN-LAIN - EXP" }
];

export const INCOME_BRACKETS = [
  { value: "1", label: "Below RM1500" },
  { value: "2", label: "RM1501- RM2500" },
  { value: "3", label: "RM2501 - RM3500" },
  { value: "4", label: "RM3501 - RM4500" },
  { value: "5", label: "Over RM5000" }
];

export const SPONSOR_TYPES = [
  { value: "1", label: "Bank Loan" },
  { value: "2", label: "Company Sponsor" },
  { value: "3", label: "EPF Withdrawal" },
  { value: "4", label: "Other Sponsor" },
  { value: "5", label: "Self Sponsor" }
];

export const PAYMENT_METHODS = [
  { value: "1", label: "Full Payment" },
  { value: "2", label: "Yearly Payment" },
  { value: "3", label: "Payment per Module" },
  { value: "4", label: "Payment per Semester" }
];

export const YEARS = Array.from({ length: 74 }, (_, i) => (1950 + i).toString());
