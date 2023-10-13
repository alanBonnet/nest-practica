import { Injectable } from '@nestjs/common';

export interface Producto {
  id: number;
  nombre: string;
  detalle: string;
  precio: number;
}

interface IFerreteria {
  findAll(): Array<Producto>;
  findOne(id: number): Producto | string;
  create({
    nombre,
    detalle,
    precio,
  }: {
    nombre: string;
    detalle: string;
    precio: number;
  }): string;
  update(
    id: number,
    {
      nombre,
      detalle,
      precio,
    }: { nombre: string; detalle: string; precio: number },
  ): string;
  remove(id: number): string;
}

@Injectable()
export class AppService implements IFerreteria {
  private readonly productos: Array<Producto> = [
    { id: 0, nombre: 'Galletita', detalle: 'Oreo: Grande', precio: 400 },
    { id: 1, nombre: 'Galletita', detalle: 'Sonrisa: Grande', precio: 400 },
    { id: 2, nombre: 'Galletita', detalle: 'Terrabusi: Grande', precio: 800 },
    { id: 3, nombre: 'Galletita', detalle: 'Chocolina: Grande', precio: 800 },
    { id: 4, nombre: 'Galletita', detalle: 'Terrabusi: Medio', precio: 600 },
    { id: 5, nombre: 'Galletita', detalle: 'Oreo: Chico', precio: 150 },
  ];
  findAll(): Array<Producto> {
    return this.productos;
  }
  findOne(id: number): Producto | string {
    const producto = this.productos.find((producto) => producto.id === id);
    if (!producto) {
      return 'Producto no encontrado';
    }
    return producto;
  }
  create({
    nombre,
    detalle,
    precio,
  }: {
    nombre: string;
    detalle: string;
    precio: number;
  }): string {
    if (!nombre || !detalle || !precio) {
      return this.verificarCamposFaltantes({ nombre, detalle, precio });
    }
    const newId = this.productos[this.productos.length - 1].id + 1;
    this.productos.push({
      id: newId,
      nombre,
      detalle,
      precio,
    });
    return 'Producto agregado';
  }

  update(
    id: number,
    {
      nombre,
      detalle,
      precio,
    }: { nombre: string; detalle: string; precio: number },
  ): string {
    const index = this.productos.findIndex((producto) => producto.id === id);
    if (index === -1) {
      return 'No se encontró un producto';
    }

    this.productos[index] = {
      ...this.productos[index],
      nombre,
      detalle,
      precio,
    };
    return 'Producto modificado correctamente.';
  }

  remove(id: number): string {
    const index = this.productos.findIndex((producto) => producto.id === id);
    if (index === -1) {
      return 'No se encontró un producto';
    }

    this.productos.splice(index, 1);
    return 'Producto eliminado';
  }

  // metodos interno de la clase
  private verificarCamposFaltantes(data: {
    nombre: string;
    detalle: string;
    precio: number;
  }): string {
    const camposFaltantes = [];
    Object.keys(data).forEach((value) => {
      if (!data[value]) {
        camposFaltantes.push(value);
      }
    });
    if (!camposFaltantes.length) {
      return 'Todos los campos están completos';
    }
    if (camposFaltantes.length === 1) {
      return `Falta el campo: ${camposFaltantes[0]}`;
    }

    return `Faltan los siguientes campos: ${camposFaltantes.join(', ')}`;
  }
}
