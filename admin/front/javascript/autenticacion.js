import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCvi-uF1tbyDIjKIZic7jwISlnmzQJ4pzY",
    authDomain: "youflix-6f8e4.firebaseapp.com",
    projectId: "youflix-6f8e4",
    storageBucket: "youflix-6f8e4.appspot.com",
    messagingSenderId: "285493117970",
    appId: "1:285493117970:web:3373d5841922f3b75744cb"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
var mensajeElement = document.getElementById("msjerror");

export class ManageAccount {
  register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((_) => {
        window.location.href = "login.html";
        // Mostrar alerta de registro exitoso
        alert("Registro exitoso. Serás redirigido a la página de inicio de sesión.");
      })
      .catch((error) => {
        console.error(error.message);
            // Mostrar alerta de error de registro
            //alert("Error al registrar: " + error.message);
            mensajeElement.textContent = "Error al registrar cuenta";
      });
  }

  authenticate(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((_) => {
        window.location.href = "admin.html";
        // Mostrar alerta de inicio de sesión exitoso
        //alert("Has iniciado sesión correctamente. Serás redirigido a la página principal.");
      })
      .catch((error) => {
        console.error(error.message);
                // Mostrar alerta de error de inicio de sesión
                //alert("Error al iniciar sesión: " + error.message);
                mensajeElement.textContent = "Este usuario no estra registrado";
      });
  }

  signOut() {
    signOut(auth)
      .then((_) => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}