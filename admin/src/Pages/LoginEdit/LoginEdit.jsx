import React, { useContext, useState } from 'react';
import './LoginEdit.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { Context } from '../../Context/Context';
import { toast, ToastContainer } from 'react-toastify';

function LoginEdit() {
  const { navbar, setNavbar } = useContext(Context);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error('Пожалуйста, заполните все поля.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error(' Ошибка подтверждения нового пароля.');
      return;
    }

    axios
      .get('https://dubaiavto.uz/login')
      .then((response) => {
        if (response.status === 200) {
          const apiPassword = response.data[0].Password;
          if (currentPassword === apiPassword) {
            // Joriy parol API-dagi parol bilan to'g'ri keladi
            axios
              .put('https://dubaiavto.uz/login/update/65ba67861348fc26c28d2a30', {
                Password: newPassword,
              })
              .then((response) => {
                if (response.status === 200) {
                  toast.success('Пароль успешно изменен.');
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmNewPassword('');
                }
              })
              .catch((error) => {
                toast.error('Произошла ошибка при смене пароля.');
                console.error('Xatolik:', error);
              });
          } else {
            toast.error('Текущий пароль неверен.');
          }
        }
      })
      .catch((error) => {
        toast.error('Произошла ошибка при подключении к серверу.');
        console.error('Xatolik:', error);
      });
  };

  return (
    <>
      <ToastContainer />
      {navbar ? <Sidebar /> : null}
      <Navbar />
      <div className='Forgot'>
      <h3 className="title">изменить пароль</h3>
      <form className="form">
        <input
          type="password"
          placeholder="Текущий пароль"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Повторите новый пароль"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <button type="button" onClick={handlePasswordChange}>
        Обновлять
        </button>
      </form>
      </div>
    </>
  );
}

export default LoginEdit;
