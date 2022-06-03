let historicoList = [];

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

export function getHistoricoList() {
  let storeList = localStorage.getItem("localHistoricoList");
  if (storeList == null) {
    historicoList = [];
  } else {
    historicoList = JSON.parse(storeList);
  }
  return historicoList;
}

export function localStoreHistoricoList(historicoList) {
  localStorage.setItem("localHistoricoList", JSON.stringify(historicoList));
}
