import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const fieldToCreate: Prisma.UserCreateInput = {
      email: createUserDto.email,
      password: createUserDto.password,
      role: createUserDto.role,
    };

    return await this.usersService.create(fieldToCreate);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: +id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const fieldToUpdate: Prisma.UserUpdateInput = {
      email: dto.email,
      password: dto.password,
      role: dto.role,
    };

    return this.usersService.update({ id: Number(id) }, fieldToUpdate);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove({ id: +id });
  }
}
