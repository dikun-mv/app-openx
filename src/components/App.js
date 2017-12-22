import React from 'react';
import Player from './Player';
import { adjustScheduler } from '../utils/outernets';

const App = ({ config }) => (
  <Player src={config.url} onStart={({ adDuration }) => adjustScheduler(Math.trunc(adDuration))} />
);

export default App;
