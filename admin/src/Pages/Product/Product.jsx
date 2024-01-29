import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../News/News.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { Context } from '../../Context/Context';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function Product() {
    const { navbar, setNavbar } = useContext(Context);
    const [selectedFile, setSelectedFile] = useState(null);
    const [images, setImages] = useState(null);
    const [formData, setFormData] = useState({
        option: 'rasm',
        img: '',
        title: '',
        desc: '',
        year: '',
        type1: '',
        type2: '',
        type3: '',
        type4: '',
        price: '',
        category: '',
    });

    const [editingItemId, setEditingItemId] = useState(null); // Yangi qo'shilgan qism taxrirlanishi uchun

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://172.20.10.2:4100/product');
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleDelete = async (newsItem) => {
        try {
            await axios.delete(`http://172.20.10.2:4100/product/delete/${newsItem._id}`);
            toast.success('deleted successfully');
            fetchImages();
        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('Error deleting image');
        }
    };

    const handleEdit = (newsItem) => {
        setEditingItemId(newsItem._id);
        setFormData({
            option: 'rasm', // Sizning option turingizga qarab, agar tanlangan option 'rasm' bo'lsa, sizga rasmni tanlash uchun input chiqadi; aks holda, 'video' bo'lsa, video linkni kiritish uchun text input.
            img: newsItem.img,
            title: newsItem.title,
            desc: newsItem.desc,
            year: newsItem.year,
            type1: newsItem.type1,
            type2: newsItem.type2,
            type3: newsItem.type3,
            type4: newsItem.type4,
            price: newsItem.price,
            category: newsItem.category
        });
    };

    // ... (yukoridagi kodlar)

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Agar o'zgaruvchini nomi "option" bo'lsa va qiymati "video" bo'lsa, "img"ni bo'sh qo'yamiz
        if (name === 'option' && value === 'video') {
            setFormData({
                ...formData,
                [name]: value,
                img: '', // Rasmni bo'sh qilish
            });
        } else if (name === 'option' && value === 'rasm') {
            setFormData({
                ...formData,
                [name]: value,
                iframe: '', // Video linkni bo'sh qilish
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // ... (qolgan kodlar)


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setFormData({
            ...formData,
            img: event.target.files[0] ? event.target.files[0].name : '...',
        });
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            await axios.post('http://172.20.10.2:4100/upload', formData, {
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

        if (formData.title !== '...' || formData.desc !== '...') {
            try {
                if (editingItemId) {
                    // If editingItemId exists, update the existing item
                    await axios.put(`http://172.20.10.2:4100/product/update/${editingItemId}`, formData);
                    toast.success('Information updated successfully');
                } else {
                    // If editingItemId doesn't exist, create a new item
                    await axios.post('http://172.20.10.2:4100/product/create', formData);
                    toast.success('Ma\'lumot qo\'shildi');
                }

                setEditingItemId(null);
                setFormData({
                    option: 'rasm',
                    img: '',
                    title: '',
                    desc: '',
                    year: '',
                    type1: '',
                    type2: '',
                    type3: '',
                    type4: '',
                    price: '',
                    category: ''
                });
                setSelectedFile(null);
                fetchImages();
            } catch (error) {
                console.error('Error updating/adding information:', error);
                toast.error('Error updating/adding information');
            }
        } else {
            toast.warning('Information not modified in the fields.');
        }
    };

    return (
        <>
            <ToastContainer />
            {navbar ? <Sidebar /> : null}
            <Navbar />
            <div className='main'>
                <h2>Mashinalar</h2>
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
                            placeholder="Mashina nomi"
                        />
                    </label>
                    <label>
                        <input
                            type='text'
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            placeholder="Yili"
                        />
                    </label>
                    <label>
                        <select name="category" onChange={handleInputChange} value={formData.category || ''}>
                            <option >Choose</option>
                            <option value="stock">В наличии</option>
                            <option value="order">Под заказ</option>
                        </select>
                    </label>
                    <label>
                        <input
                            type='text'
                            name="type1"
                            value={formData.type1}
                            onChange={handleInputChange}
                            placeholder="Type 1"
                        />
                    </label>
                    <label>
                        <input
                            type='text'
                            name="type2"
                            value={formData.type2}
                            onChange={handleInputChange}
                            placeholder="Type 2"
                        />
                    </label>
                    <label>
                        <input
                            type='text'
                            name="type3"
                            value={formData.type3}
                            onChange={handleInputChange}
                            placeholder="Type 3"
                        />
                    </label>
                    <label>
                        <input
                            type='text'
                            name="type4"
                            value={formData.type4}
                            onChange={handleInputChange}
                            placeholder="Type 4"
                        />
                    </label>
                    <label>
                        <input
                            type='number'
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Narxi"
                        />
                    </label>
                    <label>
                        <textarea
                            name="desc"
                            value={formData.desc}
                            onChange={handleInputChange}
                            placeholder="To'liq ma'lumot"
                        />
                    </label>


                    <button type="submit" onClick={handleUpload}>
                        Yangilash
                    </button>
                </form>
                <div className="news-container">
                    {images &&
                        images.map((newsItem) => (
                            <div key={newsItem._id} className="news-card">
                                {newsItem.img && <img src={`http://172.20.10.2:4100/uploads/${newsItem.img}`} alt={newsItem.title} />}
                                {newsItem.iframe && <iframe width="100%" height="auto" src={newsItem.iframe} title={newsItem.title}></iframe>}
                                <div className="news-content">
                                    <h3>{newsItem.title}</h3>
                                </div>
                                <div className="news-actions">
                                    <button className='edit-btn' onClick={() => handleEdit(newsItem)}>
                                        Taxrirlash
                                    </button>
                                    <button className='delete-btn' onClick={() => handleDelete(newsItem)}>
                                        O'chirish
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

export default Product;
