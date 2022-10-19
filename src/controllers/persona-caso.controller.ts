import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Persona,
  Caso,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaCasoController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/casos', {
    responses: {
      '200': {
        description: 'Array of Persona has many Caso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Caso)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Caso>,
  ): Promise<Caso[]> {
    return this.personaRepository.casos(id).find(filter);
  }

  @post('/personas/{id}/casos', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Caso)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Caso, {
            title: 'NewCasoInPersona',
            exclude: ['Id'],
            optional: ['personaId']
          }),
        },
      },
    }) caso: Omit<Caso, 'Id'>,
  ): Promise<Caso> {
    return this.personaRepository.casos(id).create(caso);
  }

  @patch('/personas/{id}/casos', {
    responses: {
      '200': {
        description: 'Persona.Caso PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Caso, {partial: true}),
        },
      },
    })
    caso: Partial<Caso>,
    @param.query.object('where', getWhereSchemaFor(Caso)) where?: Where<Caso>,
  ): Promise<Count> {
    return this.personaRepository.casos(id).patch(caso, where);
  }

  @del('/personas/{id}/casos', {
    responses: {
      '200': {
        description: 'Persona.Caso DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Caso)) where?: Where<Caso>,
  ): Promise<Count> {
    return this.personaRepository.casos(id).delete(where);
  }
}
