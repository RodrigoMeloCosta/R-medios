/* ---------- Dados iniciais ---------- */
const inicial = [
  {nome:"Dorflex",estoqueInicial:50,entradas:0,saidas:0},
  {nome:"Torsilax",estoqueInicial:50,entradas:0,saidas:0},
  {nome:"Eno",estoqueInicial:22,entradas:0,saidas:0},
  {nome:"Paracetamol",estoqueInicial:40,entradas:0,saidas:0},
  {nome:"Nimesulida",estoqueInicial:12,entradas:0,saidas:0},
  {nome:"Gelol",estoqueInicial:5,entradas:0,saidas:0},
  {nome:"Esparadrapo",estoqueInicial:0,entradas:0,saidas:0},
  {nome:"Faixa",estoqueInicial:10,entradas:0,saidas:0},
  {nome:"Dipirona",estoqueInicial:20,entradas:0,saidas:0},
  {nome:"Bandeide",estoqueInicial:7,entradas:0,saidas:0},
  {nome:"Soro fisiológico",estoqueInicial:4,entradas:0,saidas:0}
];

const setores = [
  "ADM FABRIL","ENSAQUE - 1° TURNO","ENSAQUE - 2° TURNO","ENSAQUE - 3° TURNO","TORRE",
  "MANUTENÇÃO","MOEGA","CARREGAMENTO 1° TURNO","CARREGAMENTO 2° TURNO","ALMOXARIFADO",
  "ESTOQUE","SILO BOLSA","GOIÂNIA","EMPACOTAMENTO - 1º TURNO","EMPACOTAMENTO - 2º TURNO",
  "EMPACOTAMENTO - 3º TURNO","MANUTENÇÃO ELETRICA","LIMPEZA FÁBRIL","REFEITÓRIO"
];

/* ---------- Estado ---------- */
let meds = JSON.parse(localStorage.getItem("meds")||"null") || structuredClone(inicial);
let rel  = JSON.parse(localStorage.getItem("rel" )||"null") || {};
const $  = sel=>document.querySelector(sel);
const est=m=>m.estoqueInicial+m.entradas-m.saidas;

/* ---------- Utilidades ---------- */
function save(){
  localStorage.setItem("meds",JSON.stringify(meds));
  localStorage.setItem("rel", JSON.stringify(rel));
  $("#last-update").textContent="Última atualização: "+new Date().toLocaleString("pt-BR");
}

/* ---------- Render estoque ---------- */
function renderEstoque(){
  const tb=$("#meds-table"); tb.innerHTML="";
  meds.forEach((m,i)=>{
    const low=est(m)<3?"low":"";
    const opts=setores.map(s=>`<option value="${s}">${s}</option>`).join("");
    tb.insertAdjacentHTML("beforeend",`
      <tr class="${low}">
        <td>${m.nome}</td><td>${m.estoqueInicial}</td><td>${m.entradas}</td>
        <td>${m.saidas}</td><td>${est(m)}</td>
        <td><select id="set-${i}"><option disabled selected>Setor</option>${opts}</select></td>
        <td>
          <input id="q-${i}" type="number" value="0"/>
          <button class="lancar"   onclick="lancar(${i})">Lançar</button>
          <button class="corrigir" onclick="corrigir(${i})">Corrigir</button>
        </td>
      </tr>`);
  });
}

/* ---------- Render relatório ---------- */
function renderRelatorio(){
  const tb=$("#relatorio-table"); tb.innerHTML="";
  const setoresOrd = Object.keys(rel).sort();
  setoresOrd.forEach(set=>{
    const rems = Object.keys(rel[set]).sort();
    rems.forEach(rem=>{
      const qtd=rel[set][rem];
      if(qtd>0) tb.insertAdjacentHTML("beforeend",`<tr><td>${set}</td><td>${rem}</td><td>${qtd}</td></tr>`);
    });
  });
  if(!tb.innerHTML) tb.innerHTML="<tr><td colspan='3' style='padding:12px'>— Nenhuma saída registrada —</td></tr>";
}

/* ---------- Ações ---------- */
window.lancar = i => {
  const qtd = Number($("#q-" + i).value);
  const setor = $("#set-" + i).value;
  if (!qtd) {
    alert("Informe a quantidade.");
    return;
  }

  const m = meds[i];

  if (qtd > 0) {
    // Entrada (aumenta estoque)
    m.entradas += qtd;
  } else {
    // Saída (diminui estoque)
    if (!setor || setor === "Setor") {
      alert("Selecione o setor da saída.");
      return;
    }

    const saida = Math.abs(qtd);
    if (saida > est(m)) {
      alert("Estoque insuficiente.");
      return;
    }

    m.saidas += saida;
    rel[setor] ??= {};
    rel[setor][m.nome] ??= 0;
    rel[setor][m.nome] += saida;
  }

  $("#q-" + i).value = 0;
  $("#set-" + i).value = "Setor";
  save();
  renderEstoque();
  renderRelatorio();
};

window.corrigir = i => {
  const m = meds[i];
  const s = prompt(`Corrigir ${m.nome}\nInicial,Entradas,Saídas`, `${m.estoqueInicial},${m.entradas},${m.saidas}`);
  if (!s) return;
  const p = s.split(",").map(n => parseInt(n, 10));
  if (p.length !== 3 || p.some(isNaN)) {
    alert("Dados inválidos.");
    return;
  }
  [m.estoqueInicial, m.entradas, m.saidas] = p;
  save();
  renderEstoque();
  renderRelatorio();
};

$("#reset").onclick = () => {
  if (confirm("Resetar estoque?")) {
    meds = structuredClone(inicial);
    rel = {};
    save();
    renderEstoque();
    renderRelatorio();
  }
};

/* ---------- Abas ---------- */
$("#tab-estoque").onclick = () => {
  $("#tab-estoque").classList.add("active");
  $("#tab-relatorio").classList.remove("active");
  $("#estoque-content").style.display = "block";
  $("#relatorio-content").style.display = "none";
};
$("#tab-relatorio").onclick = () => {
  $("#tab-relatorio").classList.add("active");
  $("#tab-estoque").classList.remove("active");
  $("#estoque-content").style.display = "none";
  $("#relatorio-content").style.display = "block";
  renderRelatorio();
};

/* ---------- Login ---------- */
$("#login-form").addEventListener("submit", e => {
  e.preventDefault();
  if ($("#username").value === "matheus.sso" && $("#password").value === "sso") {
    $("#login-screen").style.display = "none";
    $("#app-screen").style.display = "block";
    save();
    renderEstoque();
    renderRelatorio();
  } else {
    $("#login-error").textContent = "Usuário ou senha inválidos.";
  }
});
