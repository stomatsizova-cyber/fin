import { useState } from "react";
import type { TimeframeType } from "../shared/types/user";
import type { ChartData, ChartOptions } from "chart.js";
import { formatCurrency } from "../shared/utils/helpers";
import { Line } from "react-chartjs-2";

export const NetWorthChartSection = () => {
  const [timeframe, setTimeframe] = useState<TimeframeType>('6M');

  const lineData: ChartData<'line'> = {
    labels: ['Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт'],
    datasets: [
      {
        label: 'Чистый капитал',
        data: [12100000, 12600000, 13000000, 13800000, 14200000, 14850000],
        borderColor: '#6366f1',
        borderWidth: 3,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 160);
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#818cf8',
        pointBorderColor: '#131522',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const lineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#94a3b8',
        bodyColor: '#818cf8',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (ctx) => `${formatCurrency(ctx.parsed.y ?? 0)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { size: 10 } },
      },
      y: {
        grid: { color: 'rgba(30, 41, 59, 0.6)' },
        ticks: {
          color: '#64748b',
          font: { size: 10 },
          callback: (value) => `${Number(value) / 1000000}M ₽`,
        },
      },
    },
  };

  return (
    <div className="bg-[#131522]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-semibold text-slate-100">Динамика чистого капитала</h2>
          <p className="text-xs text-slate-400">График построен на Chart.js</p>
        </div>

        <div className="flex gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
          {(['1M', '6M', '1Y', 'ALL'] as TimeframeType[]).map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                timeframe === tf
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-44 mt-2">
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
};