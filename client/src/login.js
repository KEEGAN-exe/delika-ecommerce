import Swal from "sweetalert2";
import "./pop-up.css";
import { listUser, createUser } from "./service/person.service";

const user = document.querySelector("#user");
const pass = document.querySelector("#pass");
const ingresar = document.querySelector("#ingresar");
const confirmarPass = document.querySelector("#confirmarPass");
const crearUsuario = document.querySelector("#crearUsuario");
const confirmarLabel = document.querySelector("#confirmarLabel");
const viewpass1 = document.querySelector("#viewpass1");
const viewpass2 = document.querySelector("#viewpass2");
const iconElement = document.querySelector("#viewpass2 i");
const iconElement2 = document.querySelector("#viewpass1 i");
const userContainer = document.querySelector("#userContainer");
const userImage = document.querySelector("#userImage");
const userAlias = document.querySelector("#userAlias");
const logout = document.querySelector("#logout");
const login = document.getElementById("login");
const cont = document.getElementById("cont");
const bars = document.getElementById("bars");
const movileContainer = document.getElementById("movileContainer");
const addProduct = document.getElementById("addProduct");

if (localStorage.getItem("user").length > 1) {
  const list = JSON.parse(localStorage.getItem("user"));
  addProduct.classList.remove("hidden");
  addProduct.classList.add("flex");
  iniciar.classList.toggle("hidden");
  userContainer.classList.toggle("hidden");
  userContainer.classList.toggle("flex");
  const userNombre = list.username;
  const userIMG = list.image;
  userImage.src = userIMG;
  userAlias.innerHTML = userNombre;
  if (window.innerWidth <= 640) {
    bars.classList.add("hidden");
    movileContainer.classList.remove("hidden");
  }
}
if (localStorage.getItem("user").length == 0) {
  if (window.innerWidth <= 640) {
    bars.classList.remove("hidden");
    movileContainer.classList.add("hidden");
  }
}

viewpass2.addEventListener("click", () => {
  confirmarPass.type = confirmarPass.type == "password" ? "text" : "password";
  iconElement.classList.toggle("fa-eye-slash");
  iconElement.classList.toggle("fa-eye");
});

viewpass1.addEventListener("click", () => {
  pass.type = pass.type == "password" ? "text" : "password";
  iconElement2.classList.toggle("fa-eye-slash");
  iconElement2.classList.toggle("fa-eye");
});

const data = await listUser();

export const agregarUsuario = (newUser) => {
  data.push(newUser);
};
console.log(data);

let bol = true;
const content = ["Ingresar", "Crear Usuario"];

crearUsuario.addEventListener("click", () => {
  bol = !bol;
  user.classList.add("dark:border-zinc-800");
  pass.classList.add("dark:border-zinc-800");
  confirmarPass.classList.add("dark:border-zinc-800");
  user.classList.remove("dark:border-red-500");
  pass.classList.remove("dark:border-red-500");
  confirmarPass.classList.remove("dark:border-red-500");
  user.classList.remove("border-red-500");
  pass.classList.remove("border-red-500");
  confirmarPass.classList.remove("border-red-500");
  crearUsuario.classList.remove("animate-bounce");
  confirmarLabel.classList.toggle("hidden");
  confirmarPass.classList.toggle("hidden");
  viewpass2.classList.toggle("hidden");
  viewpass2.classList.toggle("flex");
  if (ingresar.innerHTML == content[0]) {
    crearUsuario.innerHTML = content[0];
    ingresar.innerHTML = content[1];
  } else {
    ingresar.innerHTML = content[0];
    crearUsuario.innerHTML = content[1];
  }
});

ingresar.addEventListener("click", (e) => {
  e.preventDefault();
  if (bol) {
    const loginUsuario = data.find(
      (e) => e.username == user.value && e.password == pass.value
    );
    e.preventDefault();
    if (loginUsuario) {
      alerta("success", `Bienvenido ${loginUsuario.username}`);
      addProduct.classList.remove("hidden");
      addProduct.classList.add("flex");
      localStorage.setItem("user", JSON.stringify(loginUsuario));
      const list = JSON.parse(localStorage.getItem("user"));
      console.log(localStorage.getItem("user").length);
      console.log(localStorage.getItem("user"));
      const userID = loginUsuario.id;
      const userNombre = list.username;
      const userIMG = list.image;
      userImage.src = userIMG;
      userAlias.innerHTML = userNombre;
      crearUsuario.classList.remove("animate-bounce");
      user.classList.add("dark:border-zinc-800");
      pass.classList.add("dark:border-zinc-800");
      user.classList.remove("dark:border-red-500");
      pass.classList.remove("dark:border-red-500");
      user.classList.remove("border-red-500");
      pass.classList.remove("border-red-500");
      confirmarPass.classList.add("dark:border-zinc-800");
      confirmarPass.classList.remove("dark:border-red-500");
      confirmarPass.classList.remove("border-red-500");
      console.log("Ingresando");
      limpiar();
      iniciar.classList.toggle("hidden");
      login.classList.toggle("w-0");
      login.classList.toggle("w-[100%]");
      cont.classList.toggle("ml-0");
      cont.classList.toggle("ml-[-200px]");
      userContainer.classList.toggle("hidden");
      userContainer.classList.toggle("flex");
      if (window.innerWidth <= 640) {
        bars.classList.toggle("hidden");
        movileContainer.classList.remove("hidden");
      }
      alerta("success", "Ingresando...");
      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      alerta("error", "Usuario no encontrado");
      crearUsuario.classList.add("animate-bounce");
      user.classList.add("border-red-500");
      pass.classList.add("border-red-500");
      user.classList.remove("dark:border-zinc-800");
      pass.classList.remove("dark:border-zinc-800");
      user.classList.add("dark:border-red-500");
      pass.classList.add("dark:border-red-500");
      confirmarPass.classList.remove("dark:border-zinc-800");
      confirmarPass.classList.add("dark:border-red-500");
      confirmarPass.classList.add("border-red-500");
      limpiar();
    }
  } else {
    e.preventDefault();
    if (
      confirmarPass.value === pass.value &&
      user.value != "" &&
      pass.value != ""
    ) {
      const imagen = generateImage();
      const usuario = document.querySelector("#user").value;
      const contra = document.querySelector("#pass").value;
      e.preventDefault();
      registrar(usuario, contra, imagen)
        .then((res) => {
          alerta("success", "Usuario creado correctamente");
        })
        .catch((err) => {
          alerta("error", "Error al crear usuario");
        });

      user.classList.add("dark:border-zinc-800");
      pass.classList.add("dark:border-zinc-800");
      user.classList.remove("dark:border-red-500");
      pass.classList.remove("dark:border-red-500");
      confirmarPass.classList.add("dark:border-zinc-800");
      confirmarPass.classList.remove("dark:border-red-500");
      confirmarPass.classList.remove("border-red-500");
      user.classList.remove("border-red-500");
      pass.classList.remove("border-red-500");
      limpiar();
      crearUsuario.classList.remove("animate-bounce");
      confirmarLabel.classList.toggle("hidden");
      confirmarPass.classList.toggle("hidden");
      viewpass2.classList.toggle("hidden");
      viewpass2.classList.toggle("flex");
      if (ingresar.innerHTML == content[0]) {
        crearUsuario.innerHTML = content[0];
        ingresar.innerHTML = content[1];
      } else {
        ingresar.innerHTML = content[0];
        crearUsuario.innerHTML = content[1];
      }
      bol = !bol;
    } else {
      user.classList.add("border-red-500");
      pass.classList.add("border-red-500");
      user.classList.remove("dark:border-zinc-800");
      pass.classList.remove("dark:border-zinc-800");
      confirmarPass.classList.remove("dark:border-zinc-800");
      confirmarPass.classList.add("border-red-500");
      user.classList.add("dark:border-red-500");
      pass.classList.add("dark:border-red-500");
      confirmarPass.classList.add("dark:border-red-500");
      limpiar();
    }
  }
});

logout.addEventListener("click", (e) => {
  userImage.src = "";
  userAlias.innerHTML = "";
  iniciar.classList.toggle("hidden");
  userContainer.classList.toggle("hidden");
  userContainer.classList.toggle("flex");
  localStorage.setItem("user", "");
  addProduct.classList.add("hidden");
  addProduct.classList.remove("flex");
  if (window.innerWidth <= 640) {
    bars.classList.toggle("hidden");
    movileContainer.classList.add("hidden");
  }
  alerta("success", "Sesión cerrada correctamente");
  setTimeout(() => {
    location.reload();
  }, 2000);
});

user.addEventListener("change", () => {
  user.classList.add("dark:border-zinc-800");
  pass.classList.add("dark:border-zinc-800");
  user.classList.remove("dark:border-red-500");
  pass.classList.remove("dark:border-red-500");
  confirmarPass.classList.add("dark:border-zinc-800");
  confirmarPass.classList.remove("dark:border-red-500");
  confirmarPass.classList.remove("border-red-500");
  user.classList.remove("border-red-500");
  pass.classList.remove("border-red-500");
});

pass.addEventListener("change", () => {
  user.classList.add("dark:border-zinc-800");
  pass.classList.add("dark:border-zinc-800");
  user.classList.remove("dark:border-red-500");
  pass.classList.remove("dark:border-red-500");
  confirmarPass.classList.add("dark:border-zinc-800");
  confirmarPass.classList.remove("dark:border-red-500");
  confirmarPass.classList.remove("border-red-500");
  user.classList.remove("border-red-500");
  pass.classList.remove("border-red-500");
});

const registrar = async (usuario, password, imagen) => {
  try {
    const result = await createUser(data.length + 1, usuario, password, imagen);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

function limpiar() {
  user.value = "";
  pass.value = "";
  confirmarPass.value = "";
  user.focus();
}

function generateImage() {
  const usuario = document.querySelector("#user").value;
  const page = "https://robohash.org/";
  const id = data.length + 1;
  return `${page}${usuario}${id}`;
}

export function alerta(icono, message) {
  let bg;
  if (icono == "error") {
    bg = "#f87171";
  } else {
    bg = "#A5DC86";
  }
  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    background: bg,
    position: "top-end",
    timer: 2000,
    timerProgressBar: true,
    customClass: {
      container: "custom-container",
      popup: "custom-popup",
    },
  });

  Toast.fire({
    icon: icono,
    iconColor: "white",
    title: message,
    color: "white",
  });
}
