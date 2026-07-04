export type ViewState = 'dashboard' | 'egg-log' | 'coop-checklist' | 'flock-health' | 'privacy' | 'about' | 'contact' | 'legal';

export interface EggLogEntry {
  id: string;
  date: string; // ISO string YYYY-MM-DD
  eggsCollected: number;
  birdsInFlock: number;
  layRate: number; // (eggs / birds) * 100 rounded
}

export interface CoopCheckEntry {
  id: string;
  date: string;
  temperature: number; // Fahrenheit
  ventilationClear: boolean;
  beddingDry: boolean;
  waterNotFrozen: boolean;
  predatorProofingChecked: boolean;
  flag: 'ok' | 'warning' | 'danger';
  flagMessage: string;
}

export type HealthStatus = 'Healthy' | 'Watch' | 'Sick';

export interface FlockHealthEntry {
  id: string;
  date: string;
  flockId: string; // defaults to 'Flock-wide'
  status: HealthStatus;
  note: string;
}
