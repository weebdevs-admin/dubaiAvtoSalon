import React, { useContext, useEffect, useState } from 'react';
import './Team.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Context } from '../../Context/Context';

function Team() {
  const { navbar, setNavbar } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState(null);
  const [formData, setFormData] = useState({
    img: '',
    type: '',
    firstname: ''
  });

  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('https://dubaiavto.uz/team');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleDelete = async (teamItem) => {
    try {
      await axios.delete(`https://dubaiavto.uz/team/delete/${teamItem._id}`);
      toast.success('успешно удалено');
      fetchImages();
    } catch (error) {
      console.error('Ошибка удаления изображения.:', error);
      toast.error('Ошибка удаления изображения.');
    }
  };

  const handleEdit = (teamItem) => {
    setEditingItemId(teamItem._id);
    setFormData({
      img: teamItem.img,
      type: teamItem.type,
      firstname: teamItem.firstname
    });
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
      img: event.target.files[0] ? event.target.files[0].name : '',
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select an image!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      await axios.post('https://dubaiavto.uz/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Ошибка при загрузке изображения:', error);
      toast.error('Ошибка при загрузке изображения');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.type.trim() !== '' && selectedFile) {
      try {
        if (editingItemId) {
          await axios.put(`https://dubaiavto.uz/team/update/${editingItemId}`, formData);
          toast.success('Информация успешно обновлена');
        } else {
          await axios.post('https://dubaiavto.uz/team/create', formData);
          toast.success('Информация успешно добавлена');
        }

        setEditingItemId(null);
        setFormData({ img: '', type: '' });
        setSelectedFile(null);
        fetchImages();
      } catch (error) {
        console.error('Error updating/adding information:', error);
        toast.error('Ошибка обновления/добавления информации.');
      }
    } else {
      toast.warning('Пожалуйста, заполните информационные поля.');
    }
  };

  return (
    <>
      <ToastContainer />
      {navbar ? <Sidebar /> : null}
      <Navbar />
      <div className='main'>
        <h2>Наша Команда</h2>
        <form onSubmit={handleSubmit} className='main-form'>
          <label>
            <input type="file" onChange={handleFileChange} />
          </label>
          <label>
            <input name='firstname' type='text' 
            value={formData.firstname}
            onChange={handleInputChange} placeholder='Имя'/>
          </label>
          <label>
            <input name='type' type='text' value={formData.type} onChange={handleInputChange} placeholder='Позиция'/>
          </label>
          <button type="submit" onClick={handleUpload}>
          Добавлять
          </button>
        </form>
        <div className="team-container">
          {images &&
            images.map((teamItem) => (
              <div key={teamItem._id} className="team-card">
                <img src={`https://dubaiavto.uz/uploads/${teamItem.img}`} alt={teamItem.type} />
                <div className="team-content">
                  <h3>{teamItem.type}</h3>
                </div>
                <div className="team-actions">
                  <button className='edit-btn' onClick={() => handleEdit(teamItem)}>
                  редактирование
                  </button>
                  <button className='delete-btn' onClick={() => handleDelete(teamItem)}>
                    удалить
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Team;
