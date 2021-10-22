import React, { useState } from 'react';
import propTypes from 'prop-types';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  }

  return (
    <form>
      <h1>Existing user login</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <br/>
      <label>
        Password:
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br/>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  )
}

LoginView.propTypes = {
  user: propTypes.shape({
    username: propTypes.string,
    password: propTypes.string,
  }).isRequired
};