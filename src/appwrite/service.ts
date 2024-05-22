import { ID, Account, Client } from 'appwrite'
import Config from 'react-native-config'

import Snackbar from 'react-native-snackbar'

const appwriteClient = new Client()

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;

type CreateUSerAccount = {
    email: string;
    password: string;
    name: string;
}
type LoginUSerAccount = {
    email: string;
    password: string;
}

class AppwriteService {
    account;

    constructor() {
        appwriteClient
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(APPWRITE_PROJECT_ID)

        this.account = new Account(appwriteClient)
    }

    //create a new record of user inside appwrite

    async createAccount({ email, password, name }: CreateUSerAccount) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (userAccount) {
                //TODO: create login feature
                return this.login({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite service :: createAccount() ::" + error);
        }
    }

    async login({ email, password }: LoginUSerAccount) {
        try {
            //createSession lo propone you.cim gpt-4
            //return await this.account.createSession(email, password)
            return await this.account.createEmailPasswordSession(email, password)

            
            
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite service :: loginAccount() ::" + error);
        }
    }

    async getCurrentUSer() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentAccount() ::" + error);
        }
    }

    async logout() {
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log("Appwrite service :: getCurrentAccount() ::" + error);
        }
    }
}

export default AppwriteService