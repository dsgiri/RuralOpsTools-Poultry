import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EggLogEntry } from '../types';
import { storage } from '../utils/storage';
import { ClipboardList, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export function EggLog() {
  const [logs, setLogs] = useState<EggLogEntry[]>([]);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [eggs, setEggs] = useState('');
  const [birds, setBirds] = useState('');

  useEffect(() => {
    setLogs(storage.getEggLogs().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eggsNum = parseInt(eggs);
    const birdsNum = parseInt(birds);
    
    if (isNaN(eggsNum) || isNaN(birdsNum) || birdsNum === 0) return;

    const layRate = Math.round((eggsNum / birdsNum) * 100);
    
    const newEntry: EggLogEntry = {
      id: uuidv4(),
      date,
      eggsCollected: eggsNum,
      birdsInFlock: birdsNum,
      layRate,
    };

    const updatedLogs = [newEntry, ...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setLogs(updatedLogs);
    storage.setEggLogs(updatedLogs);
    setEggs('');
  };

  const handleDelete = (id: string) => {
    const updatedLogs = logs.filter(log => log.id !== id);
    setLogs(updatedLogs);
    storage.setEggLogs(updatedLogs);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex items-center gap-3 border-b-2 border-line pb-4">
        <ClipboardList className="w-8 h-8 text-board" />
        <h1 className="text-3xl font-serif text-ink tracking-tight">Egg Log</h1>
      </div>

      {/* Form */}
      <div className="bg-kraft-light border border-line p-5 sm:p-6">
        <h2 className="font-serif text-xl mb-4 text-ink">New Entry</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
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
            <label htmlFor="eggs" className="block text-sm font-medium text-ink-soft">Eggs Collected</label>
            <input
              type="number"
              id="eggs"
              required
              min="0"
              value={eggs}
              onChange={(e) => setEggs(e.target.value)}
              className="w-full bg-kraft border border-line px-3 py-2 text-ink focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust font-mono"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="birds" className="block text-sm font-medium text-ink-soft">Birds in Flock</label>
            <input
              type="number"
              id="birds"
              required
              min="1"
              value={birds}
              onChange={(e) => setBirds(e.target.value)}
              className="w-full bg-kraft border border-line px-3 py-2 text-ink focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust font-mono"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rust hover:bg-rust-dark text-kraft font-medium py-2 px-4 transition-colors border border-transparent focus:outline-none focus:ring-2 focus:ring-rust focus:ring-offset-2 focus:ring-offset-kraft"
          >
            Log Entry
          </button>
        </form>
      </div>

      {/* History */}
      <div className="bg-kraft-light border border-line overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-line">
          <h2 className="font-serif text-xl text-ink">History</h2>
        </div>
        
        {logs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-line">
              <thead className="bg-kraft">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-ink-soft uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-ink-soft uppercase tracking-wider">Eggs</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-ink-soft uppercase tracking-wider">Birds</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-ink-soft uppercase tracking-wider">Lay Rate</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-ink-soft uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-kraft-light divide-y divide-line">
                {logs.map(log => (
                  <tr key={log.id} className="hover:bg-kraft transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-ink">{log.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-ink">{log.eggsCollected}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-ink-soft">{log.birdsInFlock}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-mono text-sm font-medium text-ink">{log.layRate}%</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                      <button 
                        onClick={() => handleDelete(log.id)}
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
