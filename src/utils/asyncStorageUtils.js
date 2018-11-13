import { AsyncStorage } from 'react-native';

export const loadState = async () => {
  try {
    const serializedState = await AsyncStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log('error after loadState', err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    console.log('serializedState: ', serializedState);
    AsyncStorage.setItem('state', serializedState);
  } catch (err) {
    console.log('error during saveState', err);
  }
};