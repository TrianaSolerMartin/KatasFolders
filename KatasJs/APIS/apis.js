

const express = require('express');


/* es una variable en note que se utiliza */

const app = express();

app.get('/saludo',(req, res) => {
    res.send('Hola, esta es una API básica');
});

const PORT = 8000;

app.listen (PORT, () => {
    console.log(`La API esta escuchando por el puerto 8000 ${PORT}`)
});

/*es neesario realizar node apis.js (nmbre del archivo en la terminal)*/

/*para comprobar la funcionalidad escribimos en el navegador que tenga instalado la extension JSON http://localhost:3000/saludo*/

/*si realizamos alguna modificación en el codigo es necesario en hacer control c en la consola y nuevamente node apis.js*/
