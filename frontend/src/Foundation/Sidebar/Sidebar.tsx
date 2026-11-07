// import MiniBtn from "../../Items/MiniBtn/Minibtn";

import { RiHome2Fill } from "@remixicon/react";

import './Sidebar.scss'


const Sidebar = () => {

    const listBtn = [
        {
            img: 'прикол',
            text: 'Главная'
        },
        {
            img: 'прикол',
            text: 'Операции'
        },
        {
            img: 'прикол',
            text: 'Счета'
        },
        {
            img: 'прикол',
            text: 'Инвестиции'
        },
        {
            img: 'прикол',
            text: 'Бизнес'
        },
        {
            img: 'прикол',
            text: 'Бюджеты'
        },
        {
            img: 'прикол',
            text: 'Цели'
        },
        {
            img: 'прикол',
            text: 'Кредиты'
        },
        {
            img: 'прикол',
            text: 'Подписки'
        },
        {
            img: 'прикол',
            text: 'Колендарь'
        },
    ] 

    const listSettings = [
         {
            text: 'Настройки',
         },
         {
            text: 'О приложение'
         }

    ]

    return (
        <div className="sidebar">
            <button>
                <RiHome2Fill/>Свернуть
            </button>


            <ul className="sidebar-list">
                {
                    listBtn.map((i) => (
                        <li className="sidebar-list-item" key={i.text}>
                            <RiHome2Fill />{i.text}
                        </li>
                    ))
                }
            </ul>
            <ul className="sidebar-settings">
                {
                    listSettings.map((i) => (
                        <li className="sidebar-settings-item" key={i.text}>
                            <RiHome2Fill />{i.text}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
 
export default Sidebar;