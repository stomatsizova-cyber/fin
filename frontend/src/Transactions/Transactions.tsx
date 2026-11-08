import { TRANSACTIONS_DATA } from "../data";

const Transactions = () => {
    return (
        <div className="lg:col-span-7 bg-[#131522]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-slate-100">Транзакции</h2>
                <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                  Все операции
                </button>
              </div>

              <div className="space-y-4">
                {TRANSACTIONS_DATA.map((group) => (
                  <div key={group.dateLabel}>
                    <div className="text-[11px] text-slate-400 mb-2 font-medium">
                      {group.dateLabel}
                    </div>
                    <div className="space-y-2">
                      {group.items.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-800/40 border border-slate-800/40 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-700/50 border border-slate-600/40 flex items-center justify-center text-slate-300 font-bold text-xs">
                              {tx.source[0]}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-200">{tx.title}</div>
                              <div className="inline-block px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-300 text-[10px] font-medium mt-0.5 border border-rose-900/40">
                                {tx.source}
                              </div>
                            </div>
                          </div>

                          <div
                            className={`text-xs font-bold ${
                              tx.type === 'income' ? 'text-emerald-400' : 'text-slate-200'
                            }`}
                          >
                            {tx.type === 'income' ? '+' : '-'} {tx.amount.toLocaleString('ru-RU')} ₽
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
    );
}
 
export default Transactions;