import React, { Component } from 'react';
import { func } from 'prop-types';
import Header from '../components/Header';
import { getTriviaQuestion } from '../services/api';
import '../styles/button.css';

class Game extends Component {
  state = {
    questionId: 0,
    questions: [],
    answered: '',
    rightAnswer: '',
    randomizedAnswer: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const { questionId, rightAnswer } = this.state;

    const token = localStorage.getItem('token');
    const data = await getTriviaQuestion(token);

    const question = data.results[questionId];

    let correct = ''; // há somente uma resposta certa, que é uma string única, podendo ser booleano ou não
    let wrongs = []; // há mais de uma resposta errada, a api retorna um array de erradas, podendo ser booleano ou não

    if (question) {
      correct = question.correct_answer;
      wrongs = question.incorrect_answers;
    }
    const allAnswers = [correct, ...wrongs];
    const randomizedQuestions = this.randomize(allAnswers);

    this.setState({
      questions: data.results,
      randomizedAnswer: randomizedQuestions,
      rightAnswer: correct });

    console.log(rightAnswer);

    const errNum = 3;
    if (data.results.length === 0 || data.response_code === errNum) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  randomize = (questionArray) => {
    console.log(questionArray);
    if (questionArray.length > 0) {
      const num = 0.5;
      const randomizedQuestions = questionArray.sort(() => num - Math.random());
      return randomizedQuestions;
      // consultado sobre randomização de array em: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    }
  };

  changeButtonColor = (answer) => {
    const { answered, rightAnswer } = this.state;
    if (answered) {
      return answer === rightAnswer ? 'correct' : 'incorrect';
    }
    return '';
  };

  handleClick = () => {
    this.setState({ answered: true });
  };

  render() {
    const { randomizedAnswer, questions, questionId, rightAnswer } = this.state;

    const question = questions[questionId];

    return (
      <>
        <Header />

        {
          question && (
            <>
              <h2 data-testid="question-category">{question.category}</h2>
              <p data-testid="question-text">{question.question}</p>
              <div
                data-testid="answer-options"
              >
                {randomizedAnswer.map((answer, index) => (
                  <button
                    type="button"
                    key={ answer }
                    className={ this.changeButtonColor(answer) }
                    data-testid={
                      answer === rightAnswer
                        ? 'correct-answer'
                        : `wrong-answer-${index}`
                    }
                    onClick={ this.handleClick }
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </>
          )
        }
      </>
    );
  }
}

Game.propTypes = {
  history: func,
}.isRequired;

export default Game;
