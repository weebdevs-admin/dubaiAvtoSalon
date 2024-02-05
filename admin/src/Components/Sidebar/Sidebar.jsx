import React, { useContext } from 'react';
import './Sidebar.scss';
import {Link} from 'react-router-dom'
import { Context } from '../../Context/Context';

const Sidebar = () => {
    const {setNavbar}= useContext(Context)
    function logout(){
        window.localStorage.clear() 
    }
    return (
        <aside className="sidebar contai">
            <ul className="sidebar-list container">
                <Link className='exit-btn'><li className="sidebar-item"><i onClick={()=>setNavbar(false)} className="fa-solid fa-xmark"></i> </li></Link>
                <Link className='dashboard'><li className="sidebar-item"><i className="fa-solid fa-gear"></i> Управление</li></Link>
                
                <Link to='/'><li className="sidebar-item"><i className="fa-solid fa-house"></i> Главное меню</li></Link>
                <Link to='/product' ><li className="sidebar-item"><i className="fa-solid fa-car"></i> Добавить автомобиль</li></Link>
                <Link to='/iframe'><li className="sidebar-item"><i className="fa-solid fa-link"></i> Ссылка на You Tube</li></Link>
                <Link to='/slider'><li className="sidebar-item"><i className="fa-solid fa-image"></i> Слайдер</li></Link>
                <Link to='/photos'><li className="sidebar-item"><i className="fa-solid fa-image"></i> Галлерия</li></Link>
                <Link to='/abaut'><li className="sidebar-item"><i className="fa-solid fa-address-card"></i> О нас</li></Link>
                <Link to='/partners'><li className="sidebar-item"><i className="fa-solid fa-users"></i> Бренды</li></Link>
                <Link to='/news'><li className="sidebar-item"><i className="fa-solid fa-book"></i> Новости</li></Link>
                <Link to='/contact'><li className="sidebar-item"><i className="fa-solid fa-address-book"></i> Заявки</li></Link>
                <Link to='/team'><li className="sidebar-item"><i className="fa-solid fa-users"></i> Наша Команда</li></Link>
                
                <Link to='/password'><li className="sidebar-item"><i class="fa-solid fa-lock"></i> Изменить пароль</li></Link>
                <Link onClick={logout}><li className="sidebar-item"><i className="fa-solid fa-right-to-bracket"></i> Выход</li></Link>
            </ul>
        </aside>
    );
};

export default Sidebar;
