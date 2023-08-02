import { CreateCollection, CreateIndex } from '@/utils/helpers/faunaHelper'
import 
{
    COLLECTION_INVOICES,
    INDEX_INVOICES_BY_USERID
} from '@/configs/fauna'

export default async function faunaInvoicesSetup(logs: string[] = [])
{
    await CreateCollection({ collectionName: COLLECTION_INVOICES })
        .then(log => logs.push(log))

    await CreateIndex({
        indexName: INDEX_INVOICES_BY_USERID,
        collectionName: COLLECTION_INVOICES,
        terms: [
            { field: ['data', 'ownerId'] }
        ]
    })
        .then(log => logs.push(log))
}