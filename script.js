const initialMedicamentos = [
  { nome: "Dorflex", estoqueInicial: 50, entradas: 0, saidas: 0 },
  { nome: "Torsilax", estoqueInicial: 50, entradas: 0, saidas: 0 },
  { nome: "Eno", estoqueInicial: 22, entradas: 0, saidas: 0 },
  { nome: "Paracetamol", estoqueInicial: 40, entradas: 0, saidas: 0 },
  { nome: "Nimesulida", estoqueInicial: 12, entradas: 0, saidas: 0 },
  { nome: "Gelol", estoqueInicial: 5, entradas: 0, saidas: 0 },
  { nome: "Esparadrapo", estoqueInicial: 0, entradas: 0, saidas: 0 },
  { nome: "Faixa", estoqueInicial: 10, entradas: 0, saidas: 0 },
  { nome: "Dipirona", estoqueInicial: 20, entradas: 0, saidas: 0 },
  { nome: "Bandeide", estoqueInicial: 7, entradas: 0, saidas: 0 },
  { nome: "Soro fisiológico", estoqueInicial: 4, entradas: 0, saidas: 0 },
];

let medicamentos = [];

function estoqueAtual(med) {
  return med.estoqueInicial + med.entradas - med.saidas;
}

function atualizarUltimaAtualizacao() {
  document.getElementById("last-update").textContent =
    "Última atualização: " + new Date().toLocaleString("pt-BR");
}

function renderizarTabela() {
  const tbody = document.getElementById("meds-table-body");
  tbody.innerHTML = "";

  medicamentos.forEach((med, idx) => {
    const atual = estoqueAtual(med);
    const tr = document.createElement("tr");
    if (atual < 3) tr.classList.add("low-stock");

    tr.innerHTML = `
      <td data-label="Remédio">${med.nome}</td>
      <td data-label="Estoque Inicial">${med.estoqueInicial}</td>
      <td data-label="Total Entradas">${med.entradas}</td>
      <td data-label="Total Saídas">${med.saidas}</td>
      <td data-label="Estoque Atual">${atual}</td>
      <td data-label="Ações" class="actions">
        <input type="number" id="quant-${idx}" value="0" step="1" min="0" />
        <button onclick="lancar(${idx})" aria-label="Lançar quantidade para ${med.nome}">Lançar</button>
        <button onclick="corrigir(${idx})" style="background:#f4a261;margin-top:6px" aria-label="Corrigir dados de ${med.nome}">Corrigir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  atualizarUltimaAtualizacao();
}

function salvarLocal() {
  localStorage.setItem("medicamentos", JSON.stringify(medicamentos));
  atualizarUltimaAtualizacao();
}

function carregarLocal() {
  const dados = localStorage.getItem("medicamentos");
  if (dados) {
    medicamentos = JSON.parse(dados);
  } else {
    medicamentos = JSON.parse(JSON.stringify(initialMedicamentos));
    salvarLocal();
  }
}

function lancar(idx) {
  const input = document.getElementById(`quant-${idx}`);
  const val = Number(input.value);

  if (!val) {
    alert("Digite um valor diferente de zero.");
    return;
  }

  const med = medicamentos[idx];
  const atual = estoqueAtual(med);

  if (val < 0 && Math.abs(val) > atual) {
    alert(`Estoque insuficiente para retirar ${Math.abs(val)} unidades de ${med.nome}.`);
    return;
  }

  if (val > 0) med.entradas += val;
  else med.saidas += Math.abs(val);

  input.value = 0;
  salvarLocal();
  renderizarTabela();
}

function corrigir(idx) {
  const med = medicamentos[idx];
  const novos = prompt(
    `Corrigir ${med.nome}:\nInforme os 3 valores separados por vírgula:\nEstoque Inicial, Entradas, Saídas\nValores atuais: ${med.estoqueInicial}, ${med.entradas}, ${med.saidas}`,
    `${med.estoqueInicial},${med.entradas},${med.saidas}`
  );
  if (!novos) return;

  const parts = novos.split(",").map(s => parseInt(s.trim(), 10));
  if (parts.length !== 3 || parts.some(isNaN)) {
    alert("Entrada inválida. Informe três números separados por vírgula.");
    return;
  }

  medicamentos[idx].estoqueInicial = parts[0];
  medicamentos[idx].entradas = parts[1];
  medicamentos[idx].saidas = parts[2];
  salvarLocal();
  renderizarTabela();
}

function resetarEstoque() {
  if (confirm("Deseja realmente resetar o estoque para os valores iniciais?")) {
    medicamentos = JSON.parse(JSON.stringify(initialMedicamentos));
    salvarLocal();
    renderizarTabela();
  }
}

// LOGIN SIMPLES
document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();
  const u = e.target.username.value.trim();
  const p = e.target.password.value.trim();
  const erroEl = document.getElementById("login-error");

  if (u === "matheus.sso" && p === "sso") {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("controle-screen").style.display = "block";
    erroEl.textContent = "";
    carregarLocal();
    renderizarTabela();
  } else {
    erroEl.textContent = "Usuário ou senha inválidos 🔐";
  }
});

document.getElementById("reset").addEventListener("click", resetarEstoque);

// Alternar tema claro/escuro
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
