import { CreateCollection, CreateIndex } from '@/utils/helpers/faunaHelper'
import 
{
    COLLECTION_CHARGES,
    INDEX_CHARGES_BY_INVOICEID,
    INDEX_CHARGES_BY_USERID
} from '@/configs/fauna'

export default async function faunaChargesSetup(logs: string[] = [])
{
    await CreateCollection({ collectionName: COLLECTION_CHARGES })
        .then(log => logs.push(log))

    await CreateIndex({
        indexName: INDEX_CHARGES_BY_INVOICEID,
        collectionName: COLLECTION_CHARGES,
        terms: [
            { field: ['data', 'invoiceId'] }
        ]
    })
        .then(log => logs.push(log))

    await CreateIndex({
        indexName: INDEX_CHARGES_BY_USERID,
        collectionName: COLLECTION_CHARGES,
        terms: [
            { field: ['data', 'ownerId'] }
        ]
    })
        .then(log => logs.push(log))
}