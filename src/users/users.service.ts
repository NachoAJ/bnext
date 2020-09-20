import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(name: string, lastName: string, phone: string) {
    const newUser = new this.userModel({
      name,
      lastName,
      phone,
    });
    const insertedUser = await newUser.save();

    return insertedUser._id as string;
  }

  async addContacts(userId: string, contacts: Contact[]) {
    const updatedUser = await this.userModel.updateOne(
      { _id: userId },
      { $push: { contacts } },
    );

    return { ok: updatedUser.ok };
  }

  async getCommonContacts(userIdOne: string, userIdTwo: string) {
    const { contacts: userOneContacts } = await this.userModel.findById(
      userIdOne,
      {
        contacts: 1,
      },
    );
    const { contacts: userTwoContacts } = await this.userModel.findById(
      userIdTwo,
      {
        contacts: 1,
      },
    );
    
    const commonContacts = userOneContacts.filter(contact1 =>
      userTwoContacts.some(contact2 => contact1.phone === contact2.phone),
    );

    return commonContacts;
  }

  async getAllContacts(userId: string) {
    const { contacts } = await this.userModel.findById(userId, {
      contacts: 1,
    });

    return contacts;
  }
}
