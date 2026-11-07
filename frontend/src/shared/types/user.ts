export interface Account {
    id: number
    name: string
    money: number
    transaction: Transaction[]
}

export interface Transaction {
    time: string,
    date: string,
    sum: number
}

export interface AccountsProps {
    account: Account[]
}