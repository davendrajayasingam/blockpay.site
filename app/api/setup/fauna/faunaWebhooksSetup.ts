import { CreateCollection, CreateIndex } from '@/utils/helpers/faunaHelper'
import { COLLECTION_WEBHOOKS, INDEX_WEBHOOK_EVENTS_BY_INVOICE_CODE } from '@/configs/fauna'

export default async function faunaWebhooksSetup(logs: string[] = [])
{
    await CreateCollection({ collectionName: COLLECTION_WEBHOOKS })
        .then(log => logs.push(log))

    await CreateIndex({
        indexName: INDEX_WEBHOOK_EVENTS_BY_INVOICE_CODE,
        collectionName: COLLECTION_WEBHOOKS,
        terms: [
            { field: ['data', 'invoiceCode'] }
        ]
    })
        .then(log => logs.push(log))
}