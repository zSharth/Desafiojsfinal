const conversorInput = document.getElementById("input-1");
const conversorResultado = document.getElementById("resultado");
const botonConversor = document.getElementById("btn-1");
const alertId1 = document.getElementById("alert-1");
const alertId2 = document.getElementById("alert-2");
let dolarURL = "https://www.mindicador.cl/api/dolar";
let euroURL = "https://www.mindicador.cl/api/euro";
let ufURL = "https://www.mindicador.cl/api/uf";
let bitcoinURL = "https://www.mindicador.cl/api/bitcoin";
let utmURL = "https://www.mindicador.cl/api/utm";
let divisas = "https://www.mindicador.cl/api";


async function divisasInfo() {
  try {
    const respuesta = await fetch(divisas);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    conversorResultado.textContent = `Algo salió mal :( ${error.message};`;
  }
}


async function renderDolar() {
  const dolares = await divisasInfo();
  let dolarValue = dolares.dolar;
  let valor = dolarValue.valor;
  let inputValue = conversorInput.value;
  resultado = Number(inputValue) / valor;
  conversorResultado.textContent = `Resultado: $${resultado.toLocaleString("en-US")} USD`;
}
async function renderEuro() {
  const euros = await divisasInfo();
  let euroValue = euros.euro;
  let valor = euroValue.valor;
  let inputValue = conversorInput.value;
  resultado = Number(inputValue) / valor;
  conversorResultado.textContent = `Resultado: $${resultado.toLocaleString("en-US")} EUR`;
}
async function renderuf() {
  const uf = await divisasInfo();
  let ufValue = uf.uf;
  let valor = ufValue.valor;
  let inputValue = conversorInput.value;
  resultado = Number(inputValue) / valor;
  conversorResultado.textContent = `Resultado: $${resultado.toFixed(1)} UF`;
}
async function renderbitcoin() {
  const bitcoin = await divisasInfo();
  let bitcoinValue = bitcoin.bitcoin;
  let valor = bitcoinValue.valor;
  let inputValue = conversorInput.value;
  resultado = Number(inputValue) / valor;
  conversorResultado.textContent = `Resultado: $${resultado.toFixed(
    1
  )} Bitcoin's`;
}
async function renderUtm() {
  const utm = await divisasInfo();
  let utmValue = utm.utm;
  let valor = utmValue.valor;
  let inputValue = conversorInput.value;
  resultado = Number(inputValue) / valor;
  conversorResultado.textContent = `Resultado: $${resultado.toFixed(1)} UTM`;
}


botonConversor.addEventListener("click", () => {
  let select = document.getElementById("select-1");
  if (select.value === "coin") {
    alertId2.textContent = "Selecciona una moneda";
  } else {
    alertId2.textContent = "";
  }
  if (select.value === "dolar") {
    if (conversorInput.value === "")
      (alertId1.textContent = "ingresa un monto"),
        (conversorResultado.textContent = "...");
    else {
      renderDolar();
      renderDolarGrafica();
      alertId1.textContent = "";
    }
  } else if (select.value === "euro") {
    if (conversorInput.value === "")
      (alertId1.textContent = "ingresa un monto"),
        (conversorResultado.textContent = "...");
    else {
      renderEuro();
      rendereuroGrafica();
      alertId1.textContent = "";
    }
  } else if (select.value === "uf") {
    if (conversorInput.value === "")
      (alertId1.textContent = "ingresa un monto"),
        (conversorResultado.textContent = "...");
    else {
      renderuf();
      renderufGrafica();
      alertId1.textContent = "";
    }
  } else if (select.value === "bitcoin") {
    if (conversorInput.value === "")
      (alertId1.textContent = "ingresa un monto"),
        (conversorResultado.textContent = "...");
    else {
      renderbitcoin();
      renderBitcoinGrafica();
      alertId1.textContent = "";
    }
  } else if (select.value === "utm") {
    if (conversorInput.value === "")
      (alertId1.textContent = "ingresa un monto"),
        (conversorResultado.textContent = "...");
    else {
      renderUtm();
      renderUtmGrafica();
      alertId1.textContent = "";
    }
  }
});


async function getAndCreateDataToChartDolar() {
  let titulo = "Valor de los últimos 10 días";
  let color = "rgb(255, 99, 132)";
  try {
    const respuesta = await fetch(dolarURL);
    const series = await respuesta.json();
    const labels = series.serie.map((serie) => serie.fecha.slice(0, 10));
    labels.length = 10;
    const data = series.serie.map((serie) => {
      const valor = serie.valor;
      return Number(valor);
    });
    const datasets = [
      {
        label: titulo,
        borderColor: color,
        data,
      },
    ];
    return { labels, datasets };
  } catch (error) {
    alert(error.message);
  }
}


async function renderDolarGrafica() {
  let tipoDeGrafica = "line";
  const data = await getAndCreateDataToChartDolar();
  const config = {
    type: tipoDeGrafica,
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  new Chart(myChart, config);
}


async function getAndCreateDataToChartEuro() {
  let titulo = "Valor de los últimos 10 días";
  let color = "rgb(255, 99, 132)";
  try {
    const respuesta = await fetch(euroURL);
    const series = await respuesta.json();
    const labels = series.serie.map((serie) => serie.fecha.slice(0, 10));
    labels.length = 10;
    const data = series.serie.map((serie) => {
      const valor = serie.valor;
      return Number(valor);
    });
    const datasets = [
      {
        label: titulo,
        borderColor: color,
        data,
      },
    ];
    return { labels, datasets };
  } catch (error) {
    alert(error.message);
  }
}


async function rendereuroGrafica() {
  let tipoDeGrafica = "line";
  const data = await getAndCreateDataToChartEuro();
  const config = {
    type: tipoDeGrafica,
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  new Chart(myChart, config);
}


async function getAndCreateDataToChartUf() {
  let titulo = "Valor de los últimos 10 días";
  let color = "rgb(255, 99, 132)";
  try {
    const respuesta = await fetch(ufURL);
    const series = await respuesta.json();
    const labels = series.serie.map((serie) => serie.fecha.slice(0, 10));
    labels.length = 10;
    const data = series.serie.map((serie) => {
      const valor = serie.valor;
      return Number(valor);
    });
    const datasets = [
      {
        label: titulo,
        borderColor: color,
        data,
      },
    ];
    return { labels, datasets };
  } catch (error) {
    alert(error.message);
  }
}


async function renderufGrafica() {
  let tipoDeGrafica = "line";
  const data = await getAndCreateDataToChartUf();
  const config = {
    type: tipoDeGrafica,
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  new Chart(myChart, config);
}


async function getAndCreateDataToChartBitcoin() {
  let titulo = "Valor de los últimos 10 días";
  let color = "rgb(255, 99, 132)";
  try {
    const respuesta = await fetch(bitcoinURL);
    const series = await respuesta.json();
    const labels = series.serie.map((serie) => serie.fecha.slice(0, 10));
    labels.length = 10;
    const data = series.serie.map((serie) => {
      const valor = serie.valor;
      return Number(valor);
    });
    const datasets = [
      {
        label: titulo,
        borderColor: color,
        data,
      },
    ];
    return { labels, datasets };
  } catch (error) {
    alert(error.message);
  }
}


async function renderBitcoinGrafica() {
  let tipoDeGrafica = "line";
  const data = await getAndCreateDataToChartBitcoin();
  const config = {
    type: tipoDeGrafica,
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  new Chart(myChart, config);
}


async function getAndCreateDataToChartUtm() {
  let titulo = "Valor de los últimos 10 días";
  let color = "rgb(255, 99, 132)";
  try {
    const respuesta = await fetch(utmURL);
    const series = await respuesta.json();
    const labels = series.serie.map((serie) => serie.fecha.slice(0, 10));
    labels.length = 10;
    const data = series.serie.map((serie) => {
      const valor = serie.valor;
      return Number(valor);
    });
    const datasets = [
      {
        label: titulo,
        borderColor: color,
        data,
      },
    ];
    return { labels, datasets };
  } catch (error) {
    alert(error.message);
  }
}


async function renderUtmGrafica() {
  let tipoDeGrafica = "line";
  const data = await getAndCreateDataToChartUtm();
  const config = {
    type: tipoDeGrafica,
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  new Chart(myChart, config);
}
