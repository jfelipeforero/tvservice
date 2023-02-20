/*
 User reprensents any kind of person registered in the app, this interface
 sould be implemented by every class of user registered, such as clients, 
 technicians,etc. 
 */

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: string;
}
