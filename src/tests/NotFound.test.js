import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Testa a página Not Found', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('Testa se a página contém um h2 com o texto correto', () => {
    const notFound = screen
      .getByRole('heading', { name: /page requested not found/i, level: 2 });

    expect(notFound).toBeInTheDocument();
  });

  it('Testa se a página mostra a imagem correta', () => {
    const image = screen.getByAltText(/Pikachu crying because the page/i);

    expect(image).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
