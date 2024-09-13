import { Controller, Get, Post, Param, Body, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService, User } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {  
    try {
      const user = this.usersService.findOne(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('Failed to fetch user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  create(@Body() createUserDto: { username: string, password: string, email: string }) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: { username?: string, password?: string, email?: string }) {
    try {
      const user = this.usersService.update(id, updateUserDto);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('Failed to update user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const userExists = this.usersService.findOne(id);
      if (!userExists) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      this.usersService.remove(id);
      return { deleted: true };
    } catch (error) {
      throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
