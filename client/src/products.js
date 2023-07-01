import { listProduct } from "./service/product.service";

const cardContainer = document.getElementById("card-container");
let producto = document.getElementById("pr");

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

    /*
      <div class="flex items-center my-10 gap-6 justify-center flex-wrap">
        <div class="bg-stone-100 rounded-xl shadow-2xl hover:scale-105 duration-300 transition-all hover:shadow-xl relative"> 
          <div class="flex items-center justify-end absolute gap-1 p-2 right-0">
            <div class="bg-indigo-500 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-indigo-600">
              <i class="fa-solid fa-pen-to-square text-white"></i>
            </div>
            <div class="bg-red-500 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-red-600">
              <i class="fa-solid fa-trash-can text-white"></i>
            </div>
          </div>   
          <img src="/samsung-galaxy-m13.png" class="max-w-[350px] lg:max-w-[250px]" />
          <div class="bg-indigo-500 pt-2 pb-6 rounded-b-xl text-white">
            <div class="bg-gray-100 w-[50%] my-2 flex items-center justify-center rounded-r-2xl">
              <img src="https://digitalife-public.sfo2.digitaloceanspaces.com/brands/432/6155ff8832717.png" alt="" class="w-14" id="logo">
            </div>
            <h1 class="text-center text-lg">Galaxy M13 (64GB)</h1>
            <div class="flex items-center justify-evenly mt-4">
              <h2 class="text-center  font-bold">₹ 12,999</h2>
              <a href="" class="py-2 px-4 bg-neutral-50 rounded-lg text-gray-900">Ver</a>
            </div>
          </div>
      </div>
    </div>  */

    cardContainer.innerHTML = "";

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
      buttons.classList.add(
        "flex",
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
        "rounded-r-2xl"
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
    });
  }
});
