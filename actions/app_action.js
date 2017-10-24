export const ADD_NEW_DECK = 'ADD_NEW_DECK';
export const ADD_NEW_CARD = 'ADD_NEW_CARD';

export const addNewDeck = (title) => ({
  type: ADD_NEW_DECK,
  deck: {
    title,
    questions: []
  }
})

export const addNewCard = (title, question, answer) => ({
  type: ADD_NEW_CARD,
  title,
  question,
  answer
})
