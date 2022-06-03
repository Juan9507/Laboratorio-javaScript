/**
 * funciones para la persistencia de datos
 *
 * @author [Juan David Rivera Naranjo - juandavidnaranjo75@gmail.com]
 * @version [v1.0.0]
 * @since [v1.0.0]
 */

let historicoList = [];

/**
 * Metodo para agregar crear el localStorage y array de objetos
 * @param {*} text - Se envia el texto a guardar
 * @param {*} acumulado - Se envia el valor acumulado
 * @returns - retorna el array
 */
export function addHistorico(text, acumulado) {
  let historico = {
    nombre: text,
    acumulado: acumulado,
  };
  console.log(historico);
  historicoList.push(historico);
  localStoreHistoricoList(historicoList);
  return historicoList;
}

/**
 * funcion para retorna el array
 * @returns - retorna el array
 */
export function getHistoricoList() {
  let storeList = localStorage.getItem("localHistoricoList");
  if (storeList == null) {
    historicoList = [];
  } else {
    historicoList = JSON.parse(storeList);
  }
  return historicoList;
}

/**
 * Funcion para enviar el array al localStarage
 * @param {*} historicoList - se pasa el array
 */
export function localStoreHistoricoList(historicoList) {
  localStorage.setItem("localHistoricoList", JSON.stringify(historicoList));
}
