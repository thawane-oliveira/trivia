import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import Ranking from '../pages/Ranking';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Componente Login', () => {

  it('Verifica se existe um botao para voltar para home', () => {
    const {history} = renderWithRouterAndRedux(<App />);
    act(() => {
        history.push('/ranking');
      })
    const button = screen.getByRole('button', {name: /home/i});
    expect(button).toBeInTheDocument()
  });

  it('Verifica se tem o titulo Ranking', () => {
    renderWithRouterAndRedux(<Ranking />);
    
    const header = screen.getByRole('header', { name: /Ranking/i, level: 1  });
    expect(header).toBeInTheDocument();
  });

  it('Verifica se aparece o nome do usuario no ranking', () => {
    renderWithRouterAndRedux(<Ranking />);

    const name = screen.getByTestId('data-testid="player-name-0"');
    expect(name).toBeVisible();
  });

//   it('Verifica se o botão é ativado após preencher os campos e é feito o redirecionamento para a path /game', async () => {
//     const { history } = renderWithRouterAndRedux(<App />);
//     const token = {
//       response_code: 0,
//       response_message: "Token Generated Successfully!",
//       token: "71a52c004b75aa59615ce35fe4f02148693c8543b4a978ac435a81c1bcce7e1d",
//     }
//     jest.spyOn(global, 'fetch');
//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(token),
//     });
//     const playerName = screen.getByTestId('input-player-name');
//     const emailInput = screen.getByTestId('input-gravatar-email');
//     const button = screen.getByRole('button', { name: /play/i });
//     expect(button).toBeDisabled();
//     userEvent.type(playerName, 'Yasuho');
//     userEvent.type(emailInput, 'lesley@park.com');
//     userEvent.click(button)
//     await waitFor(() => {
//       expect(history.location.pathname).toBe('/game');
//     });
//   });

//   it('Verifica se o botão de configurações existe na tela e redireciona para a path /settings', () => {
//     const { history } = renderWithRouterAndRedux(<App />);
//     const button = screen.getByRole('button', { name: /configurações/i });
//     userEvent.click(button)
//     expect(history.location.pathname).toBe('/settings');
//   });
});