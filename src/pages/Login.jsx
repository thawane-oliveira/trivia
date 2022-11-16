import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { getToken } from '../services/api';
import { submitInfo } from '../redux/actions';
import '../styles/Login.css';

class Login extends Component {
  state = {
    name: '',
    email: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  };

  validateForm = () => {
    const { name, email } = this.state;
    const condition = /^\S+@\S+\.\S+$/;
    if (name !== '' && email.match(condition)) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  handleClick = async () => {
    const { history } = this.props;
    const response = await getToken();
    localStorage.setItem('token', response.token);
    history.push('/game');
  };

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { player } = this.props;
    const { disabled } = this.state;
    return (
      <div>
        <h1 className="login-title">Trivia</h1>
        <form className="form-container">
          <input
            className="input-name"
            placeholder="Digite seu nome"
            type="text"
            data-testid="input-player-name"
            name="name"
            onChange={ this.handleChange }
          />
          <input
            className="input-email"
            placeholder="Digite seu e-mail"
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            onChange={ this.handleChange }
          />
          <button
            className="play-button"
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
            onClick={ () => {
              this.handleClick();
              player(this.state);
            } }

          >
            Play
          </button>
          <button
            className="settings-button"
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettings }
          >
            Configurações

          </button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  player: (state) => dispatch(submitInfo(state)),
});

Login.propTypes = {
  history: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
