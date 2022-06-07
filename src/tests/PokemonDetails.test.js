import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../extra/renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon Details', () => {
  it('Testa se as informação detalhadas do pokémon são mostradas na tela', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText(/more details/i);
    userEvent.click(detailsLink);

    const details = screen.getByRole('heading', { name: /summary/i, level: 2 });
    const detailsName = screen.getByText(/pikachu details/i);
    expect(detailsName).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(details).toBeInTheDocument();

    const summary = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(summary).toBeInTheDocument();
  });

  it('Testa se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText(/more details/i);
    userEvent.click(detailsLink);

    const title = screen.getByRole('heading', { name: /Game Locations of/i, level: 2 });
    expect(title).toBeInTheDocument();

    const location1 = screen.getByText('Kanto Viridian Forest');
    const location2 = screen.getByText('Kanto Power Plant');
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();

    const image = screen.queryAllByAltText(/pikachu location/i);
    expect(image[0]).toHaveProperty('src', 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');
    expect(image[1]).toHaveProperty('src', 'https://pwo-wiki.info/images/5/5b/Pp.gif');
  });

  it('Testa se o usuário pode favoritar um pokémon na página de detalhes', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText(/more details/i);
    userEvent.click(detailsLink);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);

    const icon = screen.getByAltText(/is marked as favorite/i);
    expect(icon).toBeInTheDocument();

    userEvent.click(favorite);
    expect(icon).not.toBeInTheDocument();
  });
});
