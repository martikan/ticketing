import SignIn from './pages/public/auth/SignIn'
import SignUp from './pages/public/auth/SignUp'
import Welcome from './pages/public/Welcome'

const routes = [
    // Open routes
    {
        path: '/',
        component: <Welcome />
    },
    {
        path: 'auth/signup',
        component: <SignUp />
    },
    {
        path: 'auth/signin',
        component: <SignIn />
    }

    // Private routes
]

export default routes
