import React, { useContext, useEffect, useState } from 'react';
import './Slider.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { Context } from '../../Context/Context';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function Slider() {
  const { navbar, setNavbar } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState(null);

  const uploadFileWithGzip = async (file) => {
    if (!file) {
      toast.error('Пожалуйста, выберите картинку!');
      return;
    }
  
    try {
      const headers = {
        'Content-Encoding': 'gzip',
        'Content-Type': file.type,
      };
  
      const gzippedFile = await gzipFile(file);
  
      const formData = new FormData();
      formData.append('file', gzippedFile, file.name); // Use the original filename
  
      await axios.post('https://dubaiavto.uz/upload', formData, {
        headers,
      });
  
      const response = await axios.post('https://dubaiavto.uz/slider/create', { img: file.name }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.data) {
        toast.success('Слайдер установлен.');
      } else {
        toast.error('Произошла ошибка!');
      }
  
      // Fetch the updated list of images
      fetchImages();
    } catch (error) {
      console.error('Error uploading gzipped image:', error);
      toast.error('Ошибка при загрузке изображения в формате gzip.');
    }
  };
  
  const gzipFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const blob = new Blob([arrayBuffer], { type: file.type }); // Use the file's actual content type
        resolve(blob);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    uploadFileWithGzip(selectedFile);
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
              <img src={`https://dubaiavto.uz/uploads/${e.img}`} alt={e} />
              <button className='del-btn' onClick={() => handleDelete(e)}>удалить</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Slider;
