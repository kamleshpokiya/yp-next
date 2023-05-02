// packages
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// store
import rootReducer from './rootReducer';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['projects', 'teams', 'members', 'tasks', 'account', 'comments'],
    blacklist: ['actions'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;