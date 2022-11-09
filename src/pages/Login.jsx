import React, { Component } from 'react';

export default class Login extends Component {
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
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
