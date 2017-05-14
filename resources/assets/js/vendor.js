/**
 * THIS FILE IS MEANT TO BE USED TO SETUP THINGS OTHER THEN VUE RELATED STUFF
 * IF YOU EVER CHANGE THIS RULE, PLEASE DO SO IN AN ORGANISED WAY
 */

import jquery from "jquery";
window.$ = jquery;

/**
 * setup our ui kit
 */
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

window.UIkit = UIkit;
UIkit.use(Icons);

/**
 * bind axios to the window, and make sure we let laravel know we're doing ajax calls
 */

import axios from "axios";

window.axios = axios.create({
    headers: {
        common: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }
});

//first we'll make sure we intercept all axios calls to check if we have an unauthorized request
//if so, we'll make sure to redirect to the login page

import {interceptor} from "./routing/guard";

window.axios.interceptors.response.use(null,interceptor);


/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });