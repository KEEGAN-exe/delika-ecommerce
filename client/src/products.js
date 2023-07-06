import { findProductById, listProduct } from "./service/product.service";
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const image = document.getElementById("image");
const categoria = document.getElementById("categoria");
const marcaImg = document.getElementById("marcaImg");
const close = document.getElementById("close");
const actualizar = document.getElementById("actualizar");
const updateContainer = document.getElementById("update-container");
const cardContainer = document.getElementById("card-container");
let producto = document.getElementById("pr");

let buttonsCounter = 1;

let id = 0;
let buscarProducto;

if (cardContainer.innerHTML.trim() === "") {
  const message = document.createElement("h1");
  message.classList.add(
    "text-center",
    "text-2xl",
    "text-gray-900",
    "dark:text-white"
  );
  message.innerText = "Aun no se selecciona un producto";
  cardContainer.appendChild(message);
}

producto.addEventListener("change", async () => {
  if (producto.value === "Elige un producto para filtrar") {
    cardContainer.innerHTML = "";
    const message = document.createElement("h1");
    message.classList.add(
      "text-center",
      "text-2xl",
      "text-gray-900",
      "dark:text-white"
    );
    message.innerText = "Aun no se selecciona un producto";
    cardContainer.appendChild(message);
  } else {
    const data = await listProduct();
    const dataFilter = data.filter(
      (product) => product.category === producto.value
    );

    cardContainer.innerHTML = "";
    buttonsCounter = 1;

    dataFilter.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add(
        "bg-stone-100",
        "rounded-xl",
        "shadow-2xl",
        "hover:scale-105",
        "duration-300",
        "transition-all",
        "hover:shadow-xl",
        "relative"
      );

      const buttons = document.createElement("div");
      buttons.id = `buttons-${buttonsCounter}`;
      buttons.classList.add(
        "hidden",
        "items-center",
        "justify-end",
        "absolute",
        "gap-1",
        "p-2",
        "right-0"
      );
      card.appendChild(buttons);

      const editButton = document.createElement("div");
      editButton.classList.add(
        "bg-indigo-500",
        "rounded-full",
        "w-8",
        "h-8",
        "flex",
        "items-center",
        "justify-center",
        "cursor-pointer",
        "hover:bg-indigo-600"
      );
      buttons.appendChild(editButton);

      const editIcon = document.createElement("i");
      editIcon.classList.add("fa-solid", "fa-pen-to-square", "text-white");
      editButton.appendChild(editIcon);

      const deleteButton = document.createElement("div");
      deleteButton.classList.add(
        "bg-red-500",
        "rounded-full",
        "w-8",
        "h-8",
        "flex",
        "items-center",
        "justify-center",
        "cursor-pointer",
        "hover:bg-red-600"
      );
      buttons.appendChild(deleteButton);

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-trash-can", "text-white");
      deleteButton.appendChild(deleteIcon);

      const img = document.createElement("img");
      img.classList.add("max-w-[350px]", "lg:max-w-[250px]");
      img.src = product.image;
      card.appendChild(img);

      const details = document.createElement("div");
      details.classList.add(
        "bg-indigo-500",
        "pt-2",
        "pb-6",
        "rounded-b-xl",
        "text-white"
      );

      const logoContainer = document.createElement("div");
      logoContainer.classList.add(
        "bg-gray-100",
        "w-[50%]",
        "my-2",
        "flex",
        "items-center",
        "justify-center",
        "rounded-r-xl"
      );

      const logo = document.createElement("img");
      logo.classList.add("w-14");
      logo.src = product.marcaImg;
      logoContainer.appendChild(logo);
      details.appendChild(logoContainer);

      const title = document.createElement("h1");
      title.classList.add("text-center", "text-lg");
      title.innerText = product.name;
      details.appendChild(title);

      const priceSection = document.createElement("div");
      priceSection.classList.add(
        "flex",
        "items-center",
        "justify-evenly",
        "mt-4"
      );

      const price = document.createElement("h2");
      price.classList.add("text-center", "font-bold");
      price.innerText = `$ ${product.price}`;
      priceSection.appendChild(price);

      const button = document.createElement("a");
      button.classList.add(
        "py-2",
        "px-4",
        "bg-neutral-50",
        "rounded-lg",
        "text-gray-900",
        "cursor-pointer"
      );
      button.innerText = "Ver";
      priceSection.appendChild(button);
      button.addEventListener("click", () => {
        console.log(product.id);
      });

      details.appendChild(priceSection);
      card.appendChild(details);
      cardContainer.appendChild(card);

      editButton.addEventListener("click", async () => {
        const card = editButton.closest(".bg-stone-100");
        const id = product.id;
        console.log(id);
        buscarProducto = await findProductById(id);
        console.log(buscarProducto);
      });

      buttonsCounter++;

      buttons.classList.add("hidden");
      buttons.classList.remove("flex");
    });

    if (localStorage.getItem("user")) {
      for (let i = 1; i <= buttonsCounter; i++) {
        const buttons = document.getElementById(`buttons-${i}`);
        if (buttons) {
          buttons.classList.remove("hidden");
          buttons.classList.add("flex");
        }
      }
    }
  }
});


export {buscarProducto}