import { Injectable } from '@nestjs/common';
import { CreateMovieDto, SearchMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { applyExactFilter } from 'src/common/helpers/filters';

@Injectable()
export class MovieService {

  constructor(
    @InjectRepository(Movie)
    private readonly repository: Repository<Movie>,
  ){}

  
  @Transactional()
  async create(body: CreateMovieDto): Promise<Movie> {
    const movie = await this.repository.save(this.buildEntity(body));
    return movie;
  }

  async search(query: SearchMovieDto) {
    return `This action returns all movie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }

  private buildEntity(body: CreateMovieDto): Movie{
    const entity = new Movie();
    entity.title = body.title;
    entity.synopsis = body.synopsis;
    entity.status = body.status;
    entity.isActive = body.isActive;
    entity.director = body.director;
    entity.duration = body.duration;
    return entity;
  }

    private createQueryBuilder(query: SearchMovieDto) {
    const tableName = 'movie';
    return this.repository
      .createQueryBuilder(tableName)
      .where((qb) => {
        if (query.title) {
          applyExactFilter(qb, query.title, 'title', tableName);
        }
        if (query.id) {
          applyExactFilter(qb, query.id, 'id', tableName);
        }
      });
  }
}
