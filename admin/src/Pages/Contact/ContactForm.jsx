import React, { useContext, useEffect, useState } from 'react';
import './ContactForm.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Context } from '../../Context/Context';

function ContactForm() {
  const { navbar, setNavbar } = useContext(Context);
  const [paymentData, setPaymentData] = useState([]);

  // Malumotni serverdan olish uchun useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentResponse = await axios.get('http://localhost:4100/payment');
        setPaymentData(paymentResponse.data);
      } catch (error) {
        console.error('Malumotlarni olishda xatolik yuzaga keldi', error);
        toast.error('Malumotlarni olishda xatolik yuzaga keldi');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ToastContainer />
      {navbar ? <Sidebar /> : null}
      <Navbar />
      <div className='main'>
        <h2 className="title"> Заявки</h2>
        <ul className="contact-form-list">
          {paymentData.map((payment) => (
            <li key={payment._id}>
              <h4>Имя: {payment.firtname}</h4>
              <p>Наименование товара: {payment.product}</p>
              <p>Номер телефона: {payment.phone}</p>
              <p>Ссылка на продукт: <a href={payment.productLink} target="_blank" rel="noopener noreferrer">информация о продукте</a></p>
              {/* Include other payment details as needed */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ContactForm;
