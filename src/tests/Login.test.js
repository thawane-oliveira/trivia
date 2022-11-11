import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Componente Login', () => {

  it('Verifica se é possível preencher os inputs', () => {
    renderWithRouterAndRedux(<App />);
    const playerName = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(playerName, 'Toasty');
  });

  it('Verifica se o botão permanece desativado se um dos campos estiver vazio/inválido', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /play/i });
    expect(button).toBeDisabled();
  });

  it('Verifica se o botão permanece desativado em caso de e-mail inválido', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const button = screen.getByRole('button', { name: /play/i });
    userEvent.type(emailInput, 'magic2gmail.com');
    expect(button).toBeDisabled();
  });

  it('Verifica se o botão é ativado após preencher os campos e é feito o redirecionamento para a path /game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    // const token = {
    //   response_code: 0,
    //   response_message: "Token Generated Successfully!",
    //   token: "71a52c004b75aa59615ce35fe4f02148693c8543b4a978ac435a81c1bcce7e1d",
    // }
    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(token),
    //   }));
    // jest.spyOn(global, 'fetch');
    // global.fetch.mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(token),
    // });
    const playerName = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const button = screen.getByRole('button', { name: /play/i });
    expect(button).toBeDisabled();
    userEvent.type(playerName, 'Yasuho');
    userEvent.type(emailInput, 'lesley@park.com');
    userEvent.click(button)

    await waitFor(() => {
    expect(history.location.pathname).toBe('/game'); }, { timeout: 3000 });
  });

  it('Verifica se o botão de configurações existe na tela e redireciona para a path /settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /configurações/i });
    userEvent.click(button)
    expect(history.location.pathname).toBe('/settings');
  });
});