import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Card, Button, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import { addNewDeck } from '../actions/app_action';

class NewDeck extends Component {
  state = {
    title: '',
    showErrorMessage: false
  }

  handleTitle = (text) => {
    this.setState({
      title: text
    })
  }

  addDeck = () => {
    if(this.state.title.trim() !== '') {
      this.props.dispatch(addNewDeck(this.state.title.trim()));
      this.props.navigation.navigate('DeckDetail', {
        deck: {
          title: this.state.title.trim(),
          questions: []
        }
      });
      this.setState({
        title: '',
        showErrorMessage: false
      })
      Keyboard.dismiss();
    } else {
      this.setState({
        showErrorMessage: true
      })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Card title="What is the title of your new deck?">
          <FormInput
            value={this.state.title}
            onChangeText={this.handleTitle} />
          <FormValidationMessage>
            {this.state.showErrorMessage ? `The title can't be empty` : ''}
          </FormValidationMessage>
          <Button
            onPress={this.addDeck}
            title="Submit"
            backgroundColor="#fdd835"/>
        </Card>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})

export default connect()(NewDeck);
