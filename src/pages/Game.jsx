import React, { Component } from 'react';
import { func } from 'prop-types';
import Header from '../components/Header';
import { getTriviaQuestion } from '../services/api';

class Game extends Component {
  state = {
    questionId: 0,
    questions: [],
  };

  async componentDidMount() {
    const { history } = this.props;

    const token = localStorage.getItem('token');
    const data = await getTriviaQuestion(token);

    this.setState({ questions: data.results });

    const errNum = 3;
    if (data.results.length === 0 || data.response_code === errNum) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  randomize = (questionArray) => {
    if (questionArray.length > 0) {
      const num = 0.5;
      const randomizedQuestions = questionArray.sort(() => num - Math.random());
      return randomizedQuestions;
      // consultado sobre randomização de array em: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    }
  };

  render() {
    const { questions, questionId } = this.state;

    const question = questions[questionId];

    let correct = ''; // há somente uma resposta certa, que é uma string única, podendo ser booleano ou não
    let wrongs = []; // há mais de uma resposta errada, a api retorna um array de erradas, podendo ser booleano ou não

    if (question) {
      correct = question.correct_answer;
      wrongs = question.incorrect_answers;
    }

    const allAnswers = [...wrongs, correct];
    const randomizedAnswer = this.randomize(allAnswers);

    return (
      <>
        <Header />

        {
          question && (
            <>
              <h2 data-testid="question-category">{question.category}</h2>
              <p data-testid="question-text">{question.question}</p>
              <div data-testid="answer-options">
                {randomizedAnswer.map((answer, index) => (
                  <button
                    type="button"
                    key={ answer }
                    data-testid={
                      answer === correct
                        ? 'correct-answer'
                        : `wrong-answer-${index}`
                    }
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
