import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../pages/About';

describe('Testa a página About', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('Testa se a página contém as informações sobre a Pokédex', () => {
    const info = screen.getByText(/This application simulates a Pokédex/i);

    expect(info).toBeInTheDocument();
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const title = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });

    expect(title).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraphs = screen.getAllByText(/pokémons/i);

    expect(paragraphs).toHaveLength(2);
  });

  it('Testa se a página contém a imagem de uma Pokédex', () => {
    const image = screen.getByAltText(/pokédex/i);

    expect(image).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
