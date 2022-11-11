import { func } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  handleHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>

        <h1 data-testid="ranking-title">Ranking</h1>
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
Ranking.propTypes = {
  history: func,
}.isRequired;

export default connect()(Ranking);
