let elements = {};
let active = false;

class Container{

    add(element)
    {
        elements[element.uid] = element;
    }

    remove(element)
    {
        delete elements[element.uid];

        if(active && active.uid === element.uid)
        {
            active = false;
        }
    }

    active()
    {
        return active;
    }

    activate(element)
    {
        //if we are trying to activate the same element
        //we'll deactivate instead
        if(active && element.uid === active.uid)
        {
            active.graphic.classed('active', false);
            active = false;
        }

        else{
            if(active)
            {
                active.graphic.classed('active', false);
            }
            active = element;
            active.graphic.classed('active', true);
        }
    }
}

export default new Container();