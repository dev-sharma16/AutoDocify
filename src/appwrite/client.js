import { Client, Account, Databases, ID, Query } from 'appwrite'

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

const account = new Account(client)
const database = new Databases(client);

export const appwrite = {
    client,
    account,
    database,
    ID,
    Query
}