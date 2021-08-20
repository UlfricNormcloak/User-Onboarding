import React from 'react';

function User({ details }) {
    if (!details) {
      return <h3>Working fetching your User&apos;s details...</h3>
    }
  
    return (
      <div className='user container'>
        <p>First Name: {details.first_name}</p>
        <p>Last Name: {details.last_name}</p>
        <p>Email: {details.email}</p>
        <p>Avatar: {details.avatar}</p>
      </div>
    )
  }
  
  export default User
  