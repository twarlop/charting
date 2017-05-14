<template>

	<div class="uk-margin">

		<label>
			<input :class="{'uk-form-danger':form.hasError(name)}"
			       class="uk-checkbox"
			       type="checkbox"
			       @change="onUpdate($event.target.name)"
			       :checked="value"
			       :name="name"
			>

			{{ label }}
		</label>

		<div v-if="form.hasError(name)">
			<form-error :form="form" :name="name"></form-error>
		</div>
	</div>

</template>

<script>

    import Vue from "vue";
    import Form from "./../Form";
    import FormError from "./../FormError.vue";
    import FormFinder from "./FormFinder.js";

    export default Vue.component('form-check', {

        components: [FormError],

        props: {
            value: {
                required: true
            },

            name: {
                required: true,
                type: String,
            },

            label: {
                required: false
            },
        },

        methods: {
            onUpdate(value)
            {
                this.$emit('input', !this.value);
            },
            test()
            {
                console.log('test');

            }
        },

        computed:{
            form: FormFinder
        }

    });

</script>