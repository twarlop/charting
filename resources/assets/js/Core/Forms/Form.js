import Errors from "./Errors";

export default class Form {

    constructor(data){

        this._original = data;
        this._errors = new Errors();

        //start with 'corrected' status, as this represents a clean form
        //might need an upgrade in the future if we discover additional required behaviour
        this._status = 'corrected';

        Object.keys(data).forEach(field => this[field] = data[field]);
    }

    status()
    {
        return this._status;
    }

    data()
    {
        let data = {};

        this.fields().forEach(field => data[field] = this[field]);

        return data;
    }

    fields()
    {
        return Object.keys(this._original);
    }

    clearError(field)
    {
        this._errors.clear(field);

        if(!this._errors.any())
        {
            this._status = 'corrected';
        }
    }

    hasError(field)
    {
        return this._errors.has(field);
    }

    getError(field)
    {
        if(this._errors.has(field))
        {
            return this._errors.get(field);
        }
    }

    empty(field)
    {
        if(field){
            this[field] = this._original[field];
        }
        else{
            //make sure to reset the field to the original value
            //dont make it empty like jeffrey did in his example
            this.fields().forEach(field => this[field] = this._original[field]);
        }

        this._errors.clear(field);
    }

    reset()
    {
        this.empty();
        this._status = 'corrected';
    }

    submit(url)
    {
        if(this._status === 'submitting' || this._status === 'failed')
        {
            return new Promise((resolve, reject) => {});
        }

        this._status = 'submitting';

        return new Promise((resolve, reject) => {

            axios.post(url, this.data())
                .then((response) => {

                    this.onSuccess(response);

                    if(typeof resolve === "function")
                    {
                        resolve(response)
                    }
                })
                .catch(({request, response}) => {
                    this.onFail(request, response);

                    if(response && typeof reject === "function")
                    {
                        reject({
                            request,
                            response
                        });
                    }
                });
        });
    }

    onSuccess()
    {
        this.empty();
        this._status = 'submitted';
    }

    onFail(request, response)
    {
        this._status = 'failed';

        //sending the request already failed,
        //so we're just gonna throw an error here
        //this should be solve by the developer
        if(request)
        {
            throw new Error('sending form request failed');
        }

        if(response && response.status === 422)
        {
            this._errors.record(response.data);
        }
    }

}