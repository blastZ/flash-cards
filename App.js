import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import DeckDetail from './components/DeckDetail';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';

const CustomStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar
      translucent
      backgroundColor={backgroundColor}
      {...props} />
  </View>
)

const TabNavigation = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECKS',
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK'
    }
  }
})

const MainNavigation = StackNavigator({
  Home: {
    screen: TabNavigation,
    navigationOptions: {
      title: 'Flash Cards'
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2196F3'
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerTintColor: 'white'
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  }
})

export default class App extends React.Component {
  render() {
    const store = createStore(rootReducer);
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <CustomStatusBar
            backgroundColor="#fff"
            barStyle="light-content" />
          <MainNavigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
