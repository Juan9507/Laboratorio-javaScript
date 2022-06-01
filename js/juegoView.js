import { categorias } from "../categorias/categorias.js";
import { preguntas } from "../preguntas/preguntas.js";
import { respuestas } from "../respuestas/respuestas.js";

export const juegoView = () => {
  /**
   * Variables globales
   */
  let nivel = 1;
  let pregunta;
  let nombreCategoria;
  let nombrePregunta;

  /**
   * seleccionando el elemento padre del dom
   */
  const container = document.querySelector("#container");
  container.classList.add("container");

  /**
   * Creando el titulo del juego
   */
  const h1 = document.createElement("h1");
  h1.classList.add("titulo");
  h1.textContent = "Juego de preguntas y respuestas";

  async function elegirCategoria() {
    categorias.forEach((element) => {
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

  async function mostrarPreguntas() {
    respuestas.forEach((element) => {
      if (nivel == element.nivel && pregunta == element.pregunta) {
        console.log(element.respuesta + " - " + element.valor);
      }
    });
  }

  elegirCategoria();
  elegirPregunta();
  console.log(nombreCategoria);
  console.log(nombrePregunta);
  console.log(pregunta);
  mostrarPreguntas();

  container.append(h1);
};
