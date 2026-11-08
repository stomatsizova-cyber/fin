import { Bell, Calendar, ChevronDown, PieChartIcon, Plus, Search } from "lucide-react";
import { useState } from "react";

const Header = () => {
      const [selectedPeriod] = useState<string>('Октябрь 2026');
        const [searchQuery, setSearchQuery] = useState<string>('');
        const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    return (
        <header className="relative bg-[#131522]/80 backdrop-blur-xl border border-slate-800/80 rounded-full px-5 py-3 shadow-2xl flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <PieChartIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                CapitalFlow
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">Финансовый обзор</p>
            </div>
          </div>

          {/* Controls / Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Period Selector Button */}

            {/* Quick Search */}
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <input
                  type="text"
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  onBlur={() => searchQuery === '' && setIsSearchOpen(false)}
                  autoFocus
                  className="w-32 sm:w-48 px-3 py-1 text-xs bg-slate-800 border border-slate-700 rounded-full text-white focus:outline-none focus:border-indigo-500 transition-all"
                />
              ) : (
                <button 
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="w-9 h-9 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white transition"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <button 
              type="button"
              className="relative w-9 h-9 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white transition"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            </button>

            {/* Add Transaction Action Button */}
            <button 
              type="button"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Добавить</span>
            </button>
          </div>
        </header>
    );
}
 
export default Header;