import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import Game from '../pages/Game';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Componente Game', () => {
  it('Verifica se os dados do jogador estão na tela do componente Game', () => {
    renderWithRouterAndRedux(<App />);
    const playerName = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i});
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(playerName, 'Toasty');
    userEvent.click(buttonPlay);

    const img = screen.getByTestId('header-profile-picture ');
    expect(img).toBeInTheDocument();

    const name = screen.getByTestId('header-player-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Toasty');
  });
  it('Verifica se há um H2 com a categoria da pergunta na tela do componente Game', () => {
    renderWithRouterAndRedux(<App />);
    const playerName = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i});
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(playerName, 'Toasty');
    userEvent.click(buttonPlay);

    const token = {
      response_code: 0,
      response_message: "Token Generated Successfully!",
      token: "71a52c004b75aa59615ce35fe4f02148693c8543b4a978ac435a81c1bcce7e1d",
    }
    
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(token),
    });

    const H2 = screen.getByTestId('question-category');
    expect(H2).toBeInTheDocument();
  });

});