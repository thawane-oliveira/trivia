import { connect } from 'react-redux';
import React, { Component } from 'react';
import { func } from 'prop-types';
import Header from '../components/Header';
import { getTriviaQuestion } from '../services/api';
import '../styles/button.css';
import { addAssertion, addScorePoints } from '../redux/actions';

class Game extends Component {
  state = {
    questionId: 0,
    questions: '',
    category: '',
    rightAnswer: '',
    receivedQuestions: [],
    randomizedAnswer: [],
    timer: 30,
    disabled: false,
    answered: false,
  };

  async componentDidMount() {
    this.timerCountdown();

    const { history } = this.props;
    const { questionId } = this.state;

    const token = localStorage.getItem('token');
    const data = await getTriviaQuestion(token);

    const allQuestions = [...data.results];

    let correct = ''; // há somente uma resposta certa, que é uma string única, podendo ser booleano ou não
    let wrongs = []; // há mais de uma resposta errada, a api retorna um array de erradas, podendo ser booleano ou não

    if (allQuestions[questionId]) {
      correct = allQuestions[questionId].correct_answer;
      wrongs = allQuestions[questionId].incorrect_answers;
    }
    const allAnswers = [correct, ...wrongs];
    const randomizedQuestions = this.randomize(allAnswers);

    this.setState({
      receivedQuestions: allQuestions,
      questions: allQuestions[questionId].question,
      category: allQuestions[questionId].category,
      randomizedAnswer: randomizedQuestions,
      rightAnswer: correct });

    const errNum = 3;
    if (data.results.length === 0 || data.response_code === errNum) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState((prevState) => ({
      questionId: prevState.questionId + 1,
    }));
  }

  componentDidUpdate() {
    this.timerCountdown();
  }

  randomize = (questionArray) => {
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

  handleClick = (event) => {
    const { value } = event.target;

    this.setState({ answered: true, disabled: true });

    const { questionId, receivedQuestions, timer, rightAnswer } = this.state;
    const { dispatch, assertions, score } = this.props;

    let increaseScore = score;
    let increaseAssertion = assertions;
    const mediumPt = 2;
    const hardPt = 3;
    const multiplier = 10;
    const lvl = receivedQuestions[questionId].difficulty;

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
      this.setState({
        disabled: true,
      });
    }
    return timer;
  };

  newQuestion = async () => {
    const { history } = this.props;
    const { questionId, receivedQuestions } = this.state;
    const lastQuestion = 4;

    if (questionId === lastQuestion) {
      return (history.push('/feedback'));
    }

    let correct = '';
    let wrongs = [];

    if (receivedQuestions[questionId]) {
      correct = receivedQuestions[questionId].correct_answer;
      wrongs = receivedQuestions[questionId].incorrect_answers;
    }
    const allAnswers = [correct, ...wrongs];
    const randomizedQuestions = this.randomize(allAnswers);

    this.setState({
      randomizedAnswer: randomizedQuestions,
      questions: receivedQuestions[questionId].question,
      category: receivedQuestions[questionId].category,
      rightAnswer: correct,
      timer: 30,
      disabled: false,
      answered: false,
    });

    this.setState((prevState) => ({
      questionId: prevState.questionId + 1,
    }));
  };

  render() {
    const {
      randomizedAnswer,
      questions,
      category,
      rightAnswer,
      disabled,
      timer,
    } = this.state;

    // const question = questions[questionId];

    return (
      <>
        <Header />
        {
          questions && (
            <>
              <h2 data-testid="question-category">{category}</h2>
              <h3>{timer}</h3>
              <p data-testid="question-text">{questions}</p>
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
            </>
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
