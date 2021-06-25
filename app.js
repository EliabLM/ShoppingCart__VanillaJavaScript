const items = document.getElementById("items");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener("DOMContentLoaded", () => {
	fetchData();
});

items.addEventListener("click", (event) => {
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
		templateCard.querySelector("p").textContent = `$${producto.precio}`;
		templateCard
			.querySelector("img")
			.setAttribute("src", producto.thumbnailUrl);
		templateCard.querySelector(".btn-dark").dataset.id = producto.id;

		// Investigar sobre clone
		const clone = templateCard.cloneNode(true);
		fragment.appendChild(clone);
	});
	items.appendChild(fragment);
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
		title: objeto.querySelector("p").textContent,
		cantidad: 1,
	};

	if (carrito.hasOwnProperty(producto.id)) {
		producto.cantidad = carrito[producto.id].cantidad + 1;
	}

	carrito[producto.id] = { ...producto };

	console.log(carrito);
};
