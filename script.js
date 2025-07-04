// ================= CONFIGURAÇÃO FIREBASE =================
// Substitua os valores abaixo pela sua configuração do Firebase:
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  databaseURL: "https://SEU_PROJETO.firebaseio.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "NUMERO",
  appId: "APP_ID"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ================= DADOS INICIAIS =================
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
  { nome: "Soro fisiológico", estoqueInicial: 4, entradas: 0, saidas: 0 }
];

// ================= VARIÁVEL GLOBAL =================
let medicamentos = [];

// ================= FUNÇÕES =================

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
        <input type="number" id="quant-${idx}" value="0" step="1" />
        <button onclick="lancar(${idx})">Lançar</button>
        <button onclick="corrigir(${idx})" style="background:#f90;margin-top:6px">Corrigir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  atualizarUltimaAtualizacao();
}

// Atualiza no Firebase
function salvarNoFirebase() {
  db.ref("medicamentos").set(medicamentos);
}

// Carrega do Firebase
function carregarDoFirebase() {
  db.ref("medicamentos").once("value", (snapshot) => {
    if (snapshot.exists()) {
      medicamentos = snapshot.val();
    } else {
      medicamentos = initialMedicamentos;
      salvarNoFirebase();
    }
    renderizarTabela();
  });
}

// Botão lançar quantidade
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
  salvarNoFirebase();
  renderizarTabela();
}

// Botão corrigir dados manualmente
function corrigir(idx) {
  const med = medicamentos[idx];
  const novos = prompt(
    `Corrigir ${med.nome}:\nInforme os 3 valores separados por vírgula:\nEstoque Inicial, Entradas, Saídas`,
    `${med.estoqueInicial},${med.entradas},${med.saidas}`
  );

  if (!novos) return;

  const [novoEstoque, novaEntrada, novaSaida] = novos.split(",").map(Number);

  if (
    isNaN(novoEstoque) ||
    isNaN(novaEntrada) ||
    isNaN(novaSaida)
  ) {
    alert("Valores inválidos. Use apenas números separados por vírgula.");
    return;
  }

  med.estoqueInicial = novoEstoque;
  med.entradas = novaEntrada;
  med.saidas = novaSaida;

  salvarNoFirebase();
  renderizarTabela();
}

// Botão resetar (limpar dados no Firebase)
document.getElementById("reset").addEventListener("click", () => {
  if (confirm("Isso apagará os dados salvos e voltará aos valores iniciais. Continuar?")) {
    medicamentos = initialMedicamentos;
    salvarNoFirebase();
    renderizarTabela();
  }
});

// Ao carregar a página, traz os dados do Firebase
carregarDoFirebase();
