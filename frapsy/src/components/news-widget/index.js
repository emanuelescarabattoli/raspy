import { useEffect, useState } from "react"
import style from "./style.module.css"

const NewsWidget = ({ newsItem }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleNewsItem, setVisibleNewsItem] = useState(newsItem);

  useEffect(() => {
    setIsAnimating(true)
    setTimeout(() => {
      setVisibleNewsItem(newsItem)
      setTimeout(() => {
        setIsAnimating(false)
      }, 500)
    }, 300)
  }, [newsItem?.title])

  return (
    <div className={style.mainWrapper}>
      <div className={isAnimating ? style.newsWrapperOut : style.newsWrapperIn}>
        <div className={style.newsTitleWrapper}>
          <div>
            <img className={style.newsImage} src={visibleNewsItem?.image} alt={visibleNewsItem?.title} />
            <span className={style.newsPubDate}>
              <span>
                <i className="fa-regular fa-clock"></i>
                <span>
                  {visibleNewsItem?.pubDate?.toLocaleDateString("it-IT", { year: "numeric", month: "2-digit", day: "2-digit" })} {visibleNewsItem?.pubDate?.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </span>
            </span>
          </div>
          <div>
            <span className={style.newsTitle}>{visibleNewsItem?.title}</span>
            <span className={style.newsDescription}>{visibleNewsItem?.description}</span>
          </div>
        </div>
      </div>
      <div />
    </div>
  )
}

export default NewsWidget
