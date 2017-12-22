import React, { Component, Children } from 'react';

class ConfigProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,
      data: null
    }
  }

  componentWillMount() {
    fetch(`${window.location.pathname}config.json`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => this.setState({ loading: false, data }))
      .catch((error) => this.setState({ loading: false, error }));
  }

  render() {
    if (this.state.error) throw this.state.error;

    return this.state.loading
      ? this.props.placeholder || null
      : React.cloneElement(Children.only(this.props.children), { config: this.state.data });
  }
}

export default ConfigProvider;
