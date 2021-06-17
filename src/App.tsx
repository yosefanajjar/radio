import React, { useState, useEffect } from 'react';

import {
  ArrowLeft as ArrowLeftIcon,
  Minus as MinusIcon,
  Plus as PlusIcon,
  Quit as QuitIcon,
} from './components/Icons';
import { Loader, IconButton } from './components';
import { RadioState } from './types';
import { getStations } from './api';
import { numberWithCommas } from './utils';

import styles from './App.module.css';

const initialState: RadioState = {
  stations: [],
  isLoading: false,
  error: null,
};

const App = () => {
  const [radio, setRadio] = useState(initialState);

  const { stations, isLoading, error } = radio;
  const selectedStation = stations.find(
    (station) => station.isPlaying,
  );

  useEffect(() => {
    (async () => {
      try {
        setRadio({ ...initialState, isLoading: true });
        const stations = await getStations();
        setRadio({
          ...initialState,
          stations,
        });
      } catch (error) {
        setRadio({ ...initialState, error });
      }
    })();
    return () => setRadio(initialState);
  }, []);

  const playStation = (id: string) => {
    const updatedStations = stations.map((station) => {
      if (station.id === id)
        return { ...station, isPlaying: !station.isPlaying };
      else return { ...station, isPlaying: false };
    });

    setRadio((prevState) => ({
      ...prevState,
      stations: updatedStations,
    }));
  };

  return (
    <div className={styles.canvas}>
      <div className={styles.container}>
        <div className={styles.header}>
          <IconButton onClick={() => {}}>
            <ArrowLeftIcon width={25} height={25} />
          </IconButton>
          <h1 className={styles.heading}>Stations</h1>
          <IconButton onClick={() => {}}>
            <QuitIcon width={25} height={25} />
          </IconButton>
        </div>

        <div className={styles.stations}>
          {!isLoading ? (
            stations.map((station) => (
              <div key={station.id}>
                {station.isPlaying && (
                  <div className={styles.player}>
                    <IconButton onClick={() => {}}>
                      <MinusIcon width={30} height={30} />
                    </IconButton>
                    <div>
                      <img
                        src={station.avatar}
                        alt={`${station.name} Avatar`}
                        className={styles.avatar}
                      />
                    </div>
                    <IconButton onClick={() => {}}>
                      <PlusIcon width={30} height={30} />
                    </IconButton>
                  </div>
                )}
                <div
                  className={styles.station}
                  onClick={() => playStation(station.id)}
                  role="button"
                >
                  <p className={styles.body}>{station.name}</p>
                  <p className={styles.body}>
                    {numberWithCommas(station.frequency)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.loading}>
              <Loader data-testid="loader" />
              <p className={styles.body2}>Loading...</p>
            </div>
          )}
          {error && <p>{error.message}</p>}
        </div>

        <div className={styles.footer}>
          {selectedStation && (
            <>
              <p className={styles.caption}>Currently Playing</p>
              <p className={styles.body2}>{selectedStation.name}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
