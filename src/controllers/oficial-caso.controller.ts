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
  Oficial,
  Caso,
} from '../models';
import {OficialRepository} from '../repositories';

export class OficialCasoController {
  constructor(
    @repository(OficialRepository) protected oficialRepository: OficialRepository,
  ) { }

  @get('/oficials/{id}/casos', {
    responses: {
      '200': {
        description: 'Array of Oficial has many Caso',
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
    return this.oficialRepository.casos(id).find(filter);
  }

  @post('/oficials/{id}/casos', {
    responses: {
      '200': {
        description: 'Oficial model instance',
        content: {'application/json': {schema: getModelSchemaRef(Caso)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Oficial.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Caso, {
            title: 'NewCasoInOficial',
            exclude: ['Id'],
            optional: ['oficialId']
          }),
        },
      },
    }) caso: Omit<Caso, 'Id'>,
  ): Promise<Caso> {
    return this.oficialRepository.casos(id).create(caso);
  }

  @patch('/oficials/{id}/casos', {
    responses: {
      '200': {
        description: 'Oficial.Caso PATCH success count',
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
    return this.oficialRepository.casos(id).patch(caso, where);
  }

  @del('/oficials/{id}/casos', {
    responses: {
      '200': {
        description: 'Oficial.Caso DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Caso)) where?: Where<Caso>,
  ): Promise<Count> {
    return this.oficialRepository.casos(id).delete(where);
  }
}
