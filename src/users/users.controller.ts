import { Body, Controller, Get, Post } from '@nestjs/common';
import { Contact } from './user.model';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add')
  async addUser(
    @Body('name') userName: string,
    @Body('lastName') userLastName: string,
    @Body('phone') userPhone: string,
  ) {
    const generatedId = await this.usersService.insertUser(
      userName,
      userLastName,
      userPhone,
    );

    return { id: generatedId };
  }

  @Post('add-contacts')
  async addContacts(
    @Body('userId') userId: string,
    @Body('contacts') contacts: Contact[],
  ) {
    const response = await this.usersService.addContacts(userId, contacts);

    return response;
  }

  @Get('get-common-contacts')
  async getCommonContacts(
    @Body('userId1') userId1: string,
    @Body('userId2') userId2: string,
  ) {
    const commonContacts = await this.usersService.getCommonContacts(
      userId1,
      userId2,
    );

    return commonContacts;
  }

  @Get('get-all-contacts')
  async getAllContacts(@Body('userId') userId: string) {
    const contacts = await this.usersService.getAllContacts(userId);

    return contacts;
  }
}
