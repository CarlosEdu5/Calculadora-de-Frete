const dadosRelatorio = {
  resumo: {
    totalCalculos:    { valor: 128, deltaPct: 14.6, deltaUp: true },
    concluidos:       { valor: 112, pctDoTotal: 87.5, deltaPct: 16.2, deltaUp: true },
    emAndamento:      { valor: 8,   pctDoTotal: 6.3,  deltaPct: 11.1, deltaUp: false },
    cancelados:       { valor: 8,   pctDoTotal: 6.3,  deltaPct: 11.1, deltaUp: false },
    faturamento:      { valor: 42589.63, deltaPct: 18.6, deltaUp: true },
  },
  serieFaturamento: {
    dias:            ["01/07","03/07","05/07","07/07","09/07","11/07","13/07","15/07","17/07","19/07","21/07","23/07","25/07","27/07","29/07","31/07"],
    periodoAtual:    [6800, 4200, 7900, 5100, 8600, 6200, 9400, 7100, 10200, 8300, 6900, 9800, 8700, 12400, 15600, 19200],
    periodoAnterior: [5100, 6300, 4800, 7200, 5600, 8100, 6400, 5900, 7800, 6100, 8400, 7300, 6800, 9100, 8600, 10400],
  },
  status: [
    { label: "Concluídos",  valor: 112, pct: 87.5, cor: "#1fa971" },
    { label: "Em andamento",valor: 8,   pct: 6.3,  cor: "#f0932b" },
    { label: "Cancelados",  valor: 8,   pct: 6.3,  cor: "#8b5cf6" },
  ],
  tipoCarga: [
    { label: "Carga Fracionada",  pct: 58 },
    { label: "Carga Completa",    pct: 24 },
    { label: "Carga Refrigerada", pct: 10 },
    { label: "Perigosa",          pct: 5 },
    { label: "Outros",            pct: 3 },
  ],
  resumoPorDia: [
    { data: "01/07/2025", total: 12, concluidos: 11, andamento: 1, cancelados: 0, faturamento: 3257.80 },
    { data: "02/07/2025", total: 15, concluidos: 14, andamento: 1, cancelados: 0, faturamento: 4184.60 },
    { data: "03/07/2025", total: 9,  concluidos: 7,  andamento: 1, cancelados: 1, faturamento: 2156.40 },
    { data: "04/07/2025", total: 14, concluidos: 12, andamento: 1, cancelados: 1, faturamento: 4925.20 },
    { data: "05/07/2025", total: 10, concluidos: 9,  andamento: 1, cancelados: 0, faturamento: 2790.10 },
  ],
  totalPeriodo: { total: 128, concluidos: 112, andamento: 8, cancelados: 8, faturamento: 42589.63 },
};

const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const pct = (n) => `${n.toString().replace(".", ",")}%`;

function montarCards(resumo) {
  const cfg = [
    { chave: "totalCalculos", classe: "is-blue",   icone: "📋", label: "Total de Cálculos",  compara: true  },
    { chave: "concluidos",    classe: "is-green",  icone: "✅", label: "Concluídos",          compara: false },
    { chave: "emAndamento",   classe: "is-orange", icone: "🕓", label: "Em andamento",        compara: false },
    { chave: "cancelados",    classe: "is-purple", icone: "✕",  label: "Cancelados",          compara: false },
    { chave: "faturamento",   classe: "is-blue2",  icone: "$",  label: "Faturamento Estimado",compara: true  },
  ];

  const el = document.getElementById("cardsResumo");
  el.innerHTML = cfg.map(c => {
    const d = resumo[c.chave];
    const valorFmt = c.chave === "faturamento" ? brl(d.valor) : d.valor;
    const rodapeTexto = c.compara ? "vs período anterior" : `${d.pctDoTotal.toString().replace(".", ",")}% do total`;
    const setaSVG = d.deltaUp
      ? `<svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`
      : `<svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 2v6M2 5l3 3 3-3" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    return `
      <div class="rel-card rel-stat-card ${c.classe}">
        <div class="rel-stat-topo">
          <div class="rel-stat-icone">${c.icone}</div>
          <div class="rel-stat-label">${c.label}</div>
        </div>
        <div class="rel-stat-valor">${valorFmt}</div>
        <div class="rel-stat-rodape">
          <span>${rodapeTexto}</span>
          <span class="rel-stat-delta ${d.deltaUp ? "rel-up" : "rel-down"}">${setaSVG} ${pct(d.deltaPct)}</span>
        </div>
      </div>`;
  }).join("");
}

function montarTabela(linhas, total) {
  const tbody = document.querySelector("#tabelaResumo tbody");
  tbody.innerHTML = linhas.map(l => `
    <tr>
      <td>${l.data}</td>
      <td>${l.total}</td>
      <td class="rel-col-concluidos">${l.concluidos}</td>
      <td class="rel-col-andamento">${l.andamento}</td>
      <td class="rel-col-cancelados">${l.cancelados}</td>
      <td>${brl(l.faturamento)}</td>
    </tr>`).join("");

  const tfoot = document.querySelector("#tabelaResumo tfoot");
  tfoot.innerHTML = `
    <tr>
      <td>Total do período</td>
      <td>${total.total}</td>
      <td class="rel-col-concluidos">${total.concluidos}</td>
      <td class="rel-col-andamento">${total.andamento}</td>
      <td class="rel-col-cancelados">${total.cancelados}</td>
      <td>${brl(total.faturamento)}</td>
    </tr>`;
}

function montarBarrasCarga(itens) {
  const el = document.getElementById("barrasCarga");
  el.innerHTML = itens.map(i => `
    <div class="rel-barra-linha">
      <span class="rel-barra-label">${i.label}</span>
      <span class="rel-barra-trilha"><span class="rel-barra-fill" style="width:${i.pct}%"></span></span>
      <span class="rel-barra-pct">${i.pct}%</span>
    </div>`).join("");
}

function montarLegendaStatus(itens, totalCalculos) {
  const el = document.getElementById("legendaStatus");
  el.innerHTML = itens.map(i => `
    <div class="rel-leg-item">
      <span class="rel-dot" style="background:${i.cor}"></span>
      <div>
        <b>${i.label}</b>
        <small>${i.valor} (${i.pct.toString().replace(".", ",")}%)</small>
      </div>
    </div>`).join("");
}

function graficoFaturamento(serie) {
  const ctx = document.getElementById("graficoFaturamento");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: serie.dias,
      datasets: [
        {
          label: "Período atual",
          data: serie.periodoAtual,
          borderColor: "#2f6fed",
          backgroundColor: "rgba(47,111,237,0.08)",
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: "#2f6fed",
        },
        {
          label: "Período anterior",
          data: serie.periodoAnterior,
          borderColor: "#c7cbe0",
          borderDash: [5, 5],
          fill: false,
          tension: 0.35,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { ticks: { callback: (v) => `${v / 1000}k` }, grid: { color: "#f0f1f6" } },
        x: { grid: { display: false } },
      },
    },
  });
}

function graficoStatus(status, total) {
  const ctx = document.getElementById("graficoStatus");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: status.map(s => s.label),
      datasets: [{
        data: status.map(s => s.valor),
        backgroundColor: status.map(s => s.cor),
        borderWidth: 0,
      }],
    },
    options: {
      cutout: "72%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
    },
    plugins: [{
      id: "totalCentro",
      afterDraw(chart) {
        const { ctx, chartArea: { left, right, top, bottom } } = chart;
        const x = (left + right) / 2;
        const y = (top + bottom) / 2;
        ctx.save();
        ctx.textAlign = "center";
        ctx.fillStyle = "#14142b";
        ctx.font = "700 20px sans-serif";
        ctx.fillText(total, x, y - 2);
        ctx.font = "400 11px sans-serif";
        ctx.fillStyle = "#8a8ea3";
        ctx.fillText("Total", x, y + 16);
        ctx.restore();
      },
    }],
  });
}

function exportar(formato) {
  console.log(`Exportando relatório em formato: ${formato}`);
  alert(`Exportação em ${formato.toUpperCase()} iniciada.`);
}

function init() {
  montarCards(dadosRelatorio.resumo);
  montarTabela(dadosRelatorio.resumoPorDia, dadosRelatorio.totalPeriodo);
  montarBarrasCarga(dadosRelatorio.tipoCarga);
  montarLegendaStatus(dadosRelatorio.status, dadosRelatorio.totalPeriodo.total);
  graficoFaturamento(dadosRelatorio.serieFaturamento);
  graficoStatus(dadosRelatorio.status, dadosRelatorio.totalPeriodo.total);

  document.querySelectorAll(".rel-export-btn").forEach(btn => {
    btn.addEventListener("click", () => exportar(btn.dataset.formato));
  });

  document.getElementById("btnFiltrar").addEventListener("click", () => {
    console.log("Filtros aplicados:", {
      periodo: document.getElementById("filtroPeriodo").value,
      comparar: document.getElementById("filtroComparar").value,
      tipo: document.getElementById("filtroTipo").value,
      agrupar: document.getElementById("filtroAgrupar").value,
    });
  });
}

document.addEventListener("DOMContentLoaded", init);