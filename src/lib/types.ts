export type HistoryLogEntry = {
  id: string;
  timestamp: number;
  status: 'INTRUSION DETECTED';
  distance: number | null;
};
