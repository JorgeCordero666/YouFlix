const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where, addDoc, deleteDoc, doc, updateDoc } = require('firebase/firestore/lite');


const firebaseConfig = {
    apiKey: "AIzaSyCvi-uF1tbyDIjKIZic7jwISlnmzQJ4pzY",
    authDomain: "youflix-6f8e4.firebaseapp.com",
    projectId: "youflix-6f8e4",
    storageBucket: "youflix-6f8e4.appspot.com",
    messagingSenderId: "285493117970",
    appId: "1:285493117970:web:3373d5841922f3b75744cb"
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

async function getMovies(db) {
    const movies = collection(db, 'movies');
    const moviesSnapshot = await getDocs(movies);
    const moviesList = moviesSnapshot.docs.map(doc => doc.data());
    return moviesList;
}

//Permite leer todas las peliculas que estan almacenadas en firebase
expressApp.get('/movies', async (req, res) => {
    try {
        const movies = await getMovies(db);
        res.send(movies);
    } catch (error) {
        console.error('Error retrieving movies:', error);
        res.status(500).send('Error retrieving movies');
    }
});

//Permite buscar una pelicula dentro de la coleccion mediante su ID
expressApp.get("/movies/:item_id", (req, res) => {
    (async () => {
        try {
            let response = [];

            const q = query(
                collection(db, "movies"),
                where("id", "==", req.params.item_id)
            );

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const selectedItem = {
                    movie: doc.data(),
                };
                response.push(selectedItem);
            });

            if (response.length > 0) {
                return res.status(200).send(response);
            } else {
                console.log("Document not found");
                return res.status(404).send("Document not found");
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//Permite crear una nueva pelicula dentro de la coleccion movies
expressApp.post("/movies/create", (req, res) => {
    (async () => {
        try {
            const docRef = await addDoc(collection(db, "movies"), req.body.movie);
            return res.status(200).send(`Document written with ID:  ${docRef.id}`);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//Permite editar la informacion de una pelicula
expressApp.put('/movies/update/:item_id', (req, res) => {
    (async () => {
        try {
            let response = [];
            const q = query(
                collection(db, "movies"),
                where("id", "==", req.params.item_id)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const selectedItem = {
                    id: doc.id,
                    movie: doc.data(),
                };
                response.push(selectedItem);
            });
            if (response.length > 0) {
                const movieDocument = doc(db, "movies", response[0].id);
                await updateDoc(movieDocument, req.body);
                return res.status(200).send({});
            } else {
                console.log("Document not found");
                return res.status(404).send({message: "Document not found"});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({error: error});
        }
    })();
});
//Permite eliminar una pelicula de la coleccion
expressApp.delete("/movies/delete/:item_id", (req, res) => {
    (async () => {
        try {

            const q = query(
                collection(db, "movies"),
                where("id", "==", req.params.item_id)
            );
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                return res.status(404).send("Document not found");
            }

            const docId = querySnapshot.docs[0].id;
            const movieDocument = doc(db, "movies", docId);
            await deleteDoc(movieDocument);
            return res.status(200).send();

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// async function uploadMovie() {
//     try {
//     const docRef = await addDoc(collection(db, "movies"), {
//         "title" : 'Spider-Man: Across the Spider-Verse ',
//         "directorName":'Kemp Powers',
//         "year":'1/6/2023 ',
//         "time":'2h 20m',
//         "sinopsis": 'After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse’s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.',
//         "genres": ['Animation',' Action','Adventure'],
//         "country": 'US',
//         "rating": 8.3,
//         "reviews": [42,34,18,5,1],
//         "comentarios": [
//             {
//               "usuario": "Julieta Vargas",
//               "comentario": "Me gusto mucho la película a pesar de que aun no haya visto la anterior 😅",
//               "img": "https://firebasestorage.googleapis.com/v0/b/youflix-f4695.appspot.com/o/portadas%2FEllipse%209.png?alt=media&token=b71cd850-9dc7-4b37-ba40-f9933d91f026"
//             },
//             {
//               "usuario": "Angelica Rodriguezs",
//               "comentario": "Muy buen sitio de películas, siempre encuentro algo para ver 😃",
//               "img": "https://firebasestorage.googleapis.com/v0/b/youflix-f4695.appspot.com/o/portadas%2FEllipse%2010.png?alt=media&token=8e67bc36-a75e-4b05-8785-1fd1e4327747"
//             }
//           ],
//         "img_url": "https://firebasestorage.googleapis.com/v0/b/youflix-f4695.appspot.com/o/portadas%2Fportada_02.jpg?alt=media&token=df602d50-5202-4825-8a82-1cbd62aa87c6",
//         "id" : "spiderverse"
//     });
//     } catch (error) {
//     console.log(error);
//     }
// };

// uploadMovie();