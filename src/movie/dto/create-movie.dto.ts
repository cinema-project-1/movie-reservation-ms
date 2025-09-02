import { IsBooleanString, IsEnum, IsNumberString, IsOptional, IsString } from "class-validator";
import { MovieEnum } from "../enums/movie-enum";

export class CreateMovieDto {
    @IsString()
    title: string;

    @IsString()
    synopsis: string;

    @IsString()
    director: string;

    @IsNumberString()
    duration: number;

    @IsEnum(MovieEnum)
    status: MovieEnum;

    @IsBooleanString()
    isActive: boolean;
}

export class UpdateMovieDto {
    @IsOptional()
    @IsEnum(MovieEnum)
    status?: MovieEnum;

    @IsOptional()
    @IsBooleanString()
    isActive?: boolean;
}

export class SearchMovieDto {

    @IsOptional()
    @IsNumberString()
    id?: number;
    
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    director?: string;

    @IsOptional()
    @IsNumberString()
    duration?: number;

    @IsOptional()
    @IsEnum(MovieEnum)
    status?: MovieEnum;

    @IsOptional()
    @IsBooleanString()
    isActive?: boolean;
}
