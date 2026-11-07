import { listAccount } from "../../data";

const IncomeExpenses = () => {

    const incomeArrey: number[] = []
    const expexsesArrey: number[] = []
    
    listAccount.forEach(account => {
        account.transaction.forEach(t => {
            if (t.sum > 0) {
                incomeArrey.push(t.sum)
            } else {
                expexsesArrey.push(t.sum)
            }
        })
    })
    
    let income = incomeArrey.reduce((a, b) => a + b, 0)
    let expenses = expexsesArrey.reduce((a, b) => a +b, 0)

    return (
        <div className="income-expenses">
            <div className="income">
                Расход
                {income}
            </div>
            <div className="expenses">
                Доход
                {expenses}
            </div>
        </div>
    );
}
 
export default IncomeExpenses;