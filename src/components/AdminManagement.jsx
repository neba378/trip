import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ShieldCheck, ShieldOff, Mail, RefreshCw } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function AdminManagement() {
  const { fetchAdmins, createAdmin, setAdminActive } = useBooking();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setAdmins(await fetchAdmins());
    setLoading(false);
  }, [fetchAdmins]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createAdmin(form);
      setForm({ name: '', email: '', password: '' });
      await load();
    } catch {
      /* toast handled in context */
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (admin) => {
    try {
      await setAdminActive(admin.id, !admin.isActive);
      await load();
    } catch {
      /* toast handled in context */
    }
  };

  return (
    <motion.div
      key="admins"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      {/* Create form */}
      <div className="bg-savanna-dark p-8 rounded-[2rem] border border-savanna-green-mid shadow-xl h-fit">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-savanna-gold/10 flex items-center justify-center text-savanna-gold">
            <UserPlus size={20} />
          </div>
          <h3 className="text-white font-bold text-lg">Add Admin</h3>
        </div>
        <form onSubmit={handleCreate} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Full name"
            className="w-full bg-savanna-darker border border-savanna-green-mid rounded-2xl px-4 py-3.5 text-sm text-savanna-cream focus:outline-none focus:border-savanna-gold transition-all"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full bg-savanna-darker border border-savanna-green-mid rounded-2xl px-4 py-3.5 text-sm text-savanna-cream focus:outline-none focus:border-savanna-gold transition-all"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            required
            minLength={8}
            placeholder="Password (min 8 chars)"
            className="w-full bg-savanna-darker border border-savanna-green-mid rounded-2xl px-4 py-3.5 text-sm text-savanna-cream focus:outline-none focus:border-savanna-gold transition-all"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-primary justify-center py-3.5 rounded-2xl disabled:opacity-50"
          >
            {submitting ? 'Creating...' : 'Create Admin'}
          </button>
        </form>
      </div>

      {/* Admin list */}
      <div className="lg:col-span-2 bg-savanna-dark rounded-[2rem] border border-savanna-green-mid shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-savanna-gold/10">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <ShieldCheck size={18} className="text-savanna-gold" /> Admin Accounts
          </h3>
          <button onClick={load} className="text-savanna-cream/40 hover:text-savanna-gold transition-colors" title="Refresh">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {loading ? (
            <p className="p-6 text-savanna-cream/40 text-sm">Loading...</p>
          ) : admins.length === 0 ? (
            <p className="p-6 text-savanna-cream/40 text-sm">No admins found.</p>
          ) : (
            admins.map((admin) => (
              <div key={admin.id} className="flex items-center justify-between p-6 gap-4">
                <div className="min-w-0">
                  <div className="font-bold text-white flex items-center gap-2">
                    {admin.name}
                    {!admin.isActive && (
                      <span className="text-[9px] font-bold uppercase tracking-widest text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                        Disabled
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-savanna-cream/40 font-mono flex items-center gap-1.5 mt-1 truncate">
                    <Mail size={11} className="text-savanna-gold/40" /> {admin.email}
                  </div>
                </div>
                <button
                  onClick={() => toggleActive(admin)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                    admin.isActive
                      ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500 hover:text-white'
                      : 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500 hover:text-white'
                  }`}
                >
                  {admin.isActive ? <><ShieldOff size={14} /> Deactivate</> : <><ShieldCheck size={14} /> Reactivate</>}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
