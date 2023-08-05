import { CreateCollection, CreateIndex } from '@/utils/helpers/faunaHelper'
import { COLLECTION_INVOICES, INDEX_INVOICES_BY_OWNER_ID, INDEX_INVOICE_BY_INVOICE_CODE } from '@/configs/fauna'

export default async function faunaInvoicesSetup(logs: string[] = [])
{
    await CreateCollection({ collectionName: COLLECTION_INVOICES })
        .then(log => logs.push(log))

    await CreateIndex({
        indexName: INDEX_INVOICES_BY_OWNER_ID,
        collectionName: COLLECTION_INVOICES,
        terms: [
            { field: ['data', 'ownerId'] }
        ]
    })
        .then(log => logs.push(log))

    await CreateIndex({
        indexName: INDEX_INVOICE_BY_INVOICE_CODE,
        collectionName: COLLECTION_INVOICES,
        terms: [
            { field: ['data', 'invoiceCode'] }
        ],
        unique: true
    })
}