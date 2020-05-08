import 'reflect-metadata';
import Boom from '@hapi/boom';
import { Service } from 'typedi';
import { getConnection } from 'typeorm';

import { User } from '../models/User';

@Service()
export class UserService {
  public async getAllUsers(
    select: (keyof User)[] = ['id', 'email'],
  ): Promise<[User[], number]> {
    const userRepo = getConnection().getRepository(User);

    return userRepo.findAndCount({
      select,
    });
  }

  public async getUser(userId: string): Promise<User> {
    const userRepo = getConnection().getRepository(User);

    const user = await userRepo.findOne({
      where: [{ id: userId }],
    });

    if (!user) {
      throw Boom.notFound('Could not find a user with this userId');
    }

    return user;
  }

  public async getUserWithEmail(email: string): Promise<User> {
    const userRepo = getConnection().getRepository(User);

    const user = await userRepo.findOne({
      where: [{ email }],
    });

    return user;
  }

  public async createUser(email: string, password: string): Promise<User> {
    const userRepo = getConnection().getRepository(User);

    const user = userRepo.create({ email, password });
    await userRepo.save(user);

    return user;
  }

  public async deleteUser(userId: string): Promise<void> {
    const userRepo = getConnection().getRepository(User);

    const user = await this.getUser(userId);

    await userRepo.delete(user);
  }
}
