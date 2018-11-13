import { applyMiddleware, compose, createStore } from 'redux';
import {
  syncTranslationWithStore,
  setLocale,
  loadTranslations,
} from 'react-redux-i18n';
import thunk from 'redux-thunk';

import Reducers from './reducers';
import translations from '../dictionary';
import { loadState } from '../utils/asyncStorageUtils';
import { asyncStorageMiddleware } from '../middleware/asyncStorageMiddleware';

const getStore = async () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middleware = applyMiddleware(thunk, asyncStorageMiddleware);
  const composer = composeEnhancers(middleware);
  const persistedStore = await loadState();
  const store = createStore(Reducers, persistedStore, composer);

  syncTranslationWithStore(store);
  store.dispatch(loadTranslations(translations));
  store.dispatch(setLocale('en'));

  return store;
};

export default getStore;
