import React, { useState } from 'react';
import styled from 'styled-components';

const FormStyle = styled.form`
    height: 10%;
  width: 50%;
  .form-group {
    width: 100%;
    margin-bottom: 1rem;
  }
  label {
      padding: 1000px:
    font-size: 1rem;
  }
  input,
  textarea {
    width: 150%;
    height: 10px;
    font-size: 1rem;
    padding: 1rem;
    color: white;
    background-color: black;
    outline: none;
    border: solid grey;
    border-radius: 8px;
    margin-top: 1rem;
  }
  textarea {
    min-height: 150px;
    resize: vertical;
  }
  button[type='submit'] {
    background-color: #615b5e;
    padding-bottom: 2rem;
    line-height: 0px;
    width: 280px;
    color: white;
    font-weight: bold;
    font-size: 2rem;
    display: inline-block;
    outline: none;
    border: none;
    padding: 2rem;
    border-radius: 30px;
    cursor: pointer;
  }

  button[type='submit']:hover{
    background-color: white;
    color: black;
  }
`;

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  return (
    <>
      <FormStyle>
        <div className="form-group">
          <label htmlFor="name">
            Your Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Dotty_Boy'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Your Email
            <input
              type="email"
              id="email"
              name="email"
              placeholder='abcxyz@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="message">
            Your message
            <textarea
              type="text"
              id="message"
              name="message"
              placeholder='Write on Me!!'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Send</button>
      </FormStyle>
    </>
  );
}