import React from 'react';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

import { getStations } from './api';
import { stations } from './data';
import { Station } from './types';
import { numberWithCommas } from './utils';

jest.mock('./api/index', () => ({ getStations: jest.fn() }));

test('renders radio header', async () => {
  (getStations as jest.Mock<Promise<Station[]>>).mockResolvedValue(
    stations,
  );

  const { getByText, getByTitle } = render(<App />);

  const stationsText = getByText(/stations/i);
  const arrowLeftIcon = getByTitle(/arrow left icon/);
  const quitIcon = getByTitle(/quit icon/);

  expect(stationsText).toBeInTheDocument();
  expect(arrowLeftIcon).toBeInTheDocument();
  expect(quitIcon).toBeInTheDocument();

  await waitForElementToBeRemoved(() => getByText(/loading/i));
});

test('renders loading element when at first', async () => {
  (getStations as jest.Mock<Promise<Station[]>>).mockResolvedValue(
    stations,
  );

  const { getByText, getByTestId } = render(<App />);

  expect(getByText(/loading.../i)).toBeInTheDocument();
  expect(getByTestId('loader')).toBeInTheDocument();

  await waitForElementToBeRemoved(() => getByText(/loading/i));
});

test('renders radio stations', async () => {
  (getStations as jest.Mock<Promise<Station[]>>).mockResolvedValue(
    stations,
  );

  const stationName = stations[0].name;
  const stationFrequency = numberWithCommas(stations[0].frequency);

  await act(async () => {
    const { findByText } = render(<App />);

    // Finding the first radio station in the page
    expect(await findByText(stationName)).toBeInTheDocument();
    expect(await findByText(stationFrequency)).toBeInTheDocument();
  });
});

test('renders radio station player when clicked', async () => {
  (getStations as jest.Mock<Promise<Station[]>>).mockResolvedValue(
    stations,
  );

  const firstStation = stations[0];

  await act(async () => {
    const { findByText, findByAltText, findByTitle } = render(
      <App />,
    );

    const stationCard = (await findByText(firstStation.name))
      .parentElement;

    if (stationCard) fireEvent.click(stationCard);

    const stationAvatar = await findByAltText(
      `${firstStation.name} Avatar`,
    );

    expect(stationAvatar).toBeInTheDocument();
    expect(stationAvatar).toHaveAttribute('src', firstStation.avatar);
    expect(await findByTitle('plus icon')).toBeInTheDocument();
    expect(await findByTitle('minus icon')).toBeInTheDocument();
  });
});

test('renders radio station as currently playing when clicked', async () => {
  (getStations as jest.Mock<Promise<Station[]>>).mockResolvedValue(
    stations,
  );

  const firstStation = stations[0];

  await act(async () => {
    const { findByText, findAllByText } = render(<App />);

    const stationCard = (await findByText(firstStation.name))
      .parentElement;

    if (stationCard) fireEvent.click(stationCard);

    expect(
      await findByText(/currently playing/i),
    ).toBeInTheDocument();
    expect(await findAllByText(firstStation.name)).toHaveLength(2);
  });
});

test('renders the error message if an error occurs while loading stations', async () => {
  const message = 'something went wrong :( check your connection!';

  (getStations as jest.Mock<Promise<Station[]>>).mockRejectedValue({
    message,
  });

  const stationName = stations[0].name;
  const stationFrequency = numberWithCommas(stations[0].frequency);

  await act(async () => {
    const { findByText, queryByText } = render(<App />);

    expect(queryByText(stationName)).toBeNull();
    expect(queryByText(stationFrequency)).toBeNull();
    expect(await findByText(message)).toBeInTheDocument();
  });
});
