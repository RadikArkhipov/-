import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {ScrollLock} from './utils/scroll-lock';
import {FocusLock} from './utils/focus-lock';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  const pageHeader = document.querySelector('[data-page-header]');
  const navToggle = document.querySelector('[data-open-menu]');
  const overlay = document.querySelector('[data-close-mobile-menu]');
  const links = document.querySelectorAll('[data-nav-links] a');

  navToggle.addEventListener('click', function () {
    pageHeader.classList.toggle('page-header--nav-open');
    if (pageHeader.classList.contains('page-header--nav-open')) {
      window.scrollLock.disableScrolling();
    } else {
      window.scrollLock.enableScrolling();
    }
  });


  if (links.length > 0) {
    Array.from(links).forEach((link) => {
      link.addEventListener('click', function () {
        pageHeader.classList.remove('page-header--nav-open');
        window.scrollLock.enableScrolling();
      });
    });
  }

  overlay.addEventListener('click', function () {
    pageHeader.classList.remove('page-header--nav-open');
    window.scrollLock.enableScrolling();
  });


  // Utils
  // ---------------------------------

  iosVhFix();
  window.scrollLock = new ScrollLock();
  window.focusLock = new FocusLock();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    form.init();
    window.form = form;

    let isMapSupport = true;

    function init() {
      let map = new ymaps.Map('map', {
        center: [59.93863106417265, 30.323036499999905],
        zoom: 16,
      });

      let placemark = new ymaps.Placemark([59.9375996045652, 30.32270122387305], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/sprite/icon-address.svg',
        iconImageSize: [18, 22],
        iconImageOffset: [-17, -29],
      });

      map.controls.remove('geolocationControl'); // удаляем геолокацию
      map.controls.remove('searchControl'); // удаляем поиск
      map.controls.remove('trafficControl'); // удаляем контроль трафика
      map.controls.remove('typeSelector'); // удаляем тип
      map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
      map.controls.remove('zoomControl'); // удаляем контрол зуммирования
      map.controls.remove('rulerControl'); // удаляем контрол правил

      map.geoObjects.add(placemark);
    }

    try {
      ymaps.ready(init);
    } catch (err) {
      isMapSupport = false;
    }
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
