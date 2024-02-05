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
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [selectedFile3, setSelectedFile3] = useState(null);
    const [selectedFile4, setSelectedFile4] = useState(null);
    const [selectedFile5, setSelectedFile5] = useState(null);
    const [images, setImages] = useState(null);
    const [formData, setFormData] = useState({
        option: 'rasm',
        img: '',
        img2: '',
        img3: '',
        img4: '',
        img5: '',
        title: '',
        desc: '',
        year: '',
        km: '',
        fuel: '',
        price: '',
        category: '',
    });
    const [selectedCategory, setSelectedCategory] = useState(''); // New state for selected category
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredImages = images
        ? selectedCategory
            ? images.filter((newsItem) => newsItem.category === selectedCategory)
            : images
        : [];
    const [editingItemId, setEditingItemId] = useState(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('https://dubaiavto.uz/product');
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleDelete = async (newsItem) => {
        try {
            await axios.delete(`https://dubaiavto.uz/product/delete/${newsItem._id}`);
            toast.success('успешно удалено');
            fetchImages();
        } catch (error) {
            console.error('Ошибка удаления изображения.:', error);
            toast.error('Ошибка удаления изображения.');
        }
    };
    const [imageCard1, setImageCard1] = useState(null)
    const [imageCard2, setImageCard2] = useState(null)
    const [imageCard3, setImageCard3] = useState(null)
    const [imageCard4, setImageCard4] = useState(null)
    const [imageCard5, setImageCard5] = useState(null)
    const handleEdit = (newsItem) => {
        setEditingItemId(newsItem._id);
        setFormData({
            option: 'rasm',
            img: newsItem.img,
            img2: newsItem.img,
            img3: newsItem.img,
            img4: newsItem.img,
            img5: newsItem.img,
            title: newsItem.title,
            desc: newsItem.desc,
            year: newsItem.year,
            price: newsItem.price,
            km: newsItem.km,
            fuel: newsItem.fuel,
            category: newsItem.category
        });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if ((name === 'option' || name === 'fuel' || name === 'km') && value === 'video') {
            setFormData({
                ...formData,
                [name]: value,
                img: '',
            });
        } else if ((name === 'option' || name === 'fuel' || name === 'km') && value === 'rasm') {
            setFormData({
                ...formData,
                [name]: value,
                iframe: '',
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setFormData({
            ...formData,
            img: event.target.files[0] ? event.target.files[0].name : '...',

        });
        const file = event.target.files[0];

        // Check if a file is selected
        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                // Set the selected file content as the image source
                setImageCard1({
                    ...imageCard1,
                    img: event.target.result,
                });
            };

            reader.readAsDataURL(file);
        }

    };

    const handleFileChange2 = (event) => {
        setSelectedFile2(event.target.files[0]);
        setFormData({
            ...formData,
            img2: event.target.files[0] ? event.target.files[0].name : '...',
        });
        const file = event.target.files[0];

        // Check if a file is selected
        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                // Set the selected file content as the image source
                setImageCard2({
                    ...imageCard2,
                    img: event.target.result,
                });
            };

            reader.readAsDataURL(file);
        }
    };

    const handleFileChange3 = (event) => {
        setSelectedFile3(event.target.files[0]);
        setFormData({
            ...formData,
            img3: event.target.files[0] ? event.target.files[0].name : '...',
        });
        const file = event.target.files[0];

        // Check if a file is selected
        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                // Set the selected file content as the image source
                setImageCard3({
                    ...imageCard3,
                    img: event.target.result,
                });
            };

            reader.readAsDataURL(file);
        }
    };

    const handleFileChange4 = (event) => {
        setSelectedFile4(event.target.files[0]);
        setFormData({
            ...formData,
            img4: event.target.files[0] ? event.target.files[0].name : '...',
        });
        const file = event.target.files[0];

        // Check if a file is selected
        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                // Set the selected file content as the image source
                setImageCard4({
                    ...imageCard4,
                    img: event.target.result,
                });
            };

            reader.readAsDataURL(file);
        }
    };

    const handleFileChange5 = (event) => {
        setSelectedFile5(event.target.files[0]);
        setFormData({
            ...formData,
            img5: event.target.files[0] ? event.target.files[0].name : '...',
        });
        const file = event.target.files[0];

        // Check if a file is selected
        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                // Set the selected file content as the image source
                setImageCard5({
                    ...imageCard5,
                    img: event.target.result,
                });
            };

            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            return;
        }

        try {
            const formDataArray = [selectedFile, selectedFile2, selectedFile3, selectedFile4, selectedFile5];

            // Gzip orqali yuklash uchun headers ni sozlash
            const headers = {
                'Content-Encoding': 'gzip',
                'Content-Type': 'image/jpeg', // Rasmlarning formatiga qarab o'zgartiring
            };

            // Har bir form data uchun alohida so'rov jo'natish
            for (let i = 0; i < formDataArray.length; i++) {
                const formData = new FormData();
                formData.append('file', formDataArray[i]);

                // Gzip orqali so'rovni yuborish
                await axios.post('https://dubaiavto.uz/upload', formData, {
                    headers,
                });
            }

            toast.success('Изображения успешно загружены');
        } catch (error) {
            console.error('Ошибка при загрузке изображенияs:', error);
            toast.error('Произошла ошибка при загрузке изображений');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.title !== '...' || formData.desc !== '...') {
            try {
                if (editingItemId) {
                    await axios.put(`https://dubaiavto.uz/product/update/${editingItemId}`, formData);
                    toast.success('Информация успешно обновлена');
                } else {
                    await axios.post('https://dubaiavto.uz/product/create', formData);
                    toast.success('Добавлена ​​информация');
                }

                setEditingItemId(null);
                setFormData({
                    option: 'rasm',
                    img: '',
                    img2: '',
                    img3: '',
                    img4: '',
                    img5: '',
                    title: '',
                    desc: '',
                    year: '',
                    km: '',
                    fuel: '',
                    price: '',
                    category: ''
                });
                setSelectedFile(null);
                fetchImages();
            } catch (error) {
                console.error('Error updating/adding information:', error);
                toast.error('Ошибка обновления/добавления информации.');
            }
        } else {
            toast.warning('Информация, не измененная в полях.');
        }
    };
    
    return (
        <>
            <ToastContainer />
            {navbar ? <Sidebar /> : null}
            <Navbar />
            <div className='main'>
                <h2>Добавить автомобиль</h2>
                <form onSubmit={handleSubmit} className='main-form'>
                    <div className='image-form'>
                        <input type="file" onChange={handleFileChange} />
                        <input type="file" onChange={handleFileChange2} />
                        <input type="file" onChange={handleFileChange3} />
                        <input type="file" onChange={handleFileChange4} />
                        <input type="file" onChange={handleFileChange5} />
                    </div>
                    <div className='previews-img'>
                    <img src={imageCard1 && imageCard1.img} alt="" />
                    <img src={imageCard2 && imageCard2.img} alt="" />
                    <img src={imageCard3 && imageCard3.img} alt="" />
                    <img src={imageCard4 && imageCard4.img} alt="" />
                        <img src={imageCard5 && imageCard5.img} alt="" />
                        
                    </div>
                    <label>
                        <select name="category" onChange={handleInputChange} value={formData.category || ''}>
                            <option>Выбирать</option>
                            <option value="stock">В наличии</option>
                            <option value="order">Под заказ</option>
                        </select>
                    </label>
                    <label>
                        <input
                            type='text'
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Имя машины"
                        />
                    </label>
                    <label>
                        <input
                            type='text'
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            placeholder="Год автомобиля"
                        />
                    </label>
                    <label>
                        <input
                            type='text'
                            name="fuel"
                            value={formData.fuel}
                            onChange={handleInputChange}
                            placeholder="Топливо"
                        />
                    </label>
                    <label>
                        <input
                            type='text'
                            name="km"
                            value={formData.km}
                            onChange={handleInputChange}
                            placeholder="пробег"
                        />
                    </label>
                    <label>
                        <input
                            type='number'
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Цена"
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
                    <button type="submit" onClick={handleUpload}>
                        Обновлять
                    </button>
                </form>
                <div className='category-btn'>
                    <button onClick={() => handleCategoryChange('stock')}>В наличии</button>
                    <button onClick={() => handleCategoryChange('order')}>Под заказ</button>
                </div>
                <div className="news-container">
                    {filteredImages.map((newsItem) => (
                        <div key={newsItem._id} className="news-card">
                             {newsItem.img && <img src={`https://dubaiavto.uz/uploads/${newsItem.img}`} alt={newsItem.title} />}
                                {newsItem.iframe && <iframe width="100%" height="auto" src={newsItem.iframe} title={newsItem.title}></iframe>}
                                <div className="news-content">
                                    <h3>{newsItem.title}</h3>
                                </div>
                                <div className="news-actions">
                                    <button className='edit-btn' onClick={() => handleEdit(newsItem)}>
                                        Редактирование
                                    </button>
                                    <button className='delete-btn' onClick={() => handleDelete(newsItem)}>
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

export default Product;
