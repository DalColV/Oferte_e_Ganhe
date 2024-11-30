document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const registration = document.getElementById("matricula").value;
    const password = document.getElementById("senha").value;

    if (!matricula || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        // Req para o backend
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ registration, password }),
        });

        if (response.ok) {
            window.location.href = "/dashboard"; 
        }else{
            const errorData = await response.json();
            alert(errorData.message);
        }
    } catch (error) {
        console.error("Erro ao realizar o login:", error);
    }
});
S
