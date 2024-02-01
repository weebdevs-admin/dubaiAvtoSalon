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
      toast.error('Iltimos rasm tanlang!');
      return;
    }

    try {
      // Gzip orqali yuborish uchun headers ni sozlash
      const headers = {
        'Content-Encoding': 'gzip',
        'Content-Type': 'image/jpeg', // Fayl formatiga qarab o'zgartiring
      };

      // Faylni Gzip qilib, serverga yuborish uchun tayyorlash
      const gzippedFile = await gzipFile(file);

      // Gzipped faylni FormData ga joylashtirish
      const formData = new FormData();
      formData.append('file', gzippedFile);

      // Make a POST request to upload the gzipped image
      await axios.post('https://dubaiavto.uz/upload', formData, {
        headers,
      });

      const response = await axios.post('https://dubaiavto.uz/slider/create', { img: file.name }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data) {
        toast.success('Slider joylandi');
      } else {
        toast.error('Xatolik yuz berdi!');
      }

    } catch (error) {
      console.error('Error uploading gzipped image:', error);
      toast.error('Error uploading gzipped image');
    }
  };

  const gzipFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' }); // Fayl formatiga qarab o'zgartiring
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
      toast.success(' deleted successfully');

      // Fetch the updated list of images
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Error deleting image');
    }
  };

  return (
    <>
      <ToastContainer />
      {navbar ? <Sidebar /> : null}
      <Navbar />
      <div className='main'>
        <h2>Slider O'rnatish</h2>
        <div className='main-form'>
          <label>
            <input type="file" onChange={handleFileChange} />
          </label>
          <button onClick={handleUpload}>Qo'shish</button>
        </div>
        <div className="image-container">
          {images && images.map((e) => (
            <div key={e.index} className="image-card">
              <img src={`https://dubaiavto.uz/uploads/${e.img}`} alt={e} />
              <button className='del-btn' onClick={() => handleDelete(e)}>O'chirish</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Slider;
