import Vue from "vue";

export default Vue.directive('focus', {

    inserted(el, binding)
    {
        /*
         ever have trouble with wrong element gaining focus?
         this is what the docs state:
         inserted: called when the bound element has been inserted into its parent node
         (this only guarantees parent node presence, not necessarily in-document).

         there might also be a problem with multiple v-focus elements
         */

        if(binding.value === undefined || binding.value)
        {
            //set a little timeout, to avoid issues when the element is invisible/hidden
            setTimeout(function(){
                el.focus();
            }, 10);
        }
    },

});