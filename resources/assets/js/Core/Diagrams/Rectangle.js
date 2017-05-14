import * as d3 from "d3";
import {position, intention} from "./utils";
import Abstract from "./Abstract";
import Link from "./Link";

const PADDING = 20;

const defaults = {
    coords : false,
};

export default class Rectangle extends Abstract{

    constructor(svg, config)
    {
        super(svg, svg.append('g'));

        this.graphic.classed('entity', true);

        let {text, coords} = Object.assign({text: this.uid}, defaults, config);
        this.connections = {};

        //drawing basics
        let rectNode = this.graphic.append('rect')

        let textNode = this.graphic.append('text')
            .text(text)
            .attr('dy', '.35em');

        this.setCalculatedAttributes(textNode, rectNode);

        if(coords)
        {
            this.graphic.attr('transform', `translate(${coords.x}, ${coords.y})`);
        }
        else{
            this.graphic.attr('transform', this.updatePosition.bind(this));
        }

        this.setLinkAndActive();

        this.addListeners();

        this.data = {
            text: text,
        }
    }

    setLinkAndActive()
    {
        let event = d3.event;

        //on user interaction, we always want to set the link
        //unless we hold the ALT key
        if(event && !event.altKey && this.container.active())
        {
            new Link(this.svg, this, this.container.active());
        }

        //when not a user interaction, we want to always set the last rendered element as the active one
        //or has user interaction we'll change the active if we press any of the special keys
        if(!event || event.metaKey || event.shiftKey || event.ctrlKey || event.altKey)
        {
            this.container.activate(this);
        }
    }

    setCalculatedAttributes(textNode, rectNode){
        let textDimensions = textNode.node().getBoundingClientRect();

        textNode
            .attr('x', PADDING)
            .attr('y', (textDimensions.height + (PADDING * 2)) / 2);

        rectNode.attr('width', textDimensions.width + (PADDING * 2))
            .attr('height', textDimensions.height + (PADDING * 2))
    }

    updatePosition(){

        let absolute;

        if(d3.event.type === 'drag')
        {
            absolute = this.graphic.node().getBoundingClientRect();
            let offset = d3.select('#drawing').node().getBoundingClientRect();

            absolute.x = (absolute.left - offset.left) + d3.event.dx;
            absolute.y = (absolute.top - offset.top) + d3.event.dy;
        }
        else{
            absolute = position();
            let dimensions = this.graphic.node().getBoundingClientRect();
            absolute.x -= (dimensions.width / 2);
            absolute.y -= (dimensions.height / 2);
        }

        return `translate(${absolute.x}, ${absolute.y})`
    }

    addListeners()
    {
        //our click event is manually fired, not using dom events
        //because the behaviour of the dragging, makes the UI feel a bit
        //unresponsive if we use the native event. It wouldn't always fire when
        //when you clicked really fast.
        //on the other hand, if we bind a drag behaviour, it ALWAYS fires, even when
        //we do a precise click (so making sure we didn't move the mouse between up and down event)
        this.enableDragging();

        //we do however need to stop the event from propagating, or we'll trigger a click in the canvas
        //which would add a new node on top of the clicked one.
        this.graphic.on('click', () => {
            d3.event.stopPropagation();
        });
    }

    updated(data)
    {
        this.data.text = data.name;
        this.graphic.select('text').text(data.name);
        this.setCalculatedAttributes(this.graphic.select('text'), this.graphic.select('rect'));
        Object.keys(this.connections).forEach((uid) => {
            this.connections[uid].updatePosition();
        });
    }

    clickEvent()
    {
        //we'll use a timeout to allow clicks and double clicks
        if(this.clickTimer)
        {
            clearTimeout(this.clickTimer);
            this.clickTimer = false;
            this.doubleClick();
        }
        else{
            //need to get the event now,
            //it wouldn't be available
            //when delay has passed
            let event = d3.event;

            this.clickTimer = setTimeout(() => {
                this.clickTimer = false;
                this.singleClick(event);
            }, 200);
        }
    }

    doubleClick()
    {
        Event.$emit('edit_node.start', this);
    }

    singleClick(event)
    {
        switch(intention(event))
        {
            case 'deleting':
                this.remove();
                break;
            case 'activating':
                this.container.activate(this);
                break;
            case 'connecting':
                let active = this.container.active();

                if(active)
                {
                    !this.connected(active) ? new Link(this.svg, this, active) : this.disconnect(active.uid);
                }

                break;
        }
    }

    withinTolerance()
    {
        let currentPosition = position();
        let dx = Math.abs(currentPosition.x - this.draggingPosition.x);
        let dy = Math.abs(currentPosition.y - this.draggingPosition.y);

        return dx <= 10 && dy <= 10;
    }

    enableDragging()
    {
        //we'll delay dragging, so the UI feels more smooth
        //if we don't do this, we'd trigger drag when we in fact want to click
        let drag = d3.drag();

        drag.on('start', () => {
            this.draggingPosition = position();
            this.isDragging = false;
        });

        drag.on('drag', () => {

            if(intention() === 'moving' && !this.withinTolerance())
            {
                //set the isDragging to true, so we avoid firing a click instead
                this.isDragging = true;

                this.graphic.attr('transform', this.updatePosition.bind(this));

                Object.keys(this.connections).forEach((uid) => {
                    this.connections[uid].updatePosition();
                });
            }
        });

        drag.on('end', () => {

            //if not dragging and still within our tolerance zone
            //only then should we fire the click event
            if(!this.isDragging && this.withinTolerance())
            {
                this.clickEvent();
            }

            this.isDragging = false;
            this.draggingPosition = false;
        });

        //implement draggable behaviour
        this.graphic.call(drag);
    }

    remove()
    {
        Object.keys(this.connections).forEach((connected) => {
            this.disconnect(connected);
        });

        super.remove();
    }

    connect(link)
    {
        let other = link.other(this);

        this.connections[other.uid] = link;
    }

    disconnect(uid)
    {
        this.connections[uid].remove();
        delete this.connections[uid];
    }

    connected(other)
    {
        return !!this.connections[other.uid];
    }

}