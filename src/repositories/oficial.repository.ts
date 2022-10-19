import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Oficial, OficialRelations, Caso} from '../models';
import {CasoRepository} from './caso.repository';

export class OficialRepository extends DefaultCrudRepository<
  Oficial,
  typeof Oficial.prototype.Id,
  OficialRelations
> {

  public readonly casos: HasManyRepositoryFactory<Caso, typeof Oficial.prototype.Id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('CasoRepository') protected casoRepositoryGetter: Getter<CasoRepository>,
  ) {
    super(Oficial, dataSource);
    this.casos = this.createHasManyRepositoryFactoryFor('casos', casoRepositoryGetter,);
    this.registerInclusionResolver('casos', this.casos.inclusionResolver);
  }
}
