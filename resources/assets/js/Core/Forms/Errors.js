import Vue from "vue";

export default class Errors{

    constructor()
    {
        this.messages = {}
    }

    any()
    {
        return Object.keys(this.messages).length > 0;
    }

    has(field)
    {
        return this.messages.hasOwnProperty(field);
    }

    get(field)
    {
        if(this.has(field))
        {
            let value = this.messages[field];

            return typeof value === 'object' ? value[0] : value;
        }
    }

    record(messages)
    {
        Object.keys(messages).forEach(field => Vue.set(this.messages, field, messages[field]));
    }

    clear(field)
    {
        if(field)
        {
            Vue.delete(this.messages, field);
        }
        else{
            this.messages = {}
        }
    }

}