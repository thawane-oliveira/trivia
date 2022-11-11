import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Componente Feedback', () => {
  it('Verifica se o botão Play Again existe na tela e redireciona para a tela de Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/feedback');
    })

    const button = screen.getByRole('button', { name: /play again/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button)

    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se o botão Ranking existe na tela e redireciona para o path /ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/feedback');
    })

    const button = screen.getByRole('button', { name: /ranking/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button)

    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });
});
