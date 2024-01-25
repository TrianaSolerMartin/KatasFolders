const witheKeys = document.querySelectorAll(".whitekey");
-> document acceder a mi html mediante mi javascript  //selectores del dom javascript

const keyOne = document.getElementById("one");

cambios de color

keyOne.addEventListener("click",
function() {
    keyOne.style.color = "red";
    alert("hola")
})

inserción de sonidos 

const plate =document.querySelector(".crash")

plate.addEventListener ("click", () => {
    const etiquetaAudio = document.getElementById ("audio-crash");
    etiquetaAudio.onplay()
});