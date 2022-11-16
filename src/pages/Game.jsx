import { connect } from 'react-redux';
import React, { Component } from 'react';
import { func } from 'prop-types';
import Header from '../components/Header';
import { getTriviaQuestion } from '../services/api';
import '../styles/button.css';
import { addAssertion, addScorePoints } from '../redux/actions';
import '../styles/Game.css';

class Game extends Component {
  state = {
    questionId: 0,
    questions: [],
    rightAnswer: '',
    randomizedAnswer: [],
    timer: 30,
    disabled: false,
    answered: false,
  };

  async componentDidMount() {
    this.timerCountdown();
    this.callTokenApi();
  }

  componentDidUpdate() {
    this.timerCountdown();
  }

  callTokenApi = async () => {
    const { history } = this.props;
    const { questionId } = this.state;

    const token = localStorage.getItem('token');
    const data = await getTriviaQuestion(token);

    const repairedQuotes = data.results.map((item) => {
      const entities = {
        '&#039;': '\'', '&quot;': '"',
      };

      item.question = item.question.replaceAll(/&#?\w+;/g, (match) => entities[match]);
      item.correct_answer = item.correct_answer.replaceAll(/&#?\w+;/g, (match) => entities[match]);

      item.incorrect_answers = item.incorrect_answers
        .map((answer) => answer.replaceAll(/&#?\w+;/g, (match) => entities[match]));

      return item;
    });

    const errNum = 3;
    if (data.response_code === errNum) {
      localStorage.removeItem('token');
      return history.push('/');
    }

    const question = repairedQuotes[questionId];

    // let correct = ''; // há somente uma resposta certa, que é uma string única, podendo ser booleano ou não
    // let wrongs = []; // há mais de uma resposta errada, a api retorna um array de erradas, podendo ser booleano ou não

    const correct = question.correct_answer;
    const wrongs = question.incorrect_answers;
    const allAnswers = [correct, ...wrongs];
    const randomizedQuestions = this.randomize(allAnswers);

    this.setState({
      questions: repairedQuotes,
      randomizedAnswer: randomizedQuestions,
      rightAnswer: correct });
  };

  randomize = (questionArray) => {
    const num = 0.5;
    const randomizedQuestions = questionArray.sort(() => num - Math.random());
    return randomizedQuestions;
    // consultado sobre randomização de array em: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
  };

  changeButtonColor = (answer) => {
    const { answered, rightAnswer } = this.state;
    if (answered) {
      return answer === rightAnswer ? 'correct' : 'incorrect';
    }
    return '';
  };

  handleClick = (event) => {
    const { value } = event.target;

    this.setState({ answered: true, disabled: true });

    const { questionId, questions, timer, rightAnswer } = this.state;
    const { dispatch, assertions, score } = this.props;
    let increaseScore = score;
    let increaseAssertion = assertions;
    const mediumPt = 2;
    const hardPt = 3;
    const multiplier = 10;
    const lvl = questions[questionId].difficulty;

    if (lvl === 'easy' && value === rightAnswer) {
      increaseScore += multiplier + timer;
      increaseAssertion += 1;
      dispatch(addScorePoints(increaseScore));
      dispatch(addAssertion(increaseAssertion));
    } else if (lvl === 'medium' && value === rightAnswer) {
      increaseScore += multiplier + (timer * mediumPt);
      increaseAssertion += 1;
      dispatch(addScorePoints(increaseScore));
      dispatch(addAssertion(increaseAssertion));
    } else if (lvl === 'hard' && value === rightAnswer) {
      increaseScore += multiplier + (timer * hardPt);
      increaseAssertion += 1;
      dispatch(addScorePoints(increaseScore));
      dispatch(addAssertion(increaseAssertion));
    } else {
      dispatch(addScorePoints(increaseScore));
      dispatch(addAssertion(increaseAssertion));
    }
  };

  timerCountdown = () => {
    const { timer, disabled } = this.state;
    const newCount = timer - 1;
    const ONE_SECOND = 1000;
    if (timer > 0 && disabled === false) {
      setTimeout(() => this.setState({
        timer: newCount,
      }), ONE_SECOND);
    }
    if (timer === 0 && disabled === false) {
      this.setState({ disabled: true });
    }
    return timer;
  };

  newQuestion = async () => {
    const { history } = this.props;
    const { questions, questionId } = this.state;
    const newId = questionId + 1;
    const lastQuestion = 5;

    if (newId === lastQuestion) {
      return (history.push('/feedback'));
    }

    const question = questions[newId];

    const correct = question.correct_answer;
    const wrongs = question.incorrect_answers;

    const allAnswers = [correct, ...wrongs];
    const randomizedQuestions = this.randomize(allAnswers);

    this.setState({
      questionId: newId,
      randomizedAnswer: randomizedQuestions,
      rightAnswer: correct,
      timer: 30,
      disabled: false,
      answered: false,
    });
  };

  render() {
    const {
      randomizedAnswer,
      questions,
      questionId,
      rightAnswer,
      disabled,
      timer,
    } = this.state;

    const question = questions[questionId];

    return (
      <>
        <Header />
        {
          question && (
            <div className="question-container">
              <h2
                data-testid="question-category"
                className="question-title"
              >
                {question.category}
              </h2>
              <h3 className="question-timer">{timer}</h3>
              <p
                className="question-text"
                data-testid="question-text"
              >
                {question.question}
              </p>
              <div
                className="answer-container"
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
                    disabled={ disabled }
                    onClick={ this.handleClick }
                    value={ answer }
                  >
                    {answer}
                  </button>
                ))}
                {disabled && (
                  <button
                    data-testid="btn-next"
                    type="button"
                    onClick={ this.newQuestion }
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Game.propTypes = {
  history: func,
  dispatch: func,
}.isRequired;

export default connect(mapStateToProps)(Game);
