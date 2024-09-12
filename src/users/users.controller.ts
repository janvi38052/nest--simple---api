import { Controller, Get, Post, Param, Body, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';

@Controller('users')
export class UsersController {
  private users = []; // Example user array

  @Get()
  findAll() {
    try {
      return this.users;
    } catch (error) {
      throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const user = this.users.find(user => user.id === id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('Failed to fetch user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  create(@Body() createUserDto: { id: string, name: string, email: string }) {
    try {
      this.users.push(createUserDto);
      return createUserDto;
    } catch (error) {
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: { name: string, email: string }) {
    try {
      const user = this.users.find(user => user.id === id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      user.name = updateUserDto.name;
      user.email = updateUserDto.email;
      return user;
    } catch (error) {
      throw new HttpException('Failed to update user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const userExists = this.users.some(user => user.id === id);
      if (!userExists) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      this.users = this.users.filter(user => user.id !== id);
      return { deleted: true };
    } catch (error) {
      throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
