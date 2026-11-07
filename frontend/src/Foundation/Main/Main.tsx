import { listAccount } from "../../data";
import ListAccounts from "../../Middles/ListAccounts/ListAccounts";
import NetCapital from "../../Middles/CleanCapital/NetCapital"


import './Main.scss'
import IncomeExpenses from "../../Middles/IncomeExpenses/IncomeExpenses";
import ListTransactions from "../../Middles/ListTransactions/ListTransactions";

const Main = () => {

    return (
        <div className="main">
            <NetCapital />
            <ListAccounts account={listAccount} />
            <IncomeExpenses />
            <ListTransactions />
        </div>
    );
}
 
export default Main;