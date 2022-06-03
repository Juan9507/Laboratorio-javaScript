import { getHistoricoList } from "./historico.js";

export const historicoView = () => {
  const container = document.querySelector("#container");
  container.classList.add("container");

  let card = document.createElement("div");
  card.classList.add("card", "mt-4");
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  let text = document.createElement("p");
  text.textContent = "Historico";

  card.append(cardBody);
  cardBody.append(text);

  let historico = getHistoricoList();
  historico.forEach((element) => {
    let alert = document.createElement("div");
    alert.classList.add("alert", "alert-primary");
    let text = document.createElement("p");
    text.textContent =
      "nombre: " + element.nombre + " - " + " Acumulado: " + element.acumulado;
    cardBody.append(alert);
    alert.append(text);
  });
  container.append(card);
};
