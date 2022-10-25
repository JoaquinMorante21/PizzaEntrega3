const pizzas = [
  {
    nombre: "mozzarella",
    id: 1,
    ingredientes: ["tomate", "mozzarella"],
    precio: 550,
    imagen: "./img/bc88d440af7e6fd3182954975306f790.png",
  },
  {
    nombre: "cuatroQuesos",
    id: 2,
    ingredientes: ["mozzarella", "gorgonzola", "fontina", "parmesano"],
    precio: 800,
    imagen: "./img/pizza-4-quesos-g.png",
  },
  {
    nombre: "napolitana",
    id: 3,
    ingredientes: ["tomate", "mozzarella"],
    precio: 750,
    imagen: "./img/Pizza-Napolitana.png",
  },
  {
    nombre: "margarita",
    id: 4,
    ingredientes: ["tomate", "mozzarella", "albahacafresca", "sal", "aceite"],
    precio: 610,
    imagen: "./img/margarita.png",
  },
  {
    nombre: "pepperoni",
    id: 5,
    ingredientes: ["tomate", "mozzarella", "pepperoni"],
    precio: 860,
    imagen: "./img/pizzapng.parspng.com-2.png",
  },
  {
    nombre: "marinera",
    id: 6,
    ingredientes: ["tomate", "ajo", "orégano", "aceite", "queso", "mozzarella"],
    precio: 680,
    imagen: "./img/marinera.png",
  },
  {
    id: 7,
    nombre: "Panceta",
    ingredientes: ["Queso", "Orégano", "Panceta", "Aceitunas"],
    precio: 700,
    imagen: "https://i.pinimg.com/originals/bc/88/d4/bc88d440af7e6fd3182954975306f790.png",
  },
];

/* resultContainer.innerHTML = `
    <div class="pizza-container">
    <img src="${imagen}" alt="${nombre}" class="pizza">
      <h2 class="result-title">${pizza.nombre.toUpperCase()}</h2>
     <h3 class="result-price"> Precio: $${pizza.precio} 🍕</h3>
     <h3 class="result-ingredientes">Ingredientes:${pizza.ingredientes}</h3>
     <p>Busca otro número de pizza para ver si la tenemos.</p>
     </div>
    `; */


/* Elementos del DOM */

const resultContainer = document.getElementById("result-container");
const form = document.getElementById("form");
const input = document.querySelector(".form__input");


const saveToLocalStorage = () => {
  return !localStorage.getItem("pizzas")
    ? localStorage.setItem("pizzas", JSON.stringify(pizzas))
    : null;
};

/* Buscamos en el array de pizzas una pizza cuyo id coincida con el numero del input. Retornará undefined si no existe dicho número */
const searchPizza = (value) => pizzas.find((pizza) => pizza.id === value);

/* Funcion para renderizar la card */
const renderCard = (pizza) => {
  const { nombre, precio, ingredientes, imagen } = pizza;

  return `
  <div class="card">
  <img src="${imagen}" alt="${nombre}" class="pizza">
  <div class="card__info">
      <h2 class="result-title">${nombre.toUpperCase()}</h2>
      <h3 class="result-price"> Precio: $${pizza.precio} 🍕</h3>
     <h3 class="result-ingredientes">Ingredientes:${pizza.ingredientes}</h3>
     <p>Busca otro número de pizza para ver si la tenemos.</p>
  </div>
</div>
  `;
};

/* Función para mostrar un error en caso de que no hayamos colocado nada en el input y activemos el evento submit */
const showEmptyError = () => {
  resultContainer.innerHTML = `
    <div class="pizza-container">
    <i class="fa-solid fa-triangle-exclamation error"></i>
    <h2 class="error-title"> Por favor, ingrese un número para que podamos buscar su pizza en el menú. </h2>
    </div>`;
};

/* Función para renderizar el resultado de la busqueda. Lo que se renderice dependerá de si se encontro una pizza con el id dado o no. */
const renderResult = (pizza) => {
  if (!pizza) {
    resultContainer.innerHTML = `
    <div class="pizza-container">
    <i class="fa-solid fa-triangle-exclamation error"></i>
    <h2 class="error-title"> No existe una pizza con el id ingresado. </h2>
    <p>Realice una nueva busqueda.</p>
    </div>`;
  } else {
    resultContainer.innerHTML = renderCard(pizza);
  }
};

/* Función que se ejecutará al darse el evento "submit". 
1- Guardamos el valor del input en una variable.
2- Si el valor es undefined (debido a lo que devuelve el método find), mostramos un error.
3- Si el valor no es undefined, guardamos la pizza encontrada.
*/

const submitSearch = (e) => {
  e.preventDefault();
  const searchedValue = input.value;
  if (!searchedValue) {
    showEmptyError(searchedValue);
    return;
  }
  const searchedPizza = searchPizza(Number(searchedValue));
  renderResult(searchedPizza);
};

/* Función inicializadora */
const init = () => {
  saveToLocalStorage();
  form.addEventListener("submit", submitSearch);
};

init();