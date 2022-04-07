import { LoginData, User, Product, Pedido } from '../shared/shareddtypes';

export async function addUser(user: User): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  try {
    await fetch(apiEndPoint + '/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'nombre': user.nombre, 'email': user.email, 'contraseña': user.contraseña, 'dni': user.dni })
    }).then(handleExceptions);

    sessionStorage.setItem("emailUsuario", user.email);
    return true;
  } catch {
    return false;
  }
}

export async function getUsers(): Promise<User[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response: Response = await fetch(apiEndPoint + '/users/list');

  return response.json()
}

export async function addProduct(product: Product): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'nombre': product.nombre, 'origen': product.origen, 'descripcion': product.descripcion, 'precio': product.precio, 'foto': product.foto })
  });
  if (response.status === 200) {
    return true;
  } else
    return false;
}

export async function getProducts(): Promise<Product[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/products/list');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}

export async function login(user: LoginData): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  try {
    await fetch(apiEndPoint + '/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'email': user.email, 'contraseña': user.contraseña })
    }).then(handleExceptions);

    sessionStorage.setItem("emailUsuario", user.email);
    return true;
  } catch {
    return false;
  }
}

export function addToCart(product:Product, quantity:number):boolean{
  if (quantity <= 0){
    quantity = 1;
  }
  var item ={'id':product._id, 
             'nombre':product.nombre,
             'descripcion':product.descripcion, 
             'origen':product.origen, 
             'precio':product.precio,  
             'foto':product.foto,
             'qty':quantity};
  
  var value = sessionStorage.getItem(product._id);
    if (value != null){
      var temp = JSON.parse(value);
      temp.qty = temp.qty + quantity;
      sessionStorage.setItem(product._id, JSON.stringify(temp));

    }
    else {
      sessionStorage.setItem(product._id, JSON.stringify(item));
    }

    return true;
}

export async function findProductById(id: string): Promise<Product> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/products/id=' + id);
  return response.json();
}

function handleExceptions(response: Response): Response {
  if (response.ok) {
    return response;
  } else {
    throw new Error("Algo ha fallado");
  }
}

export async function findUserByEmail(email: string): Promise<User> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/users/email=' + email);
  return response.json();
}
export async function findUserByDni(dni: string): Promise<User> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/users/dni=' + dni);
  return response.json();
}

export async function addPedido(pedido: Pedido): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  try {
    await fetch(apiEndPoint + '/pedidos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "numero_pedido":pedido.numero_pedido,
        "id_usuario":pedido.id_usuario,
        "lista_productos":pedido.lista_productos,
        "precio_total":pedido.precio_total,
        "direccion":pedido.direccion,
        "estado":pedido.estado
    })
    }).then(handleExceptions);

    return true;
  } catch {
    return false;
  }
}

export async function getPedidos(): Promise<Pedido[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/pedidos/list');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}