export type SensorData = {
  isAnimalDetected: boolean;
  distance: number;
  servoStatus: 'ON' | 'OFF';
  vibratorStatus: 'ON' | 'OFF';
  timestamp: number;
};

export type HistoryLogEntry = {
  id: string;
  timestamp: number;
  status: 'SAFE' | 'INTRUSION DETECTED';
  distance: number | null;
};
