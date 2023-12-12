import { IsEmail, IsNotEmpty, IsString, IsInt, IsBoolean, Min } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsInt()
    @Min(18)
    @IsNotEmpty()
    age: number;

    @IsBoolean()
    isActive: boolean = true;
}
