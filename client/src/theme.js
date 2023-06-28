const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
sun.addEventListener("click", () => {
  sun.classList.toggle("hidden");
  moon.classList.toggle("hidden");
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", "true");
});

moon.addEventListener("click", () => {
  sun.classList.toggle("hidden");
  moon.classList.toggle("hidden");
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", "false");
});

if (localStorage.getItem("theme") === "true") {
  sun.classList.toggle("hidden");
  moon.classList.toggle("hidden");
  document.documentElement.classList.toggle("dark");
}
