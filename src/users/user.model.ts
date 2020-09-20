import { ObjectId, Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  contacts: { type: Array, default: [] },
});

export interface Contact {
  contactName: string;
  phone: string;
}

export interface User {
  _id: ObjectId;
  name: string;
  lastName: string;
  phone: string;
  contacts: Contact[];
}
