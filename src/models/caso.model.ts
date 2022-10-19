import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Persona} from './persona.model';
import {Oficial} from './oficial.model';

@model()
export class Caso extends Entity {
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
  Descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  IdPersona: string;

  @property({
    type: 'string',
    required: true,
  })
  Idoficial: string;

  @belongsTo(() => Persona)
  personaId: string;

  @belongsTo(() => Oficial)
  oficialId: string;

  constructor(data?: Partial<Caso>) {
    super(data);
  }
}

export interface CasoRelations {
  // describe navigational properties here
}

export type CasoWithRelations = Caso & CasoRelations;
