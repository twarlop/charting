<template>

	<div id="modal-full" class="uk-modal-full" uk-modal ref="modal">
		<div class="uk-modal-dialog">
			<button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
			<div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid uk-height-viewport>
				<div class="uk-padding-large uk-align-center">

					<form v-form="{form, submit}" v-if="node">

						<form-text v-model="form.name" name="name" placeholder="New name" ref="name" :focus="true"></form-text>

						<form-submit class="uk-width-1-1" :form="form"/>

					</form>

				</div>
			</div>
		</div>
	</div>

</template>

<script>

	import Vue from "vue";

	let instance;

    export default Vue.component('editor', {

        data()
        {
            return {
                form: new Form({
	                name: '',
                }),
	            //helper to avoid focussing issues
	            node: false,
	            creating: false
            }
        },

        methods: {

            modal()
            {
                return UIkit.modal('#modal-full');
            },

            start({node, creating = false})
            {
                this.creating = creating;
                this.node = node;
                this.form.name = node.data.text;
                this.modal().show();
            },

	        submit()
	        {
	            let url = '/diagrams/{id}';
	            this.form.submit(url.replace('{id}', 'someid'))
		            .then(({data}) => {
                        this.node.updated(data);
                        this.modal().hide();
		            })
		            .catch(() => {});
            }
        },

	    mounted()
	    {
            Event.$on('edit_node.start', this.start);

            $(this.$el).on('hide', () => {
                //if we were creating a node, but we just closed and didn't save
	            //we'll remove the node from the canvas again
                if(this.creating && !this.node.data.id)
                {
                    this.node.remove();
                }
                this.node = false;
            });
        },

	    destroyed()
	    {
	        Event.$off('edit_node.start', this.start);
	    }

    });

</script>