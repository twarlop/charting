import Vue from "vue";
import Form from "./Core/Forms/Form";



/**
 * our shared event dispatcher to communicate between components easily
 * this.$emit or this.$on in a component will only work for dom events.
 * so we can't do parent to child communication, or sibling to sibling.
 */

window.Event = new Vue();
window.Vue = Vue;
window.Form = Form;

/**
 * First we will load all of this project's JavaScript dependencies.
 * It is a great starting point when building robust,
 * powerful web applications using Vue and Laravel.
 */

require('./vendor');

import VueRouter from "vue-router";

//create the store, need to do this after bootstrap, before the router!
import store from "./store/index";

import router from "./routing/routes";

Vue.use(VueRouter);

/**
 * Form stuff
 */
import VForm from "./Core/Forms/VForm";

import FormText from "./Core/Forms/Elements/FormText.vue";
import FormTextarea from "./Core/Forms/Elements/FormTextarea.vue";
import FormPassword from "./Core/Forms/Elements/FormPassword.vue";
import FormSelect from "./Core/Forms/Elements/FormSelect.vue";
import FormCheckbox from "./Core/Forms/Elements/FormCheckbox.vue";
import FormSubmit from "./Core/Forms/Elements/FormSubmit.vue";

import SearchDiagram from "./components/Diagrams/SearchDiagram.vue";

/**
 * Navigation
 */
import NavigationAuth from "./components/Auth/NavigationAuth.vue"

new Vue({
    el: '#app',
    router,

    store: store,

    directives: {
        VForm,
    },

    components: [

        //Form Elements
        FormText,
        FormPassword,
        FormTextarea,
        FormSelect,
        FormSubmit,
        FormCheckbox,


        //navigation top
        NavigationAuth,
        SearchDiagram,
    ],

    computed: {
        authenticated()
        {
            return this.$store.getters['auth/user'].id;
        }
    }
});