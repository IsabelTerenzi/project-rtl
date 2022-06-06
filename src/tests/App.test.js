import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../extra/renderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto de links de navegação', () => {
  it('Teste se a aplicação é redirecionada para a página inicial, ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkHome = screen.getByText(/home/i);

      expect(linkHome).toBeInTheDocument();

      userEvent.click(linkHome);

      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

  it('Testa se a aplicação é redirecionada para o About, ao clicar no link About',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkAbout = screen.getByText(/about/i);

      expect(linkAbout).toBeInTheDocument();

      userEvent.click(linkAbout);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

  it('Testa se a aplicação vai para os Favoritos, ao clicar em Favorite Pokemons',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkFavorites = screen.getByText(/favorite pokémons/i);

      expect(linkFavorites).toBeInTheDocument();

      userEvent.click(linkFavorites);

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  it('Testa se a aplicação vai para o Not Found, ao entrar em uma URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('pagina/que-nao-existe/');

      const notFound = screen
        .getByRole('heading', { name: /page requested not found/i, level: 2 });

      expect(notFound).toBeInTheDocument();
    });
});
