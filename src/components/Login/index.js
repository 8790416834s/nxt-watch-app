import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showError: false,
    errMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = errMsg => {
    this.setState({errMsg, showError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = `https://apis.ccbp.in/login`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username">USERNAME</label>
        <input
          type="text"
          id="username"
          onChange={this.onChangeUsername}
          value={username}
          placeholder="Username"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password, showPassword} = this.state
    const changeType = showPassword ? 'text' : 'password'
    return (
      <>
        <label htmlFor="password">PASSWORD</label>
        <input
          type={`${changeType}`}
          id="password"
          onChange={this.onChangePassword}
          value={password}
          placeholder="Password"
        />
      </>
    )
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  renderShowPassword = () => (
    <div className="show-password">
      <input
        type="checkbox"
        onClick={this.onClickShowPassword}
        id="showPassword"
      />
      <label htmlFor="showPassword">Show Password</label>
    </div>
  )

  render() {
    const {showError, errMsg} = this.state
    return (
      <div className="login-container">
        <form className="login-card-container" onSubmit={this.onSubmitForm}>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="logo"
              className="logo-img"
            />
          </div>
          {this.renderUsername()}
          {this.renderPassword()}
          {this.renderShowPassword()}
          <button type="submit" className="login-btn">
            Login
          </button>
          {showError ? <p className="error-msg">{errMsg}</p> : ''}
        </form>
      </div>
    )
  }
}
export default Login
