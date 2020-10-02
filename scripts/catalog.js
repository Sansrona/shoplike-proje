import {getData} from './getData.js'
import generateSubCatalog from './generateSubCatalog.js';

export const catalog = () => {
  const updateSubCatalog = generateSubCatalog();
  const btnBurger = document.querySelector('.btn-burger');
  const catalog = document.querySelector('.catalog');
  const subCatalog = document.querySelector('.subcatalog');
  const subCatalogHeader = document.querySelector('.subcatalog-header');
  const btnReturn = document.querySelector('.btn-return');
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.append(overlay);

  const openMenu =()=> {
    catalog.classList.add('open');
    overlay.classList.add('active');

    };

  const closeMenu = () => {
    catalog.classList.remove('open');
    overlay.classList.remove('active');
    closeSubMenu();
  };

  const handlerCatalog = event => {
    event.preventDefault();
    const itemList = event.target.closest('.catalog-list__item');
    if(itemList){
       getData.subCatalog(itemList.textContent, (data) => {
         updateSubCatalog(itemList.textContent, data);
         subCatalog.classList.add('subopen');
    })
       };

        
    if(event.target.closest('.btn-close')){
      closeMenu();
    }
  };

  const closeSubMenu = () => {
      subCatalog.classList.remove('subopen');
  };

  btnBurger.addEventListener('click', openMenu);
  overlay.addEventListener('click', closeMenu);
  catalog.addEventListener('click',handlerCatalog);
  subCatalog.addEventListener('click', event => {
    const btnReturn = event.target.closest('.btn-return');
    if(btnReturn)closeSubMenu();
  })




  //спускается при нажатии кнопок 
  document.addEventListener('keypress', e => {
      if(e.code === 'Escape'){
          closeMenu();
      };
  });
}

