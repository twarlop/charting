export default [

    //the global task to perform, will probably always be
    //the first node in our diagram
    {
        type: 'task',
    },

    //a question to help decide which actions we need to perform
    {
        type: 'question',
    },


    {
        type: 'answer'
    },

    {
        type: 'action'
    },

    //result will probably always be the last
    {
        type: 'result',
    }

];