import React from 'react'

export const UpdateUser = () => {

  const updateInfo = ()  => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.put(`https://aya-myflix.herokuapp.com/users/${user}`,{}, {
    headers: { Authorization: `Bearer ${token}`},
    method: 'PUT'
  })
  .then(() => {
    alert('information has been updated')
  })
  .catch( e => {
    console.log(e)
  });
  }

  const deleteUser = ()=> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.delete(`https://aya-myflix.herokuapp.com/users/${user}`,{}, {
    headers: { Authorization: `Bearer ${token}`},
    method: 'DELETE'
  })
  .then(() => {
    alert('User had been deleted')
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  })
  .catch( e => {
    console.log(e)
  });
  }

  return (
    <div>
      updateUser
    </div>
  )
}
