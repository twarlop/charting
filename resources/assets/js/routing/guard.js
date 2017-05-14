import store from "./../store/index";

/**
 * Our global ajax request interceptor, used to make sure we are authenticated
 * @param request
 * @returns {Promise.<*>}
 */
export function interceptor(request){

    //cannot destructure in function,
    //we need to pass the entire argument
    //to our reject clause.

    let excludes = ['/login', '/register'];

    if(request.response.status === 401 && excludes.indexOf(window.location.pathname) < 0)
    {
        console.log('test');

        window.location = '/login';
    }

    //make sure to pass the response as the second argument,
    //so we still have the same method signature when handling
    //a failed ajax call in other parts of our code...
    //we expect the first argument to be a request if request failed
    //and the second to be a response if we did make the http request and got a response
    return Promise.reject(request);
};


//this is the guard function to protect routes from being viewed by guests
export default (to, from, next) => {

    let excludes = ['/register', '/login'];
    let user = store.getters['auth/user'];

    if(!user || !user.id)
    {
        //no matter where we're going, we should verify if we are logged in or not
        //so we avoid going to the login page if we are actually logged in
        axios.get('/user').then(({data}) => {

            //the user was actually logged in,
            //so we need to set the user in our store
            store.commit('auth/login', {user: data});

            //now we'll redirect the user to the requested page
            //unless it was the login or register, then we'll go to the home page
            if(excludes.indexOf(to.path) < 0)
            {
                next();
            }
            else{
                next('/');
            }
        }).catch((all) => {
            //we weren't logged in, so we can resolve to the login page
            //we weren't actually logged in, so we either redirect to the login
            //unless we were going to the login or register page
            if(excludes.indexOf(to.path) < 0)
            {
                next('/login');
            }
            else{
                next();
            }
        })
    }
    else{
        //if not going to the login or register, continue
        if(excludes.indexOf(to.path) < 0)
        {
            next();
        }
        else{
            next('/');
        }
    }
};