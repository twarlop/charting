export default{

    data()
    {
        return {
            cursor: '',
        }
    },

    methods: {
        bindCursors(event)
        {
            switch (event.key) {
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

    beforeDestroy()
    {
        //still need to unbind all events, to avoid memory leaks
        window.removeEventListener('keydown', this.bindCursors);
        window.removeEventListener('keyUp', this.unbindCursors);
    },

    mounted()
    {
        window.addEventListener('keydown', this.bindCursors);
        window.addEventListener('keyup', this.unbindCursors);
    }

}