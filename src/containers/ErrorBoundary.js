import React, { Component } from 'react';

const Error = ({ text }) => (
  <div className="Message">{text}</div>
);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    }
  }

  componentDidCatch(error = {}) {
    this.setState({ error });
  }

  render() {
    return this.state.error ? <Error text="Ooops, something went wrong!" /> : this.props.children;
  }
}

export default ErrorBoundary;
