'use client';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
    configureStore,
    combineReducers,
    Reducer,
    Action,
} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import authReducer, { AuthState } from '@/lib/slices/auth.slice';
import testReducer, { TestState } from '@/lib/slices/test.slice';
import nationalTestCretorReducer, {
    NationalTestCreatorState,
} from '@/lib/slices/national-test-creator.slice';
import toeicTestCreatorReducer, {
    ToeicTestCreatorState,
} from '@/lib/slices/toeic-test-creator.slice';
import { appApi } from '@/services/config.service';

const createNoopStorage = () => {
    return {
        getItem(): Promise<null> {
            return Promise.resolve(null);
        },
        setItem(value: string): Promise<string> {
            return Promise.resolve(value);
        },
        removeItem(): Promise<void> {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== 'undefined'
        ? createWebStorage('local')
        : createNoopStorage();

export type RootState = {
    [appApi.reducerPath]: ReturnType<typeof appApi.reducer>;
    auth: AuthState;
    test: TestState;
    nationalTestCreator: NationalTestCreatorState;
    toeicTestCreator: ToeicTestCreatorState;
};

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['test', 'nationalTestCreator', 'toeicTestCreator'],
    blacklist: ['auth'],
};

const appReducer = combineReducers({
    [appApi.reducerPath]: appApi.reducer,
    auth: authReducer,
    test: testReducer,
    nationalTestCreator: nationalTestCretorReducer,
    toeicTestCreator: toeicTestCreatorReducer,
});

const rootReducer: Reducer<RootState, Action> = (state, action) => {
    if (action.type === 'auth/setSignOut') {
        state = undefined;
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(appApi.middleware),
    devTools: true,
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
