import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { invalidToken, mockQuestion } from './helpers/mockQuestion';

describe('Componente Game', () => {
  // beforeAll(() => jest.setTimeout(90 * 1000))
  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  it('Verifica se os dados do jogador estão na tela do componente Game', async () => {

    localStorage.setItem('token', '504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockQuestion),
    });

    renderWithRouterAndRedux(<App />);
    const playerName = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(playerName, 'Toasty');
    userEvent.click(buttonPlay);

    await waitFor(() => {
      const img = screen.getByTestId('header-profile-picture');
      expect(img).toBeInTheDocument();
    }, 5000);

    const name = screen.getByTestId('header-player-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Toasty');
  });

  it('Verifica se os dados da pergunta aparecem na tela do componente Game', async () => {

    localStorage.setItem('token', '504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockQuestion),
    });

    renderWithRouterAndRedux(<App />);
    const playerName = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(playerName, 'Toasty');
    userEvent.click(buttonPlay);


    await waitFor(() => {
      const H2 = screen.getByTestId('question-category');
      const questionText = screen.getByTestId('question-text');
      const timer = screen.getByRole('heading', { level: 3 });

      expect(questionText).toBeInTheDocument();
      expect(timer).toBeInTheDocument();
      expect(H2).toBeInTheDocument()
    });
  });

  it('Verifica se é possível clicar em algum botão de resposta e em seguida no botão next', async () => {
    localStorage.setItem('token', '504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockQuestion),
    });

    renderWithRouterAndRedux(<App />);
    const playerName = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(playerName, 'Toasty');
    userEvent.click(buttonPlay);


    await waitFor(() => {
      const answerDiv = screen.getByTestId('answer-options');
      const correct = screen.getByTestId('correct-answer');

      expect(answerDiv).toBeVisible();
      expect(correct).toBeEnabled();

      userEvent.click(correct);

      expect(correct).toBeDisabled();
    });

    await waitFor(() => {
      const next = screen.getByTestId('btn-next');
      expect(next).toBeEnabled();
    });
  });

  it('Verifica se o jogador volta para a tela inicial caso o token seja inválido', async () => {

    localStorage.setItem('token', '')
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(invalidToken),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    const playerName = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(playerName, 'Toasty');
    userEvent.click(buttonPlay);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game');
    }, 5000);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    }, 5000);
  });

  it('Verifica se as respostas são desativadas quando o tempo acabar', async () => {
    localStorage.setItem('token', '504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockQuestion),
    });

    renderWithRouterAndRedux(<App />);
    const playerName = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(playerName, 'Toasty');
    userEvent.click(buttonPlay);


    await waitFor(() => {
      const correct = screen.getByTestId('correct-answer');
      expect(correct).toBeVisible();
    }, 3000);

    await waitFor(() => {
      const correct = screen.getByTestId('correct-answer');
      expect(correct).not.toBeDisabled();

    });

    await waitFor(() => {
      const next = screen.getByTestId('btn-next');
      expect(next).toBeVisible();
      const correct = screen.getByTestId('correct-answer');
      expect(correct).toBeDisabled();
    }, { timeout: 40000 });
  }, 40000);

  it('Verifica se é exibido Well Done ao acertar mais do que 3 perguntas', async () => {
    localStorage.setItem('token', '504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockQuestion),
    });

    renderWithRouterAndRedux(<App />);
    const playerName = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(playerName, 'Toasty');
    userEvent.click(buttonPlay);


    await waitFor(() => {
      const correct = screen.getByTestId('correct-answer');
      userEvent.click(correct);
    });

    await waitFor(() => {
      const next = screen.getByTestId('btn-next');
      userEvent.click(next);
    });

    await waitFor(() => {
      const correct = screen.getByTestId('correct-answer');
      userEvent.click(correct);
    });

    await waitFor(() => {
      const next = screen.getByTestId('btn-next');
      userEvent.click(next);
    });

    await waitFor(() => {
      const correct = screen.getByTestId('correct-answer');
      userEvent.click(correct);
    });

    await waitFor(() => {
      const next = screen.getByTestId('btn-next');
      userEvent.click(next);
    });

    await waitFor(() => {
      const correct = screen.getByTestId('correct-answer');
      userEvent.click(correct);
    });

    await waitFor(() => {
      const next = screen.getByTestId('btn-next');
      userEvent.click(next);
    });

    await waitFor(() => {
      const correct = screen.getByTestId('correct-answer');
      userEvent.click(correct);
    });

    await waitFor(() => {
      const next = screen.getByTestId('btn-next');
      userEvent.click(next);
    });

    await waitFor(() => {
      const wellDone = screen.getByRole('heading', { name: /well done!/i, level: 1 });
      expect(wellDone).toBeInTheDocument();
    }, 3000);
  });

  it('Verifica se é exibido Could be better ao acertar menos do que 3 perguntas', async () => {
    localStorage.setItem('token', '504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockQuestion),
    });

    renderWithRouterAndRedux(<App />);
    const playerName = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(playerName, 'Toasty');
    userEvent.click(buttonPlay);


    await waitFor(() => {
      const wrong = screen.getByRole('button', { name: /Genesis/i });
      userEvent.click(wrong);
    });

    await waitFor(() => {
      const next = screen.getByTestId('btn-next');
      userEvent.click(next);
    });

    await waitFor(() => {
      const wrong = screen.getByRole('button', { name: /false/i });
      userEvent.click(wrong);
    });

    await waitFor(() => {
      const wrong = screen.getByTestId('btn-next');
      userEvent.click(wrong);
    });

    await waitFor(() => {
      const wrong = screen.getByRole('button', { name: /true/i });
      userEvent.click(wrong);
    });

    await waitFor(() => {
      const next = screen.getByTestId('btn-next');
      userEvent.click(next);
    });

    await waitFor(() => {
      const wrong = screen.getByRole('button', { name: /Sledgehammer/i });
      userEvent.click(wrong);
    });

    await waitFor(() => {
      const next = screen.getByTestId('btn-next');
      userEvent.click(next);
    });

    await waitFor(() => {
      const wrong = screen.getByRole('button', { name: '91' });
      userEvent.click(wrong);
    });

    await waitFor(() => {
      const next = screen.getByTestId('btn-next');
      userEvent.click(next);
    });

    await waitFor(() => {
      const couldBeBetter = screen.getByRole('heading', { name: /could be better.../i, level: 1 });
      expect(couldBeBetter).toBeInTheDocument();
    }, 3000);
  });


});
