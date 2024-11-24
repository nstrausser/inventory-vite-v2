// Previous type definitions remain...

export type Installation = {
  id: string;
  date: string;
  customerName: string;
  vehicleInfo: string;
  installer: {
    id: string;
    name: string;
  };
  status: 'completed' | 'in-progress' | 'needs-recut';
  totalArea: number;
  cuts: Cut[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
  qualityChecks?: QualityCheck[];
  defectReports?: DefectReport[];
};

// Re-export quality types for convenience
export type {
  QualityCheck,
  ChecklistItem,
  DefectReport,
  WarrantyClaim,
  QualityMetrics,
  InstallationStandard,
} from './quality';