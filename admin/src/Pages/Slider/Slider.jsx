import React, { useContext, useEffect, useState } from 'react';
import './Slider.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { Context } from '../../Context/Context';
import 'react-toastify/dist/ReactToastify.css';
import Resizer from 'react-image-file-resizer';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function Slider() {
  const { navbar, setNavbar } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState(null);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        3000, // Adjust the width as needed
        1000, // Adjust the height as needed
        'JPEG',
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64',
        // 1 * 1024 * 1024, // 1MB limit
        // 1 * 1024 * 1024 // 1MB limit
      );
    });

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];

      // Check if the selected file is an image
      if (!file.type.startsWith('image/')) {
        toast.error('Выбранный файл не является изображением.');
        return;
      }

      const resizedImage = await resizeFile(file);
      setSelectedFile(resizedImage);
    } catch (err) {
      console.log(err);
      toast.error('Ошибка при обработке изображения.');
    }
  };

  const handleUpload = async () => {
    try {
      // Check if a file is selected
      if (!selectedFile) {
        toast.error('Пожалуйста, выберите изображение.');
        return;
      }

      // Upload the base64 image to the server
      await axios.post('https://dubaiavto.uz/slider/create', { img: selectedFile }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success('Слайдер установлен.');

      // Fetch the updated list of images
      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Ошибка при загрузке изображения.');
    }
  };

  useEffect(() => {
    // Fetch the list of images when the component mounts
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('https://dubaiavto.uz/slider');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleDelete = async (image) => {
    try {
      // Make a DELETE request to delete the image from the server
      await axios.delete(`https://dubaiavto.uz/slider/delete/${image._id}`);

      // Display success message
      toast.success(' успешно удалено');

      // Fetch the updated list of images
      fetchImages();
    } catch (error) {
      console.error('Ошибка удаления изображения.:', error);
      toast.error('Ошибка удаления изображения.');
    }
  };

  return (
    <>
      <ToastContainer />
      {navbar ? <Sidebar /> : null}
      <Navbar />
      <div className='main'>
        <h2>Настройка слайдера</h2>
        <div className='main-form'>
          <label>
            <input type="file" onChange={handleFileChange} />
          </label>
          <button onClick={handleUpload}>Добавлять</button>
        </div>
        <div className="image-container">
          {images && images.map((e) => (
            <div key={e.index} className="image-card">
              <img src={`${e.img}`} alt={e} />
              <button className='del-btn' onClick={() => handleDelete(e)}>удалить</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Slider;
