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

    return fetch('info.json');
  })
  .then(response => response.json())
  .then(data => {
    if (cantidad > 1) {
      equivalencia_base.textContent = cantidad + ' ' + data[value_de].names;
    } else {
      equivalencia_base.textContent = cantidad + ' ' + data[value_de].name;
    }

    if (resultado > 1) {
      equivalencia_resultante.textContent = resultado.toFixed(2) + ' ' + data[value_a].names;
    } else {
      equivalencia_resultante.textContent = resultado.toFixed(2) + ' ' + data[value_a].name;
    }
  })
  .catch(error => console.error('Error al obtener los datos:', error));


});

document.getElementById("btn_invertir").addEventListener("click", function () {
  const root = document.documentElement;

  let value_1 = document.getElementById("value_de").value;
  let value_2 = document.getElementById("value_a").value;
  let aux = value_1;

  document.getElementById("value_de").value = value_2;
  document.getElementById("value_a").value = aux;

  let img_value_1 = document.getElementById('img_value_de').src
  let img_value_2 = document.getElementById('img_value_a').src
  let img_aux = img_value_1;

  document.getElementById("img_value_de").src = img_value_2;
  document.getElementById("img_value_a").src = img_aux;

  let color_value_1 = getComputedStyle(root).getPropertyValue('--color-top');
  let color_value_2 = getComputedStyle(root).getPropertyValue('--color-bottom');
  let color_aux = color_value_1;

  document.documentElement.style.setProperty('--color-top', color_value_2);
  document.documentElement.style.setProperty('--color-bottom',  color_aux);
});

document.getElementById('value_de').addEventListener('change', function() {
   fetch('info.json')
   .then(response => response.json()) 
   .then(data => {
     document.getElementById('img_value_de').src = data[this.value].url_image;
     document.documentElement.style.setProperty('--color-top',  data[this.value].color);
   })
   .catch(error => console.error('Error cargando el JSON:', error));
  
});

document.getElementById('value_a').addEventListener('change', function() {

  fetch('info.json')
  .then(response => response.json()) 
  .then(data => {
    document.getElementById('img_value_a').src = data[this.value].url_image;
    document.documentElement.style.setProperty('--color-bottom',  data[this.value].color);
  })
  .catch(error => console.error('Error cargando el JSON:', error));
 
});