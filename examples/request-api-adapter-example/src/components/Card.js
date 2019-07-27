import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './Button';
import userPic from './pic.png';

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
            <Button onClick={action}>Remove</Button>
          </Action>
        )}
      </Content>
    </div>
  );
}

const StyledCard = styled(Card)`
  display: flex;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #eee;
  border-radius: 0.1rem;
`;

const Image = styled.img.attrs({
  alt: 'User Pic',
  src: userPic,
})`
  flex-shrink: 0;
  display: block;
  margin-right: 1rem;
  width: 6rem;
  height: 6rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`;

const Title = styled.div`
  flex-grow: 0;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.6rem;
`;

const Body = styled.div`
  flex-grow: 1;
  margin-bottom: 1rem;
`;

const Action = styled.div`
  flex-grow: 0;
  text-align: right;
`;

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default StyledCard;
