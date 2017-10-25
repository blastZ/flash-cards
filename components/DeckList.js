import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import { getDeckList } from '../actions/app_action';

class DeckList extends Component {
  componentWillMount() {
    this.props.dispatch(getDeckList());
  }
  render() {
    return (
      this.props.deckList.length > 0
      ? <View>
        {this.props.deckList.map((deck, index) => (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DeckDetail', { deck, index })}
            key={deck.title + index}>
            <Card
              title={deck.title}>
              <Text style={{alignSelf: 'center'}}>{`${deck.questions.length} cards`}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
      : <View>
        <Card title={'Create a deck to start'} />
      </View>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  deckList: appReducer.deckList
})

export default connect(mapStateToProps)(DeckList);
