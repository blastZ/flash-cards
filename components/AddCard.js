import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Card, Button, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import { addNewDeck, addNewCard } from '../actions/app_action';

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
    showQuestionError: false,
    showAnswerError: false
  }

  handleQuestion = (text) => {
    this.setState({
      question: text
    })
  }

  handleAnswer = (text) => {
    this.setState({
      answer: text
    })
  }

  addCard = () => {
    if(this.state.question.trim() !== '') {
      this.setState({
        showQuestionError: false
      })
      if(this.state.answer.trim() !== '') {
        this.props.dispatch(addNewCard(this.props.navigation.state.params.deck.title, this.state.question, this.state.answer));
        Keyboard.dismiss();
        this.setState({
          showAnswerError: false,
          question: '',
          answer: ''
        })
      } else {
        this.setState({
          showAnswerError: true
        })
      }
    } else {
      this.setState({
        showQuestionError: true
      })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Card title={`Add Card To ${this.props.navigation.state.params.deck.title}`}>
          <FormInput
            placeholder="Input the question."
            value={this.state.question}
            onChangeText={this.handleQuestion} />
          <FormValidationMessage>
            {this.state.showQuestionError ? `The question can't be empty` : ''}
          </FormValidationMessage>
          <FormInput
            placeholder="Input the answer."
            value={this.state.answer}
            onChangeText={this.handleAnswer} />
          <FormValidationMessage>
            {this.state.showAnswerError ? `The answer can't be empty` : ''}
          </FormValidationMessage>
          <Button
            onPress={this.addCard}
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

const mapStateToProps = ({ appReducer }) => ({
  deckList: appReducer.deckList
})

export default connect(mapStateToProps)(AddCard);
