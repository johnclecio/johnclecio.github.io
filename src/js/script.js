/* ===============================
   RELÓGIO DIGITAL
================================ */
function atualizarHora() {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  const segundos = String(agora.getSeconds()).padStart(2, '0');
  document.getElementById("horaAtual").textContent =
    `${horas}:${minutos}:${segundos}`;
}

setInterval(atualizarHora, 1000);
atualizarHora();

/* ===============================
   SOUNDCLOUD
================================ */
const widget = SC.Widget(document.getElementById("scPlayer"));

document.getElementById("nextBtn").addEventListener("click", () => {
  widget.next();
});

/* ===============================
   BITCOIN CHART
================================ */
async function getCandles() {
  const res = await fetch(
    "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=50"
  );
  const data = await res.json();

  return data.map(candle => ({
    x: new Date(candle[0]),
    y: [
      parseFloat(candle[1]),
      parseFloat(candle[2]),
      parseFloat(candle[3]),
      parseFloat(candle[4])
    ]
  }));
}

async function renderChart() {
  const seriesData = await getCandles();
  const ultimoPreco = seriesData.at(-1).y[3];

  document.getElementById("btc-price").innerText =
    "Preço Atual: $" + ultimoPreco.toLocaleString("en-US", {
      minimumFractionDigits: 2
    });

  const options = {
    chart: {
      type: "candlestick",
      height: 450,
      background: "#1e1e1e",
      foreColor: "#ccc"
    },
    xaxis: { type: "datetime" },
    series: [{ data: seriesData }]
  };

  const chart = new ApexCharts(
    document.querySelector("#chart"),
    options
  );
  chart.render();

  setInterval(async () => {
    const newData = await getCandles();
    chart.updateSeries([{ data: newData }]);
  }, 10000);
}

renderChart();

/* ===============================
   CONTAGEM REGRESSIVA
================================ */
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const countDownDate = new Date("2027-04-29T08:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = countDownDate - now;

  if (diff < 0) return;

  document.getElementById("days").innerText = Math.floor(diff / day);
  document.getElementById("hours").innerText =
    Math.floor((diff % day) / hour);
  document.getElementById("minutes").innerText =
    Math.floor((diff % hour) / minute);
  document.getElementById("seconds").innerText =
    Math.floor((diff % minute) / second);
}, second);

/* ===============================
   NAVEGAÇÃO DE PÁGINAS
================================ */
function mostrarPagina(num) {
  document
    .querySelectorAll(".pagina")
    .forEach(p => p.classList.remove("ativa"));

  document
    .getElementById("pagina" + num)
    .classList.add("ativa");
}
