import {createRouter, createWebHistory} from "vue-router";

import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Surveys from "../views/Surveys.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import store from "../store";
const routes = [
    {
        path: "/",
        redirect: "/dashboard",
        component: DefaultLayout,
        // only authenticated users can get here
        meta: {requiresAuth: true},
        children: [
            {path: '/dashboard', name:'Dashboard', component: Dashboard},
            {path: '/surveys', name:'Surveys', component: Surveys}
        ]
    },
    {
        path: '/auth',
        redirect: '/login',
        name: "Auth",
        component: AuthLayout,
        meta: {isGuest: true},
        children: [
            {
                path: "/login",
                name: "Login",
                component: Login
            },
            {
                path: "/register",
                name: "Register",
                component: Register
            },
        ]
    }
   
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) =>{
    //if you/re not asuthenticated trying to access protected page
    //redirect to login page
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name: "Login"})
    }
    //lets make sure authenticated user cant access auth page (login page, forgot password, register page etc) remember
    else if(store.state.user.token &&  (to.meta.isGuest) /*(to.name == "Login" || to.name == "register")*/){
        next({path: from.path});
        console.log(from);
    }
    else{
        next();
    }
})

export default router;