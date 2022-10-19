import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Caso, CasoRelations, Persona, Oficial} from '../models';
import {PersonaRepository} from './persona.repository';
import {OficialRepository} from './oficial.repository';

export class CasoRepository extends DefaultCrudRepository<
  Caso,
  typeof Caso.prototype.Id,
  CasoRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Caso.prototype.Id>;

  public readonly oficial: BelongsToAccessor<Oficial, typeof Caso.prototype.Id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('OficialRepository') protected oficialRepositoryGetter: Getter<OficialRepository>,
  ) {
    super(Caso, dataSource);
    this.oficial = this.createBelongsToAccessorFor('oficial', oficialRepositoryGetter,);
    this.registerInclusionResolver('oficial', this.oficial.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
