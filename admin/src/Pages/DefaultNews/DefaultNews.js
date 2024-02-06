import React, { useContext, useEffect, useState } from 'react';
import '../Abaut/Abaut.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { Context } from '../../Context/Context';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function DefaultNews() {
  const { navbar, setNavbar } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    img: '...',
    title: '...',
    desc: '...',
  });
  useEffect(() => {
    axios.get('https://dubaiavto.uz/defaultnews')
      .then((response) => {
        if (response.data.length > 0) {
          const initialData = response.data[0]; // Avvalgi ma'lumotlardan birini tanlab olish
          setFormData({
            img: initialData.img,
            title: initialData.title,
            desc: initialData.desc,
          });
        }
      })
      .catch((error) => {
        console.error('Ma\'lumotlarni olishda xatolik yuzaga keldi:', error);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( formData.title !== '...' || formData.desc !== '...') {
      try {
        const response = await axios.put(
          'https://dubaiavto.uz/defaultnews/update/65c1fd3f2c5c2b6fce05614f',
          formData
        );

        if (response.status === 200) {
          toast.success('Информация успешно обновлена')
        }
      } catch (error) {
        console.error('Ma\'lumotni yangilashda xatolik yuzaga keldi:', error);
        // Xatolikni qayta ishlang
      }
    } else {
      toast.warning('Данные сохраняются без изменений.');
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFormData({
      ...formData,
      img: event.target.files[0] ? event.target.files[0].name : '...',
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Пожалуйста, выберите картинку!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Make a POST request to upload the image
      await axios.post('https://dubaiavto.uz/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      // Display success message
    } catch (error) {
      console.error('Ошибка при загрузке изображения:', error);
      toast.error('Ошибка при загрузке изображения');
    }
  };
 
  

  

  return (
    <>
      <ToastContainer />
      {navbar ? <Sidebar /> : null}
      <Navbar />
      <div className='main'>
        <h2>Новости по умолчанию</h2>
        <form onSubmit={handleSubmit} className='main-form'>
          <label>
            <input type="file" onChange={handleFileChange} />
          </label>
          
          <label>
            <input
              type='text'
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Заголовок"
            />
          </label>
          <label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              placeholder="Полная информация"
            />
          </label>
          <button type="submit" onClick={handleUpload}>Обновлять</button>
        </form>
        
      </div>
    </>
  );
}

export default DefaultNews;
