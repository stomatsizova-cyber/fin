import type { Account } from "./shared/types/user";

export const listAccount: Account[] = [
    {
        id: 1,
        name: 'Сбер',
        money: 1000,
        transaction: [
            {
                time: '10:26',
                date: '1.10.2026',
                sum: 100
            },
            {
                time: '10:36',
                date: '1.10.2026',
                sum: 50
            }
        ]
    },
    {
        id: 2,
        name: 'ВТБ',
        money: 1200,
        transaction: [
            {
                time: '10:40',
                date: '2.10.2026',
                sum: -100
            }
        ]
    }
]