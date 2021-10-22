import React, { useState } from 'react';
import propTypes from 'prop-types';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onRegistered(username) */
    props.onRegistered(username);
  }

  return (
    <form>
      <h1>Registration page</h1>
      <label>
        *Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <br/>
      <label>
        *Password:
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br/>
      <label>
        *Email:
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <br/>
      <label>
        Birthday:
        <input type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <br/>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  )
}

RegistrationView.propTypes = {
  user: propTypes.shape({
    username: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    birthday: propTypes.string
  }),
  onRegistered: propTypes.func.isRequired
};