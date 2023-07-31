import faunadb, { ExprVal } from 'faunadb'

// Query
export const q = faunadb.query
export const client = new faunadb.Client({
    secret: process.env.FAUNADB_KEY!,
    domain: 'db.us.fauna.com'
})

// Helper functions
export function CreateCollection({
    collectionName,
    historyDays = 7
}: {
    collectionName: string,
    historyDays?: number
})
{
    return client
        .query(q.CreateCollection({ name: collectionName, history_days: historyDays }))
        .then(() => `Successfully created ${collectionName}`)
        .catch(err => `Could not create ${collectionName} collection because ${err.message}`)
}

export function CreateDocument({
    collectionName,
    documentId,
    documentData = {}
}: {
    collectionName: string,
    documentId: string,
    documentData?: any
})
{
    return client
        .query(
            q.Create(
                q.Ref(q.Collection(collectionName), documentId),
                { data: documentData },
            ),
        )
        .then(() => `Successfully created ${documentId} document in ${collectionName} collection`)
        .catch(err => `Could not create ${documentId} document in ${collectionName} collection because ${err.message}`)
}

export function CreateIndex({
    indexName,
    collectionName,
    unique = false,
    terms = [],
    values = []
}: {
    indexName: string,
    collectionName: string,
    unique?: boolean,
    terms?: Array<ExprVal>,
    values?: Array<ExprVal>
})
{
    return client
        .query(
            q.CreateIndex({
                name: indexName,
                source: q.Collection(collectionName),
                unique,
                terms,
                values
            }),
        )
        .then(() => `Successfully created index ${indexName}`)
        .catch(err => `Could not create ${indexName} index because ${err.message}`)
}