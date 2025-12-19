export type SensorData = {
  isAnimalDetected: boolean;
  distance: number;
  repellentStatus: 'ACTIVE' | 'IDLE';
  timestamp: number;
};

export type HistoryLogEntry = {
  id: string;
  timestamp: number;
  status: 'INTRUSION DETECTED';
  distance: number | null;
};
