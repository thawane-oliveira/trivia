import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { mockQuestion } from './helpers/mockQuestion';

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

    localStorage.setItem('token','504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockQuestion),
    });

    const { history } = renderWithRouterAndRedux(<App />);

    const playerName = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const button = screen.getByRole('button', { name: /play/i });
    expect(button).toBeDisabled();
    userEvent.type(playerName, 'Yasuho');
    userEvent.type(emailInput, 'lesley@park.com');
    userEvent.click(button)

    await waitFor(() => {
    expect(history.location.pathname).toBe('/game'); }, 3000 );
    // verificado em https://stackoverflow.com/questions/66661163/react-testing-librarys-waitfor-not-working
  });

  it('Verifica se o botão de configurações existe na tela e redireciona para a path /settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /configurações/i });
    userEvent.click(button)
    expect(history.location.pathname).toBe('/settings');
  });
});