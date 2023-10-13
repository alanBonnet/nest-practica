import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService, Producto } from './app.service';

interface IAppController {
  findAll(): Array<Producto>;
  findOne(id: string): Producto | string;
  create(producto: { nombre: string; detalle: string; precio: number }): string;
  update(
    id: string,
    producto: { nombre: string; detalle: string; precio: number },
  ): Producto | string;
  remove(id: string): string;
}

@Controller('productos')
export class AppController implements IAppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(+id);
  }

  @Post()
  create(
    @Body() producto: { nombre: string; detalle: string; precio: number },
  ): string {
    return this.appService.create(producto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    producto: { nombre: string; detalle: string; precio: number },
  ): string | Producto {
    return this.appService.update(+id, producto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.appService.remove(+id);
  }
}
