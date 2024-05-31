// register.js

document.addEventListener('DOMContentLoaded', function () {
    console.log('Site da Academia XYZ carregado.');

    var registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var name = document.getElementById('registerName').value;
        var phone = document.getElementById('registerPhone').value;
        var birthday = document.getElementById('registerBirthday').value;
        var email = document.getElementById('registerEmail').value;
        var password = document.getElementById('registerPassword').value;

        // Registra o usuário no Firebase Authentication
        auth.createUserWithEmailAndPassword(email, password)
            .then(function (userCredential) {
                var user = userCredential.user;
                // Adiciona os dados adicionais no Firestore
                return db.collection('users').doc(user.uid).set({
                    name: name,
                    phone: phone,
                    birthday: birthday,
                    email: email
                });
            })
            .then(function () {
                alert('Usuário registrado com sucesso!');
                registerForm.reset();
                $('#registerModal').modal('hide');
            })
            .catch(function (error) {
                console.error('Erro ao registrar usuário: ', error);
                alert('Erro ao registrar usuário: ' + error.message);
            });
    });
});
