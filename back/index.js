const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where, addDoc, deleteDoc, doc, updateDoc  } = require('firebase/firestore/lite');


const firebaseConfig = {
    apiKey: "AIzaSyBgea9tIv88lOtqJHBS9vT0KNs8o5qzT6c",
    authDomain: "youflix-f4695.firebaseapp.com",
    projectId: "youflix-f4695",
    storageBucket: "youflix-f4695.appspot.com",
    messagingSenderId: "323163076768",
    appId: "1:323163076768:web:dd5ba46e5819370da0b1c5"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const express = require('express')
const expressApp = express()
const port = 3000

var cors = require('cors')
expressApp.use(cors())
expressApp.use(express.json());

expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})

expressApp.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


async function uploadMovie() {
    try {
    const docRef = await addDoc(collection(db, "movies"), {
        "title" : 'Guardians of the Galaxy Vol. 3',
        "directorName":'James Gunn',
        "year":'5/5/2023',
        "time":'2h 30m',
        "sinopsis": 'Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.',
        "genres": ['Science Fiction','Adventure','Action'],
        "country": 'US',
        "rating": 8.5,
        "reviews": [40,30,20,8,2],
        "comentarios": [
            {
              "usuario": "Julieta Vargas",
              "comentario": "Me gusto mucho la película a pesar de que aun no haya visto la anterior 😅"
            },
            {
              "usuario": "Angelica Rodriguezs",
              "comentario": "Muy buen sitio de películas, siempre encuentro algo para ver 😃"
            },
            {
              "usuario": "Xavier Paredes",
              "comentario": "No alcance a verla en el cine pero esta super buena 🤠"
            },
            {
              "usuario": "Samuel Flores",
              "comentario": "Marvel ya no hace buenas películas como antes 🤧"
            }
          ],
        "img_url": "https://firebasestorage.googleapis.com/v0/b/youflix-f4695.appspot.com/o/portadas%2Fmovie1.png?alt=media&token=ca24f878-ea56-4416-a9e4-1fe33470f150"
    });
    } catch (error) {
    console.log(error);
    }
};

uploadMovie();
