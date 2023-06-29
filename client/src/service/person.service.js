import { agregarUsuario, alerta } from "../login";

export const listUser = async () => {
  const response = await fetch("http://localhost:3080/person")
  const json = await response.json()
  return json
}

export const createUser = async (id, username, password, image) => {
  try {
    const response = await fetch("http://localhost:3080/person", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
        username,
        password,
        image
      })
    });

    if (response.ok) {
      const newUser = await response.json();
      agregarUsuario(newUser)
      console.log(newUser);
    } else {
      throw new Error("Error en la solicitud HTTP: " + response.status);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear usuario: " + error.message);
  }
};

