import React from 'react';

import './Index.css'
import Header from '../Header/Header';
import MetricsCards from '../MetricsCards/MetricsCards';
import { NetWorthChartSection } from '../NetWorthChartSection/NetWorthChartSection';
import AccountsList from '../AccountsList/AccountsList';
import { ExpensesDoughnutSection } from '../DonutChart/DonutChart';
import Transactions from '../Transactions/Transactions';



export default function App(): React.ReactElement {
  return (
    <div className="min-h-screen bg-[#090a10] text-slate-100 font-sans p-3 sm:p-6 md:p-8 selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 1. Header Bar */}
        <Header/>

        {/* 2. Top Metrics Cards (4 items layout) */}
        <MetricsCards/>

        {/* 3. Dashboard Body Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AccountsList />
          <NetWorthChartSection />
        </section>
        {/* Transactions & Doughnut Chart */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Transactions />

          <ExpensesDoughnutSection />
        </section>
      </div>
    </div>
  );
}