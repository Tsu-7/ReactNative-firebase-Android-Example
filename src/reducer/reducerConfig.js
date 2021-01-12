import { combineReducers, createStore } from "redux";
import AuthReducer from './reducers/AuthReducer';


const rootReducers = combineReducers({
    AuthReducer
})


const store = createStore(rootReducers);


export default store ;


