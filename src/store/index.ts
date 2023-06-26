// packages
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// store
import rootReducer from './rootReducer';


// presist config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['projects', 'teams', 'members', 'tasks', 'account', 'comments'],
    blacklist: ['actions'],
};

// presisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;