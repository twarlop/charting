export default function () {
    let parent = this.$parent;
    let form = false;

    while (parent && !form) {
        if (parent.form) {
            form = parent.form;
        }
        else if (parent.$parent) {
            parent = parent.$parent;
        }
    }

    return form ? form : new Form();
}