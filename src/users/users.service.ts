import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error('Error fetching users');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findByUsername(username: string) {
    try {
      const user = await this.userRepository.findOneBy({ username });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user by username');
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUsername = await this.userRepository.findOneBy({
        username: createUserDto.username,
      });
      if (existingUsername) {
        return {
          message: 'Username already exists',
          username: existingUsername.username,
        }
      }

      const existingEmail = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });
      if (existingEmail) {
        return {
          message: 'Email already exists',
          email: existingEmail.email,
        }
      }

      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.findOneBy({ id });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.update(id, updateUserDto);

    return await this.userRepository.findOneBy({ id });
  }

  async remove(id: number) {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('User not found');
      }
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }
}
