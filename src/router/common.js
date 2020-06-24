import Login from "../views/login";

export default [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '*',
        name: 'lost',
        component: () => import('@/views/404')
    }
]

