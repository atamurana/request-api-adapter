import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  onClick: undefined,
};

function Button({ children, className, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

const primaryStyle = css`
  border: 1px solid transparent;
  background-color: #4c70a8;
  color: #fff;
`;

const StyledButton = styled(Button)`
  font-size: 1rem;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid #dae0e5;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  color: #212529;
  background-color: #fff;
  cursor: pointer;
  outline: none;

  ${({ primary }) => primary && primaryStyle};

  &:hover,
  &:active {
    border-color: transparent;
    background-color: #47689b;
    color: #fff;
  }
`;

export default StyledButton;
