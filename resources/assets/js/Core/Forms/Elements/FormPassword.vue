<template>

	<div class="uk-margin">
		<input :class="{'uk-form-danger':form.hasError(name)}"
		       class="uk-input"
		       type="password"
		       :value="value"
		       @input="onUpdate($event.target.value)"
		       :name="name"
		       :placeholder="placeholder">
		<form-error :form="form" :name="name"></form-error>
	</div>

</template>

<script>

    import Vue from "vue";
    import Form from "./../Form";
    import FormError from "./../FormError.vue";
    import FormFinder from "./FormFinder";

    export default Vue.component('form-password', {

        components: [FormError],

        props: {
            value: {
                required: true
            },

            name: {
                required: true,
                type: String,
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

	    computed: {
            form: FormFinder,
	    }

    });

</script>