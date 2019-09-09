import util from './util.js';
let doAjax = {
    register: function (bus) {
       bus.$on('OutStock', this.outStock);
    },

    outStock: function (row) {
        console.log('doajax_busOut', row);
    }

}

export default doAjax;