console.log(document.body);

document.querySelector(".parrafo").textContent= "hago magia y cambio cosas"



// Declaración del array "fruit"
const fruits = ["apple", "orange", "watermelon"];

// Obtención del elemento HTML donde se insertará la lista ¡(por su ID)¡ llamar a la lista (etiqueta ul)
const listaContainer = document.getElementById("list");

// Iteracióndel array "fruit" para crear elementos de lista

//el ciclo forecach se compone de dos partes

//llamada al array -> llamada al metodo (foreach) -> fruit (hace referencia a cada elemento de mi array) -> {} ->//continuacion() -> por cada elemento de mi array ejecut una etiqueta de <li> // rellenala con cada elemento del array // y añadele como hijo en forma de lista
fruits.forEach(fruit => {

// Crea de elementos de lista
const listaItem = document.createElement("li");
listaItem.textContent = fruit;
//listaaItem dice que cada elemento de mi array se convierta en li/ 

//llamar a lista container ul y añadele un hijo generando sus <li>
listaContainer.appendChild(listaItem)
});

//funcion test jest 

function sum(a, b) {
    return a + b;
  }
  module.exports = sum;





