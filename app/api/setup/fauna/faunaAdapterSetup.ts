import { CreateCollection, CreateIndex } from '@/utils/helpers/faunaHelper'
import
{
    COLLECTION_AUTH_ACCOUNTS,
    COLLECTION_AUTH_SESSIONS,
    COLLECTION_AUTH_USERS,
    COLLECTION_AUTH_VERIFICATION_TOKENS,
    INDEX_AUTH_ACCOUNT_BY_PROVIDER_AND_PROVIDER_ACCOUNT_ID,
    INDEX_AUTH_SESSION_BY_SESSION_TOKEN,
    INDEX_AUTH_USER_BY_EMAIL,
    INDEX_VERIFICATION_TOKEN_BY_IDENTIFIER_AND_TOKEN
} from '@/configs/fauna'

export default async function faunaAdapterSetup(logs: string[] = [])
{
    await CreateCollection({ collectionName: COLLECTION_AUTH_ACCOUNTS })
        .then(log => logs.push(log))

    await CreateCollection({ collectionName: COLLECTION_AUTH_SESSIONS })
        .then(log => logs.push(log))

    await CreateCollection({ collectionName: COLLECTION_AUTH_USERS })
        .then(log => logs.push(log))

    await CreateCollection({ collectionName: COLLECTION_AUTH_VERIFICATION_TOKENS })
        .then(log => logs.push(log))

    await CreateIndex({
        indexName: INDEX_AUTH_ACCOUNT_BY_PROVIDER_AND_PROVIDER_ACCOUNT_ID,
        collectionName: COLLECTION_AUTH_ACCOUNTS,
        unique: true,
        terms: [
            { field: ['data', 'provider'] },
            { field: ['data', 'providerAccountId'] }
        ]
    }).then(log => logs.push(log))

    await CreateIndex({
        indexName: INDEX_AUTH_SESSION_BY_SESSION_TOKEN,
        collectionName: COLLECTION_AUTH_SESSIONS,
        unique: true,
        terms: [
            { field: ['data', 'sessionToken'] }
        ]
    }).then(log => logs.push(log))

    await CreateIndex({
        indexName: INDEX_AUTH_USER_BY_EMAIL,
        collectionName: COLLECTION_AUTH_USERS,
        unique: true,
        terms: [
            { field: ['data', 'email'] }
        ]
    }).then(log => logs.push(log))

    await CreateIndex({
        indexName: INDEX_VERIFICATION_TOKEN_BY_IDENTIFIER_AND_TOKEN,
        collectionName: COLLECTION_AUTH_VERIFICATION_TOKENS,
        unique: true,
        terms: [
            { field: ['data', 'identifier'] },
            { field: ['data', 'token'] }
        ]
    }).then(log => logs.push(log))
}