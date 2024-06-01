document.addEventListener('DOMContentLoaded', function () {
    console.log('Script de registro carregado.');

    var registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        var name = document.getElementById('registerName').value;
        var phone = document.getElementById('registerPhone').value;
        var birthday = document.getElementById('registerBirthday').value;
        var email = document.getElementById('registerEmail').value;
        var password = document.getElementById('registerPassword').value;
        var role = document.getElementById('registerRole').value;

        try {
            // Registra o usuário no Firebase Authentication
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Adiciona os dados adicionais no Realtime Database
            await database.ref('users/' + user.uid).set({
                name: name,
                phone: phone,
                birthday: birthday,
                email: email,
                role: role // Adiciona o papel selecionado
            });

            console.log('Função de registro deu bom');
            // Fecha o modal após o registro
            $('#registerModal').modal('hide');

            // Redireciona para a página de perfil com o UID do usuário
            window.location.href = `profile.html?uid=${user.uid}`;
        } catch (error) {
            console.error('Erro ao registrar usuário: ', error);
            alert('Erro ao registrar usuário: ' + error.message);
        }
    });
});
