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
    import * as d3 from "d3";
    import data from "./data";

    import Rectangle from "./../../Core/Diagrams/Rectangle";
    import Link from "./../../Core/Diagrams/Link";

    import {position} from "./../../Core/Diagrams/utils";

    export default Vue.component('diagram-drawing', {

        data()
        {
            return {
	            element: null,
	            svg: null,

	            cursor: '',

	            diagram: [
		            {

		            }
	            ],
            }
        },

	    beforeDestroy()
	    {
	        //still need to unbind all events, to avoid memory leaks
		    window.removeEventListener('keydown', this.bindCursors);
		    window.removeEventListener('keyUp', this.unbindCursors);
	    },

	    methods:
	    {
	        bindCursors(event)
	        {
                switch(event.key)
                {
	                case 'Alt':
	                    this.cursor = 'deleting';
	                    break;
	                case 'Control':
	                    break;
	                case 'Meta':
	                    this.cursor = 'moving';
	                    break;
	                case 'Shift':
                        this.cursor = 'connecting';
	                    break;
                }
            },

		    unbindCursors()
		    {
			    this.cursor = '';
		    }
	    },

	    mounted()
	    {
	        window.addEventListener('keydown', this.bindCursors);
	        window.addEventListener('keyup', this.unbindCursors);


	        //need the mounting phase, or we might not have an element yet
	        this.element = d3.select('#drawing');

            let dimensions = this.element.node().getBoundingClientRect();

            //add the main svg.
            this.svg = this.element.append('svg')
		        .attr('width', dimensions.width)
		        .attr('height', dimensions.height);

            this.element.on('click', () => {
                new Rectangle(this.svg);
                d3.event.stopPropagation();
            });

            let a = new Rectangle(this.svg, {
                text: 'hellow my friend',
	            coords: {x: 100, y: 100}
            });

            let b = new Rectangle(this.svg, {
                text: 'good to see you again my friend',
	            coords: {x: 400, y: 400}
            });

            new Link(this.svg, a, b);
        }

    });

</script>