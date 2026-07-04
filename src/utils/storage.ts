import { CoopCheckEntry, EggLogEntry, FlockHealthEntry } from '../types';

const KEYS = {
  eggLog: 'ruralops_poultry_egglog',
  coop: 'ruralops_poultry_coop',
  health: 'ruralops_poultry_health',
  cookiesAccepted: 'ruralops_poultry_cookies_accepted',
};

export const storage = {
  getEggLogs: (): EggLogEntry[] => {
    const data = localStorage.getItem(KEYS.eggLog);
    return data ? JSON.parse(data) : [];
  },
  setEggLogs: (logs: EggLogEntry[]) => {
    localStorage.setItem(KEYS.eggLog, JSON.stringify(logs));
  },
  
  getCoopChecks: (): CoopCheckEntry[] => {
    const data = localStorage.getItem(KEYS.coop);
    return data ? JSON.parse(data) : [];
  },
  setCoopChecks: (checks: CoopCheckEntry[]) => {
    localStorage.setItem(KEYS.coop, JSON.stringify(checks));
  },

  getHealthEntries: (): FlockHealthEntry[] => {
    const data = localStorage.getItem(KEYS.health);
    return data ? JSON.parse(data) : [];
  },
  setHealthEntries: (entries: FlockHealthEntry[]) => {
    localStorage.setItem(KEYS.health, JSON.stringify(entries));
  },

  getCookiesAccepted: (): boolean | null => {
    const data = localStorage.getItem(KEYS.cookiesAccepted);
    return data ? JSON.parse(data) : null;
  },
  setCookiesAccepted: (accepted: boolean) => {
    localStorage.setItem(KEYS.cookiesAccepted, JSON.stringify(accepted));
  }
};
