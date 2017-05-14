<template>

	<div class="uk-margin">
		<select :class="{'uk-form-danger':form.hasError(name)}"
		          class="uk-select"
		          type="password"
		          :value="value"
		          @input="onUpdate($event.target.value)"
		          :name="name"
		          :placeholder="placeholder">

			<option v-if="!renderComplex" v-for="(option, key) in options" v-bind:value="key">
				{{ option }}
			</option>

			<option v-if="renderComplex" v-for="option in options" v-bind:value="option.value">
				{{ option.label }}
			</option>

		</select>
		<form-error :form="form" :name="name"></form-error>
	</div>

</template>

<script>

    import Vue from "vue";
    import Form from "./../Form";
    import FormError from "./../FormError.vue";
    import FormFinder from "./FormFinder";

    export default Vue.component('form-select', {

        components: [FormError],

        props: {
            value: {
                required: true
            },

            name: {
                required: true,
                type: String,
            },

            //this might be expanded to handle a callback function to preload the possible options of a select.
            options:{
                required: true
            },

            placeholder: {
                required: false
            },
        },

        methods: {
            onUpdate(value)
            {
                this.$emit('input', value);
            }
        },

	    computed:{
            //we'll let the first option decide wheither or not we want to render in a complex way or not
		    //if we're rendering in a complex way, we expect the options to objects
		    //that have both the label and the value as a property
            renderComplex(){
                let option = this.options[0];

                if(typeof option !== 'object' || !option.hasOwnProperty('label') || !option.hasOwnProperty('value'))
                {
                    return false;
                }

                return true;
            },

		    form: FormFinder
	    }

    });

</script>