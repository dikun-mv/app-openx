import React, { Component } from 'react';
import Player from './Player';

import './App.css';

const Error = ({ text }) => (
  <div className="Error">{text}</div>
);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,
      config: null
    }
  }

  componentWillMount() {
    fetch(`${window.location.pathname}config.json`, { credentials: 'include' })
      .then((response) => response.json())
      .then((config) => this.setState((state) => ({ ...state, config, loading: false })))
      .catch((error) => this.setState((state) => ({ ...state, error, loading: false })));
  }

  componentDidCatch(error = {}) {
    this.setState((state) => ({ ...state, error }));
  }

  render() {
    return (
      <div className="App">
        {!this.state.loading && (
          this.state.error
            ? <Error text="Ooops, something went wrong!" />
            : <Player className="Player" source={this.state.config.url} />
        )}
      </div>
    );
  }
}
