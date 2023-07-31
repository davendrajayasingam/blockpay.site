import { pathToViewDashboard } from '@/configs/pageRoutes'

import Login from './Login'

export default function LoginPage()
{
    return <Login callbackUrl={pathToViewDashboard} />
}