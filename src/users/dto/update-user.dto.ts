import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString, IsInt, IsBoolean, Min } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
    @IsNotEmpty()
    isActive: boolean;
}
