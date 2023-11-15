import './index.css'

const Header = () => (
  <div className="header-container">
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="logo"
        className="logo-img"
      />
    </div>
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
        alt="profile"
        className="profile"
      />
      <button type="button" className="logout-btn">
        Logout
      </button>
    </div>
  </div>
)
export default Header
