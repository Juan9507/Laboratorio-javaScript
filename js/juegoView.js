import { categorias } from "../categorias/categorias.js";
import { preguntas } from "../preguntas/preguntas.js";
import { respuestas } from "../respuestas/respuestas.js";

/**
 * Variables globales
 */
let nivel = 1;
let pregunta;
let nombreCategoria;
let nombrePregunta;

export const juegoView = () => {
  /**
   * metodos a cargar desde el inicio
   */
  elegirCategoria();
  elegirPregunta();
  console.log(nombreCategoria);
  console.log(nombrePregunta);
  console.log(pregunta);

  /**
   * seleccionando el elemento padre del dom
   */
  const container = document.querySelector("#container");
  container.classList.add("container");

  /**
   * Creamos columnas para el titulo
   */
  const containerDiv = document.createElement("div");
  const containerRow = document.createElement("div");
  containerRow.classList.add("row");
  const tituloCol = document.createElement("div");
  tituloCol.classList.add("col-sm-12", "pt-4", "text-center");
  const titulo = document.createElement("h3");
  titulo.textContent = "Juego de preguntas y respuestas";
  containerDiv.appendChild(containerRow);
  containerRow.appendChild(tituloCol);
  tituloCol.appendChild(titulo);

  /**
   * Card para el formulario
   */
  let formCol = document.createElement("div");
  formCol.classList.add("col-sm-12", "pt-5");
  let cardForm = document.createElement("div");
  cardForm.classList.add("card");
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  containerRow.append(formCol);
  formCol.append(cardForm);
  let cardTitle = document.createElement("h3");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = nombreCategoria;
  cardBody.append(cardTitle);
  let cardTextPregunta = document.createElement("p");
  cardTextPregunta.classList.add("card-text");
  cardTextPregunta.textContent = nombrePregunta;
  let form = document.createElement("form");
  form.name = "preguntasAll";
  let formBtn = document.createElement("input");
  formBtn.classList.add("btn", "btn-primary");
  formBtn.type = "submit";
  formBtn.value = "Enviar";
  /**
   * Metodo para validar el formulario y mostrar las preguntas
   */
  validarForm(form);
  mostrarPreguntas(form);

  cardForm.append(cardBody);
  cardBody.append(cardTextPregunta);
  cardBody.append(form);
  form.append(formBtn);

  function prueba() {
    elegirCategoria();
    elegirPregunta();
    //formCol = document.createElement("div");
    //formCol.classList.add("col-sm-12", "pt-5");
    //cardForm = document.createElement("div");
    //cardForm.classList.add("card");
    cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    containerRow.append(formCol);
    formCol.append(cardForm);
    cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = nombreCategoria;
    cardBody.append(cardTitle);
    cardTextPregunta = document.createElement("p");
    cardTextPregunta.classList.add("card-text");
    cardTextPregunta.textContent = nombrePregunta;
    form = document.createElement("form");
    form.name = "preguntasAll";
    formBtn = document.createElement("input");
    formBtn.classList.add("btn", "btn-primary");
    formBtn.type = "submit";
    formBtn.value = "Enviar";
    validarForm(form);
    mostrarPreguntas(form);
    containerRow.append(formCol);
    //formCol.append(cardForm);
    cardForm.append(cardBody);
    cardBody.append(cardTitle);
    cardBody.append(cardTextPregunta);
    cardBody.append(form);
    form.append(formBtn);
  }

  async function elegirCategoria() {
    await categorias.forEach((element) => {
      if (element.nivel == nivel) {
        nombreCategoria = element.nombre;
      }
    });
  }

  async function elegirPregunta() {
    let rand = Math.ceil(Math.random() * 5);
    await preguntas.forEach((element) => {
      if (element.nivel == nivel && element.pregunta == rand) {
        nombrePregunta = element.nombre;
        pregunta = element.pregunta;
      }
    });
  }

  async function mostrarPreguntas(form) {
    respuestas.forEach((element) => {
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

  async function validarForm(form) {
    form.addEventListener("submit", (event) => {
      if (nivel < 5) {
        let valor = document.querySelector(
          "input[name=preguntas]:checked"
        ).value;
        event.preventDefault();
        if (valor == 1) {
          nivel++;
          console.log("Este es el nivel", nivel);
          cardForm.innerHTML = "";
          console.log("Valor del radio ", valor);
          prueba();
        }
      } else {
        alert("Felicidades acabaste las preguntas");
        nivel = 1;
      }
    });
  }

  //mostrarPreguntas(cardBody);
  /**
   * Creando el titulo del juego
   */
  container.append(containerDiv);
};
