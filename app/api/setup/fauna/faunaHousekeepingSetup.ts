import { CreateCollection } from '@/utils/helpers/faunaHelper'
import 
{
    COLLECTION_ERROR_REPORTS,
    COLLECTION_LOGDRAINS
} from '@/configs/fauna'

export default async function faunaHousekeepingSetup(logs: string[] = [])
{
    // Log Drain
    await CreateCollection({ collectionName: COLLECTION_LOGDRAINS })
        .then(log => logs.push(log))

    // Error Reports
    await CreateCollection({ collectionName: COLLECTION_ERROR_REPORTS })
        .then(log => logs.push(log))
}