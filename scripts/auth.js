document.addEventListener('DOMContentLoaded', function () {
    console.log('Script de registro carregado.');

    // Configuração do Firebase
    // Adicione aqui suas configurações do Firebase

    var loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', function () {
        $('#loginModal').modal('show');
    });

    var loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        var email = document.getElementById('loginEmail').value;
        var password = document.getElementById('loginPassword').value;

        try {
            // Realiza o login do usuário no Firebase Authentication
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            console.log('Usuário logado com sucesso:', user);
            // Fecha o modal após o login
            $('#loginModal').modal('hide');

            // Redireciona para a página de perfil com o UID do usuário
            window.location.href = `profile.html?uid=${user.uid}`;
        } catch (error) {
            console.error('Erro ao fazer login: ', error);
            alert('Erro ao fazer login: ' + error.message);
        }
    });
});
