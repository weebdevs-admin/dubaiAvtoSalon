(function ($) {
    "use strict";

    /*=============================================
        =    		 Preloader			      =
    =============================================*/
    function preloader() {
        $('.preloader').delay(0).fadeOut();
    };

    $(window).on('load', function () {
        preloader();

    });

    /*=============================================
        =     Menu sticky & Scroll to top      =
    =============================================*/
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll < 245) {
            $("#sticky-header").removeClass("sticky-menu");
            $('.scroll-to-target').removeClass('open');

        } else {
            $("#sticky-header").addClass("sticky-menu");
            $('.scroll-to-target').addClass('open');
        }
    });


    /*=============================================
        =    		 Scroll Up  	         =
    =============================================*/
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function () {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);

        });
    }

    var swiper = new Swiper(".mySwiper", {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 0,
        parallax: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
        speed: 800,
        autoplayDisableOnInteraction: false,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    
    /*=============================================
        =           Data Background             =
    =============================================*/
    $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    });




    /*=============================================
    =    		VideoPlay 	         =
=============================================*/
    $('.popup-youtube').magnificPopup({
        type: 'iframe'
    });
    $('#demoslide3').owlCarousel({
        loop: true,
        autoplay: true,
        autoPlaySpeed: 5000,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        margin: 25,
        responsiveClass: true,
        navText: ["<img src='./images/left-arrow.png'/>", "<img src='./images/right-arrow.png'/>"],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                autoplay: true,
                autoplayHoverPause: false,
                nav: true,
                dots: false,
                loop: true
            }
        }
    });

    $('#demoslide4').owlCarousel({
        loop: true,
        autoplay: true,
        autoPlaySpeed: 5000,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        margin: 25,
        responsiveClass: true,
        navText: ["<img src='./images/left-arrow.png'/>", "<img src='./images/right-arrow.png'/>"],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                autoplay: true,
                autoplayHoverPause: false,
                nav: true,
                dots: false,
                loop: true
            }
        }
    });


    $('#demoslide5').owlCarousel({
        loop: true,
        autoplay: true,
        autoPlaySpeed: 5000,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        margin: 25,
        responsiveClass: true,

        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 1,
                nav: false
            },
            1000: {
                items: 1,
                autoplay: true,
                autoplayHoverPause: false,
                nav: true,
                dots: false,
                loop: true
            }
        }
    })


    /*=============================================
        =    		testmonial-4 	         =
    =============================================*/
    $('.owl-demo5').owlCarousel({
        loop: true,
        autoplay: true,
        autoPlaySpeed: 5000,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        margin: 25,
        responsiveClass: true,
        navText: ["<img src='./images/left-arrow-small.png'/>", "<img src='./images/right-arrow-small.png'/>"],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 4,
                autoplay: true,
                autoplayHoverPause: false,
                nav: true,
                dots: false,
                loop: true
            }
        }
    });


    /*=============================================
    =    		testmonial-2 	         =
=============================================*/
    $('.owl-demo2').owlCarousel({
        loop: true,
        autoplay: true,
        autoPlaySpeed: 5000,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        margin: 25,
        responsiveClass: true,
        navText: ["<img src='./images/left-arrow-small.png'/>", "<img src='./images/right-arrow-small.png'/>"],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 1,
                nav: false
            },
            1000: {
                items: 2,
                autoplay: true,
                autoplayHoverPause: false,
                nav: true,
                dots: false,
                loop: true
            }
        }
    });
    /*=============================================
=    		FAQ 	         =
=============================================*/
    $(".set > a").on("click", function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this)
                .siblings(".content")
                .slideUp(200);
            $(".set > a i")
                .removeClass("fa-minus")
                .addClass("fa-plus");
        } else {
            $(".set > a i")
                .removeClass("fa-minus")
                .addClass("fa-plus");
            $(this)
                .find("i")
                .removeClass("fa-plus")
                .addClass("fa-minus");
            $(".set > a").removeClass("active");
            $(this).addClass("active");
            $(".content").slideUp(200);
            $(this)
                .siblings(".content")
                .slideDown(200);
        }
    });

    //Submenu Dropdown Toggle
    if ($('.main-header li.dropdown ul').length) {
        $('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');

        //Dropdown Button
        $('.main-header li.dropdown .dropdown-btn').on('click', function () {
            $(this).prev('ul').slideToggle(500);
        });

        //Disable dropdown parent link
        //$('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
        //e.preventDefault();
        //});
    }

    //Mobile Nav Hide Show
    if ($('.mobile-menu').length) {

        var mobileMenuContent = $('.main-header .nav-outer .main-menu .navigation').html();
        $('.mobile-menu .navigation').append(mobileMenuContent);
        $('.sticky-header .navigation').append(mobileMenuContent);
        $('.mobile-menu .close-btn').on('click', function () {
            $('body').removeClass('mobile-menu-visible');
        });
        //Dropdown Button
        $('.mobile-menu li.dropdown .dropdown-btn').on('click', function () {
            $(this).prev('ul').slideToggle(500);
        });
        //Menu Toggle Btn
        $('.mobile-nav-toggler').on('click', function () {
            $('body').addClass('mobile-menu-visible');
        });

        //Menu Toggle Btn
        $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function () {
            $('body').removeClass('mobile-menu-visible');
        });

    }

})(jQuery);


//Count

// JavaScript to open and close modal
function openModal() {
    var modalContent = document.querySelector('.modal-content');
    var modalbody = document.querySelector('.modal-bg')

    // Add blur class to body
    modalContent.style.display = 'block';
    modalbody.style.display = 'block'
}

function closeModal() {
    var modalContent = document.querySelector('.modal-content');
    var modalbody = document.querySelector('.modal-bg')

    // Remove blur class from body
    modalbody.style.display = 'none'
    modalContent.style.display = 'none';
}

// Fetch data from the API
const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('id');

fetch(`https://dubaiavto.uz/product/${carId}`)
    .then(response => response.json())
    .then(car => {
        // Update elements with car details




        if (car.img) {
            document.querySelector('.carImage').style.display = 'block '
            document.querySelector('.carImage').src = `https://dubaiavto.uz/uploads/${car.img}`;
        } if (car.img2) {
            document.querySelector('.carImage2').style.display = 'block '
            document.querySelector('.carImage2').src = `https://dubaiavto.uz/uploads/${car.img2}`;
        } if (car.img3) {
            document.querySelector('.carImage3').style.display = 'block '
            document.querySelector('.carImage3').src = `https://dubaiavto.uz/uploads/${car.img3}`;
        } if (car.img4) {
            document.querySelector('.carImage4').style.display = 'block '
            document.querySelector('.carImage4').src = `https://dubaiavto.uz/uploads/${car.img4}`;
        } if (car.img5) {
            document.querySelector('.carImage5').style.display = 'block '
            document.querySelector('.carImage5').src = `https://dubaiavto.uz/uploads/${car.img5}`;
        }



        if (car.img) {
            document.querySelector('.slider1').style.display = 'block '
            document.querySelector('.slider1').src = `https://dubaiavto.uz/uploads/${car.img}`;
        } if (car.img2) {
            document.querySelector('.slider2').style.display = 'block '
            document.querySelector('.slider2').src = `https://dubaiavto.uz/uploads/${car.img2}`;
        } if (car.img3) {
            document.querySelector('.slider3').style.display = 'block '
            document.querySelector('.slider3').src = `https://dubaiavto.uz/uploads/${car.img3}`;
        } if (car.img4) {
            document.querySelector('.slider4').style.display = 'block '
            document.querySelector('.slider4').src = `https://dubaiavto.uz/uploads/${car.img4}`;
        } if (car.img5) {
            document.querySelector('.slider5').style.display = 'block '
            document.querySelector('.slider5').src = `https://dubaiavto.uz/uploads/${car.img5}`;
        }







        document.getElementById('carTitle').innerText = car.title;
        document.getElementById('carYear').innerText = `${car.year}`;
        document.getElementById('carKm').innerText = `${car.km}`;
        document.getElementById('carFuel').innerText = `${car.fuel}`;
        document.getElementById('desc').innerText = ` ${car.desc}`;
        document.getElementById('carPrice').innerText = ` ${car.price}`;
        if (car.category === 'stock') {
            document.querySelector('.order-btn').innerText = 'Оставить заявку';
        } else {
            document.querySelector('.order-btn').innerText = 'Контакты';

        }
        initializeSwiper();

    })
    .catch(error => console.error('Error fetching data:', error));

fetch('https://dubaiavto.uz/product')
    .then(response => response.json())
    .then(data => {
        const carContainer = document.getElementById('carContainer');

        data.forEach(car => {
            const listItem = document.createElement('li');
            listItem.style.width = '90%';
            listItem.style.backgroundColor = '#F2F5F8';
            listItem.style.boxShadow = '0 0 5px #797979';
            listItem.style.listStyleType = 'none';
            listItem.style.padding = '5px';
            listItem.style.borderRadius = '5px';
            listItem.style.marginTop = '15px';
            listItem.style.cursor = 'pointer';

            const image = document.createElement('img');
            image.src = `https://dubaiavto.uz/uploads/${car.img}`;
            image.alt = car.title;
            image.style.height = '230px';
            image.style.width = '100%';

            const titleContainer = document.createElement('span');
            titleContainer.style.display = 'flex';
            titleContainer.style.justifyContent = 'space-between';
            titleContainer.style.alignItems = 'center';
            titleContainer.style.margin = '15px 0px 0 15px';

            const title = document.createElement('h5');
            title.style.color = 'black';
            title.innerText = car.title;
            title.style.width = '60%'

            const price = document.createElement('h6');
            price.style.backgroundColor = '#797979';
            price.style.color = 'white';
            price.style.padding = '10px';
            price.style.borderTopLeftRadius = '20px';
            price.style.borderBottomLeftRadius = '20px';
            price.innerText = `$ ${car.price}`;

            titleContainer.appendChild(title);
            titleContainer.appendChild(price);

            const detailsContainer = document.createElement('span');
            detailsContainer.style.display = 'flex';
            detailsContainer.style.justifyContent = 'space-between';
            detailsContainer.style.alignItems = 'center';
            detailsContainer.style.margin = '15px 0px 0 0px';
            const year = document.createElement('p');
            year.innerHTML = `<i class="fa-regular fa-calendar"></i> ${car.year}`;
            year.style.width = '33.3%'
            year.style.textAlign = 'center'
            year.style.fontSize = '15px'
            year.style.padding = '5px'
            year.style.boxShadow = '0 0 2px #797979'
            const mileage = document.createElement('p');
            mileage.innerHTML = `<i class="fa-solid fa-road"></i> ${car.km}`;
            mileage.style.width = '33.3%'
            mileage.style.textAlign = 'center'
            mileage.style.boxShadow = '0 0 2px #797979'
            mileage.style.fontSize = '15px'
            mileage.style.padding = '5px'
            const fuelType = document.createElement('p');
            fuelType.innerHTML = `<i class="fa-solid fa-gas-pump"></i> ${car.fuel}`;
            fuelType.style.width = '33.3%'
            fuelType.style.textAlign = 'center'
            fuelType.style.boxShadow = '0 0 2px #797979'
            fuelType.style.fontSize = '15px'
            fuelType.style.padding = '5px'
            detailsContainer.appendChild(year);
            detailsContainer.appendChild(mileage);
            detailsContainer.appendChild(fuelType);

            listItem.appendChild(image);
            listItem.appendChild(titleContainer);
            listItem.appendChild(detailsContainer);

            listItem.addEventListener('click', () => {
                window.location.href = `cardetail.html?id=${car._id}`;
            });

            carContainer.appendChild(listItem);
        });

    })
    .catch(error => console.error('Error fetching data:', error));



// Function to submit order
function submitOrder() {
    const name = document.getElementById('names').value;
    const phone = document.getElementById('phones').value;

    // Validate name and phone
    if (!name || !phone) {
        alert('Пожалуйста, введите свое имя и номер телефона.');
        return;
    }

    // Assuming carId is already defined
    // const title = document.querySelector('.title-product');

    // Create a data object with the order details
    const title = document.querySelector('.title-product');

    const carTitles = title.textContent;
    const orderData = {
        product: carTitles,
        productLink: window.location.href,
        firtname: name,
        phone: phone
    };

    // Send a POST request to the server
    fetch('https://dubaiavto.uz/payment/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    })
        .then(response => response.json())
        .then(data => {
            // Handle success, e.g., show a success message
            alert('Заказ успешно отправлен!');
            closeModal();
        })
        .catch(error => {
            // Handle error, e.g., show an error message
            console.error('Error submitting order:', error);
            alert('Ошибка отправки заказа. Пожалуйста, попробуйте еще раз.');
        });
}

function initializeSwiper() {
    new Swiper('.swiper-container2', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}










document.addEventListener('DOMContentLoaded', function () {
    const fotoMainItems = document.querySelectorAll('.foto-main');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    const controlPrev = document.querySelector('.control-prev');
    const controlNext = document.querySelector('.control-next');

    let currentIndex = 0;

    fotoMainItems.forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            currentIndex = Array.from(fotoMainItems).indexOf(this);
            updateModalContent();
            modal.style.display = 'flex';
        });
    });

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    controlPrev.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + fotoMainItems.length) % fotoMainItems.length;
        updateModalContent();
    });

    controlNext.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % fotoMainItems.length;
        updateModalContent();
    });

    function updateModalContent() {
        const imgSrc = fotoMainItems[currentIndex].querySelector('img').src;
        modalContent.innerHTML = `<img src="${imgSrc}" alt="Large Image">`;
    }
});


fetch('https://dubaiavto.uz/team')
    .then(response => response.json())
    .then(data => {
        const teamContainer = document.querySelector('.team-teacher');

        // API-dan olingan ma'lumotlarni ishlab chiqamiz
        data.forEach(teamItem => {
            if (teamItem.type) {
                const cardTeamDiv = document.createElement('div');
                cardTeamDiv.classList.add('card-team-div');
                cardTeamDiv.style.margin = '10px';

                const webDesignDiv = document.createElement('div');
                webDesignDiv.classList.add('webdesign');
                webDesignDiv.style.boxShadow = '0 0 5px black';
                webDesignDiv.style.padding = '10px';
                webDesignDiv.style.borderRadius = '5px';

                const teamImage = document.createElement('img');
                teamImage.classList.add('card-team');
                teamImage.style.height = '250px'
                teamImage.style.objectFit = 'cover'
                teamImage.src = `https://dubaiavto.uz/uploads/${teamItem.img}`;
                teamImage.alt = '';

                const teamTitle = document.createElement('h4');
                const teamType = document.createElement('h6');
                teamType.style.textAlign = 'center'
                teamType.style.padding = '5px'
                teamType.style.height = '55px'
                teamType.style.borderBottom = '1px solid #797979'
                teamTitle.style.height = '90px'
                if(teamItem.type === 'manager'){
                    teamType.style.color = '#797979'
                }else{
                    teamType.style.color = '#797979'
                }
                teamTitle.style.textAlign = 'center'
                teamType.textContent = teamItem.type;
                teamTitle.textContent = teamItem.firstname;

                webDesignDiv.appendChild(teamImage);
                webDesignDiv.appendChild(teamType);
                webDesignDiv.appendChild(teamTitle);
                cardTeamDiv.appendChild(webDesignDiv);
                teamContainer.appendChild(cardTeamDiv);
            }
        });
    })
    .catch(error => console.error('API bilan xatolik:', error));





    fetch('https://dubaiavto.uz/abaut')
    .then(response => response.json())
    .then(data => {
        const abautDataContainer = document.getElementById('abaut-data');

        // API-dan olingan ma'lumotlarni ishlab chiqamiz
        data.forEach(abautItem => {
            const mainDiv = document.createElement('div');
            mainDiv.classList.add('col');

            const imageDiv = document.createElement('div');
            imageDiv.classList.add('flex', 'justify-center');

            const mainImage = document.createElement('img');
            mainImage.classList.add('abaut-main-img');
            mainImage.src = `https://dubaiavto.uz/uploads/${abautItem.img}`;
            mainImage.alt = '';

            imageDiv.appendChild(mainImage);
            mainDiv.appendChild(imageDiv);

            const textDiv = document.createElement('div');
            textDiv.classList.add();
            textDiv.style.paddingTop = '30px';

            const title = document.createElement('h2');
            title.style.marginTop = '25px';
            title.style.width = '100%';
            title.style.textAlign = 'center';
            title.textContent = abautItem.title;

            const description = document.createElement('p');
            description.style.textAlign = 'justify';
            description.classList.add('abaut-desc')
            description.textContent = abautItem.desc;

            
            mainDiv.appendChild(textDiv);
            textDiv.appendChild(title);
            textDiv.appendChild(description);
            // Check if the JSON data contains an 'iframe' property
            if (abautItem.iframe) {
                const videoIframe = document.createElement('iframe');
                videoIframe.src = abautItem.iframe;
                videoIframe.width = '100%';
                videoIframe.setAttribute('id', 'iframe-container');
                textDiv.appendChild(videoIframe);
            }

            abautDataContainer.appendChild(mainDiv);
        });
    })
    .catch(error => console.error('API bilan xatolik:', error));


fetch('https://dubaiavto.uz/slider')
    .then(response => response.json())
    .then(data => {
        const swiperContainer = document.querySelector('#swipper');

        // API-dan olingan ma'lumotlarni ishlab chiqamiz
        data.forEach(sliderItem => {
            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide', 'cover-background');
            swiperSlide.style.backgroundImage = `url(${sliderItem.img})`;
            swiperContainer.appendChild(swiperSlide);
        });

        // Slider yaratish
        const mySwiper = new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 10,
            parallax: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
              },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    })
    .catch(error => console.error('API bilan xatolik:', error));


fetch('https://dubaiavto.uz/gallery')
    .then(response => response.json())
    .then(data => {
        const photosContainer = document.getElementById('photos');

        // API-dan olingan ma'lumotlarni ishlab chiqamiz
        data.forEach(photoItem => {
            const listItem = document.createElement('li');
            listItem.classList.add('foto-main');

            const image = document.createElement('img');
            image.src = `https://dubaiavto.uz/uploads/${photoItem.img}`;
            image.alt = '';

            listItem.appendChild(image);
            photosContainer.appendChild(listItem);
        });
    })
    .catch(error => console.error('API bilan xatolik:', error));

    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Buni qo'shing, aks holda sahifani qayta yuklab bo'ladi
    
        const formData = new FormData(this);
    
        // Formdagi malumotlarni JSON obyektiga aylantirish
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });
    
        // API dan malumotlarni olish
        fetch('https://dubaiavto.uz/contact/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // API javobi bilan ishlovchi kod
                console.log('Data:', data);
                window.location.href = '/contactus.html';

            })
            .catch(error => {
                // Xatolikni aniqlash
                console.error('API bilan xatolik:', error);
            });
    });
    
// Foydalanuvchi kiritgan malumotlarni olish



fetch('https://dubaiavto.uz/news')
    .then(response => response.json())
    .then(data => {
        const newsContainer = document.getElementById('blog-art');

        // Clear the existing content in case you want to make multiple requests
        newsContainer.innerHTML = '';

        // Loop through the data and create HTML elements dynamically
        data.forEach(item => {
            const listItem = document.createElement('div');
            listItem.className = 'articles1';
            listItem.style.height = '300px';

            listItem.innerHTML = `
                <div class="blog-img">
                    <a href="#" class="small-card" data-src="https://dubaiavto.uz/uploads/${item.img}"><img src="https://dubaiavto.uz/uploads/${item.img}" alt=""></a>
                </div>
                <div class="blog-text">
                    <h6><b><a href="#">${item.title}</a></b></h6>
                </div>
            `;
            // Append the dynamically created element to the container
            newsContainer.appendChild(listItem);
        });
    })
    .catch(error => console.error('API bilan xatolik:', error));

    


    