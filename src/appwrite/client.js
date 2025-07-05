import { Client, Account, Databases, ID, Query } from 'appwrite'

const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID)

const account = new Account(client)
const database = new Databases(client);

export const appwrite = {
    client,
    account,
    database,
    ID,
    Query
}