import { ADD_NEW_DECK, ADD_NEW_CARD } from '../actions/app_action';

const initState = {
  deckList: [
    {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
  ],
};

const appReducer = (state=initState, action) => {
  const { deck, title, question, answer } = action;
  switch (action.type) {
    case ADD_NEW_DECK: {
      return {
        ...state,
        deckList: state.deckList.concat([deck])
      }
    }
    case ADD_NEW_CARD: {
      return {
        ...state,
        deckList: state.deckList.reduce((accumulator, deck) => {
          if(deck.title === title) {
            return accumulator.concat([{
              title: deck.title,
              questions: deck.questions.concat([{question, answer}])
            }]);
          } else {
            return accumulator.concat([deck]);
          }
        }, [])
      }
    }
    default: return state;
  }
}

export default appReducer;
