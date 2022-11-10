import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { getToken } from '../services/api';
import { submitInfo } from '../redux/actions';

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
    const { user } = this.props;
    const { disabled } = this.state;
    return (
      <div>

        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
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
            onClick={ () => {
              this.handleClick();
              user(this.state);
            } }

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
