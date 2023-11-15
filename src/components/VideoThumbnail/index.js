import './index.css'

const VideoThumbnail = props => {
  const {videosList} = props
  const {title} = videosList
  console.log(title)

  return (
    <li>
      <h1>{title}</h1>
    </li>
  )
}

export default VideoThumbnail
