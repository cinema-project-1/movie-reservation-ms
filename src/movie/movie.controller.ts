import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, SearchMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The movie has been created successfully.',
    type: Movie,
  })
  @ApiBadRequestResponse({
    description: 'Error in the validation of body.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiOperation({
    summary: 'Create a new movie.',

  })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  @ApiOkResponse({description: 'success'})
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiOperation({
    summary: 'Get all movies',
  })
  search(@Query() query: SearchMovieDto) {
    return this.movieService.search(query);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get movie by id'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiOperation({
    summary: 'Get a movie by id',
  })
  findOne(@Param('id') id: string) {
    return this.movieService.getById(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'updated'
  })
  @ApiOperation({
    summary: 'update a movie',
  })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
    @ApiOperation({
    summary: 'delete a movie',
  })
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}

