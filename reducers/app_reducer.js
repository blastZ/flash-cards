import { ADD_NEW_DECK, ADD_NEW_CARD, GET_DECK_LIST } from '../actions/app_action';
import { AsyncStorage } from 'react-native';

const initState = {
  deckList: [],
};

const appReducer = (state=initState, action) => {
  const { deck, title, question, answer, deckList } = action;
  switch (action.type) {
    case ADD_NEW_DECK: {
      const newDeckList = state.deckList.concat([deck]);
      AsyncStorage.setItem('DECK_LIST', JSON.stringify(newDeckList));
      return {
        ...state,
        deckList: newDeckList
      }
    }
    case ADD_NEW_CARD: {
      const newDeckList = state.deckList.reduce((accumulator, deck) => {
        if(deck.title === title) {
          return accumulator.concat([{
            title: deck.title,
            questions: deck.questions.concat([{question, answer}])
          }]);
        } else {
          return accumulator.concat([deck]);
        }
      }, []);
      AsyncStorage.setItem('DECK_LIST', JSON.stringify(newDeckList));
      return {
        ...state,
        deckList: newDeckList
      }
    }
    case GET_DECK_LIST: {
      return {
        ...state,
        deckList
      }
    }
    default: return state;
  }
}

export default appReducer;
