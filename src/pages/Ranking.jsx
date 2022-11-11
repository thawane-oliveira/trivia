import { func } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  state = {
    index: 0,
  }
  convertImg = () => {
    const { email } = this.props;
    const converImg = md5(email).toString();
    const gravatarImage = `https://www.gravatar.com/avatar/${converImg}`;
    return gravatarImage;
  };

  handleHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { index } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          <li>
            <img src={ this.convertImg() } alt="" />
            <p data-testid:`player-name-${index}`> Name: </p>
            <p data-testid:`player-score-${index}`>Score:</p>
          </li>
        </ol>

        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleHome }
        >
          home
        </button>
      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  email: state.player.email,
  /* name: state.player.name,
  score: state.player.score, */
});

Ranking.propTypes = {
  history: func,
}.isRequired;

export default connect(mapStateToProps)(Ranking);
