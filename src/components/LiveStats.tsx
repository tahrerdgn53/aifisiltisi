import React from 'react';
import { Bot, Newspaper, Layers3 } from 'lucide-react';

interface LiveStatsProps {
  toolCount: number;
  articleCount: number;
  categoryCount: number;
}

export default function LiveStats({
  toolCount,
  articleCount,
  categoryCount,
}: LiveStatsProps) {
  const stats = [
    {
      label: 'AI Aracı',
      value: toolCount,
      icon: Bot,
    },
    {
      label: 'Makale',
      value: articleCount,
      icon: Newspaper,
    },
    {
      label: 'Kategori',
      value: categoryCount,
      icon: Layers3,
    },
  ];

  return (
    <section
      aria-label="Aİ Fısıltısı içerik istatistikleri"
      className="relative z-10 px-4 sm:px-8"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-slate-950/60 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-cyan-500/10"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
                <Icon className="h-6 w-6" />
              </div>

              <div>
                <p className="text-2xl font-black tracking-tight text-white">
                  {stat.value.toLocaleString('tr-TR')}
                </p>

                <p className="mt-0.5 text-sm font-medium text-slate-400">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
