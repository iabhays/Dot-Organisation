import React from 'react';
import { MdPlace } from 'react-icons/md';
import styled from 'styled-components';
import PText from './PText';

const ItemStyles = styled.div`
  padding: 2rem;
  height: 30px;
  background-color: #615b5e;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  border-radius: 8px;
  margin-top: 2rem;
  margin-bottom: 4rem;
  .icon {
    color: white;
    background-color: black;
    padding: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  svg {
    width: 3.5rem;
  }

  
`;

export default function ContactInfoItem({
  icon = <MdPlace />,
  text = 'I need text ',
}) {
  return (
    <ItemStyles>
      <div className="icon">{icon}</div>
      <div className="info">
        <PText>{text}</PText>
      </div>
    </ItemStyles>
  );
}