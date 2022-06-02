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
let acumulado = 0;

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
  tituloCol.classList.add("col-sm-6", "pt-4", "text-center");
  const titulo = document.createElement("h3");
  titulo.textContent = "Juego de preguntas y respuestas";

  let acumuladoCol = document.createElement("div");
  acumuladoCol.classList.add("col-sm-6", "pt-4", "text-center");
  let acumuladoValor = document.createElement("h3");
  acumuladoValor.textContent = "Acumulado " + acumulado;

  function revivirAcumulado() {
    acumuladoValor = document.createElement("h3");
    acumuladoValor.textContent = "Acumulado " + acumulado;
    acumuladoCol.append(acumuladoValor);
  }

  containerDiv.append(containerRow);
  containerRow.append(tituloCol, acumuladoCol);
  tituloCol.append(titulo);
  acumuladoCol.append(acumuladoValor);

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
  /**
   * Agregar elemetos creados
   */
  cardForm.append(cardBody);
  cardBody.append(cardTextPregunta);
  cardBody.append(form);
  form.append(formBtn);

  /**
   * Funcion para volver a crear los elementos al cambiar de pregunta
   * ya que se eliminan y toca volverlos a crear
   */
  function prueba() {
    elegirCategoria();
    elegirPregunta();
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

  /**
   * Funcion para elegir la categoria segun el nivel
   */
  async function elegirCategoria() {
    await categorias.forEach((element) => {
      if (element.nivel == nivel) {
        nombreCategoria = element.nombre;
      }
    });
  }

  /**
   * Funcion para elegir la pregunta segun la pregunta
   */
  async function elegirPregunta() {
    let rand = Math.ceil(Math.random() * 5);
    await preguntas.forEach((element) => {
      if (element.nivel == nivel && element.pregunta == rand) {
        nombrePregunta = element.nombre;
        pregunta = element.pregunta;
      }
    });
  }

  /**
   * funcion para mostrar las preguntas
   * @param {*} form se le envia por parametro el elemento del form
   */
  async function mostrarPreguntas(form) {
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
  async function validarForm(form) {
    form.addEventListener("submit", (event) => {
      if (nivel < 5) {
        let valor = document.querySelector(
          "input[name=preguntas]:checked"
        ).value;
        event.preventDefault();
        if (valor == 1) {
          nivel++;
          acumulado += 5;
          cardForm.innerHTML = "";
          acumuladoCol.innerHTML = "";
          revivirAcumulado();
          prueba();
        }
      } else {
        alert("Felicidades acabaste las preguntas");
        nivel = 1;
        //El primer parametro es el texto a mostrar, el segundo es el texto por defecto en el input text
        let texto = prompt("¿Cual es tu nombre?", "Texto por defecto");
        console.log(texto);
        //comparamos el texto obtenido, sea distinto a el texto por defecto
        if (texto != "Texto por defecto") alert("Tu nombre es: " + texto);
      }
    });
  }

  /**
   * Agregando todo lo creado
   */
  container.append(containerDiv);
};
