//Начало код Анжелика

// Меню бургер
const iconMenu= document.querySelector(".header__icon");
if(iconMenu){
    const menuNav= document.querySelector(".header__nav"); 

    iconMenu.addEventListener('click', function(e){
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuNav.classList.toggle('_active');
    })
}
