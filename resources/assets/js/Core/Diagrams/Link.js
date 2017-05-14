import Abstract from "./Abstract";

export default class Link extends Abstract{

    constructor(svg, a, b)
    {
        super(svg, svg.insert('line', ':first-child'));
        this.a = a;
        this.b = b;

        this.graphic.attr('stroke', 'black')
            .attr('stroke-width', 2);

        this.updatePosition();

        a.connect(this);
        b.connect(this);
    }

    updatePosition()
    {
        this.graphic.attr('x1', this.a.getX())
            .attr('y1', this.a.getY())
            .attr('x2', this.b.getX())
            .attr('y2', this.b.getY());
    }

    other(element)
    {
        return this.a.uid !== element.uid ? this.a : this.b;
    }

}