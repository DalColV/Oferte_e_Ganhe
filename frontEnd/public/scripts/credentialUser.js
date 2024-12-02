async function getProfileName() {
    try {
        const user = JSON.parse(sessionStorage.getItem("user"));

        if (user && user.user && user.user.profile_id) {
            const profileId = user.user.profile_id;

            const response = await fetch(`http://localhost:3000/profiles/${profileId}`);

            if (response.ok) {
                const profileData = await response.json();

                const profileName = profileData.data.profile_name;
                console.log("Profile Name:", profileName); 
                const profileNameElement = document.getElementById("profile-name");
                if (profileNameElement) {
                    profileNameElement.textContent = profileName; 
                } else {
                    console.error("Elemento #profile-name não encontrado no HTML");
                }
            } else {
                console.error('Erro ao buscar profile_name. Status:', response.status);
            }
        } else {
            console.error('profile_id não encontrado na sessionStorage');
        }
    } catch (error) {
        console.error("Erro ao buscar profile_name:", error);
    }
}

getProfileName(); 
