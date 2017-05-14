<style>

	#drawing
	{
		height: calc(100vh - 80px);
	}

	#drawing .entity.active rect{
		fill: #54bcff;
		stroke: #4b9dd7;
	}

	#drawing .entity rect{
		fill: #e6e6e6;
		stroke: #d7d7d7;
	}

	.deleting .entity rect, .deleting .entity text{
		cursor: not-allowed;
	}

	.moving .entity rect, .moving .entity text{
		cursor: move;
	}

	.connecting .entity rect, .connecting .entity text{
		cursor: crosshair;
	}

	svg text{
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Safari */
		-khtml-user-select: none; /* Konqueror HTML */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently */
	}


</style>

<template>

	<div id="drawing" :class="cursor"></div>

</template>


<script>

    import Vue from "vue";

    import cursors from "./cursors";
    import boot from "./boot";

    export default Vue.component('diagram-drawing', {

        mixins: [cursors, boot],

    });

</script>