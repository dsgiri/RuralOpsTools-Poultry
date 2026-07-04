import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FlockHealthEntry, HealthStatus } from '../types';
import { storage } from '../utils/storage';
import { Activity, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export function FlockHealth() {
  const [entries, setEntries] = useState<FlockHealthEntry[]>([]);
  
  // Form state
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [flockId, setFlockId] = useState('Flock-wide');
  const [status, setStatus] = useState<HealthStatus>('Healthy');
  const [note, setNote] = useState('');

  useEffect(() => {
    setEntries(storage.getHealthEntries().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!flockId.trim()) return;

    const newEntry: FlockHealthEntry = {
      id: uuidv4(),
      date,
      flockId: flockId.trim(),
      status,
      note: note.trim(),
    };

    const updatedEntries = [newEntry, ...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setEntries(updatedEntries);
    storage.setHealthEntries(updatedEntries);
    
    // Reset form selectively
    setStatus('Healthy');
    setNote('');
  };

  const handleDelete = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    storage.setHealthEntries(updatedEntries);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex items-center gap-3 border-b-2 border-line pb-4">
        <Activity className="w-8 h-8 text-board" />
        <h1 className="text-3xl font-serif text-ink tracking-tight">Flock Health Tracker</h1>
      </div>

      {/* Form */}
      <div className="bg-kraft-light border border-line p-5 sm:p-6">
        <h2 className="font-serif text-xl mb-4 text-ink">New Health Log</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label htmlFor="date" className="block text-sm font-medium text-ink-soft">Date</label>
              <input
                type="date"
                id="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-kraft border border-line px-3 py-2 text-ink focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="flockId" className="block text-sm font-medium text-ink-soft">Bird/Flock ID</label>
              <input
                type="text"
                id="flockId"
                required
                value={flockId}
                onChange={(e) => setFlockId(e.target.value)}
                className="w-full bg-kraft border border-line px-3 py-2 text-ink focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="status" className="block text-sm font-medium text-ink-soft">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as HealthStatus)}
                className="w-full bg-kraft border border-line px-3 py-2 text-ink focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust"
              >
                <option value="Healthy">Healthy</option>
                <option value="Watch">Watch</option>
                <option value="Sick">Sick</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="note" className="block text-sm font-medium text-ink-soft">Notes (Symptoms, treatment, etc.)</label>
            <textarea
              id="note"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-kraft border border-line px-3 py-2 text-ink focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust"
            />
          </div>

          <button
            type="submit"
            className="bg-rust hover:bg-rust-dark text-kraft font-medium py-2 px-6 transition-colors border border-transparent focus:outline-none focus:ring-2 focus:ring-rust focus:ring-offset-2 focus:ring-offset-kraft"
          >
            Save Record
          </button>
        </form>
      </div>

      {/* History */}
      <div className="bg-kraft-light border border-line overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-line">
          <h2 className="font-serif text-xl text-ink">Health History</h2>
        </div>
        
        {entries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-line">
              <thead className="bg-kraft">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-ink-soft uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-ink-soft uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-ink-soft uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-ink-soft uppercase tracking-wider">Notes</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-ink-soft uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-kraft-light divide-y divide-line">
                {entries.map(entry => (
                  <tr key={entry.id} className="hover:bg-kraft transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-ink">{entry.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-ink font-medium">{entry.flockId}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-xs font-bold uppercase tracking-wide px-2 py-1 ${
                        entry.status === 'Sick' ? 'bg-red text-kraft' :
                        entry.status === 'Watch' ? 'bg-amber text-ink' :
                        'bg-green text-kraft'
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-ink-soft max-w-xs truncate" title={entry.note}>
                      {entry.note || '—'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                      <button 
                        onClick={() => handleDelete(entry.id)}
                        className="text-red hover:text-ink-soft transition-colors p-1"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-ink-soft">
            <p>No entries yet — add your first check above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
