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
      const response = await axios.get('http://localhost:4100/team');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleDelete = async (teamItem) => {
    try {
      await axios.delete(`http://localhost:4100/team/delete/${teamItem._id}`);
      toast.success('deleted successfully');
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Error deleting image');
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
      await axios.post('http://localhost:4100/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.type.trim() !== '' && selectedFile) {
      try {
        if (editingItemId) {
          await axios.put(`http://localhost:4100/team/update/${editingItemId}`, formData);
          toast.success('Information updated successfully');
        } else {
          await axios.post('http://localhost:4100/team/create', formData);
          toast.success('Information added successfully');
        }

        setEditingItemId(null);
        setFormData({ img: '', type: '' });
        setSelectedFile(null);
        fetchImages();
      } catch (error) {
        console.error('Error updating/adding information:', error);
        toast.error('Error updating/adding information');
      }
    } else {
      toast.warning('Please fill in the information fields.');
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
            onChange={handleInputChange} placeholder='Ism'/>
          </label>
          <label>
            <input name='type' type='text' value={formData.type} onChange={handleInputChange} placeholder='Lavozimi'/>
          </label>
          <button type="submit" onClick={handleUpload}>
            Qo'shish
          </button>
        </form>
        <div className="team-container">
          {images &&
            images.map((teamItem) => (
              <div key={teamItem._id} className="team-card">
                <img src={`http://localhost:4100/uploads/${teamItem.img}`} alt={teamItem.type} />
                <div className="team-content">
                  <h3>{teamItem.type}</h3>
                </div>
                <div className="team-actions">
                  <button className='edit-btn' onClick={() => handleEdit(teamItem)}>
                    taxrirlash
                  </button>
                  <button className='delete-btn' onClick={() => handleDelete(teamItem)}>
                    o'chirish
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
