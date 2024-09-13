import { Injectable } from '@nestjs/common';

export type User = {
  id: string;  
  username: string;
  password: string;
  email: string;
};

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',  
      username: 'john',
      password: 'changeme',
      email: 'john@example.com',
    },
    {
      id: '2',  
      username: 'maria',
      password: 'guess',
      email: 'maria@example.com',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | undefined {  
    return this.users.find(user => user.id === id);
  }

  findByUsername(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }

  create(userDto: Partial<User>): User {

    const newId = (this.users.length + 1).toString();

    const newUser = {
      id: newId,
      username: userDto.username!,
      password: userDto.password!,
      email: userDto.email!,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updateUserDto: Partial<User>): User | undefined { 
    const user = this.findOne(id);
    if (!user) return undefined;

   
    Object.assign(user, updateUserDto);

    return user;
  }

  remove(id: string): void {  
    this.users = this.users.filter(user => user.id !== id);
  }
}
