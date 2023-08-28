const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where, addDoc, deleteDoc, doc, updateDoc } = require('firebase/firestore/lite');


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

async function getMovies(db) {
    const movies = collection(db, 'movies');
    const moviesSnapshot = await getDocs(movies);
    const moviesList = moviesSnapshot.docs.map(doc => doc.data());
    return moviesList;
}

//READ ALL MOVIES
expressApp.get('/movies', async (req, res) => {
    try {
        const movies = await getMovies(db);
        console.log(movies);
        res.send(movies);
    } catch (error) {
        console.error('Error retrieving movies:', error);
        res.status(500).send('Error retrieving movies');
    }
});

//READ ONE MOVIE
expressApp.get("/movies/:item_id", (req, res) => {
    (async () => {
        try {
            let response = [];
            console.log("looking for " + req.params.item_id);

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
                console.log(response);
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

//CREATE ONE MOVIE
expressApp.post("/movies/create", (req, res) => {
    (async () => {
        try {
        console.log(req.body)
        console.log(req.body.movie);
        const docRef = await addDoc(collection(db, "movies"), req.body.movie);
        return res.status(200).send(`Document written with ID:  ${docRef.id}`);
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