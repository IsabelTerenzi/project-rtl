import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../extra/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  it('Testa se a página contém um h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });

    expect(h2).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    const pikachu = screen.getByText(/pikachu/i);

    expect(button).toBeInTheDocument();
    expect(pikachu).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const name = screen.getByTestId('pokemon-name');
      expect(name).toHaveTextContent(pokemon.name);
      userEvent.click(button);
    });
  });

  it('Testa se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const name = screen.getAllByTestId('pokemon-type');
    expect(name).toHaveLength(1);
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const seven = 7;
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(seven);

    buttons.forEach((button) => {
      const typePokemon = screen.getByTestId('pokemon-type');

      userEvent.click(button);

      expect(button.textContent).toBe(typePokemon.textContent);
    });
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /all/i });

    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);

    const pikachu = screen.getByText(/pikachu/i);

    expect(pikachu).toBeInTheDocument();
  });
});
