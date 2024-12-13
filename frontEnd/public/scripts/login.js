let attemptCount = 0;
const maxAttempts = 3;
const lockoutTime = 5; 

const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("ok");
const modalCountdown = document.createElement("p");
modalCountdown.id = "modalCountdown";
modal.appendChild(modalCountdown);
closeModalButton.disabled = true;

let lockoutTimer;

function showModal() {
    let remainingTime = lockoutTime;
    modalCountdown.textContent = `Tente novamente em ${remainingTime} segundos.`;
    modal.showModal();

    lockoutTimer = setInterval(() => {
        remainingTime--;
        modalCountdown.textContent = `Tente novamente em ${remainingTime} segundos.`;
        
        if (remainingTime <= 0) {
            clearInterval(lockoutTimer);
            closeModalButton.disabled = false;
            modalCountdown.textContent = "Você pode tentar novamente.";
        }
    }, 1000);
}

closeModalButton.addEventListener("click", () => {
    modal.close();
    attemptCount = 0; 
});

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    const registration = document.getElementById("matricula").value;
    const password = document.getElementById("senha").value;

    if (!registration || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ registration, password }),
        });

        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem("user", JSON.stringify(data));
            window.location.href = "/home";
        } else {
            attemptCount++;
            const errorData = await response.json();
            alert(errorData.message);

            if (attemptCount >= maxAttempts) {
                showModal();
            }
        }
    } catch (error) {
        console.error("Erro ao realizar o login:", error);
    }
});
