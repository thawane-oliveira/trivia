import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import Ranking from '../pages/Ranking';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Componente Login', () => {

  it('Verifica se existe um botão home e se ele direciona para a path correta', () => {

    localStorage.setItem('ranking', JSON.stringify([
    {name: 'Yasuho', score: 79, email: 'lesley@park.com'},
    {name: 'Gappy', score: 35, email: 'soft@wet.com'}
  ]))

    const {history} = renderWithRouterAndRedux(<App />);
    act(() => {
        history.push('/ranking');
      })
    const button = screen.getByRole('button', {name: /home/i});
    expect(button).toBeInTheDocument()
    userEvent.click(button)
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se tem o título Ranking', () => {
    renderWithRouterAndRedux(<Ranking />);
    
    const header = screen.getByRole('heading', { name: /Ranking/i, level: 1  });
    expect(header).toBeInTheDocument();
  });

  it('Verifica se aparece o nome do usuario no ranking', () => {
    renderWithRouterAndRedux(<Ranking />);

    const name = screen.getByTestId('player-name-0');
    expect(name).toBeVisible();
  });

});