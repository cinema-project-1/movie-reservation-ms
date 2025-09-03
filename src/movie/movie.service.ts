import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMovieDto, SearchMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { applyExactFilter } from 'common/helpers/filters';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly repository: Repository<Movie>,
  ){}

  
  @Transactional()
  async create(body: CreateMovieDto): Promise<Movie> {
    try {
      const movie = await this.repository.save(this.buildEntity(body));
      return movie;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating movie', error
      );
    }
  }

  async search(query: SearchMovieDto) {
    try {
      const queryBuilder = this.createQueryBuilder(query);
      const response = await queryBuilder.getMany();
      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error getting all movies', error
      );
    }
  }

  async getById(id: number): Promise<Movie> {
    const existing = await this.search({id: id});
    if (!existing.length) {
      throw new NotFoundException('movie not found')
    }
    return existing[0];
  }

  @Transactional()
  async update(id: number, body: UpdateMovieDto): Promise<Movie> {
    const movie = await this.getById(id);
    const updatedData = this.repository.merge(movie, body);
    return this.repository.save(updatedData);
  }

  @Transactional()
  async remove(id: number) {
    const existing = await this.getById(id);
    await this.repository.softRemove(existing);

    
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
        if (query.status) {
          applyExactFilter(qb, query.status, 'status', tableName);
        }
        if (query.isActive) {
          applyExactFilter(qb, query.isActive, 'isActive', tableName);
        }
        if (query.director) {
          applyExactFilter(qb, query.director, 'director', tableName);
        }
      });
  }
}
