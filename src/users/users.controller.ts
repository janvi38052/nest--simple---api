import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import {UsersService} from  './users.service';



@Controller('users')
export class UsersController {
  private users = [];

  @Get()
  findAll() {
    return this.users; // Return all users
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.users.find(user => user.id === id); // Return user by ID
  }

  @Post()
  create(@Body() createUserDto: { id: string, name: string, email: string }) {
    this.users.push(createUserDto); // Add a new user
    return createUserDto;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: { name: string, email: string }) {
    const user = this.users.find(user => user.id === id);
    if (user) {
      user.name = updateUserDto.name;
      user.email = updateUserDto.email;
    }
    return user;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.users = this.users.filter(user => user.id !== id); // Remove user by ID
    return { deleted: true };
  }
}
