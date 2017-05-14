<template>

	<ul class="uk-navbar-nav">
		<li v-if="authenticated">
			<a href="#">{{ user.name }}</a>
			<div class="uk-navbar-dropdown">
				<ul class="uk-nav uk-navbar-dropdown-nav">
					<li>
						<a href=# @click.prevent="logout">Logout</a>
					</li>
				</ul>
			</div>
		</li>

		<li v-if="!authenticated">
			<router-link to="/login">Login</router-link>
		</li>
		<li v-if="!authenticated">
			<router-link to="/register">Register</router-link>
		</li>

	</ul>

</template>


<script>

    import Vue from "vue";

    export default Vue.component('navigation-auth', {

        methods: {
            logout()
            {
                axios.post('/logout')
	                .then(() => {
		                this.$router.push({name: 'login'})
	                })
	                .catch(() => {
                        window.location.reload();
	                })
            }
        },

        computed: {

            authenticated()
            {
                return this.user.id;
            },

	        user()
	        {
                return this.$store.getters['auth/user'];
	        }
        }

    });

</script>