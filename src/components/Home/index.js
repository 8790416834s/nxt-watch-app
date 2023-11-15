import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillHome, AiOutlineFire} from 'react-icons/ai'
import {FaGamepad} from 'react-icons/fa'
import {BiListPlus} from 'react-icons/bi'
import './index.css'
import Header from '../Header'
import VideoThumbnail from '../VideoThumbnail'

class Home extends Component {
  state = {homeList: []}

  componentDidMount() {
    this.getHomeDetails()
  }

  channelData = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
  })

  formattedData = data => ({
    id: data.id,
    channel: this.channelData(data.channel),
    publishedAt: data.published_at,
    thumbnailUrl: data.thumbnail_url,
    title: data.title,
    viewCount: data.view_count,
  })

  getHomeDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const homeApiUrl = `https://apis.ccbp.in/videos/all`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(homeApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        videos: data.videos.map(each => this.formattedData(each)),
        total: data.total,
      }
      this.setState({homeList: updatedData})
    }
  }

  renderVideos = () => {
    const {homeList} = this.state
    return (
      <>
        <ul>
          {homeList.videos.map(each => (
            <VideoThumbnail videosList={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="menu-container-section">
            <div className="menu-container">
              <div className="menu-item">
                <AiFillHome className="react-icon" />
                <p>Home</p>
              </div>
              <div className="menu-item">
                <AiOutlineFire className="react-icon" />
                <p>Trending</p>
              </div>
              <div className="menu-item">
                <FaGamepad className="react-icon" />
                <p>Gaming</p>
              </div>
              <div className="menu-item">
                <BiListPlus className="react-icon" />
                <p>Saved videos</p>
              </div>
            </div>
            <div className="social-networks">
              <p>CONTACT US</p>
              <div className="social-icons">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="icon"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                  className="icon"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                  className="icon"
                />
              </div>
              <p>Enjoy! Now to see your channels and recommendations!</p>
            </div>
          </div>
          <div className="videos-container-section">
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="logo"
                className="logo"
              />
              <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
              <button type="button" className="get-btn">
                GET IT NOW
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
              alt="banner"
              className="banner-logo"
            />
          </div>
          {this.renderVideos()}
        </div>
      </>
    )
  }
}
export default Home
