import { GET_DECK_LIST } from '../actions/app_action';
import { AsyncStorage } from 'react-native';

const appMiddleware = store => next => action => {
  if(action.type === GET_DECK_LIST) {
    AsyncStorage.getItem('DECK_LIST', (error, result) => {
      if(result === null) {
        AsyncStorage.setItem('DECK_LIST', JSON.stringify([]));
        next({
          type: GET_DECK_LIST,
          deckList: []
        })
      } else {
        next({
          type: GET_DECK_LIST,
          deckList: JSON.parse(result)
        })
      }
    })
  } else {
    next(action);
  }
}

export default appMiddleware;
