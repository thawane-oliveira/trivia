import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number } from 'prop-types';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Feedback extends Component {
  state = {
    couldBeBetter: false,
    wellDone: false,
  };

  componentDidMount() {
    this.verifyAssertions();
    this.playerRanking();
  }

  verifyAssertions = () => {
    const { assertions } = this.props;

    const three = 3;

    if (assertions < three) {
      this.setState({ couldBeBetter: true });
    } else if (assertions >= three) {
      this.setState({ wellDone: true });
    }
  };

  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  playerRanking = () => {
    const { email, name, score } = this.props;
    const playInfo = { email, name, score };
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([playInfo]));
    } else {
      const setRank = JSON.parse(localStorage.getItem('ranking'));
      setRank.push(playInfo);
      localStorage.setItem('ranking', JSON.stringify(setRank));
    }
  };

  render() {
    const { couldBeBetter, wellDone } = this.state;
    const { assertions, score } = this.props;

    return (
      <>
        <Header />
        <div className="feedback-container">
          <h2
            data-testid="feedback-total-question"
            className="feedback-assertions"
          >
            {`Assertions:
            ${assertions}`}
          </h2>
          <h2
            className="feedback-score"
            data-testid="feedback-total-score"
          >

            {`Total score:
            ${score}`}
          </h2>
          {
            couldBeBetter && (
              <h1
                className="feedback-bad"
                data-testid="feedback-text"
              >
                Could be better...
              </h1>
            )
          }
          {
            wellDone && (
              <h1
                className="feedback-good"
                data-testid="feedback-text"
              >
                Well Done!
              </h1>
            )
          }
          <div className="feedback-button-container">
            <button
              className="playagain-button"
              type="button"
              data-testid="btn-play-again"
              onClick={ this.handlePlayAgain }
            >
              Play Again

            </button>
            <button
              className="ranking-button"
              type="button"
              data-testid="btn-ranking"
              onClick={ this.handleRanking }
            >
              Ranking
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  email: state.player.email,
  name: state.player.name,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
