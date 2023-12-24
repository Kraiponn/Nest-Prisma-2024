import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.dbService.user.create({
      data,
    });
  }

  async findAll() {
    return this.dbService.user.findMany({});
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    return this.dbService.user.findUnique({ where });
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) {
    return this.dbService.user.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    return this.dbService.user.delete({ where });
  }
}
