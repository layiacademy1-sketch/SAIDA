/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flower, ChevronLeft, Briefcase, Wallet, TrendingUp, Calendar, CheckCircle2, Construction } from 'lucide-react';

// --- Types ---
type Page = 'home' | 'business-list' | 'business-detail' | 'tasks' | 'task-detail';

interface BusinessData {
  id: string;
  name: string;
  monthTotal: string;
  weekTotal: string;
  tasks?: string;
  isComingSoon?: boolean;
}

interface TaskData {
  id: string;
  name: string;
  tag: string;
  phone: string;
  price: string;
  snapchat?: string;
  lastInfo?: string;
}

const TASKS: TaskData[] = [
  {
    id: 'perf-77',
    name: 'PERF',
    tag: 'formation Snapchat',
    phone: 'non communiquer',
    price: '150€',
    snapchat: 'perf.77',
    lastInfo: 'Layi l’a contacté sur Snapchat et il a un rendez-vous avec lui le 17 mars 2026 pour faire un point sur son Snapchat. Il est possible qu’il paie à ce moment-là.',
  },
];

const BUSINESSES: BusinessData[] = [
  {
    id: 'melli-creation',
    name: 'MELLI-CREATION',
    monthTotal: '0 €',
    weekTotal: '0 €',
  },
  {
    id: 'layi-academy',
    name: 'LAYI ACADEMY',
    monthTotal: '0 €',
    weekTotal: '0 €',
  },
  {
    id: 'ds-consulting',
    name: 'DS-CONSULTING',
    monthTotal: '0 €',
    weekTotal: '0 €',
    isComingSoon: true,
  },
];

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center"
      >
        <Flower className="text-yellow-400 w-20 h-20 mb-4 animate-spin-slow" />
        <h1 className="text-white text-5xl font-black tracking-widest mb-8">SAIDA</h1>
      </motion.div>
      
      <div className="w-64 h-2 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
        <motion.div
          className="h-full bg-yellow-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-yellow-400 mt-2 font-mono">{progress}%</p>
    </div>
  );
};

const Header = ({ title, onBack }: { title: string; onBack?: () => void }) => (
  <header className="bg-black border-b border-yellow-400/20 p-6 flex items-center sticky top-0 z-10">
    {onBack && (
      <button onClick={onBack} className="mr-4 text-yellow-400 hover:bg-yellow-400/10 p-2 rounded-full transition-colors">
        <ChevronLeft size={24} />
      </button>
    )}
    <h1 className="text-yellow-400 text-2xl font-black tracking-tighter uppercase">{title}</h1>
  </header>
);

const StatCard = ({ label, value, icon: Icon }: { label: string; value: string; icon: any }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center space-x-4">
    <div className="bg-yellow-400/10 p-3 rounded-xl">
      <Icon className="text-yellow-400" size={24} />
    </div>
    <div>
      <p className="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1">{label}</p>
      <p className="text-white text-2xl font-black">{value}</p>
    </div>
  </div>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessData | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);

  const navigateTo = (page: Page, data: any = null) => {
    if (page === 'business-detail') setSelectedBusiness(data);
    if (page === 'task-detail') setSelectedTask(data);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black">
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col min-h-screen"
          >
            <Header title="BUSINESS" />
            
            <main className="flex-grow p-6 space-y-8">
              <div className="py-10 flex flex-col items-center justify-center text-center space-y-4 bg-white rounded-[2rem] text-black shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                  <TrendingUp size={32} className="text-yellow-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-500 uppercase text-xs font-bold tracking-widest">Total généré depuis le début</p>
                  <p className="text-5xl font-black">0 €</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-5 bg-zinc-900 rounded-2xl border border-zinc-800">
                  <div className="flex items-center space-x-3">
                    <Wallet className="text-yellow-400" size={22} />
                    <span className="text-zinc-400 font-bold uppercase text-xs tracking-wider">Disponible à retirer</span>
                  </div>
                  <span className="text-2xl font-black text-yellow-400">0 €</span>
                </div>
                
                <button
                  onClick={() => navigateTo('tasks')}
                  className="w-full bg-yellow-400 text-black py-5 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-yellow-300 transition-all active:scale-95 shadow-[0_15px_40px_rgba(250,204,21,0.3)]"
                >
                  MES TÂCHES
                </button>
              </div>
            </main>
          </motion.div>
        )}

        {currentPage === 'tasks' && (
          <motion.div
            key="tasks"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col min-h-screen"
          >
            <Header title="MES TÂCHES" onBack={() => navigateTo('home')} />
            
            <main className="p-6 space-y-4">
              <p className="text-zinc-500 text-sm uppercase font-bold tracking-widest mb-6">Liste des tâches</p>
              
              <div className="grid grid-cols-1 gap-4">
                {TASKS.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => navigateTo('task-detail', task)}
                    className="group bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between hover:border-yellow-400/50 transition-all active:scale-[0.98]"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-black border border-zinc-800 rounded-xl flex items-center justify-center group-hover:border-yellow-400 transition-colors">
                        <CheckCircle2 className="text-yellow-400" size={20} />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-xl font-black tracking-tight">{task.name}</span>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{task.tag}</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                      <ChevronLeft size={20} className="rotate-180" />
                    </div>
                  </button>
                ))}
              </div>

              {TASKS.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                  <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
                    <CheckCircle2 size={40} className="text-zinc-600" />
                  </div>
                  <p className="text-2xl font-bold text-zinc-400">Aucune tâche pour le moment.</p>
                </div>
              )}
            </main>
          </motion.div>
        )}

        {currentPage === 'task-detail' && selectedTask && (
          <motion.div
            key="task-detail"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col min-h-screen"
          >
            <Header title={selectedTask.name} onBack={() => navigateTo('tasks')} />
            
            <main className="p-6 space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center">
                    <Briefcase className="text-black" size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black">{selectedTask.name}</h2>
                    <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs">{selectedTask.tag}</span>
                  </div>
                </div>

                <div className="h-px bg-zinc-800 w-full" />

                <div className="space-y-6">
                  <h3 className="text-yellow-400 font-black uppercase tracking-widest text-sm">Information :</h3>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Numéro de téléphone</span>
                      <span className="text-xl font-bold text-white">{selectedTask.phone}</span>
                    </div>

                    {selectedTask.snapchat && (
                      <div className="flex flex-col space-y-1">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Snapchat</span>
                        <span className="text-xl font-bold text-white">{selectedTask.snapchat}</span>
                      </div>
                    )}
                    
                    <div className="flex flex-col space-y-1">
                      <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Prix Devis</span>
                      <span className="text-3xl font-black text-yellow-400">{selectedTask.price}</span>
                    </div>

                    {selectedTask.lastInfo && (
                      <div className="flex flex-col space-y-2 pt-4">
                        <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Dernières infos :</span>
                        <p className="text-zinc-300 text-sm leading-relaxed bg-black/30 p-4 rounded-xl border border-zinc-800/50">
                          {selectedTask.lastInfo}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex items-center space-x-4">
                <div className="w-10 h-10 bg-emerald-400/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="text-emerald-400" size={20} />
                </div>
                <p className="text-zinc-400 text-sm font-medium">Tâche en cours de traitement</p>
              </div>
            </main>
          </motion.div>
        )}

        {currentPage === 'business-list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col min-h-screen"
          >
            <Header title="MES BUSINESS" onBack={() => navigateTo('home')} />
            
            <main className="p-6 space-y-4">
              <p className="text-zinc-500 text-sm uppercase font-bold tracking-widest mb-6">Sélectionnez une entité</p>
              
              <div className="grid grid-cols-1 gap-4">
                {BUSINESSES.map((biz) => (
                  <button
                    key={biz.id}
                    onClick={() => navigateTo('business-detail', biz)}
                    className="group bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between hover:border-yellow-400/50 transition-all active:scale-[0.98]"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-black border border-zinc-800 rounded-xl flex items-center justify-center group-hover:border-yellow-400 transition-colors">
                        <Briefcase className="text-yellow-400" size={20} />
                      </div>
                      <span className="text-xl font-black tracking-tight">{biz.name}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                      <ChevronLeft size={20} className="rotate-180" />
                    </div>
                  </button>
                ))}
              </div>
            </main>
          </motion.div>
        )}

        {currentPage === 'business-detail' && selectedBusiness && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col min-h-screen"
          >
            <Header title={selectedBusiness.name} onBack={() => navigateTo('business-list')} />
            
            <main className="p-6 space-y-6">
              {selectedBusiness.isComingSoon ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                  <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
                    <Construction size={40} className="text-yellow-400 animate-pulse" />
                  </div>
                  <h2 className="text-3xl font-black text-white">Bientôt disponible.</h2>
                  <p className="text-zinc-500 max-w-xs">Nous travaillons actuellement sur cette section. Revenez plus tard !</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    <StatCard 
                      label="Total généré ce mois" 
                      value={selectedBusiness.monthTotal} 
                      icon={Calendar} 
                    />
                    <StatCard 
                      label="Total généré cette semaine" 
                      value={selectedBusiness.weekTotal} 
                      icon={TrendingUp} 
                    />
                  </div>

                  {selectedBusiness.tasks && (
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                      <div className="flex items-center space-x-2 text-yellow-400">
                        <CheckCircle2 size={20} />
                        <h3 className="uppercase font-black tracking-widest text-sm">Tâches à effectuer</h3>
                      </div>
                      <p className="text-zinc-400 italic">{selectedBusiness.tasks}</p>
                    </div>
                  )}
                </>
              )}
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
