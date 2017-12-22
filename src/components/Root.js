import React from 'react';
import ErrorBoundary from "../containers/ErrorBoundary";
import ConfigProvider from '../containers/ConfigProvider';
import App from './App';

const Root = () => (
  <div className="Root">
    <ErrorBoundary>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </ErrorBoundary>
  </div>
);

export default Root;
