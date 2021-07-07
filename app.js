const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener("DOMContentLoaded", () => {
	fetchData();
});

cards.addEventListener("click", (event) => {
	addcarrito(event);
});

const fetchData = async () => {
	try {
		const res = await fetch("./api.json");
		const data = await res.json();
		// console.log(data)
		pintarCards(data);
	} catch (error) {
		console.log(error);
	}
};

const pintarCards = (data) => {
	data.forEach((producto) => {
		templateCard.querySelector("h5").textContent = producto.title;
		templateCard.querySelector("p").textContent = producto.precio;
		templateCard
			.querySelector("img")
			.setAttribute("src", producto.thumbnailUrl);
		templateCard.querySelector(".btn-dark").dataset.id = producto.id;

		// console.log(producto.title, producto.precio, producto.id);

		// Investigar sobre clone
		const clone = templateCard.cloneNode(true);
		fragment.appendChild(clone);
	});
	cards.appendChild(fragment);
};

const addcarrito = (event) => {
	// console.log(event.target);
	// console.log(event.target.classList.contains("btn-dark"));
	if (event.target.classList.contains("btn-dark")) {
		setCarrito(event.target.parentElement);
	}
	event.stopPropagation();
};

const setCarrito = (objeto) => {
	// console.log(objeto);
	const producto = {
		id: objeto.querySelector(".btn-dark").dataset.id,
		title: objeto.querySelector("h5").textContent,
		precio: objeto.querySelector("p").textContent,
		cantidad: 1,
	};

	if (carrito.hasOwnProperty(producto.id)) {
		producto.cantidad = carrito[producto.id].cantidad + 1;
	}

	carrito[producto.id] = { ...producto };
	pintarCarrito();
};

const pintarCarrito = () => {
	// console.log(carrito);
	items.innerHTML = "";
	Object.values(carrito).forEach((producto) => {
		templateCarrito.querySelector("th").textContent = producto.id;
		templateCarrito.querySelectorAll("td")[0].textContent = producto.title;
		templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
		templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
		templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
		templateCarrito.querySelector("span").textContent =
			producto.cantidad * producto.precio;

		// console.log(producto.cantidad, producto.precio, producto.title);

		const clone = templateCarrito.cloneNode(true);
		fragment.appendChild(clone);
	});
	items.appendChild(fragment);
};
