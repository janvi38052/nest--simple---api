import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users= [];


    findAll(){
        return this.users;
    }

    findOne(id: string){
        return this.users.find(user => user.id === id);

    }

  create(user){
    this.users.push(user);
    return user;
  }

  update( id : string , updateUserDto){
     const user = this.findOne(id);
     if(user){
        user.name = updateUserDto.name;
        user.name = updateUserDto.email;
     }
      return user;
    
    }

    remove(id: string) {
        this.users = this.users.filter(user => user.id !== id);
      }









}
