import React from 'react'
import './styles.css'

const UserList = ({
  picture: {
    large
  },
  email,
  name: {
    last,
    first,
    title
  }
}) => {
  return (
    <div className="user-list">
      <img src={large} alt=""/>
      <div className="user-list__info">
        <p>{title} {first} {last}</p>
        <p>{email}</p>
      </div>
    </div>
  )
}

export default UserList
