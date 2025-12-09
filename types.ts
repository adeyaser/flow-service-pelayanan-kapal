export enum Actor {
  AGENT = 'Shipping Agent',
  SYSTEM = 'InaPortNet System',
  PBM = 'Stevedoring Co (PBM)',
  RENDAL = 'Port Ops (Rendal)',
  PPSAP = 'One-Stop Service (PPSAP)',
  KSOP = 'Port Authority (KSOP)',
  JAI = 'JAI',
  BILLING = 'Billing Unit'
}

export enum StepStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface DocumentData {
  id: string;
  name: string;
  type: 'PDF' | 'FORM' | 'INVOICE' | 'CERT';
  date?: string;
}

export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  actor: Actor;
  documents: DocumentData[];
  requiresAction: boolean;
  actionLabel?: string;
  autoDelay?: number; // Simulate system processing time in ms
}

export interface VesselInfo {
  name: string;
  imo: string;
  flag: string;
  arrivalDate: string;
  status: string;
}

export interface ArrivalNoticeData {
  id: string;
  vesselName: string;
  callSign: string;
  voyageIn: string;
  voyageOut: string;
  eta: string;
  agent: string;
  status: 'Submitted' | 'Verified' | 'Rejected' | 'Draft';
}

export interface PKKData {
  pkkNumber: string;
  vesselName: string;
  agent: string;
  issueDate: string;
  validUntil: string;
  status: 'Active' | 'Expired' | 'Suspended';
  portLocation: string;
}

export interface RKBMData {
  id: string;
  pkkRef: string;
  vesselName: string;
  agent: string;
  activity: 'Loading' | 'Discharging' | 'Loading/Discharging';
  cargoType: string;
  tonnage: string;
  operationalDates: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Revision Needed';
}

export interface RPKOPData {
  id: string;
  rkbmRef: string;
  vesselName: string;
  berthLocation: string;
  schedule: string;
  resources: string;
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Active';
}

export interface PPKBData {
  id: string;
  rpkopRef: string;
  vesselName: string;
  serviceType: string[]; // e.g. ['Pilotage', 'Towage', 'Berthing']
  requestedDate: string;
  status: 'Draft' | 'Submitted' | 'Confirmed' | 'Rejected';
  priority: 'Normal' | 'High';
}

export interface SPKData {
  id: string;
  ppkbRef: string;
  vesselName: string;
  agent: string;
  amount: string;
  paymentStatus: 'Unpaid' | 'Processing' | 'Paid';
  spkStatus: 'Pending' | 'Ready' | 'Issued';
  issueDate?: string;
}

export interface TransmissionLogData {
  id: string;
  timestamp: string;
  documentType: 'SPK' | 'PKK' | 'RPKOP' | 'Realization';
  referenceId: string;
  vesselName: string;
  destination: string;
  status: 'Synced' | 'Pending' | 'Failed';
  retryCount: number;
}

export interface PilotOrderData {
  id: string;
  rpkopRef: string;
  pkkRef: string;
  vesselName: string;
  agent: string;
  location: string;
  pilotName: string;
  boardingTime: string;
  status: 'Pending Verification' | 'Approved' | 'Pilot Assigned' | 'Completed';
}

export interface ClearanceData {
  id: string;
  vesselName: string;
  agent: string;
  type: 'SPOG' | 'SPB' | 'PPK';
  ppkRef?: string;
  portDetails: string; // Origin for SPOG, Next Port for SPB
  issueDate: string;
  status: 'Draft' | 'Pending Approval' | 'Issued' | 'Rejected';
}

export interface RealizationData {
  id: string;
  spkRef: string;
  vesselName: string;
  serviceType: string;
  startTime: string;
  endTime: string;
  recordedBy: 'JAI' | 'Rendal';
  status: 'Pending Recording' | 'Recorded' | 'Verified';
}

export interface BillingData {
  id: string;
  spkRef: string;
  vesselName: string;
  agent: string;
  type: 'Pre-Invoice' | 'Final Invoice'; // DTJK/DPJKV or Nota
  amount: string;
  issueDate: string;
  status: 'Draft' | 'Issued' | 'Paid' | 'Overdue';
  dueDate: string;
}