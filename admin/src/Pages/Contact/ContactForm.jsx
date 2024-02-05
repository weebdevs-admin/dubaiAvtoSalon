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
        const paymentResponse = await axios.get('https://dubaiavto.uz/payment');
        setPaymentData(paymentResponse.data);
      } catch (error) {
        console.error('Malumotlarni olishda xatolik yuzaga keldi', error);
        toast.error('Malumotlarni olishda xatolik yuzaga keldi');
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (paymentId) => {
    try {
      // Send a DELETE request to the server
      await axios.delete(`https://dubaiavto.uz/payment/delete/${paymentId}`);

      // Update the state to remove the deleted payment
      setPaymentData((prevData) => prevData.filter((payment) => payment._id !== paymentId));

      toast.success('Заявка успешно удалена');
    } catch (error) {
      console.error('Xatolik yuzaga keldi', error);
      toast.error('Xatolik yuzaga keldi. Пожалуйста, попробуйте еще раз.');
    }
  };

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
              <b>{payment.product}</b>
              <p>Номер телефона: {payment.phone}</p>
              <p>Ссылка: <a href={payment.productLink} target="_blank" rel="noopener noreferrer">информация </a></p>
              <button className='delete-btn' onClick={() => handleDelete(payment._id)}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ContactForm;
