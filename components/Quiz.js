import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import { red, yellow, green } from '../utils/color';
import { clearLocalNotification, setLocalNotification } from '../utils/notification';

class Quiz extends Component {
  state = {
    showAnswer: false,
    showResult: false,
    currentIndex: 0,
    correct: 0,
  }

  clickCorrect = () => {
    if(this.state.currentIndex < this.props.deckList[this.props.navigation.state.params.index].questions.length - 1) {
      this.setState({
        correct: this.state.correct + 1,
        currentIndex: this.state.currentIndex + 1
      })
    } else {
      this.setState({
        correct: this.state.correct + 1
      }, () => {
        this.setState({
          showResult: true
        })
      })
    }
  }

  clickIncorrect = () => {
    if(this.state.currentIndex < this.props.deckList[this.props.navigation.state.params.index].questions.length - 1) {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      })
    } else {
      this.setState({
        showResult: true
      })
    }
  }

  clickRestart = () => {
    this.setState({
      showAnswer: false,
      showResult: false,
      currentIndex: 0,
      correct: 0,
    })
  }

  clickExit = () => {
    this.props.navigation.goBack();
  }

  shouldShowAnswer = () => {
    this.setState({
      showAnswer: !this.state.showAnswer
    })
  }

  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification)
  }

  render() {
    const { index } = this.props.navigation.state.params;
    const questions = this.props.deckList[index].questions;
    return (
      <View style={styles.container}>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{`${this.state.currentIndex + 1}/${questions.length}`}</Text>
        </View>
        <View style={{paddingLeft: 20, paddingRight: 20, alignItems: 'center'}}>
          <Text style={{fontSize: 40, alignItems: 'center', textAlign: 'center'}}>{
            this.state.showResult
            ? `Score: ${this.state.correct}/${questions.length}`
            : this.state.showAnswer
              ? questions[this.state.currentIndex].answer
              : questions[this.state.currentIndex].question
          }</Text>
          {!this.state.showResult &&
          <Button
            onPress={this.shouldShowAnswer}
            backgroundColor='transparent'
            color={red}
            title={`${this.state.showAnswer ? 'Question' : 'Answer'}`} />}
        </View>
        {!this.state.showResult
          ? <View style={{marginBottom: 50}}>
            <View>
              <Button
                backgroundColor={green}
                onPress={this.clickCorrect}
                title="Correct" />
            </View>
            <View style={{marginTop: 10}}>
              <Button
                backgroundColor={red}
                onPress={this.clickIncorrect}
                title="Incorrect" />
            </View>
          </View>
          : <View style={{marginBottom: 50}}>
            <View>
              <Button
                backgroundColor={green}
                onPress={this.clickRestart}
                title="Restart" />
            </View>
            <View style={{marginTop: 10}}>
              <Button
                backgroundColor={red}
                onPress={this.clickExit}
                title="Exit" />
            </View>
          </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
})

const mapStateToProps = ({ appReducer }) => ({
  deckList: appReducer.deckList
})

export default connect(mapStateToProps)(Quiz);
