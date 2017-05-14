import * as d3 from "d3";
import Rectangle from "./../../Core/Diagrams/Rectangle";
import Link from "./../../Core/Diagrams/Link";

export default {

    data()
    {
        return {
            element: null,
            svg: null,
        }
    },

    mounted()
    {
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

}