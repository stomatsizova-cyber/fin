import type { AccountsProps } from "../../shared/types/user";

const ListAccounts = ({ account }: AccountsProps) => {

    return (
        <ul className="list-acconts">
            {
                account.map((i) => (
                    <li key={i.id}>
                        {i.name}
                        {i.money}
                    </li>
                ))
            }
        </ul>
    );
}
 
export default ListAccounts;