<script>

	import Vue from "vue";

    export default Vue.component('form-error', {

        template: `<span class="uk-text-danger" v-if="show">{{ message }}</span>`,

	    props: {
            form: {required: true},
		    name: {required: true}
        },

	    computed:{

            show()
            {
                return this.form.hasError(this.name);
            },

		    message()
		    {
		        return this.form.getError(this.name);
		    }
	    }
    });

</script>