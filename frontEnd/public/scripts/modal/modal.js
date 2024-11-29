document.addEventListener("DOMContentLoaded", () => {
    let attemptCount = 0; // Contador de tentativas
  
    // Referências aos elementos
    const modal = document.getElementById("modal");
    const closeModalBtn = document.querySelector(".close-modal");
    const loginBtn = document.querySelector(".open-modal"); // O botão de login
    const matriculaInput = document.getElementById("matricula");
    const senhaInput = document.getElementById("senha");
  
    // Função para exibir o modal
    const showModal = () => {
      modal.showModal();
    };
  
    // Função para fechar o modal
    const closeModal = () => {
      modal.close();
    };
  
    // Event listener para o botão de fechar
    closeModalBtn.addEventListener("click", closeModal);
  
    // Função para fazer o login
    const attemptLogin = async () => {
      const registration = matriculaInput.value;
      const password = senhaInput.value;
  
      try {
        // Simula uma requisição ao servidor para verificar login
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ registration, password }),
        });
  
        if (!response.ok) {
          // Login falhou, incrementa o contador
          attemptCount++;
  
          if (attemptCount >= 4) {
            showModal(); // Exibe o modal após 4 tentativas falhas
            attemptCount = 0; // Reseta o contador de tentativas
          }
        } else {
          // Login bem-sucedido
          attemptCount = 0; // Reseta o contador de tentativas
          window.location.href = "/dashboard"; // Redireciona para a página inicial ou dashboard
        }
      } catch (error) {
        console.error("Erro ao tentar logar:", error);
      }
    };
  
    // Evento de click no botão de login
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Impede o comportamento padrão de um botão dentro do form
      attemptLogin();
    });
  
    // Adiciona um evento de 'Enter' no campo senha para envio do login
    senhaInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Impede o envio do formulário
        attemptLogin();
      }
    });
  });
  