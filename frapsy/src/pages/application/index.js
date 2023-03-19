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
    if(title) result.push({ image, title, pubDate, description });
  }
  return result;
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
    const updateNews = async () => {
      const updatedNews = await fetchNews()
      setNews(updatedNews)
      setCurrentNewsIndex(0)
    }
    if(currentNewsIndex !== 0 && (currentNewsIndex === -1 || (news.length && currentNewsIndex === news.length - 1))) {
      updateNews();
    }
  }, [currentNewsIndex])

  useEffect(() => {
    const idWeather = setInterval(async () => {
      const result = await fetch("https://api.open-meteo.com/v1/forecast?latitude=43.11&longitude=12.38&hourly=temperature_2m,relativehumidity_2m");
      const jsonData = await result.json();
      setTemperature(jsonData.hourly.temperature_2m[jsonData.hourly.temperature_2m.length - 1]);
      setHumidity(jsonData.hourly.relativehumidity_2m[jsonData.hourly.relativehumidity_2m.length - 1]);
      setDateTime(new Date());
    }, 45000)

    const idNews = setInterval(() => {
      setCurrentNewsIndex(value => value + 1)
    }, 15000)

    const idCrypto = setInterval(async () => {
      const result = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana%2Cethereum&vs_currencies=usd&include_24hr_change=true");
      const jsonData = await result.json();
      setCrypto(jsonData)
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

  return (
    <div className={style.mainWrapper} style={{ cursor: process.env.NODE_ENV === "development" ? undefined : "none" }}>
      <div>
        <NewsWidget newsItem={currentNewsIndex ? news[currentNewsIndex] : {}} />
        <div className={style.statisticsWrapper}>
          <div>
            <SoundButton />
            <CloseButton />
          </div>
          <div>
            <StatisticsWidget title="SOL" crypto={crypto?.solana} />
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
