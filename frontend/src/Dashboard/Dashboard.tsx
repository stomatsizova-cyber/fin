// import { Filter } from "lucide-react";
// import { EXPENSES_CHART_DATA, INCOME_CHART_DATA, TRANSACTIONS_DATA } from "../data";
// import type { ChartSegment, ChartType, TransactionGroup, TransactionItem } from "../shared/types/user";
// import { formatCurrency } from "../shared/utils/helpers";

import TransactionsList from "../TransactionsList/TransactionsList";


const Dashboard = () => {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Block: Transactions List (7 Cols) */}
          <TransactionsList />

          {/* Right Block: Donut Chart Section (5 Cols) */}


        </div>
    );
}
 
export default Dashboard;