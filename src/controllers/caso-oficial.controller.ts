import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Caso,
  Oficial
} from '../models';
import {CasoRepository} from '../repositories';

export class CasoOficialController {
  constructor(
    @repository(CasoRepository)
    public casoRepository: CasoRepository,
  ) { }

  @get('/casos/{Id}/oficial', {
    responses: {
      '200': {
        description: 'Oficial belonging to Caso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Oficial)},
          },
        },
      },
    },
  })
  async getOficial(
    @param.path.string('Id') Id: typeof Caso.prototype.Id,
  ): Promise<Oficial> {
    return this.casoRepository.oficial(Id);
  }
}
