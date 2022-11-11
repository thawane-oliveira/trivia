import { func } from 'prop-types';
import React, { Component } from 'react';

export default class BtnHome extends Component {
  handleHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ this.handleHome }
      >
        home
      </button>

    );
  }
}

BtnHome.propTypes = {
  history: func,
}.isRequired;
