import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import { red, yellow } from '../utils/color';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deck.title
  })
  render() {
    const { deck, index } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Card containerStyle={{flex: 1}}>
          <View style={{alignItems: 'center', marginTop: 40}}>
            <Text style={{fontSize: 40}}>{deck.title}</Text>
            <Text style={{fontSize: 20, color: '#aaa'}}>{`${this.props.deckList[index].questions.length} cards`}</Text>
          </View>
          <View style={{marginTop: 160}}>
            <View>
              <Button
                onPress={() => this.props.navigation.navigate(
                  'AddCard',
                  {
                    deck
                  }
                )}
                backgroundColor={yellow}
                title='Add Card' />
            </View>
            <View style={{marginTop: 10}}>
              <Button
                onPress={() => this.props.navigation.navigate(
                  'Quiz',
                  {
                    index
                  }
                )}
                backgroundColor={yellow}
                title='Start Quiz'/>
            </View>
          </View>
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10
  }
})

const mapStateToProps = ({ appReducer }) => ({
  deckList: appReducer.deckList
})

export default connect(mapStateToProps)(DeckDetail);
