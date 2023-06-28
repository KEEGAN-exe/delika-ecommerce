/*import Swal from "sweetalert2";
import "../pop-up.css";
import { listUser, createUser } from "../services/person.service";*/

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

let bol = true;

crearUsuario.addEventListener("click", () => {
  bol = !bol;
  confirmarPass.classList.remove("border-red-500");
  crearUsuario.classList.remove("animate-bounce");
  confirmarLabel.classList.toggle("hidden");
  confirmarPass.classList.toggle("hidden");
  viewpass2.classList.toggle("hidden");
  viewpass2.classList.toggle("flex");
});
