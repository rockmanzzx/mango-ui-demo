import app from './modules/app'
import { createStore } from 'vuex'

const store = createStore({
    modules: {
        app
    }
})

export default store;