import {id} from "./utils";
import container from "./Container";

export default class Abstract{

    constructor(svg, graphic)
    {
        this.uid = id();
        this.svg = svg;
        this.graphic = graphic;
        this.container = container;
        container.add(this);
    }

    remove()
    {
        this.graphic.node().remove();
        container.remove(this);
    }

    getX()
    {
        let rectDimensions = this.graphic.node().getBoundingClientRect();
        let mainDimensions = this.svg.node().getBoundingClientRect();

        return rectDimensions.left + (rectDimensions.width / 2) - mainDimensions.left;
    }

    getY()
    {
        let rectDimensions = this.graphic.node().getBoundingClientRect();
        let mainDimensions = this.svg.node().getBoundingClientRect();

        return rectDimensions.top + (rectDimensions.height / 2) - mainDimensions.top;
    }

}