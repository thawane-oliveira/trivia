import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { string, number } from 'prop-types';
import '../styles/Header.css';

class Header extends Component {
  convertImg = () => {
    const { email } = this.props;
    const converImg = md5(email).toString();
    const gravatarImage = `https://www.gravatar.com/avatar/${converImg}`;
    return gravatarImage;
  };

  render() {
    const { name, score } = this.props;
    return (
      <header className="header-container">
        <img
          className="header-icon"
          src={ this.convertImg() }
          data-testid="header-profile-picture"
          alt="ícone do player no Gravatar"
        />
        <p
          data-testid="header-player-name"
          className="header-name"
        >
          {name}
        </p>
        <p
          data-testid="header-score"
          className="header-score"
        >
          {score}
        </p>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  email: string,
  name: string,
  score: number,
}.isRequired;

export default connect(mapStateToProps)(Header);
