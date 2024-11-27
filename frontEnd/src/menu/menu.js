const menu = document.querySelector('.menu-lateral');
const abrirMenu = document.querySelector('.btn-menu');
const fecharMenu = document.querySelector('.fechar-menu');
const overlay = document.querySelector('.overlay');

abrirMenu.addEventListener('click', () => {
  menu.classList.add('active');
  overlay.classList.add('active');
});

fecharMenu.addEventListener('click', () => {
  menu.classList.remove('active');
  setTimeout(() => {
    overlay.classList.remove('active');
  }, 500);
});