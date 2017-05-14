<template>

	<button :class="buttonState" class="uk-button uk-button-large">
		<span v-if="form.status() === 'submitted'" uk-icon="icon: check"></span>

		<span v-if="form.status() === 'failed'" uk-icon="icon: warning"></span>

		<!--using a double span, because there would be issues with the spinner
		not being removed, probably due to how UIkit works-->
		<span v-if="form.status() === 'submitting'">
			<span uk-spinner></span>
		</span>

		{{ message }}
	</button>

</template>

<script>

    import Vue from "vue";

    export default Vue.component('form-submit', {

        props: {
            form: {
                required: true,
            }
        },

        computed: {

            buttonState()
            {
                return this.form.status() === 'failed' ? 'uk-button-danger' : 'uk-button-primary';
            },

	        message()
	        {
	            let status = this.form.status();

	            if(status === 'failed')
	            {
	                return 'Whoops';
	            }

	            if(status === 'submitting')
	            {
	                return 'submitting';
	            }

	            if(status === 'submitted')
	            {
	                return 'Saved';
	            }

	            return 'Submit';
	        }

        },

    });

</script>