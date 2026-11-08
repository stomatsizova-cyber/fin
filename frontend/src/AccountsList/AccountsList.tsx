import { ACCOUNTS_DATA } from "../data";
import { formatCurrency } from "../shared/utils/helpers";

const AccountsList = () => {
    return (
        <div className="bg-[#131522]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h2 className="text-base font-semibold text-slate-100">Счета и активы</h2>
                          <p className="text-xs text-slate-400">Распределение ликвидности</p>
                        </div>
                        <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                          Управлять
                        </button>
                      </div>
        
                      <div className="space-y-3">
                        {ACCOUNTS_DATA.map((acc) => {
                          const Icon = acc.icon;
                          return (
                            <div
                              key={acc.id}
                              className="p-3 rounded-xl bg-slate-900/40 hover:bg-slate-800/40 border border-slate-800/50 transition-all flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2.5 rounded-xl border ${acc.badgeColor}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <h4 className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                                    {acc.title}
                                  </h4>
                                  <span className="text-[10px] text-slate-400">{acc.category}</span>
                                </div>
                              </div>
        
                              <div className="text-right">
                                <div className="text-xs font-bold text-slate-100">{formatCurrency(acc.balance)}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
    );
}
 
export default AccountsList;