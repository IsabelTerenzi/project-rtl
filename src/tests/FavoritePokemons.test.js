import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import data from '../data';
import renderWithRouter from '../extra/renderWithRouter';

describe('Testa a página Favorite Pokemons', () => {
  it('Testa se é exibida a mensagem, caso não haja nenhum Pokémon', () => {
    render(<FavoritePokemons />);
    const message = screen.getByText(/No favorite pokemon found/i);

    expect(message).toBeInTheDocument();
  });

  it('Testa se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ data } />);
    data.forEach((pokemon) => {
      const pokemonName = screen.getByText(`${pokemon.name}`);

      expect(pokemonName).toBeInTheDocument();
    });
  });
});
