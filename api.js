const equivalencia_base = document.getElementById('equivalencia_base');
const equivalencia_resultante = document.getElementById('equivalencia_resultante');

document.getElementById("btn_convertir").addEventListener("click", function () {
  let cantidad = document.getElementById("cantidad").value;
  let value_de = document.getElementById("value_de").value;
  let value_a = document.getElementById("value_a").value;
  let resultado;

  const API_URL = 'https://v6.exchangerate-api.com/v6/335e42f97114176b73f804c6/pair/'+value_de+'/'+value_a;

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    resultado = data.conversion_rate * cantidad;
    equivalencia_base.textContent = cantidad;
    equivalencia_resultante.textContent = resultado;
  })
  .catch(error => console.error('Error al obtener los datos:', error));

  console.log(cantidad, value_de, value_a);
});

document.getElementById("btn_invertir").addEventListener("click", function () {
  let value_1 = document.getElementById("value_de").value;
  let value_2 = document.getElementById("value_a").value;
  let aux = value_2;

  document.getElementById("value_a").value = value_1;
  document.getElementById("value_de").value = aux;
});