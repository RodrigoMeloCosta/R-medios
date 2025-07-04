/* === Persistência em localStorage === */
const STORAGE_KEY = "estoqueRemedios";

/**
 * Carrega dados do localStorage ou inicia com valores‑padrão.
 * Estoques iniciais (em comprimidos/unidades):
 * - Dorflex:      5 cartelas × 10  = 50
 * - Torsilax:     5 cartelas × 10  = 50
 * - Paracetamol:  2 caixas  × 20  = 40
 * - Dipirona:     2 cartelas × 10  = 20
 * - Nimesulida:   1 cartela  × 12  = 12
 * Demais itens permanecem unidade‑por‑unidade.
 */
function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw
    ? JSON.parse(raw)
    : [
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
        { nome: "Soro fisiológico", estoqueInicial: 4, entradas: 0, saidas: 0 }
      ];
}

/* Salva no localStorage */
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(medicamentos));
}

/* === Estado global === */
let medicamentos = loadData();

/* === Funções utilitárias === */
function estoqueAtual(med) {
  return med.estoqueInicial + med.entradas - med.saidas;
}
function atualizarUltimaAtualizacao() {
  document.getElementById("last-update").textContent =
    "Última atualização: " + new Date().toLocaleString("pt-BR");
}

/* === Renderização da tabela === */
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
        <input type="number" id="quant-${idx}" value="0" step="1" />
        <button onclick="lancar(${idx})">Lançar</button>
        <div style="font-size:.75rem;color:#666;margin-top:4px">
          +entrada • -saída
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  atualizarUltimaAtualizacao();
}

/* === Lançamento de entradas/saídas === */
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
    alert(
      `Estoque insuficiente para retirar ${Math.abs(val)} unidades de ${med.nome}.`
    );
    return;
  }

  if (val > 0) med.entradas += val;
  else med.saidas += Math.abs(val);

  input.value = 0;
  saveData();
  renderizarTabela();
}

/* === Botão de reset === */
document.getElementById("reset").addEventListener("click", () => {
  if (
    confirm(
      "Isso apagará os dados salvos e voltará aos valores iniciais. Continuar?"
    )
  ) {
    localStorage.removeItem(STORAGE_KEY);
    medicamentos = loadData();
    renderizarTabela();
  }
});

/* === Inicialização === */
renderizarTabela();
