import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Caso,
  Persona
} from '../models';
import {CasoRepository} from '../repositories';

export class CasoPersonaController {
  constructor(
    @repository(CasoRepository)
    public casoRepository: CasoRepository,
  ) { }

  @get('/casos/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Caso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Caso.prototype.Id,
  ): Promise<Persona> {
    return this.casoRepository.persona(id);
  }
}
