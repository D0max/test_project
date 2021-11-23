import React, { Component } from 'react'
import './styles.css'
import UserList from "../../components/UserList"

class Users extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      loading: false,
      page: 1,
      prevY: 0
    }
  }

  getUsers(page) {
    this.setState((prev) => ({...prev, loading: true}))
    fetch(`https://randomuser.me/api/?page=${page}&results=10&seed=abc`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((results) =>
      results.json()
    ).then((res) => {
      this.setState(prev => ({...prev, loading: false, users: [...this.state.users, ...res.results]}))
    }).catch(() => this.setState(prev => ({...prev, loading: false})))
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y
    if (this.state.prevY > y) {
      const page = this.state.page + 1
      this.getUsers(page)
      this.setState({ page: page })
    }
    this.setState({ prevY: y })
  }

  componentDidMount() {
    this.getUsers(this.state.page)

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    }

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    )
    this.observer.observe(this.loadingRef)
  }

  render() {
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    }

    // To change the loading icon behavior
    const loadingTextCSS = {
      display: this.state.loading ? "block" : "none",
      textAlign: 'center'
    }

    return (
      <div className="container">
        <div className="desk">
          {this.state.users.map(user => (
            // eslint-disable-next-line react/jsx-key
            <UserList key={user.login.uuid} {...user}/>
          ))}
        </div>
        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </div>
    )
  }
}

export default Users
