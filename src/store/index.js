import app from './modules/app'
import menu from './modules/menu';
import user from './modules/user';

import { createStore } from 'vuex'

const store = createStore({
    modules: {
        app,
        menu,
        user,
    }
})

export default store;