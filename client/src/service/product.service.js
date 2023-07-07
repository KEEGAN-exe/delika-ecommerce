export const listProduct = async () => {
  const response = await fetch("http://localhost:3080/product")
  const json = await response.json()
  return json
}

export const createProduct = async (id, name, price, image, category, marcaImg) => {
  try {
    const response = await fetch("http://localhost:3080/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
        name,
        price,
        image,
        category,
        marcaImg
      })
    });

    if (response.ok) {
      const newProduct = await response.json();
      console.log(newProduct);
      return newProduct;
    } else {
      throw new Error("Error en la solicitud HTTP: " + response.status);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear producto: " + error.message);
  }
};


export const findProductById = async (id) => {
  const response = await fetch(`http://localhost:3080/product/${id}`)
  const json = await response.json()
  return json
}

export const updateProduct = async (id,name,price,image,category,marcaImg) => {
  try{
    const response = await fetch(`http://localhost:3080/product/${id}` ,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
        name,
        price,
        image,
        category,
        marcaImg
      })
    })

    if (response.ok) {
      const newProduct = await response.json();
      // agregarUsuario(newUser)
      console.log(newProduct);
    }else{
      throw new Error("Error en la solicitud HTTP: " + response.status);
    }

  }
  catch (error) {
    console.log(error);
    throw new Error("Error al crear usuario: " + error.message);
  }
}

export const deleteProduct = async (id) => {
  try{
    const response = await fetch(`http://localhost:3080/product/${id}` ,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (response.ok) {
      const newProduct = await response.json();
      // agregarUsuario(newUser)
      console.log(newProduct);
    }else{
      throw new Error("Error en la solicitud HTTP: " + response.status);
    }

  }
  catch (error) {
    console.log(error);
    throw new Error("Error al crear usuario: " + error.message);
  }
}