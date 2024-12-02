
// ================================================== ПРОКРУТКА, ШАПКА
// document.addEventListener('DOMContentLoaded', function () {
//     // СКРОЛЛ К НУЖНОЙ СЕКЦИИ ПО КЛИКУ НА ПУНКТАХ МЕНЮ
//     $('.menu__link').click(function () {
//         var scroll_elem = $(this).attr('href');
//         $('html, body').animate({
//             scrollTop: $(scroll_elem).offset().top
//         }, 1000);
//     });
//     // ДОБАВЛЯЕМ АКТИВНЫЙ КЛАСС ШАПКЕ
//     function headerActiveToggle() {
//         const scrollSize = window.pageYOffset
//         scrollSize > 1 ? header.classList.add('active') : header.classList.remove('active')
//     }
//     window.addEventListener('load', headerActiveToggle) // ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ ЕСЛИ СТРАНИЦА УЖЕ ПРОСКРОЛЛЕНА
//     window.addEventListener('scroll', headerActiveToggle) // ПРИ СКРОЛЛЕ
// });

const burger = ()=> {
    const gamburger = document.querySelector('.js-menuToggle')
    const mMenu = document.querySelector('.header-menu')
    const firstLine = gamburger.querySelectorAll('span')[0]
    const middleLine = gamburger.querySelectorAll('span')[1]
    const lastLine = gamburger.querySelectorAll('span')[2]
    gamburger.addEventListener('click', function(){
        mMenu.classList.toggle('active')
        middleLine.classList.toggle('open')
        firstLine.classList.toggle('open')
        lastLine.classList.toggle('open')
    });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ТАБЫ С КАРТАМИ НА СТР. "ГДЕ КУПИТЬ"
const tabsAdress = () => {

    const adresses = [
        {"id": "adress-1", "coord": [55.716397, 37.644737], "adress": "м. Фрунзенская, ул. Погодинская, д.1/1, <br> тел. 8(499) 248 7181 – аптека в фойе клиники"},
        {"id": "adress-2", "coord": [55.779459, 37.556936], "adress": "м. Беговая, ул. Беговая, д.11, тел. 8(495) 613 7543 –магазин «Продукты 24»"},
        {"id": "adress-3", "coord": [55.787285, 37.559936], "adress": "м. Динамо, Ленинградский проспект, д. 33/4, тел. 8(495) 945 9675 - магазин «Продукты 24» "},
        {"id": "adress-4", "coord": [55.775145, 37.539401], "adress": "м. Беговая, Хорошевское шоссе, д. 34, тел. 8(495) 941 5878 - магазин «Продукты 24»"},
        {"id": "adress-5", "coord": [55.786516, 37.593489], "adress": "м. Менделеевская, ул. Новослободская, дом 49/2, тел. 8(499) 7912146 – аптека на первом этаже "},
        {"id": "adress-6", "coord": [55.792265, 37.787120], "adress": "м. Измайловская, ул. Первомайская, д.42, к.3, тел. 8(495) 2520802 - аптека в маг. Пятерочка"},
        {"id": "adress-7", "coord": [55.659429, 37.644306], "adress": "м. Каширская, Каширское шоссе, д.23, тел. 8(495) 9430470 - аптека в фойе"},
        {"id": "adress-8", "coord": [55.216397, 37.644737], "adress": "НМИЦ онкологии им. Н.Н. Блохина"}
    ]

    const adressItem = document.querySelectorAll('.js-adress')
    const coordinatesBox = document.querySelector('.coordinates')

    function map(currId, currCoord, currAdress){
        var myMap1 = new ymaps.Map(`${currId}`, {
            center: currCoord,
            zoom: 13,
            controls: ['smallMapDefaultSet']
        }, {
            searchControlProvider: 'yandex#search'
        });
        myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point"
            },
        });
        myMap1.geoObjects
            .add(myGeoObject)
            .add(new ymaps.Placemark(currCoord, {
                balloonContent: `<strong>${currAdress}</strong>`,
                iconCaption: `${currAdress}`
            }, {
                preset: 'islands#blueCircleDotIconWithCaption',
                iconCaptionMaxWidth: '200'
            }));
        myMap1.setType('yandex#publicMap');
        // отключаем масштабирование скроллом       
        myMap1.behaviors.disable('scrollZoom');
        // на мобильных устройствах... (проверяем по userAgent браузера)
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //... отключаем перетаскивание карты
            myMap1.behaviors.disable('drag');
        }   
    }

    adressItem.forEach((item, n) => {
        if(n == 0){
            item.classList.add('active')
        }
        item.addEventListener('click', function(){
            coordinatesBox.innerHTML = ' '
            adressItem.forEach(elem => {
                if(item != elem){
                    elem.classList.remove('active')
                } else {
                    elem.classList.add('active')
                }
            })
            for(let i = 0; i < adresses.length; i++){
                let thisAdress = adresses[i]
                if(thisAdress.id == item.dataset.adress){
                    let mapBox = document.createElement('div')
                    mapBox.classList.add('coordinates__map')
                    mapBox.setAttribute('id', thisAdress.id)
                    coordinatesBox.append(mapBox)
                    map(thisAdress.id, thisAdress.coord, thisAdress.adress)
                }
            }
        })
    })

    ymaps.ready(()=>{
        if(document.querySelector('.coordinates')){
            map('adress-1', [55.716397, 37.644737], 'м. Фрунзенская, ул. Погодинская, д.1/1, <br> тел. 8(499) 248 7181 – аптека в фойе клиники')
        }
        if(document.querySelector('.contacts')){
            map('map', [55.716397, 37.644737], '115114, Москва, Павелецкая набережная, д. 2, стр. 2')
        }
        if(document.querySelector('.contacts-page')){
            map('contacts-map', [55.716397, 37.644737], '115114, Москва, Павелецкая набережная, д. 2, стр. 2')
        }
    });

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ТАБЫ С ХАРАКТЕРИСТИКАМИ В КАРТОЧКЕ ТОВАРА
const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector),
        headBox = document.querySelector('.tabs-headbox');

    function hideContent(){
        content.forEach(item => {
            item.style.display = 'none';
        });
        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }
    if(document.documentElement.clientWidth < 565){
        document.addEventListener('click', function(e){
            document.querySelector('.tabs-headbox').classList.add('is-open')
            let itsOpenTab = e.target == document.querySelector('.tabs-headbox'),
            itsActiveHeader = document.querySelector('.tabs-headbox').classList.contains('is-open')
            if(itsActiveHeader && itsOpenTab){
                header.style.height = header.scrollHeight + 'px'
            } else if(!itsOpenTab){
                document.querySelector('.tabs-headbox').classList.remove('is-open')
                header.style.height = '50px'
            }
        })
    }
        
    function showContent(i){
        content[i].style.display = 'block';
        tab[i].classList.add(activeClass);
        if(document.documentElement.clientWidth < 992){
            let temp = tab[i]
            header.prepend(temp)
        }
    }
        
    header.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        if( target &&
                (target.classList.contains(tabSelector.replace(/\./,"")) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./,"")))){
                tab.forEach((item, i) => {
                    if(target == item || target.parentNode == item){
                        hideContent();
                        showContent(i);
                    }
                });
            }
    });

    hideContent();
    showContent(0); 
    
}


// ================================================== МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)
$(document).ready(function () {
    $(".js-maskPhone").inputmask({
        mask: "+7 999 999 99 99",
        clearIncomplete: true
    });
    $('.js-maskEmail').inputmask({
        mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
        clearIncomplete: true
    //     greedy: false,
    //     onBeforePaste: function (pastedValue, opts) {
    //         pastedValue = pastedValue.toLowerCase();
    //         return pastedValue.replace("mailto:", "");
    //     },
    //     definitions: {
    //         '*': {
    //             validator: "[0-9A-Za-z-а-я-]",
    //             casing: "lower"
    //         }
    //     }
    });
    $(".js-maskDate").inputmask({
        mask: "99/99/9999",
        clearIncomplete: true,
        'placeholder': 'dd/mm/yyyy'
    });
});

// ================================================== СЛАЙДЕР SWIPER (https://swiperjs.com/get-started) 
const swiper = new Swiper('.products__slider', {
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});

const swiper1 = new Swiper('.info-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        nextEl: '.slider-nav__next',
        prevEl: '.slider-nav__prev',
    },
    breakpoints: {
        400: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3
        },
        960: {
          slidesPerView: 4
        }
      }
});
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 
burger()
tabsAdress()
tabs('.tabs__buttons', '.tab', '.tabs__content ', 'active')
// ================================================== 

// ymaps.ready(init);

// function init(){

//     var myMap = new ymaps.Map("map", {
//         center: [55.716397, 37.644737],
//         zoom: 13,
//         controls: ['smallMapDefaultSet']
//     }, {
//         searchControlProvider: 'yandex#search'
//     });

//     myGeoObject = new ymaps.GeoObject({
//         geometry: {
//             type: "Point"
//         },
//     });
//     myMap.geoObjects
//         .add(myGeoObject)
//         .add(new ymaps.Placemark([55.716397, 37.644737], {
//             balloonContent: '<strong>Павелецкая набережная, 2с2, Москва, 115114</strong>',
//             iconCaption: 'Павелецкая набережная'
//         }, {
//             preset: 'islands#blueCircleDotIconWithCaption',
//             iconCaptionMaxWidth: '200'
//         }));

//     myMap.setType('yandex#publicMap');
//     // отключаем масштабирование скроллом       
//     myMap.behaviors.disable('scrollZoom');
//     // на мобильных устройствах... (проверяем по userAgent браузера)
//     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//         //... отключаем перетаскивание карты
//         myMap.behaviors.disable('drag');
//     }
        
// }

