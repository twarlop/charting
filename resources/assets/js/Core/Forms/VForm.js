import Vue from "vue";

function submitting(event){
    let submit = this.value.submit;
    submit();
    //prevent regular form submit, we're building a SPA remember
    event.preventDefault();
};

function resetting(event)
{
    let form = this.value.form;
    form.reset();
    //prevent regular reset, so we can decide the default values
    event.preventDefault();
};

function clearingError(event)
{
    let form = this.value.form;
    form.clearError(event.target.name);
    //dont prevent default, so we actually add the char we pressed
    //or select the option we selected
};

export default Vue.directive('form', {

    bind(el, binding)
    {
        //checking the required arguments
        let {form, submit} = binding.value;

        if(typeof form !== 'object' || !(form instanceof Form))
        {
            throw new Error('You need to pass the form argument which should be an instance of Form to the v-form directive');
        }

        if(typeof submit !== 'function')
        {
            throw new Error('You need to pass the success callback to the v-form directive');
        }

        //we'll bind "binding" to "this" in our callbacks,
        //or there would be no way to actually get the form object
        //in the scope of the callback
        //we need a named function to be able to remove the event listener
        el.addEventListener('submit', submitting.bind(binding));
        el.addEventListener('reset', resetting.bind(binding));
        el.addEventListener('change', clearingError.bind(binding));
        el.addEventListener('keypress', clearingError.bind(binding));
    },

    unbind(el)
    {
        //remove listeners to prevent memory leaks
        el.removeEventListener('submit', submitting);
        el.removeEventListener('reset', resetting);
        el.removeEventListener('change', clearingError);
        el.removeEventListener('keypress', clearingError);
    }

});