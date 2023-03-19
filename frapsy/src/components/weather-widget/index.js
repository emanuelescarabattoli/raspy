import style from "./style.module.css"
import sun from "../../assets/sun.png"

const WeatherWidget = ({ temperature, humidity, location }) => {
  return (
    <div className={style.mainWrapper} style={{ backgroundImage: `url(${sun})` }}>
    <div>
      <span className={style.temperatureHumidity}>
        <span><i className="fa-solid fa-temperature-three-quarters"></i>{temperature}°</span>
        <span><i className="fa-solid fa-droplet"></i>{humidity}%</span>
      </span>
      <span className={style.location}>{location}</span>
    </div>
  </div>
  )
}

export default WeatherWidget
