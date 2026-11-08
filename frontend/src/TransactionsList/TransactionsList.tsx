import { Filter } from "lucide-react";
import { TRANSACTIONS_DATA } from "../data";
import type { TransactionGroup, TransactionItem } from "../shared/types/user";
import { formatCurrency } from "../shared/utils/helpers";

const TransactionsList = () => {
    return (
                  <div className="lg:col-span-7 bg-[#131522]/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-lg font-bold text-white tracking-wide">Транзакции</h2>
                          <p className="text-xs text-slate-400 mt-0.5">История операций по категориям</p>
                        </div>
                        <button 
                          type="button"
                          className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/20 transition"
                        >
                          <Filter className="w-3.5 h-3.5" />
                          <span>Фильтры</span>
                        </button>
                      </div>
        
                      {/* Transactions Groups */}
                      <div className="space-y-5">
                        {TRANSACTIONS_DATA.map((group: TransactionGroup, groupIdx: number) => (
                          <div key={groupIdx} className="space-y-2.5">
                            <div className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                              {group.date}
                            </div>
                            <div className="space-y-2">
                              {group.items.map((tx: TransactionItem) => {
                                const IconComponent = tx.icon;
                                const isIncome = tx.amount > 0;
                                return (
                                  <div 
                                    key={tx.id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:bg-slate-800/40 hover:border-slate-700/60 transition group cursor-pointer"
                                  >
                                    <div className="flex items-center gap-3.5">
                                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-300 group-hover:scale-105 transition-transform">
                                        <IconComponent className="w-4 h-4" />
                                      </div>
                                      <div>
                                        <div className="text-sm font-semibold text-slate-100">{tx.title}</div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-rose-950/60 text-rose-300 border border-rose-800/40">
                                            {tx.source}
                                          </span>
                                          <span className="text-[11px] text-slate-500">{tx.category}</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className={`text-sm sm:text-base font-bold ${isIncome ? 'text-emerald-400' : 'text-slate-300'}`}>
                                      {isIncome ? `+${formatCurrency(tx.amount)}` : formatCurrency(tx.amount)}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
        
                    {/* View All Button */}
                    <div className="mt-6 pt-4 border-t border-slate-800/60 flex justify-center">
                      <button 
                        type="button"
                        className="text-xs font-semibold text-slate-400 hover:text-white transition"
                      >
                        Показать всю историю
                      </button>
                    </div>
                  </div>
    );
}
 
export default TransactionsList;