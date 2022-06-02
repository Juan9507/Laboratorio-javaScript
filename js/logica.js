//import { juegoView, tituloCategoria } from "./juegoView.js";
/**
 * Logica de negocio
 */
// import { categorias } from "../categorias/categorias.js";
// import { preguntas } from "../preguntas/preguntas.js";
// import { respuestas } from "../respuestas/respuestas.js";

// export let nivel = 1;
// export let pregunta;
// export let nombreCategoria;
// export let nombrePregunta;

// export async function elegirCategoria() {
//   categorias.forEach((element) => {
//     if (element.nivel == nivel) {
//       nombreCategoria = element.nombre;
//     }
//   });
// }

// export async function elegirPregunta() {
//   let rand = Math.ceil(Math.random() * 5);
//   await preguntas.forEach((element) => {
//     if (element.nivel == nivel && element.pregunta == rand) {
//       nombrePregunta = element.nombre;
//       pregunta = element.pregunta;
//     }
//   });
// }

// export async function mostrarPreguntas(form) {
//   respuestas.forEach((element) => {
//     if (nivel == element.nivel && pregunta == element.pregunta) {
//       console.log(element.respuesta + " - " + element.valor);
//       let formRadio = document.createElement("input");
//       let label = document.createElement("label");
//       label.classList.add("pl-3");
//       let br = document.createElement("br");
//       label.textContent = element.respuesta;
//       formRadio.type = "radio";
//       formRadio.value = element.valor;
//       formRadio.name = "preguntas";
//       form.append(formRadio);
//       form.append(label);
//       form.append(br);
//     }
//   });
// }

// export async function validarForm(form) {
//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     if (document.querySelector("input[name=preguntas]:checked").value == 1) {
//       nivel++;
//       console.log(nivel);
//       elegirCategoria();
//       elegirPregunta();
//       mostrarPreguntas();
//     }
//   });
// }

//   elegirCategoria();
//   elegirPregunta();
//   console.log(nombreCategoria);
//   console.log(nombrePregunta);
//   console.log(pregunta);
//   mostrarPreguntas();
