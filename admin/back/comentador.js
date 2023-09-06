async function alimentador() {
    try {
        const response = await fetch("http://localhost:3007/movies");
        const data = await response.json();
        data.forEach(async (m) => {

            const movieInd = await fetch("http://localhost:3007/movies/" + m.id)
            const movieIndData = await movieInd.json();

            // console.log(movieIndData[0].movie.comentarios)

            const cmmnts = await fetch("https://dummyjson.com/comments");
            const cmntData = await cmmnts.json();
            const img_url = "https://firebasestorage.googleapis.com/v0/b/youflix-6f8e4.appspot.com/o/userYouFlix.png?alt=media&token=2419cdfa-3002-49e5-90a4-ce401cafc715";
            const cmnts = []
            for(let i=0; i < 6; i++){
                cmnts.push({
                    "user" : cmntData.comments[i].user.username,
                    "comment": cmntData.comments[i].body,
                    "img_url": img_url
                })
            } 
            m.comentarios = cmnts

            fetch(`http://localhost:3007/movies/update/${m.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(m),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Comentarios Ingresados con éxito.");
                    } else {
                        console.error("Error al generar comentarios");
                    }
                })
                .catch((error) => {
                    console.error("Error al generar comentarios");
                });
        });

    } catch (e) {
        console.log("Error: " + e);
    }


}

alimentador();