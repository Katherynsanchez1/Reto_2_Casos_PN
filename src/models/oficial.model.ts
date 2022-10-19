import {Entity, model, property, hasMany} from '@loopback/repository';
import {Caso} from './caso.model';

@model()
export class Oficial extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'number',
    required: true,
  })
  Nocasos: number;

  @property({
    type: 'string',
    required: true,
  })
  IdCaso: string;

  @hasMany(() => Caso)
  casos: Caso[];

  constructor(data?: Partial<Oficial>) {
    super(data);
  }
}

export interface OficialRelations {
  // describe navigational properties here
}

export type OficialWithRelations = Oficial & OficialRelations;
