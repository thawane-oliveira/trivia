import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import getToken from '../services/token';
import { submitInfo } from '../redux/actions';

class Login extends Component {
  state = {
    nome: '',
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
    const { nome, email } = this.state;
    if (nome !== ''
      && email !== '') {
      this.setState({
        disabled: false,
      });
    }
  };

  handleClick = async () => {
    const { history } = this.props;
    const response = await getToken();
    localStorage.setItem('token', response);
    history.push('/game');
  };

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { disabled } = this.state;
    return (
      <div>

        <form>
          <label htmlFor="nome">
            Nome:
            <input
              type="text"
              data-testid="input-player-name"
              name="nome"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="nome">
            Email:
            <input
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
            onClick={
              this.handleClick
            }
          >
            Play
          </button>
          <button
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
  user: (state) => dispatch(submitInfo(state)),
});

Login.propTypes = {
  history: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
