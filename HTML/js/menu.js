let btnMenu = document.getElementById('btnmenu'); /*variable*/
let menu = document.getElementById('menu'); /*variable*/

btnMenu.addEventListener('click',function(){ /*funcion para la interacion del menu*/
    'use strict';
    menu.classList.toggle('mostrar');
});