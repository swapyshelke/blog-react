import conf from "./conf/conf.js"
import {Client, Account, ID} from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appwriteProject);

        this.account = new Account(this.client);
    }

    async createAccount(){
        // 
    }

    async login() {
        //
    }

    async getCurrentUser(){
        //
    }

    async logout(){
        //  
    }




}