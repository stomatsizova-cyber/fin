import type { ChartData, ChartOptions } from "chart.js";
import { EXPENSES_SEGMENTS } from "../data";
import { useState } from "react";
import { formatCurrency } from "../shared/utils/helpers";
import { Doughnut } from "react-chartjs-2";
// import type { TabType } from "../shared/types/user";
import type { ChartType } from "../TestApp/TestApp";

export const ExpensesDoughnutSection: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>('expenses');

  const doughnutData: ChartData<'doughnut'> = {
    labels: EXPENSES_SEGMENTS.map((s) => s.name),
    datasets: [
      {
        data: EXPENSES_SEGMENTS.map((s) => s.amount),
        backgroundColor: EXPENSES_SEGMENTS.map((s) => s.color),
        borderColor: '#131522',
        borderWidth: 3,
        hoverOffset: 6,
      },
    ],
  };

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#e2e8f0',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(51, 65, 85, 0.8)',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (ctx) => ` ${formatCurrency(ctx.parsed)}`,
        },
      },
    },
  };

  return (
    <div className="lg:col-span-5 bg-[#131522]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between min-h-[380px] relative">
      <div className="flex items-center justify-between mb-2 z-10">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setChartType('expenses')}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
              chartType === 'expenses'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Расходы
          </button>
          <button
            type="button"
            onClick={() => setChartType('income')}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
              chartType === 'income'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Доходы
          </button>
        </div>
      </div>

      <div className="relative flex-1 flex items-center justify-center my-4 h-52">
        <Doughnut data={doughnutData} options={doughnutOptions} />

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-[10px] text-slate-400">Прибыль</div>
          <div className="text-sm font-bold text-slate-100">800 000 ₽</div>
          <div className="text-[10px] font-semibold text-rose-400">41%</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-800/60 z-10">
        {EXPENSES_SEGMENTS.map((seg) => (
          <div key={seg.name} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: seg.color }}
            ></span>
            <span className="text-slate-300 truncate">{seg.name}</span>
            <span className="text-slate-500 ml-auto font-mono">{seg.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};