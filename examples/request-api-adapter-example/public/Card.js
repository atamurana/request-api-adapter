import React from 'react';
import PropTypes from 'prop-types';
import { getContext, withContext } from 'recompose';
import styled from 'styled-components';

import Button from './Button';
import userPic from './pic.png';
import { getSize } from './utils';

const propTypes = {
  action: PropTypes.func,
  body: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.node.isRequired,
};

const defaultProps = {
  action: undefined,
  body: undefined,
  className: undefined,
};

function Card({ action, body, title, className }) {
  return (
    <div className={className}>
      <Image />
      <Content>
        <Title>{title}</Title>
        {body && <Body>{body}</Body>}
        {action && (
          <Action>
            <EnhancedButton onClick={action}>Action</EnhancedButton>
          </Action>
        )}
      </Content>
    </div>
  );
}

const StyledCard = styled(Card)`
  display: flex;
  padding: ${getSize(1)}rem;
  font-size: ${getSize(1)}rem;
  border: 1px solid #eee;
  border-radius: ${getSize(0.1)}rem;
`;

const Image = getContext({ size: PropTypes.oneOf(['sm', 'md', 'lg']) })(styled.img.attrs({
  alt: 'User Pic',
  src: userPic,
})`
  flex-shrink: 0;
  display: block;
  margin-right: ${getSize(1)}rem;
  width: ${getSize(6)}rem;
  height: ${getSize(6)}rem;
`);

const Content = styled.div`
  dispaly: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`;

const Title = getContext({ size: PropTypes.oneOf(['sm', 'md', 'lg']) })(styled.div`
  font-size: ${getSize(1.75)}rem;
  font-weight: bold;
  margin-bottom: ${getSize(0.4)}rem;
`);

const Body = getContext({ size: PropTypes.oneOf(['sm', 'md', 'lg']) })(styled.div`
  flex-grow: 1;
  margin-bottom: ${getSize(0.4)}rem;
`);

const Action = styled.div`
  text-align: right;
`;

const EnhancedButton = getContext({ size: PropTypes.oneOf(['sm', 'md', 'lg']) })(Button);

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default withContext(
  {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
  },
  ({ size }) => ({ size }),
)(StyledCard);
