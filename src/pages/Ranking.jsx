import { func } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  state = {
    // ranking: [],
  };

  // convertImg = () => {
  //   const { email } = this.props;
  //   const converImg = md5(email).toString();
  //   const gravatarImage = `https://www.gravatar.com/avatar/${converImg}`;
  //   return gravatarImage;
  // };

  handleHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const localRanking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {localRanking
          .sort((a, b) => b.score - a.score)
          .map((player, index) => (
            <main
              key={ index }
            >
              <img
                src={ md5(player.email).toString() }
                alt="Ícone de perfil do usuário no Gracatar"
              />
              <p
                data-testid={ `player-name-${index}` }
              >
                { player.name }
              </p>
              <p
                data-testid={ `player-score-${index}` }
              >
                { player.score}
              </p>
            </main>
          ))}

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
// const mapStateToProps = (state) => ({
//   email: state.player.email,
//   /* name: state.player.name,
//   score: state.player.score, */
// });

Ranking.propTypes = {
  history: func,
}.isRequired;

export default connect()(Ranking);
