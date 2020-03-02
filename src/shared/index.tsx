import { combineReducers } from 'redux';
import initialDataReducer from './redux/reducers/initialData';
import loggedInReducer from './redux/reducers/loggedIn';

const allReducers = combineReducers({
    initialDataReducer: initialDataReducer,
    loggedInReducer: loggedInReducer
})

export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as ProtectedRoute } from './route/ProtectedRoute';
export { InitialDataModel } from './models/dataModel';

export { setFullState, setLC } from './redux/actions/initialDataActions';
export { performLogin, performLogout } from './redux/actions/loggedInActions'
export default allReducers;