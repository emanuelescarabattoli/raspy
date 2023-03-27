import { useEffect, useRef, useState } from "react"
import style from "./style.module.css"
import StatisticsWidget from "../../components/statistic-widget"
import CloseButton from "../../components/close-button"
import WeatherWidget from "../../components/weather-widget"
import ClockWidget from "../../components/clock-widget"
import NewsWidget from "../../components/news-widget"
import SoundButton from "../../components/sound-button"

const fetchNews = async () => {
  const result = [];
  const rssResponse = await fetch("https://rss.nytimes.com/services/xml/rss/nyt/World.xml");
  const rssText = await rssResponse.text();
  const rssData = await new window.DOMParser().parseFromString(rssText, "text/xml");
  const rssItems = rssData.querySelectorAll("item");
  for (const rssItem of rssItems) {
    const title = rssItem.querySelector("title")?.innerHTML;
    const description = rssItem.querySelector("description")?.innerHTML;
    const image = rssItem.querySelector("content")?.getAttribute("url");
    const pubDate = new Date(rssItem.querySelector("pubDate")?.innerHTML);
    if (title) result.push({ image, title, pubDate, description });
  }
  return result;
}

const fetchTemperature = async () => {
  const result = await fetch("https://api.open-meteo.com/v1/forecast?latitude=43.11&longitude=12.38&hourly=temperature_2m,relativehumidity_2m");
  const jsonData = await result.json();
  return {
    temperature: jsonData.hourly.temperature_2m[jsonData.hourly.temperature_2m.length - 1],
    humidity: jsonData.hourly.relativehumidity_2m[jsonData.hourly.relativehumidity_2m.length - 1]
  }
}

const fetchCrypto = async () => {
  const result = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=cardano%2Cethereum&vs_currencies=usd&include_24hr_change=true");
  const jsonData = await result.json();
  return { ...jsonData }
}

const Application = () => {
  const weatherInterval = useRef();
  const newsInterval = useRef();
  const cryptoInterval = useRef();
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [crypto, setCrypto] = useState(0);
  const [dateTime, setDateTime] = useState(new Date());
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      const updatedNews = await fetchNews();
      const updatedTemperature = await fetchTemperature();
      const updatedCrypto = await fetchCrypto();
      console.log(updatedNews)
      setNews(updatedNews);
      setCurrentNewsIndex(0);
      setTemperature(updatedTemperature.temperature);
      setHumidity(updatedTemperature.humidity);
      setDateTime(new Date());
      setCrypto(updatedCrypto);
    }
    fetchData();
  }, [])

  useEffect(() => {
    const idWeather = setInterval(async () => {
      const updatedTemperature = await fetchTemperature();
      setTemperature(updatedTemperature.temperature);
      setHumidity(updatedTemperature.humidity);
      setDateTime(new Date());
    }, 45000)

    const idNews = setInterval(() => {
      setCurrentNewsIndex(value => value + 1)
    }, 15000)

    const idCrypto = setInterval(async () => {
      const updatedCrypto = await fetchCrypto()
      setCrypto(updatedCrypto);
    }, 60000)

    weatherInterval.current = idWeather;
    newsInterval.current = idNews;
    cryptoInterval.current = idCrypto;

    return () => {
      clearInterval(weatherInterval.current)
      clearInterval(newsInterval.current)
      clearInterval(cryptoInterval.current)
    };
  }, [])

  console.log(currentNewsIndex)

  return (
    <div className={style.mainWrapper} style={{ cursor: process.env.NODE_ENV === "development" ? undefined : "none" }}>
      <div>
        <NewsWidget newsItem={(currentNewsIndex ?? undefined) !== undefined ? news[currentNewsIndex] : {}} />
        <div className={style.statisticsWrapper}>
          <div>
            <SoundButton />
            <CloseButton />
          </div>
          <div>
            <StatisticsWidget title="ADA" crypto={crypto?.cardano} />
          </div>
          <div>
            <StatisticsWidget title="ETH" crypto={crypto?.ethereum} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <WeatherWidget temperature={temperature} humidity={humidity} location="Perugia" />
        </div>
        <div>
          <ClockWidget dateTime={dateTime} />
        </div>
      </div>
    </div>
  );
}

export default Application;
