/**
 * Vista para pintar los elementos del juego
 *
 * @author [Juan David Rivera Naranjo - juandavidnaranjo75@gmail.com]
 * @version [v1.0.0]
 * @since [v1.0.0]
 */
import {
  getPregunta,
  getacumulado,
  getnombreCategoria,
  getnombrePregunta,
  elegirCategoria,
  elegirPregunta,
  mostrarPreguntas,
  validarForm,
} from "./logica.js";

import { historicoView } from "./historicoView.js";

export const juegoView = async () => {
  /**
   * metodos a cargar desde el inicio
   */
  elegirCategoria();
  elegirPregunta();
  console.log(getnombreCategoria());
  console.log(getnombrePregunta());
  console.log(getPregunta());

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
  acumuladoCol.classList.add("col-sm-6", "acumuladoCol", "pt-4", "text-center");
  let acumuladoValor = document.createElement("h3");
  acumuladoValor.textContent = "Acumulado " + getacumulado();

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
  cardTitle.textContent = getnombreCategoria();
  cardBody.append(cardTitle);
  let cardTextPregunta = document.createElement("p");
  cardTextPregunta.classList.add("card-text");
  cardTextPregunta.textContent = getnombrePregunta();
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
  form.appendChild(formBtn);

  /**
   * Agregando todo lo creado
   */
  await container.append(containerDiv);

  historicoView();
};
