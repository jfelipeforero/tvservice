import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/client.entity';
import { Technician } from 'src/technicians/technician.entity';
import { getRepo } from 'src/utils/get-repository';
import { Repository } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { FindOptionsWhere } from 'typeorm';
import { UsersRoles } from 'src/auth/users-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepo: Repository<Client>,
    @InjectRepository(Technician)
    private readonly techniciansRepo: Repository<Technician>,
  ) {}

  // create<T extends IUser>(user: T): Promise<T> {
  //   const repoKey = getRepo(user.role);
  //   const repo = this[repoKey] as Repository<T>;
  //   const newUser = repo.create(user);
  //   return repo.save(newUser);
  // }

  async create(fullName, email, password, role) {
    if (role === 'client') {
      const client = await this.clientsRepo.create({
        fullName,
        role,
        email,
        password,
      });
      return this.clientsRepo.save(client);
    } else {
      const technician = await this.techniciansRepo.create({
        fullName,
        role,
        email,
        password,
      });
      return this.techniciansRepo.save(technician);
    }
  }

  async findOne(id: number, role: UsersRoles): Promise<Client | Technician> {
    try {
      const repo = getRepo(role);
      const user = await this[repo].findOneByOrFail({ id });
      return user;
    } catch (err) {
      throw new NotFoundException(
        `${role} with the id provided was not found in the database`,
      );
    }
  }
  // findById<T extends IUser>(role: string, id: number) {
  //   const repoKey = getRepo(role);
  //   const repo = this[repoKey] as Repository<T>;
  //   return repo.findBy(id);
  // }

  async find(role: UsersRoles, email: string) {
    console.log(role, 'que pasa');
    const repo = getRepo(role);
    console.log(repo, 'mmm');
    const users = await this[repo].findBy({ email });
    return users;
  }

  findAll(role: UsersRoles) {
    const repo = getRepo(role);
    return this[repo].find({});
  }

  // async update(id: number, attrs: Partial<Client>): Promise<Client> {
  //   try {
  //     const user = await this.findOne(id);
  //     Object.assign(user, attrs);
  //     return this.repo.save(user);
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async remove(id: number): Promise<Client> {
  //   try {
  //     const user = await this.findOne(id);
  //     return this.repo.remove(user);
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
