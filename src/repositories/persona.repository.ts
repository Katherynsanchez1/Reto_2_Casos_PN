import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Persona, PersonaRelations, Caso} from '../models';
import {CasoRepository} from './caso.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.Id,
  PersonaRelations
> {

  public readonly casos: HasManyRepositoryFactory<Caso, typeof Persona.prototype.Id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('CasoRepository') protected casoRepositoryGetter: Getter<CasoRepository>,
  ) {
    super(Persona, dataSource);
    this.casos = this.createHasManyRepositoryFactoryFor('casos', casoRepositoryGetter,);
    this.registerInclusionResolver('casos', this.casos.inclusionResolver);
  }
}
