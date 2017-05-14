import VueRouter from "vue-router";

import guard from "./guard";

let routes = [
    {
        path: '/login',
        component: require('./../components/Auth/Login.vue'),
    },
    {
        path: '/register',
        component: require('./../components/Auth/Register.vue'),
    },

    /**
     * need both of these at the bottom, or they will collide with every other route
     * because of the wildcard in our diagram detail route
     */
    {
        path: '/',
        name: 'home',
        component: require('./../components/Diagrams/Diagrams.vue'),
    },
    {
        path: '/:diagram',
        name: 'diagram',
        component: require('./../components/Diagrams/Diagrams.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach(guard);

export default router;