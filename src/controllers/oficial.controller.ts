import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Oficial} from '../models';
import {OficialRepository} from '../repositories';

export class OficialController {
  constructor(
    @repository(OficialRepository)
    public oficialRepository: OficialRepository,
  ) { }

  @post('/oficials')
  @response(200, {
    description: 'Oficial model instance',
    content: {'application/json': {schema: getModelSchemaRef(Oficial)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oficial, {
            title: 'NewOficial',
            exclude: ['Id'],
          }),
        },
      },
    })
    oficial: Omit<Oficial, 'Id'>,
  ): Promise<Oficial> {
    return this.oficialRepository.create(oficial);
  }

  @get('/oficials/count')
  @response(200, {
    description: 'Oficial model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Oficial) where?: Where<Oficial>,
  ): Promise<Count> {
    return this.oficialRepository.count(where);
  }

  @get('/oficials')
  @response(200, {
    description: 'Array of Oficial model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Oficial, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Oficial) filter?: Filter<Oficial>,
  ): Promise<Oficial[]> {
    return this.oficialRepository.find(filter);
  }

  @patch('/oficials')
  @response(200, {
    description: 'Oficial PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oficial, {partial: true}),
        },
      },
    })
    oficial: Oficial,
    @param.where(Oficial) where?: Where<Oficial>,
  ): Promise<Count> {
    return this.oficialRepository.updateAll(oficial, where);
  }

  @get('/oficials/{Id}')
  @response(200, {
    description: 'Oficial model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Oficial, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('Id') Id: string,
    @param.filter(Oficial, {exclude: 'where'}) filter?: FilterExcludingWhere<Oficial>
  ): Promise<Oficial> {
    return this.oficialRepository.findById(Id, filter);
  }

  @patch('/oficials/{Id}')
  @response(204, {
    description: 'Oficial PATCH success',
  })
  async updateById(
    @param.path.string('Id') Id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oficial, {partial: true}),
        },
      },
    })
    oficial: Oficial,
  ): Promise<void> {
    await this.oficialRepository.updateById(Id, oficial);
  }

  @put('/oficials/{Id}')
  @response(204, {
    description: 'Oficial PUT success',
  })
  async replaceById(
    @param.path.string('Id') Id: string,
    @requestBody() oficial: Oficial,
  ): Promise<void> {
    await this.oficialRepository.replaceById(Id, oficial);
  }

  @del('/oficials/{Id}')
  @response(204, {
    description: 'Oficial DELETE success',
  })
  async deleteById(@param.path.string('Id') Id: string): Promise<void> {
    await this.oficialRepository.deleteById(Id);
  }
}
