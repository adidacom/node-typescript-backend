import { MigrationInterface, getRepository } from 'typeorm';

import { User } from '../models/User';

export class Seed1580070688033 implements MigrationInterface {
  public async up(): Promise<void> {
    const user = getRepository(User).create({
      email: 'user1@gmail.com',
      password: '1234567',
    });

    await getRepository(User).save(user);
  }

  public async down(): Promise<void> {
    const user = await getRepository(User).findOne({
      where: { email: 'user1@gmail.com' },
    });

    await getRepository(User).remove(user);
  }
}
