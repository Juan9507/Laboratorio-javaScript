/**
 * Logica para validar el funcionamiento del juego
 *
 * @author [Juan David Rivera Naranjo - juandavidnaranjo75@gmail.com]
 * @version [v1.0.0]
 * @since [v1.0.0]
 */
import { categorias } from "../categorias/categorias.js";
import { preguntas } from "../preguntas/preguntas.js";
import { respuestas } from "../respuestas/respuestas.js";
import {
  addHistorico,
  localStoreHistoricoList,
  getHistoricoList,
} from "./historico.js";
/**
 * Funcion para elegir la categoria segun el nivel
 */
let nivel = 1;
let pregunta;
let nombreCategoria;
let nombrePregunta;
let acumulado = 0;
let temp = 0;

/**
 * Funcion para volver a crear los elementos al cambiar de pregunta
 * ya que se eliminan y toca volverlos a crear
 */
function recuperarCard() {
  elegirCategoria();
  elegirPregunta();
  let card = document.querySelector(".card");
  let cardBody = document.querySelector(".card");
  cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let cardTitle = document.createElement("h3");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = getnombreCategoria();

  let cardTextPregunta = document.createElement("p");
  cardTextPregunta.classList.add("card-text");
  cardTextPregunta.textContent = getnombrePregunta();
  let form = document.createElement("form");
  form.name = "preguntasAll";
  let formBtn = document.createElement("input");
  formBtn.classList.add("btn", "btn-primary");
  formBtn.type = "submit";
  formBtn.value = "Enviar";
  validarForm(form);
  mostrarPreguntas(form);
  card.append(cardBody);
  cardBody.append(cardTitle);
  cardBody.append(cardTextPregunta);
  cardBody.append(form);
  form.append(formBtn);
}

/**
 * Funcion para elegir la categoria
 * @returns - retorna el nombre nombre de la categoria
 */
export async function elegirCategoria() {
  await categorias.forEach((element) => {
    if (element.nivel == nivel) {
      nombreCategoria = element.nombre;
    }
  });
  return nombreCategoria;
}

/**
 * Funcion para elegir la pregunta,
 * segun la pregunta en la que se esta y el nivel
 */
export async function elegirPregunta() {
  let rand = Math.ceil(Math.random() * 5);
  await preguntas.forEach((element) => {
    if (element.nivel == getNivel() && element.pregunta == rand) {
      nombrePregunta = element.nombre;
      pregunta = element.pregunta;
    }
  });
}

/**
 * funcion para mostrar las preguntas
 * @param {*} form se le envia por parametro el elemento del form
 */
export async function mostrarPreguntas(form) {
  await respuestas.forEach((element) => {
    if (nivel == element.nivel && pregunta == element.pregunta) {
      console.log(element.respuesta + " - " + element.valor);
      let formRadio = document.createElement("input");
      let label = document.createElement("label");
      label.classList.add("pl-3");
      let br = document.createElement("br");
      label.textContent = element.respuesta;
      formRadio.type = "radio";
      formRadio.value = element.valor;
      formRadio.name = "preguntas";
      form.append(formRadio);
      form.append(label);
      form.append(br);
    }
  });
}

/**
 * Funcion para validar el envio de la pregunta
 * @param {*} form se le pasa igual el elemento de form
 */
export async function validarForm(form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (nivel < 5) {
      validarRespuesta(event);
    } else {
      guardarHistorico(true);
    }
  });
}

/**
 * Funcion para separa los if anidados,
 * sirve para saver si ya gano el juego
 * @param {*} event recibe el event del form
 */
export function validarRespuesta(event) {
  let valor = document.querySelector("input[name=preguntas]:checked").value;
  event.preventDefault();
  if (valor == 1) {
    aumentarAcumulado();
    bootbox.alert("Pregunta correcta!");
    setTimeout(() => {
      saberSiJuega();
    }, 3000);
  } else {
    bootbox.alert({
      message: "Lo siento has perdido",
      className: "rubberBand animated",
    });
    frenarJuego();
  }
}

/**
 * Funcion para pedir si quiere seguir o jugando
 * o se retira
 */
export async function saberSiJuega() {
  bootbox.confirm({
    message: "??Deseas seguir jugando o te retiras?",
    buttons: {
      confirm: {
        label: "Sigo",
        className: "btn-success",
      },
      cancel: {
        label: "Me retiro",
        className: "btn-danger",
      },
    },
    callback: function (result) {
      if (result) {
        aumentarNivel();
      } else {
        frenarJuego();
        guardarHistorico(false);
      }
    },
  });
}

/**Funcion para volver a crear el acumulado
 * @param {*} acumuladoCol
 */
function revivirAcumulado(acumuladoCol) {
  let acumuladoValor = document.createElement("h3");
  acumuladoValor.textContent = "Acumulado " + acumulado;
  acumuladoCol.append(acumuladoValor);
}

/**
 * Funcion para aumentar el acumulado
 */
export function aumentarAcumulado() {
  switch (nivel) {
    case 1:
      acumulado += 5;
      temp = acumulado;
      break;
    case 2:
      acumulado += 10;
      temp = acumulado;
      break;
    case 3:
      acumulado += 15;
      temp = acumulado;
      break;
    case 4:
      acumulado += 20;
      temp = acumulado;
      break;
    case 5:
      acumulado += 35;
      temp = acumulado;
      break;
  }
  //acumulado += 5;
  //temp = acumulado;
}

/**
 * Funcion para aumentar el nivel
 */
export function aumentarNivel() {
  nivel++;
  let cardForm = document.querySelector(".card");
  let acumuladoCol = document.querySelector(".acumuladoCol");
  cardForm.innerHTML = "";
  acumuladoCol.innerHTML = "";
  revivirAcumulado(acumuladoCol);
  recuperarCard(cardForm);
}

/**
 * Funcion para frenar el juego
 */
function frenarJuego() {
  nivel = 1;
  acumulado = 0;
  let cardForm = document.querySelector(".card");
  let acumuladoCol = document.querySelector(".acumuladoCol");
  cardForm.innerHTML = "";
  acumuladoCol.innerHTML = "";
  revivirAcumulado(acumuladoCol);
  recuperarCard(cardForm);
}

/**
 * Funcion para guardar el historico
 * @param {*} retirada
 */
function guardarHistorico(retirada) {
  let texto;
  if (!retirada) {
    bootbox.prompt({
      title:
        "Te retiraste por favor digita ru nombre para guardar el historico!",
      centerVertical: true,
      callback: function (result) {
        console.log(result);
        if (result != undefined) {
          localStoreHistoricoList(addHistorico(result, temp));
        } else {
          localStoreHistoricoList(addHistorico("sofkaU", temp));
        }
      },
    });
  } else {
    bootbox.prompt({
      title:
        "Felicidades ganastes por favor digita tu nombre para guardar el historico!!",
      centerVertical: true,
      callback: function (result) {
        console.log(result);
        if (result != undefined) {
          localStoreHistoricoList(addHistorico(result, temp));
        } else {
          localStoreHistoricoList(addHistorico("sofkaU", temp));
        }
      },
    });
  }
  nivel = 1;
  acumulado = 0;
  console.log(texto);
}

export function getNivel() {
  return nivel;
}

export function setNivel(nivel) {
  nivel = nivel;
}

export function getPregunta() {
  return pregunta;
}

export function setPregunta(pregunta) {
  pregunta = pregunta;
}

export function getnombreCategoria() {
  return nombreCategoria;
}

export function setnombreCategoria(nombreCategoria) {
  nombreCategoria = nombreCategoria;
}

export function getnombrePregunta() {
  return nombrePregunta;
}

export function setnombrePregunta(nombrePregunta) {
  nombrePregunta = nombrePregunta;
}

export function getacumulado() {
  return acumulado;
}

export function setacumulado(nombrePregunta) {
  acumulado = acumulado;
}
