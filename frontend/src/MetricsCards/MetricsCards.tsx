
import { KPI_DATA } from "../data";
import { formatCurrency } from "../shared/utils/helpers";


const MetricsCards = () => {
    return (
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {KPI_DATA.map((kpi) => {
                    const Icon = kpi.icon;
                    return (
                      <div
                        key={kpi.id}
                        className="bg-[#131522]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 shadow-xl hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-slate-400">{kpi.title}</span>
                          <div className="p-2 rounded-xl bg-slate-800/50 text-indigo-400">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>
        
                        <div className="mt-4">
                          <div className="text-xl font-bold tracking-tight text-white">
                            {formatCurrency(kpi.amount)}
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-[11px]">
                            <span
                              className={`font-semibold ${
                                kpi.isPositive ? 'text-emerald-400' : 'text-rose-400'
                              }`}
                            >
                              {kpi.isPositive ? `+${kpi.change}%` : `-${kpi.change}%`}
                            </span>
                            <span className="text-slate-500">vs прошлый мес.</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </section>
    );
}
 
export default MetricsCards;