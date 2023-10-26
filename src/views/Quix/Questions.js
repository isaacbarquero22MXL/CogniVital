// Multimedia type
export const MultimediaType = {
  VIDEO: "video",
  AUDIO: "audio",
  IMAGE: "image",
};

export const questions = [
  // Question #1
  {
    question: "¿Qué se celebra el 11 de abril en Costa Rica?",
    hasMultimedia: false,
    answers: [
      {
        answer: "El día del Padre",
        isCorrect: false,
      },
      {
        answer: "El día del Niño",
        isCorrect: false,
      },
      {
        answer: "La Batalla de Rivas",
        isCorrect: true,
      },
      {
        answer: "La Batalla de Santa Rosa",
        isCorrect: false,
      },
    ],
  },
  // Question #2
  {
    question: "¿Cuanto es 99 + 9?",
    hasMultimedia: false,
    answers: [
      {
        answer: "109",
        isCorrect: false,
      },
      {
        answer: "100",
        isCorrect: false,
      },
      {
        answer: "119",
        isCorrect: false,
      },
      {
        answer: "108",
        isCorrect: true,
      },
    ],
  },
  // Question #3
  {
    question: "¿Cuál es la capital de Costa Rica?",
    hasMultimedia: false,
    answers: [
      {
        answer: "San José",
        isCorrect: true,
      },
      {
        answer: "Liberia",
        isCorrect: false,
      },
      {
        answer: "Puntarenas",
        isCorrect: false,
      },
      {
        answer: "Alajuela",
        isCorrect: false,
      },
    ],
  },
  // Question #4
  {
    question:
      "¿Cuál es uno de los platillos tradicionales más conocidos en Costa Rica?",
    hasMultimedia: false,
    answers: [
      {
        answer: "Carne en salsa",
        isCorrect: false,
      },
      {
        answer: "Gallo pinto",
        isCorrect: true,
      },
      {
        answer: "Ceviche",
        isCorrect: false,
      },
      {
        answer: "Patacones",
        isCorrect: false,
      },
    ],
  },
  // Question #5
  {
    question: "¿Cuál es el volcán más activo en Costa Rica?",
    hasMultimedia: false,
    answers: [
      {
        answer: "Volcán Arenal",
        isCorrect: false,
      },
      {
        answer: "Volcán Poás",
        isCorrect: false,
      },
      {
        answer: "Volcán Irazú",
        isCorrect: false,
      },
      {
        answer: "Volcán Turrialba",
        isCorrect: true,
      },
    ],
  },
  // Question #6 - Multimedia IMG
  {
    question: "¿Cómo se llama este símbolo nacional?",
    hasMultimedia: true,
    multimedia: {
      type: MultimediaType.IMAGE,
      source: "yiguirro.webp",
    },
    answers: [
      {
        answer: "Yigüirro",
        isCorrect: true,
      },
      {
        answer: "Colibrí",
        isCorrect: false,
      },
      {
        answer: "Paloma",
        isCorrect: false,
      },
      {
        answer: "Quetzal",
        isCorrect: false,
      },
    ],
  },
  // Question #7
  {
    question: "¿Sábes en qué año abolió Costa Rica su ejército?",
    hasMultimedia: false,
    answers: [
      {
        answer: "1948",
        isCorrect: true,
      },
      {
        answer: "1955",
        isCorrect: false,
      },
      {
        answer: "1960",
        isCorrect: false,
      },
      {
        answer: "1972",
        isCorrect: false,
      },
    ],
  },
  // Question #8
  {
    question: "¿Cuál es el árbol nacional de Costa Rica?",
    hasMultimedia: false,
    answers: [
      {
        answer: "Cedro",
        isCorrect: false,
      },
      {
        answer: "Roble",
        isCorrect: false,
      },
      {
        answer: "Ceibo",
        isCorrect: false,
      },
      {
        answer: "Guanacaste",
        isCorrect: true,
      },
    ],
  },
  // Question #9
  {
    question: "¿Cuánto es 8x7?",
    hasMultimedia: false,
    answers: [
      {
        answer: "44",
        isCorrect: false,
      },
      {
        answer: "87",
        isCorrect: false,
      },
      {
        answer: "56",
        isCorrect: true,
      },
      {
        answer: "60",
        isCorrect: false,
      },
    ],
  },
  // Question #10
  {
    question: "¿Cómo es la bandera de Costa Rica?",
    hasMultimedia: false,
    answers: [
      {
        answer:
          "Posee dos franjas blancas en los extremos, dos rojas en el interior y una azul central",
        isCorrect: false,
      },
      {
        answer:
          "Posee dos franjas azules en los extremos, dos blancas en el interior y una roja central",
        isCorrect: true,
      },
      {
        answer:
          "Posee dos franjas blancas en los extremos y dos azules en el interior",
        isCorrect: false,
      },
      {
        answer:
          "Posee dos franjas azules en los extremos, dos blancas en el interior y un punto rojo en el centro",
        isCorrect: false,
      },
    ],
  },
  // Question #11 - Multimedia AUDIO
  {
    question: "¿Qué animal reproduce el siguiente sonido?",
    hasMultimedia: true,
    multimedia: {
      type: MultimediaType.AUDIO,
      source: "balar.mp3",
    },
    answers: [
      {
        answer: "Vaca",
        isCorrect: false,
      },
      {
        answer: "Perro",
        isCorrect: false,
      },
      {
        answer: "Oveja",
        isCorrect: true,
      },
      {
        answer: "Gato",
        isCorrect: false,
      },
    ],
  },
  // Question #12 - Multimedia AUDIO
  {
    question: "¿Qué animal reproduce el siguiente sonido?",
    hasMultimedia: true,
    multimedia: {
      type: MultimediaType.AUDIO,
      source: "rana.mp3",
    },
    answers: [
      {
        answer: "Rana",
        isCorrect: true,
      },
      {
        answer: "Perro",
        isCorrect: false,
      },
      {
        answer: "Oveja",
        isCorrect: false,
      },
      {
        answer: "Saltamontes",
        isCorrect: false,
      },
    ],
  },
  // Question #13
  {
    question: "¿Cómo se llama esta edificación ubicada en Cartago?",
    hasMultimedia: true,
    multimedia: {
      type: MultimediaType.IMAGE,
      source: "basilica.webp",
    },
    answers: [
      {
        answer: "Museo Nacional",
        isCorrect: false,
      },
      {
        answer: "Hospital de Niños",
        isCorrect: false,
      },
      {
        answer: "Basílica de Nuestra Señora de los Ángeles",
        isCorrect: true,
      },
      {
        answer: "Teatro Nacional",
        isCorrect: false,
      },
    ],
  },
  // Question #14
  {
    question: "¿Cuanto es 88 + 11 + 1?",
    hasMultimedia: false,
    answers: [
      {
        answer: "109",
        isCorrect: false,
      },
      {
        answer: "100",
        isCorrect: true,
      },
      {
        answer: "119",
        isCorrect: false,
      },
      {
        answer: "108",
        isCorrect: false,
      },
    ],
  },
  // Question #15
  {
    question: "¿Cuál es el día con el que comienza la semana?",
    hasMultimedia: false,
    answers: [
      {
        answer: "Martes",
        isCorrect: false,
      },
      {
        answer: "Domingo",
        isCorrect: true,
      },
      {
        answer: "Lunes",
        isCorrect: false,
      },
      {
        answer: "Martes",
        isCorrect: false,
      },
    ],
  },
  // Question #16
  {
    question: "¿Cuál es el planeta más cercano al Sol?",
    hasMultimedia: false,
    answers: [
      {
        answer: "Marte",
        isCorrect: false,
      },
      {
        answer: "Venus",
        isCorrect: false,
      },
      {
        answer: "Júpiter",
        isCorrect: false,
      },
      {
        answer: "Mercurio",
        isCorrect: true,
      },
    ],
  },
  // Question #17
  {
    question: "¿Cuántos lados tiene un triángulo?",
    hasMultimedia: false,
    answers: [
      {
        answer: "4",
        isCorrect: false,
      },
      {
        answer: "3",
        isCorrect: true,
      },
      {
        answer: "6",
        isCorrect: false,
      },
      {
        answer: "5",
        isCorrect: false,
      },
    ],
  },
  // Question #18
  {
    question: `¿Cuál es el planeta conocido como el "Planeta Rojo"?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "Venus",
        isCorrect: false,
      },
      {
        answer: "Marte",
        isCorrect: true,
      },
      {
        answer: "Júpiter",
        isCorrect: false,
      },
      {
        answer: "Saturno",
        isCorrect: false,
      },
    ],
  },
  // Question #19
  {
    question: "Observa la siguiente imagen\n¿Cómo se le conoce a este sistema?",
    hasMultimedia: true,
    multimedia: {
      type: MultimediaType.IMAGE,
      source: "solar-system.webp",
    },
    answers: [
      {
        answer: "Cinturón de asteroides",
        isCorrect: false,
      },
      {
        answer: "Vía Láctea",
        isCorrect: false,
      },
      {
        answer: "Sistema Solar",
        isCorrect: true,
      },
      {
        answer: "Galaxia",
        isCorrect: false,
      },
    ],
  },
  // Question #20
  {
    question: "¿Cuál de estos ejemplos son 3 estados de la materia?",
    hasMultimedia: false,
    answers: [
      {
        answer: "Sólido, Líquido y Eléctrico",
        isCorrect: false,
      },
      {
        answer: "Líquido, Gaseoso y Grumoso",
        isCorrect: false,
      },
      {
        answer: "Líquido, Sólido y Volumen",
        isCorrect: false,
      },
      {
        answer: "Sólido, Líquido y Gaseoso",
        isCorrect: true,
      },
    ],
  },
  // Question #21
  {
    question: `¿Cuál es el animal que hace "mu" y produce leche?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "Cabra",
        isCorrect: false,
      },
      {
        answer: "Vaca",
        isCorrect: true,
      },
      {
        answer: "Caballo",
        isCorrect: false,
      },
      {
        answer: "Perro",
        isCorrect: false,
      },
    ],
  },
  // Question #22
  {
    question: `¿Sábes el significado de un trueno?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "El trueno es la descarga eléctrica de un rayo",
        isCorrect: false,
      },
      {
        answer: "El trueno es el destello de luz causado por un rayo",
        isCorrect: false,
      },
      {
        answer: "El trueno es el sonido causado al impactar el rayo",
        isCorrect: true,
      },
      {
        answer: "El trueno es el choque entre dos nubes",
        isCorrect: false,
      },
    ],
  },
  // Question #23
  {
    question: "¿Cuántas patas tiene una araña?",
    hasMultimedia: false,
    answers: [
      {
        answer: "2",
        isCorrect: false,
      },
      {
        answer: "4",
        isCorrect: false,
      },
      {
        answer: "6",
        isCorrect: false,
      },
      {
        answer: "8",
        isCorrect: true,
      },
    ],
  },
  // Question #24
  {
    question: "¿La lengua, cuál sentido representa?",
    hasMultimedia: false,
    answers: [
      {
        answer: "Gusto",
        isCorrect: true,
      },
      {
        answer: "Tacto",
        isCorrect: false,
      },
      {
        answer: "Vista",
        isCorrect: false,
      },
      {
        answer: "Escucha",
        isCorrect: false,
      },
    ],
  },
  // Question #25
  {
    question: `¿Cuál es el antónimo (opuesto) de "frío"?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "Caliente",
        isCorrect: true,
      },
      {
        answer: "Húmedo",
        isCorrect: false,
      },
      {
        answer: "Congelado",
        isCorrect: false,
      },
      {
        answer: "Tibio",
        isCorrect: false,
      },
    ],
  },
  // Question #26
  {
    question: `¿Qué animal es conocido por ser el "rey de la selva"?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "Elefante",
        isCorrect: false,
      },
      {
        answer: "León",
        isCorrect: true,
      },
      {
        answer: "Jirafa",
        isCorrect: false,
      },
      {
        answer: "Tigre",
        isCorrect: false,
      },
    ],
  },
  // Question #27
  {
    question: `Dos y dos son cuatro, cuatro y dos son seis, seis y dos son ocho, y...`,
    hasMultimedia: false,
    answers: [
      {
        answer: "ocho veinticuatro",
        isCorrect: false,
      },
      {
        answer: "ocho dieciséis",
        isCorrect: true,
      },
      {
        answer: "ocho treinta y dos",
        isCorrect: false,
      },
      {
        answer: "ocho",
        isCorrect: false,
      },
    ],
  },
  // Question #28
  {
    question: `¿Cuantos días tiene Febrero en un año bisiesto?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "28",
        isCorrect: false,
      },
      {
        answer: "29",
        isCorrect: true,
      },
      {
        answer: "27",
        isCorrect: false,
      },
      {
        answer: "30",
        isCorrect: false,
      },
    ],
  },
  // Question #29
  {
    question: `¿Cuántas semanas tiene un año?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "52",
        isCorrect: true,
      },
      {
        answer: "50",
        isCorrect: false,
      },
      {
        answer: "360",
        isCorrect: false,
      },
      {
        answer: "12",
        isCorrect: false,
      },
    ],
  },
  // Question #30
  {
    question: `¿Que color se crea al combinar estos dos colores?`,
    hasMultimedia: true,
    multimedia: {
      type: MultimediaType.IMAGE,
      source: "color.webp",
    },
    answers: [
      {
        answer: (
          <div className="radius-round w-[50px] h-[50px] bg-[#A1673F]"></div>
        ),
        isCorrect: false,
      },
      {
        answer: (
          <div className="radius-round w-[50px] h-[50px] bg-[#02ADC7]"></div>
        ),
        isCorrect: false,
      },
      {
        answer: (
          <div className="radius-round w-[50px] h-[50px] bg-[#297B39]"></div>
        ),
        isCorrect: false,
      },
      {
        answer: (
          <div className="radius-round w-[50px] h-[50px] bg-[#ee82ee]"></div>
        ),
        isCorrect: true,
      },
    ],
  },
  // Question #31
  {
    question: `¿En que provincia se encuentra el volcán Arenal?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "San José",
        isCorrect: false,
      },
      {
        answer: "Guanacaste",
        isCorrect: false,
      },
      {
        answer: "Alajuela",
        isCorrect: true,
      },
      {
        answer: "Cartago",
        isCorrect: false,
      },
    ],
  },
  // Question #32
  {
    question: `¿Quién fue el personaje heróico que quemó el Mesón de Guerra?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "William Walker",
        isCorrect: false,
      },
      {
        answer: "José Figueres Ferrer",
        isCorrect: false,
      },
      {
        answer: "Ricardo Jiménez Oreamuno",
        isCorrect: false,
      },
      {
        answer: "Juan Santamaría",
        isCorrect: true,
      },
    ],
  },
  // Question #33
  {
    question: `¿Cómo se llama el fenónemo conocido como la sobreposición de la Luna frente al Sol?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "Cometa",
        isCorrect: false,
      },
      {
        answer: "Eclipse",
        isCorrect: true,
      },
      {
        answer: "Torbellino",
        isCorrect: false,
      },
      {
        answer: "Meteorito",
        isCorrect: false,
      },
    ],
  },
  // Question #34
  {
    question: `¿Que color se crea al combinar estos dos colores?`,
    hasMultimedia: true,
    multimedia: {
      type: MultimediaType.IMAGE,
      source: "color2.webp",
    },
    answers: [
      {
        answer: (
          <div className="radius-round w-[50px] h-[50px] bg-[#F00]"></div>
        ),
        isCorrect: false,
      },
      {
        answer: (
          <div className="radius-round w-[50px] h-[50px] bg-[#FA6228]"></div>
        ),
        isCorrect: false,
      },
      {
        answer: (
          <div className="radius-round w-[50px] h-[50px] bg-[#008000]"></div>
        ),
        isCorrect: true,
      },
      {
        answer: (
          <div className="radius-round w-[50px] h-[50px] bg-[#043F9B]"></div>
        ),
        isCorrect: false,
      },
    ],
  },
  // Question #35
  {
    question: (
      <div>
        {`Observa la imagen`} <br />{" "}
        {"¿Cuál será el vaso que se llene primero?"}
      </div>
    ),
    hasMultimedia: true,
    multimedia: {
      type: MultimediaType.IMAGE,
      source: "fillUpFirst.webp",
    },
    answers: [
      {
        answer: "1",
        isCorrect: false,
      },
      {
        answer: "6",
        isCorrect: true,
      },
      {
        answer: "4",
        isCorrect: false,
      },
      {
        answer: "2",
        isCorrect: false,
      },
    ],
  },
  // Question #36
  {
    question: `¿Cuánto es 5 + 5 x 5?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "30",
        isCorrect: true,
      },
      {
        answer: "50",
        isCorrect: false,
      },
      {
        answer: "15",
        isCorrect: false,
      },
      {
        answer: "25",
        isCorrect: false,
      },
    ],
  },
  // Question #37
  {
    question: `¿Cuánto es 8 x 3 - 10 / 5?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "15",
        isCorrect: false,
      },
      {
        answer: "22",
        isCorrect: true,
      },
      {
        answer: "24",
        isCorrect: false,
      },
      {
        answer: "20",
        isCorrect: false,
      },
    ],
  },
  // Question #38
  {
    question: `¿Cuál es un sinónimo de inteligente?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "Enojado",
        isCorrect: false,
      },
      {
        answer: "Listo",
        isCorrect: true,
      },
      {
        answer: "Dificil",
        isCorrect: false,
      },
      {
        answer: "Necio",
        isCorrect: false,
      },
    ],
  },
  // Question #39
  {
    question: `Completa: "Más vale tarde..."`,
    hasMultimedia: false,
    answers: [
      {
        answer: "que nunca",
        isCorrect: true,
      },
      {
        answer: "que madrugar",
        isCorrect: false,
      },
      {
        answer: "que mirar al cielo",
        isCorrect: false,
      },
      {
        answer: "en el tiempo",
        isCorrect: false,
      },
    ],
  },
  // Question #40
  {
    question: `Completa: "Camaron que se duerme..."`,
    hasMultimedia: false,
    answers: [
      {
        answer: "del corredor no pasa",
        isCorrect: false,
      },
      {
        answer: "se lo lleva la corriente",
        isCorrect: true,
      },
      {
        answer: "no se le mira el colmillo",
        isCorrect: false,
      },
      {
        answer: "su rama nunca endereza",
        isCorrect: false,
      },
    ],
  },
  // Question #41
  {
    question: `Completa: "No hay mal..."`,
    hasMultimedia: false,
    answers: [
      {
        answer: "con su tema",
        isCorrect: false,
      },
      {
        answer: "que hace la fuerza",
        isCorrect: false,
      },
      {
        answer: "se lo lleva la corriente",
        isCorrect: false,
      },
      {
        answer: "que por bien no venga",
        isCorrect: true,
      },
    ],
  },
  // Question #42
  {
    question: `¿Qué significa este refrán: "El que mucho abarca poco aprieta"?`,
    hasMultimedia: false,
    answers: [
      {
        answer:
          "Es mejor tener algo seguro y real en lugar de perseguir algo incierto y arriesgado",
        isCorrect: false,
      },
      {
        answer:
          "Si tratas de hacer demasiadas cosas a la vez, es probable que no hagas ninguna de ellas bien.",
        isCorrect: true,
      },
      {
        answer:
          "Si se escuchan rumores o indicios de algo, es probable que haya algo de verdad en ellos",
        isCorrect: false,
      },
      {
        answer: "Cada persona tiene sus propios gustos, intereses y opiniones",
        isCorrect: false,
      },
    ],
  },
  // Question #43
  {
    question: `¿Cual sistema del cuerpo humano es el encargado de enviar señales entre el cerebro y el resto del cuerpo?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "Sistema Sanguíneo",
        isCorrect: false,
      },
      {
        answer: "Sistema Nervioso",
        isCorrect: true,
      },
      {
        answer: "Sistema Digestivo",
        isCorrect: false,
      },
      {
        answer: "Sistema Respiratorio",
        isCorrect: false,
      },
    ],
  },
  // Question #44
  {
    question: `¿Cual es el animal mas grande del planeta del mundo?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "Jirafa",
        isCorrect: false,
      },
      {
        answer: "Rinoceronte",
        isCorrect: false,
      },
      {
        answer: "Tiburón",
        isCorrect: false,
      },
      {
        answer: "Ballena Azul",
        isCorrect: true,
      },
    ],
  },
  // Question #45
  {
    question: `¿Cuales son los colores primarios?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "Rojo, Azul y Verde",
        isCorrect: false,
      },
      {
        answer: "Rojo, Amarillo y Naranja",
        isCorrect: false,
      },
      {
        answer: "Rojo, Amarillo y Azul",
        isCorrect: true,
      },
      {
        answer: "Gris, Negro y Blanco",
        isCorrect: false,
      },
    ],
  },
  // Question #46
  {
    question: "¿A cuál himno de Costa Rica pertence este extracto?",
    hasMultimedia: true,
    multimedia: {
      type: MultimediaType.AUDIO,
      source: "himno15.mp3",
    },
    answers: [
      {
        answer: "Himno Nacional de Costa Rica",
        isCorrect: false,
      },
      {
        answer: "Patriótica Costarricense",
        isCorrect: false,
      },
      {
        answer: "Himno a Juan Santamaría",
        isCorrect: false,
      },
      {
        answer: "Himno al 15 de septiembre",
        isCorrect: true,
      },
    ],
  },
  // Question #47
  {
    question: `¿Qué se celebra el 25 de julio en Costa Rica?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "El día de las madres",
        isCorrect: false,
      },
      {
        answer: "El día del padre",
        isCorrect: false,
      },
      {
        answer: "La Anexión del Partido de Nicoya",
        isCorrect: true,
      },
      {
        answer: "Navidad",
        isCorrect: false,
      },
    ],
  },
  // Question #48
  {
    question: `¿Qué cosa es, que la hacen cantando, la compran llorando y la usan sin saber?`,
    hasMultimedia: false,
    answers: [
      {
        answer: "Un ataúd",
        isCorrect: true,
      },
      {
        answer: "Un reloj",
        isCorrect: false,
      },
      {
        answer: "El arbol",
        isCorrect: false,
      },
      {
        answer: "La lengua",
        isCorrect: false,
      },
    ],
  },
  // Question #49
  {
    question: `Adivina: Todos pasan por mí, yo nunca paso por nadie. Todos preguntan por mí, yo no pregunto por nadie`,
    hasMultimedia: false,
    answers: [
      {
        answer: "La hora",
        isCorrect: false,
      },
      {
        answer: "La calle",
        isCorrect: true,
      },
      {
        answer: "El humo",
        isCorrect: false,
      },
      {
        answer: "Una puerta",
        isCorrect: false,
      },
    ],
  },
  // Question #50
  {
    question: "Resuelve esta adivinanza",
    hasMultimedia: true,
    multimedia: {
      type: MultimediaType.IMAGE,
      source: "mathProblem.webp",
    },
    answers: [
      {
        answer: "16",
        isCorrect: false,
      },
      {
        answer: "20",
        isCorrect: false,
      },
      {
        answer: "10",
        isCorrect: false,
      },
      {
        answer: "14",
        isCorrect: true,
      },
    ],
  },
];
