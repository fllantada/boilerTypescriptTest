import { Contenedor } from "./Contenedor";

const mockData = [
  { title: "Producto 1", price: 100, thumbnail: "Foto 1" },
  { title: "Producto 2", price: 200, thumbnail: "Foto 2" },
  { title: "Producto 3", price: 300, thumbnail: "Foto 3" },
  { title: "Producto 4", price: 400, thumbnail: "Foto 4" },
];
export const ejercicio2 = async () => {
  console.log("------------------------Entrega 2---------");
  const contenedor = new Contenedor("productos");

  //  guarda los productos y devuelve el ID asignado incremental

  console.log("Guardo los productos");

  for (let data of mockData) {
    const id = await contenedor.save(data);
    console.log("Ej1)", data, `Se guardo el producto con id: ${id}`);
  }

  console.log("Ej2)  Busqueda por id con id en 2", contenedor.getById(2));

  console.log("Ej3) Metodo getAll() trae todos", contenedor.getAll());

  console.log("Ej4) DeletebyId () elimina por id en este caso el 2");
  contenedor.deleteById(2);
  console.log("Llamo todos nuevamente", contenedor.getAll());

  console.log("ej5) Busco por id al 1 ", contenedor.getById(1));
  console.log("ej5) Busco por id al 2 ya eliminado ", contenedor.getById(2));
  console.log("Ej6) Elimino todos los productos");
  contenedor.deleteAll();

  console.log("Imprimo una vez  eliminados", contenedor.getAll());
};
