// Obtén una referencia al botón SignIn
const signInButton = document.getElementById("signIn");
const signUpButton = document.getElementById("signUp");

// Agrega un evento click al botón SignIn
signInButton.addEventListener("click", function () {
    // Muestra un mensaje en la consola
    //console.log("El botón SignIn ha sido clicado.");

    // Redirige al login
    window.location.href = "login.html";
});

signUpButton.addEventListener("click", function () {
    // Muestra un mensaje en la consola
    //console.log("El botón SignIn ha sido clicado.");

    // Redirige al login
    window.location.href = "signup.html";
});
