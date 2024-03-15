import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // call another user
        return this.login({email, password});
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("error while creating account", error);
    }
  }

  async login({email, password}) {
    try {
       return await this.account.createEmailSession(email, password)
    } catch (error) {
        console.log('error while login user', error);
    }
  }

  async getCurrentUser() {
    try {
        await this.account.get();
    } catch (error) {
       console.log("Appwrite Service :: getCurrentUser", error);
    }

    return null;
  }

  async logout() {
    try {
        await this.account.deleteSessions();
    } catch (error) {
        console.log("Appwrite service error :: logout", error);
    }
  }
}

const authService = new AuthService();

export default authService;
