import { listAccount } from "../../data";
import type { Transaction } from "../../shared/types/user";

const ListTransactions = () => {
    let listTransactions: Transaction[] = []

    listAccount.forEach(i => {
        i.transaction.forEach(t => listTransactions.push(t))
        console.log(listTransactions)
    })


    return (
        <ul className="list-transactions">
            {
                listTransactions.map(i => 
                    <li>
                        {i.date}
                        {i.sum}
                        {i.time}
                    </li>
                )
            }
        </ul>
    );
}
 
export default ListTransactions;