import Swal from "sweetalert2";
import { alerta } from "./login";
import {
  createProduct,
  deleteProduct,
  findProductById,
  listProduct,
  updateProduct,
} from "./service/product.service";
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const image = document.getElementById("image");
const categoria = document.getElementById("categoria");
const marcaImg = document.getElementById("marcaImg");
const actualizar = document.getElementById("actualizar");
const updateContainer = document.getElementById("update-container");
const cardContainer = document.getElementById("card-container");
const close = document.getElementById("close");
const caja = document.getElementById("caja");
const addProduct = document.getElementById("addProduct");
let producto = document.getElementById("pr");

let buttonsCounter = 1;

let id = 0;
let buscarProducto;
let idProducto;

const info = await listProduct();

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
      console.log(product);
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
      editButton.id = "btnEdit";
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

      deleteButton.addEventListener("click", async () => {
        Swal.fire({
          title: "¿Estas seguro?",
          text: "No podras revertir esta accion",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, eliminar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await deleteProduct(product.id);
            Swal.fire(
              "Eliminado",
              "El producto ha sido eliminado correctamente",
              "success"
            );
            card.remove();
          }
        })
        console.log(product.id);
      })

      editButton.addEventListener("click", async () => {
        const card = editButton.closest(".bg-stone-100");

        idProducto = product.id;
        console.log(idProducto);
        buscarProducto = await findProductById(idProducto);
        console.log(buscarProducto);
        caja.classList.add("lg:w-1/4");
        caja.classList.remove("lg:w-0");
        caja.classList.add("w-3/4");
        caja.classList.remove("w-0");
        actualizar.innerHTML = "Actualizar";

        nombre.value = buscarProducto.name;
        precio.value = buscarProducto.price;
        for (let i = 0; i < categoria.options.length; i++) {
          const option = categoria.options[i];

          if (option.value === buscarProducto.category) {
            option.selected = true;
            break;
          }
        }
        image.value = buscarProducto.image;
        marcaImg.value = buscarProducto.marcaImg;
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

close.addEventListener("click", () => {
  caja.classList.remove("w-3/4");
  caja.classList.add("w-0");
  caja.classList.remove("lg:w-1/4");
  caja.classList.add("lg:w-0");
});

const idMayor = Math.max(...info.map(producto => producto.id));
console.log(idMayor)

actualizar.addEventListener("click", async () => {
  if (actualizar.innerHTML === "Actualizar") {
    await updateProduct(
      idProducto,
      nombre.value,
      precio.value,
      image.value,
      categoria.value,
      marcaImg.value
    );
    console.log("Producto actualizado");
  } else {
    try {
      const newProduct = await createProduct(
        idMayor + 1,
        nombre.value,
        parseInt(precio.value),
        image.value,
        categoria.value,
        marcaImg.value
      );
      alerta("success", "Producto agregado");
      console.log("Producto agregado:", newProduct);
    } catch (error) {
      console.log(error);
    }
  }
});

addProduct.addEventListener("click", () => {
  caja.classList.add("lg:w-1/4");
  caja.classList.remove("lg:w-0");
  caja.classList.add("w-3/4");
  caja.classList.remove("w-0");

  actualizar.innerHTML = "Agregar";
});

export { buscarProducto };
