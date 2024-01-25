//aquí empiezan los estilos de js del piano

document.addEventListener('DOMContentLoaded', function () {
  let teclasBlancas = document.querySelectorAll('.tecla_blanca');

   teclasBlancas.forEach(function (tecla) {
       tecla.addEventListener('click', function () {
           // Cambia la imagen al hacer clic
           tecla.src = "tecla_blanca_pulsada.svg";
       });
   });
});


document.addEventListener('DOMContentLoaded', function () {
   let teclasBlancas = document.querySelectorAll('.tecla_blanca');

    teclasBlancas.forEach(function (tecla) {
        tecla.addEventListener('mouseout', function () {
            // Cambia la imagen al hacer clic
            tecla.src = "tecla_blanca.svg";
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
  let teclasNegras = document.querySelectorAll('.tecla_negra');

   teclasNegras.forEach(function (tecla) {
       tecla.addEventListener('click', function () {
           // Cambia la imagen al hacer clic
           tecla.src = "tecla_negra_pulsada.svg";
       });
   });
});


document.addEventListener('DOMContentLoaded', function () {
   let teclasNegras = document.querySelectorAll('.tecla_negra');

    teclasNegras.forEach(function (tecla) {
        tecla.addEventListener('mouseout', function () {
            // Cambia la imagen al hacer clic
            tecla.src = "tecla_negra.svg";
        });
    });
});

//-----SONIDO-------//

//Do
 
 // 3. Función de reproducción de audio
  function reproducirAudio() {
    let audio = document.getElementById("audiodo");
    audio.play();
  }

  // 4. Código JavaScript
  document.getElementById("dotecla_blanca").addEventListener("click", reproducirAudio);

//RE

   // 3. Función de reproducción de audio
   function reproducirAudio() {
    let audio = document.getElementById("audiore");
    audio.play();
  }

  // 4. Código JavaScript
  document.getElementById("retecla_blanca").addEventListener("click", reproducirAudio);

//MI

     // 3. Función de reproducción de audio
     function reproducirAudio() {
      let audio = document.getElementById("audiomi");
      audio.play();
    }
  
    // 4. Código JavaScript
    document.getElementById("mitecla_blanca").addEventListener("click", reproducirAudio);

    //FA

       // 3. Función de reproducción de audio
   function reproducirAudio() {
    let audio = document.getElementById("audiofa");
    audio.play();
  }

  // 4. Código JavaScript
  document.getElementById("fatecla_blanca").addEventListener("click", reproducirAudio);

  //SOL

     // 3. Función de reproducción de audio
     function reproducirAudio() {
      let audio = document.getElementById("audiosol");
      audio.play();
    }
  
    // 4. Código JavaScript
    document.getElementById("soltecla_blanca").addEventListener("click", reproducirAudio);

//LA

   // 3. Función de reproducción de audio
   function reproducirAudio() {
    let audio = document.getElementById("audiola");
    audio.play();
  }

  // 4. Código JavaScript
  document.getElementById("latecla_blanca").addEventListener("click", reproducirAudio);

//SI

   // 3. Función de reproducción de audio
   function reproducirAudio() {
    let audio = document.getElementById("audiosi");
    audio.play();
  }

  // 4. Código JavaScript
  document.getElementById("sitecla_blanca").addEventListener("click", reproducirAudio);

//Dosostenido
 
 // 3. Función de reproducción de audio
 function reproducirAudio() {
  let audio = document.getElementById("audiodosos");
  audio.play();
}

// 4. Código JavaScript
document.getElementById("dosostecla_negra").addEventListener("click", reproducirAudio);

//RESOS

 // 3. Función de reproducción de audio
 function reproducirAudio() {
  let audio = document.getElementById("audioresos");
  audio.play();
}

// 4. Código JavaScript
document.getElementById("resostecla_negra").addEventListener("click", reproducirAudio);

//FASOS

 // 3. Función de reproducción de audio
 function reproducirAudio() {
  let audio = document.getElementById("audiofasos");
  audio.play();
}

// 4. Código JavaScript
document.getElementById("fasostecla_negra").addEventListener("click", reproducirAudio);

//SOLSOS

 // 3. Función de reproducción de audio
 function reproducirAudio() {
  let audio = document.getElementById("audiosolsos");
  audio.play();
}

// 4. Código JavaScript
document.getElementById("solsostecla_negra").addEventListener("click", reproducirAudio);

//LASOS

 // 3. Función de reproducción de audio
 function reproducirAudio() {
  let audio = document.getElementById("audiolasos");
  audio.play();
}

// 4. Código JavaScript
document.getElementById("lasostecla_negra").addEventListener("click", reproducirAudio);






