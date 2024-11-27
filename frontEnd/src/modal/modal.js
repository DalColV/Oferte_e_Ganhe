// A modal em si
const modal = document.querySelector("dialog");

// O botão de Abrir Modal
const openModalBtn = document.querySelector(".open-modal");

// O botão de Fechar Modal
const closeModalBtn = document.querySelector(".close-modal");

/* Ao clicar no botão de Abrir Modal, executa a função
showModal() na Modal: */
openModalBtn.addEventListener("click", () => modal.showModal());

/* Ao clicar no botão de Fechar Modal, executa a função
close() na Modal */
closeModalBtn.addEventListener("click", () => modal.close());