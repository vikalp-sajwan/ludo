import React, { Component } from 'react';
import styled from 'styled-components';

import { theme } from '../theme';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  bottom: 30%;
  z-index: 10;
  visibility: hidden;
  @keyframes land {
    0% {
      bottom: 70%;
    }
    100% {
      bottom: 30%
    }
  }
  @keyframes fly {
    0% {
      bottom: 30%;
    }
    100% {
      bottom: 70%
    }
  }
`;

const enterAnimation = `
  visibility: visible;
  animation: land 0.2s ease-out;
`;

const exitAnimation = `
  animation: fly 0.2s ease-out;
`;

class Piece extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.myRef.current.setAttribute('style', enterAnimation);
  }

  componentWillUnmount() {
    this.myRef.current.setAttribute('style', exitAnimation);
  }

  render() {
    return (
      <Wrapper ref={this.myRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="100%"
          viewBox="-54 0 512 512"
          width="100%"
        >
          <style>
            .piece-text &#123; font-size: 400px; font-weight: 800; &#125;
              </style>
          <path
            d="M10 202.371C10 96.13 96.074 10 202.254 10c106.176 0 192.254 86.129 192.254 192.371C394.504 349.863 202.254 502 202.254 502S10 349.863 10 202.371zm0 0"
            fill={theme.primary[this.props.color]}
          />
          <path d="M202.254 512a9.994 9.994 0 0 1-6.207-2.156c-1.992-1.578-49.39-39.297-97.535-95.867-28.403-33.372-51.067-66.34-67.364-97.989C10.48 275.848 0 237.621 0 202.371 0 90.785 90.73 0 202.254 0c111.523 0 202.254 90.785 202.254 202.371 0 35.25-10.48 73.477-31.153 113.617-16.292 31.649-38.957 64.617-67.359 97.989-48.148 56.57-95.543 94.285-97.535 95.863a9.983 9.983 0 0 1-6.207 2.16zm0-492C101.758 20 20 101.813 20 202.371c0 73.149 50.977 148.399 93.742 198.64 36.91 43.372 74.121 75.958 88.508 88.04 14.426-12.121 51.805-44.86 88.742-88.309 42.66-50.176 93.512-125.316 93.512-198.37C384.508 101.811 302.746 20 202.254 20zm0 0" />
          {(this.props.times || 1) < 2 && (
            <path d="M202.254 301.32C146.422 301.32 101 255.875 101 200.012S146.422 98.703 202.254 98.703c55.828 0 101.25 45.45 101.25 101.309 0 55.863-45.422 101.308-101.25 101.308zm0-182.617c-44.805 0-81.254 36.477-81.254 81.309 0 44.836 36.45 81.308 81.254 81.308 44.8 0 81.25-36.472 81.25-81.308 0-44.832-36.45-81.309-81.25-81.309zm0 0" />
          )}
          {(this.props.times || 1) < 2 && (
            <path
              d="M295.195 200.012c0-51.36-41.613-93-92.941-93-51.332 0-92.941 41.64-92.941 93 0 51.363 41.609 93 92.94 93 51.329 0 92.942-41.637 92.942-93zm0 0"
              fill="#aae2c9"
            />
          )}
          {(this.props.times || 1) > 1 && (
            <text x="100" y="350" class="piece-text">
              {(this.props.times || 1)}
            </text>
          )}
        </svg>
      </Wrapper>
    );
  }
};

export default Piece;
