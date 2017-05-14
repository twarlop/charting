import * as d3 from "d3";

function position(to = false) {

    if(!to)
    {
        to = d3.select('#drawing');
    }

    let mouse = d3.mouse(to instanceof d3.selection ? to.node() : to);

    return {
        x: mouse[0],
        y: mouse[1]
    }
}

let counter = 0;

function id()
{
    counter++;

    return counter;
}

function intention(mouseEvent = d3.event.sourceEvent)
{
    //need to use the source event, not the event itself
    //the event is the drag event, but we want to know what's happening with the mouse

    if(mouseEvent.altKey)
    {
        return 'deleting';
    }

    if(mouseEvent.metaKey)
    {
        return 'moving';
    }

    if(mouseEvent.shiftKey)
    {
        return 'connecting';
    }

    return 'activating';
}


export {position, id, intention}