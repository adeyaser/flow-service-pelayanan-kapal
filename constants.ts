import { Actor, WorkflowStep, ArrivalNoticeData, PKKData, RKBMData, RPKOPData, PPKBData, SPKData, TransmissionLogData, PilotOrderData, ClearanceData, RealizationData, BillingData } from './types';

export const VESSEL_DATA = {
  name: "MV. OCEAN GIANT",
  imo: "9123456",
  flag: "Indonesia",
  arrivalDate: "2024-05-20 08:00 WIB",
  status: "Inbound"
};

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: "Arrival Notice Submission",
    description: "The Shipping Agent initiates the process by submitting the vessel's arrival notice (Warta) to the InaPortNet system.",
    actor: Actor.AGENT,
    documents: [{ id: "AN-2024-001", name: "Arrival Notice Form", type: "FORM" }],
    requiresAction: true,
    actionLabel: "Submit Arrival Notice"
  },
  {
    id: 2,
    title: "PKK Number Issuance",
    description: "InaPortNet processes the notice and provides a Port Clearance Card (PKK) number.",
    actor: Actor.SYSTEM,
    documents: [{ id: "PKK-REF-882", name: "PKK Reference", type: "CERT" }],
    requiresAction: false,
    autoDelay: 2000
  },
  {
    id: 3,
    title: "RKBM Preparation",
    description: "Stevedoring Company (PBM) receives the PKK and prepares the Cargo Handling Activity Plan (RKBM).",
    actor: Actor.PBM,
    documents: [{ id: "RKBM-091", name: "Cargo Handling Plan", type: "FORM" }],
    requiresAction: true,
    actionLabel: "Submit RKBM Plan"
  },
  {
    id: 4,
    title: "RPKOP Creation",
    description: "Port Operations Planner (Rendal) reviews requirements and creates the Port Operational Activity Plan (RPKOP).",
    actor: Actor.RENDAL,
    documents: [{ id: "RPKOP-V2", name: "Operational Activity Plan", type: "PDF" }],
    requiresAction: true,
    actionLabel: "Approve & Create RPKOP"
  },
  {
    id: 5,
    title: "PPKB Submission",
    description: "With RPKOP ready, the Agent submits the Ship Service Request (PPKB).",
    actor: Actor.AGENT,
    documents: [{ id: "PPKB-REQ-11", name: "Service Request (PPKB)", type: "FORM" }],
    requiresAction: true,
    actionLabel: "Submit PPKB"
  },
  {
    id: 6,
    title: "Payment & Confirmation (SPK)",
    description: "Agent completes payment. PPSAP confirms PPKB and issues the Work Order (SPK).",
    actor: Actor.PPSAP,
    documents: [
      { id: "PAY-TX-99", name: "Payment Receipt", type: "INVOICE" },
      { id: "SPK-WO-2024", name: "Work Order (SPK)", type: "PDF" }
    ],
    requiresAction: true,
    actionLabel: "Confirm Payment & Issue SPK"
  },
  {
    id: 7,
    title: "Data Transmission",
    description: "SPK, PKK, and RPKOP data are synchronized back to InaPortNet for authority review.",
    actor: Actor.SYSTEM,
    documents: [],
    requiresAction: false,
    autoDelay: 1500
  },
  {
    id: 8,
    title: "Verification & Pilot SPK",
    description: "Port Authority (KSOP) verifies RPKOP and issues the Pilot Work Order based on PKK.",
    actor: Actor.KSOP,
    documents: [{ id: "PILOT-SPK-01", name: "Pilot Service Order", type: "PDF" }],
    requiresAction: true,
    actionLabel: "Verify & Issue Pilot SPK"
  },
  {
    id: 9,
    title: "Clearance Issuance (SPOG/SPB)",
    description: "KSOP issues the Ship Service Request (PPK) and final clearances for inbound (SPOG) or outbound (SPB).",
    actor: Actor.KSOP,
    documents: [
      { id: "PPK-FINAL", name: "Ship Service Request", type: "PDF" },
      { id: "SPOG-IN", name: "Port Clearance (In)", type: "CERT" }
    ],
    requiresAction: true,
    actionLabel: "Grant Port Clearance"
  },
  {
    id: 10,
    title: "Realization Recording",
    description: "JAI and Rendal print the SPK and record the actual proof of service realization.",
    actor: Actor.JAI,
    documents: [{ id: "REAL-PROOF-01", name: "Service Realization Log", type: "FORM" }],
    requiresAction: true,
    actionLabel: "Record Realization"
  },
  {
    id: 11,
    title: "Billing & Documentation",
    description: "Billing unit generates the pre-invoice (DTJK/DPJKV) and the final Invoice (Nota).",
    actor: Actor.BILLING,
    documents: [
      { id: "DTJK-PRE", name: "Pre-Invoice Data", type: "PDF" },
      { id: "INV-FINAL-24", name: "Final Invoice (Nota)", type: "INVOICE" }
    ],
    requiresAction: true,
    actionLabel: "Generate Final Invoice"
  }
];

export const MOCK_ARRIVAL_NOTICES: ArrivalNoticeData[] = [
  {
    id: "AN-2024-001",
    vesselName: "MV. OCEAN GIANT",
    callSign: "YDB12",
    voyageIn: "089/IN/2024",
    voyageOut: "090/OUT/2024",
    eta: "2024-05-20 08:00",
    agent: "PT. Samudera Indonesia",
    status: "Verified"
  },
  {
    id: "AN-2024-002",
    vesselName: "MT. BORNEO PIONEER",
    callSign: "PKX99",
    voyageIn: "012/IN/2024",
    voyageOut: "012/OUT/2024",
    eta: "2024-05-21 14:30",
    agent: "PT. Meratus Line",
    status: "Submitted"
  },
  {
    id: "AN-2024-003",
    vesselName: "KM. NUSANTARA 01",
    callSign: "JZB44",
    voyageIn: "115/IN/2024",
    voyageOut: "116/OUT/2024",
    eta: "2024-05-22 09:15",
    agent: "PT. Pelni (Persero)",
    status: "Draft"
  },
  {
    id: "AN-2024-004",
    vesselName: "MV. PACIFIC DREAM",
    callSign: "9VBB5",
    voyageIn: "033/IN/2024",
    voyageOut: "033/OUT/2024",
    eta: "2024-05-19 22:00",
    agent: "PT. Evergreen Shipping",
    status: "Verified"
  },
  {
    id: "AN-2024-005",
    vesselName: "SV. OFFSHORE SUPPORT",
    callSign: "9WLC2",
    voyageIn: "005/IN/2024",
    voyageOut: "005/OUT/2024",
    eta: "2024-05-23 06:00",
    agent: "PT. Wintermar",
    status: "Rejected"
  }
];

export const MOCK_PKK_DATA: PKKData[] = [
  {
    pkkNumber: "PKK.2024.05.00891",
    vesselName: "MV. OCEAN GIANT",
    agent: "PT. Samudera Indonesia",
    issueDate: "2024-05-18",
    validUntil: "2024-05-25",
    status: "Active",
    portLocation: "Tanjung Priok"
  },
  {
    pkkNumber: "PKK.2024.05.00885",
    vesselName: "MV. PACIFIC DREAM",
    agent: "PT. Evergreen Shipping",
    issueDate: "2024-05-17",
    validUntil: "2024-05-24",
    status: "Active",
    portLocation: "Tanjung Perak"
  },
  {
    pkkNumber: "PKK.2024.05.00750",
    vesselName: "MT. ENERGY STAR",
    agent: "PT. Pertamina Trans",
    issueDate: "2024-05-10",
    validUntil: "2024-05-17",
    status: "Expired",
    portLocation: "Balikpapan"
  },
  {
    pkkNumber: "PKK.2024.05.00902",
    vesselName: "KM. SINAR SOLO",
    agent: "PT. Samudera Indonesia",
    issueDate: "2024-05-19",
    validUntil: "2024-05-26",
    status: "Active",
    portLocation: "Tanjung Priok"
  }
];

export const MOCK_RKBM_DATA: RKBMData[] = [
  {
    id: "RKBM-2024-091",
    pkkRef: "PKK.2024.05.00891",
    vesselName: "MV. OCEAN GIANT",
    agent: "PT. Samudera Indonesia",
    activity: "Discharging",
    cargoType: "Container (20ft)",
    tonnage: "850 TEUs",
    operationalDates: "20-22 May 2024",
    status: "Submitted"
  },
  {
    id: "RKBM-2024-088",
    pkkRef: "PKK.2024.05.00885",
    vesselName: "MV. PACIFIC DREAM",
    agent: "PT. Evergreen Shipping",
    activity: "Loading/Discharging",
    cargoType: "Bulk Coal",
    tonnage: "12,000 Tons",
    operationalDates: "19-21 May 2024",
    status: "Approved"
  },
  {
    id: "RKBM-2024-102",
    pkkRef: "PKK.2024.05.00902",
    vesselName: "KM. SINAR SOLO",
    agent: "PT. Samudera Indonesia",
    activity: "Loading",
    cargoType: "General Cargo",
    tonnage: "3,500 Tons",
    operationalDates: "23-24 May 2024",
    status: "Draft"
  }
];

export const MOCK_RPKOP_DATA: RPKOPData[] = [
  {
    id: "RPKOP-24-0045",
    rkbmRef: "RKBM-2024-088",
    vesselName: "MV. PACIFIC DREAM",
    berthLocation: "Terminal Curah - Berth 2B",
    schedule: "19 May 14:00 - 21 May 22:00",
    resources: "Conveyor Belt L2, 4 Excavators",
    status: "Approved"
  },
  {
    id: "RPKOP-24-0046",
    rkbmRef: "RKBM-2024-091",
    vesselName: "MV. OCEAN GIANT",
    berthLocation: "Container Term 3 - Berth 104",
    schedule: "20 May 09:00 - 22 May 18:00",
    resources: "2 Quay Cranes (QC-04, QC-05)",
    status: "Pending Review"
  },
  {
    id: "RPKOP-24-0042",
    rkbmRef: "RKBM-2024-075",
    vesselName: "MT. ENERGY STAR",
    berthLocation: "Oil Jetty 1",
    schedule: "18 May 06:00 - 19 May 12:00",
    resources: "Loading Arm A1, Pipeline P-02",
    status: "Active"
  }
];

export const MOCK_PPKB_DATA: PPKBData[] = [
  {
    id: "PPKB-2024-001",
    rpkopRef: "RPKOP-24-0045",
    vesselName: "MV. PACIFIC DREAM",
    serviceType: ["Pilotage", "Berthing"],
    requestedDate: "2024-05-19 14:00",
    status: "Confirmed",
    priority: "Normal"
  },
  {
    id: "PPKB-2024-002",
    rpkopRef: "RPKOP-24-0046",
    vesselName: "MV. OCEAN GIANT",
    serviceType: ["Pilotage", "Towage", "Berthing", "Water Supply"],
    requestedDate: "2024-05-20 09:00",
    status: "Submitted",
    priority: "High"
  },
  {
    id: "PPKB-2024-003",
    rpkopRef: "RPKOP-24-0042",
    vesselName: "MT. ENERGY STAR",
    serviceType: ["Pilotage", "Berthing"],
    requestedDate: "2024-05-18 06:00",
    status: "Confirmed",
    priority: "Normal"
  }
];

export const MOCK_SPK_DATA: SPKData[] = [
  {
    id: "SPK-24-00891",
    ppkbRef: "PPKB-2024-001",
    vesselName: "MV. PACIFIC DREAM",
    agent: "PT. Evergreen Shipping",
    amount: "IDR 15,450,000",
    paymentStatus: "Paid",
    spkStatus: "Issued",
    issueDate: "2024-05-18 16:30"
  },
  {
    id: "SPK-PENDING-02",
    ppkbRef: "PPKB-2024-002",
    vesselName: "MV. OCEAN GIANT",
    agent: "PT. Samudera Indonesia",
    amount: "IDR 28,700,000",
    paymentStatus: "Unpaid",
    spkStatus: "Pending"
  },
  {
    id: "SPK-24-00888",
    ppkbRef: "PPKB-2024-003",
    vesselName: "MT. ENERGY STAR",
    agent: "PT. Pertamina Trans",
    amount: "IDR 12,000,000",
    paymentStatus: "Paid",
    spkStatus: "Ready"
  }
];

export const MOCK_TRANSMISSION_LOGS: TransmissionLogData[] = [
  {
    id: "TX-2024-9001",
    timestamp: "2024-05-18 16:35:12",
    documentType: "SPK",
    referenceId: "SPK-24-00891",
    vesselName: "MV. PACIFIC DREAM",
    destination: "InaPortNet Core",
    status: "Synced",
    retryCount: 0
  },
  {
    id: "TX-2024-9002",
    timestamp: "2024-05-18 16:35:15",
    documentType: "PKK",
    referenceId: "PKK.2024.05.00885",
    vesselName: "MV. PACIFIC DREAM",
    destination: "InaPortNet Core",
    status: "Synced",
    retryCount: 0
  },
  {
    id: "TX-2024-9003",
    timestamp: "2024-05-18 16:35:18",
    documentType: "RPKOP",
    referenceId: "RPKOP-24-0045",
    vesselName: "MV. PACIFIC DREAM",
    destination: "InaPortNet Core",
    status: "Synced",
    retryCount: 0
  },
  {
    id: "TX-2024-9004",
    timestamp: "2024-05-18 15:00:00",
    documentType: "RPKOP",
    referenceId: "RPKOP-24-0046",
    vesselName: "MV. OCEAN GIANT",
    destination: "InaPortNet Core",
    status: "Pending",
    retryCount: 1
  },
  {
    id: "TX-2024-8998",
    timestamp: "2024-05-18 14:22:10",
    documentType: "SPK",
    referenceId: "SPK-24-00888",
    vesselName: "MT. ENERGY STAR",
    destination: "InaPortNet Core",
    status: "Failed",
    retryCount: 3
  }
];

export const MOCK_PILOT_ORDERS: PilotOrderData[] = [
  {
    id: "PLT-SPK-24-101",
    rpkopRef: "RPKOP-24-0045",
    pkkRef: "PKK.2024.05.00885",
    vesselName: "MV. PACIFIC DREAM",
    agent: "PT. Evergreen Shipping",
    location: "Outer Bar to Berth 2B",
    pilotName: "Capt. Budi Santoso",
    boardingTime: "2024-05-19 13:30",
    status: "Pilot Assigned"
  },
  {
    id: "PLT-SPK-24-102",
    rpkopRef: "RPKOP-24-0046",
    pkkRef: "PKK.2024.05.00891",
    vesselName: "MV. OCEAN GIANT",
    agent: "PT. Samudera Indonesia",
    location: "Pilot Station to Berth 104",
    pilotName: "-",
    boardingTime: "2024-05-20 08:30",
    status: "Pending Verification"
  },
   {
    id: "PLT-SPK-24-099",
    rpkopRef: "RPKOP-24-0042",
    pkkRef: "PKK.2024.05.00750",
    vesselName: "MT. ENERGY STAR",
    agent: "PT. Pertamina Trans",
    location: "Oil Jetty 1 to High Seas",
    pilotName: "Capt. Ahmad Rizki",
    boardingTime: "2024-05-19 12:00",
    status: "Completed"
  }
];

export const MOCK_CLEARANCE_DATA: ClearanceData[] = [
  {
    id: "SPOG-24-0891",
    vesselName: "MV. OCEAN GIANT",
    agent: "PT. Samudera Indonesia",
    type: "SPOG",
    ppkRef: "PPK-24-0012",
    portDetails: "From: Singapore",
    issueDate: "2024-05-20 07:30",
    status: "Issued"
  },
  {
    id: "PPK-24-0015",
    vesselName: "MV. PACIFIC DREAM",
    agent: "PT. Evergreen Shipping",
    type: "PPK",
    portDetails: "To: Surabaya",
    issueDate: "-",
    status: "Pending Approval"
  },
  {
    id: "SPB-24-0750",
    vesselName: "MT. ENERGY STAR",
    agent: "PT. Pertamina Trans",
    type: "SPB",
    ppkRef: "PPK-24-0009",
    portDetails: "To: Balikpapan",
    issueDate: "2024-05-19 18:45",
    status: "Issued"
  }
];

export const MOCK_REALIZATION_DATA: RealizationData[] = [
  {
    id: "RLZ-2024-001",
    spkRef: "SPK-24-00891",
    vesselName: "MV. PACIFIC DREAM",
    serviceType: "Pilotage",
    startTime: "2024-05-19 14:00",
    endTime: "2024-05-19 15:30",
    recordedBy: "JAI",
    status: "Verified"
  },
  {
    id: "RLZ-2024-002",
    spkRef: "SPK-24-00891",
    vesselName: "MV. PACIFIC DREAM",
    serviceType: "Berthing",
    startTime: "2024-05-19 15:45",
    endTime: "2024-05-21 21:00",
    recordedBy: "Rendal",
    status: "Recorded"
  },
  {
    id: "RLZ-PENDING-01",
    spkRef: "SPK-24-00888",
    vesselName: "MT. ENERGY STAR",
    serviceType: "Water Supply",
    startTime: "-",
    endTime: "-",
    recordedBy: "Rendal",
    status: "Pending Recording"
  }
];

export const MOCK_BILLING_DATA: BillingData[] = [
  {
    id: "INV-2024-001",
    spkRef: "SPK-24-00891",
    vesselName: "MV. PACIFIC DREAM",
    agent: "PT. Evergreen Shipping",
    type: "Final Invoice",
    amount: "IDR 15,450,000",
    issueDate: "2024-05-21 10:00",
    status: "Paid",
    dueDate: "2024-06-21"
  },
  {
    id: "PRE-2024-005",
    spkRef: "SPK-24-00888",
    vesselName: "MT. ENERGY STAR",
    agent: "PT. Pertamina Trans",
    type: "Pre-Invoice",
    amount: "IDR 12,000,000",
    issueDate: "2024-05-19 14:30",
    status: "Issued",
    dueDate: "2024-05-22"
  },
  {
    id: "INV-2024-002",
    spkRef: "SPK-24-00885",
    vesselName: "MV. OCEAN GIANT",
    agent: "PT. Samudera Indonesia",
    type: "Final Invoice",
    amount: "IDR 28,700,000",
    issueDate: "2024-05-10 09:15",
    status: "Overdue",
    dueDate: "2024-05-20"
  },
  {
    id: "PRE-2024-006",
    spkRef: "SPK-PENDING-02",
    vesselName: "KM. SINAR SOLO",
    agent: "PT. Samudera Indonesia",
    type: "Pre-Invoice",
    amount: "IDR 8,500,000",
    issueDate: "2024-05-20 11:45",
    status: "Draft",
    dueDate: "-"
  }
];