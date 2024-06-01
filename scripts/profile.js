document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');

    if (uid) {
        try {
            const snapshot = await database.ref('users/' + uid).once('value');
            const userData = snapshot.val();

            if (userData) {
                document.getElementById('userName').textContent = userData.name;
                document.getElementById('userBirthday').textContent = userData.birthday;
                document.getElementById('userPhone').textContent = userData.phone;
                document.getElementById('userEmail').textContent = userData.email;
                document.getElementById('userRole').textContent = userData.role;

                // Verifica se o usuário tem uma foto de perfil
                if (userData.profileImageURL) {
                    const profileImage = document.getElementById('profileImage');
                    profileImage.src = userData.profileImageURL;
                } else {
                    // Se não tiver foto, mostra o ícone de foto de perfil
                    const profileImage = document.getElementById('profileImage');
                    profileImage.src = 'images/profile_Placeholder.png'; // Insira a URL da imagem padrão aqui
                }
            } else {
                console.error('Usuário não encontrado');
                alert('Usuário não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar dados do usuário: ', error);
            alert('Erro ao buscar dados do usuário: ' + error.message);
        }
    } else {
        console.error('UID não fornecido');
        alert('UID não fornecido');
    }

    // Adiciona um evento de escuta para o input de arquivo
    const profileImageInput = document.getElementById('profileImage');
    profileImageInput.addEventListener('change', async function (event) {
        const file = event.target.files[0];
        const storageRef = storage.ref('profile_images/' + uid);
        const uploadTask = storageRef.put(file);

        uploadTask.on('state_changed', function (snapshot) {
            // Acompanha o progresso do upload, se necessário
        }, function (error) {
            console.error('Erro ao fazer upload da imagem: ', error);
            alert('Erro ao fazer upload da imagem: ' + error.message);
        }, async function () {
            // Upload completo, atualiza a URL da imagem de perfil
            try {
                const downloadURL = await storageRef.getDownloadURL();
                const userDataRef = database.ref('users/' + uid);
                await userDataRef.update({
                    profileImageURL: downloadURL
                });
                // Atualiza a imagem de perfil na página
                const profileImage = document.getElementById('profileImage');
                profileImage.src = downloadURL;
            } catch (error) {
                console.error('Erro ao obter a URL da imagem: ', error);
                alert('Erro ao obter a URL da imagem: ' + error.message);
            }
        });
    });
});
