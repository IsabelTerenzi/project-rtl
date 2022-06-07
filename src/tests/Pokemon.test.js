import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../extra/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  it('Testa se é renderizado um card com as informações do Pokémon', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText(/pikachu sprite/i);

    expect(pokemonName).toHaveTextContent(/pikachu/i);
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonWeight).toHaveTextContent(/average weight: 6.0 kg/i);
    expect(pokemonImage).toHaveProperty('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
  });

  it('Testa se o card do Pokémon contém um link para mais detalhes', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
  });

  it('Testa se é feito o redirecionamento para os detalhes do Pokémon', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText(/more details/i);

    userEvent.click(detailsLink);

    const details = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(details).toBeInTheDocument();
  });

  it('Testa se a URL exibida muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App pokemons={ pokemons } />);
    const detailsLink = screen.getByText(/more details/i);

    userEvent.click(detailsLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText(/more details/i);
    userEvent.click(detailsLink);
    const favorite = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(favorite);
    const icon = screen.getByAltText(/is marked as favorite/i);
    expect(icon).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
