import style from "./style.module.css"

const StatisticsWidget = ({ title, crypto }) => {
  return (
    <div className={style.mainWrapper}>
      <div>
        <span>{title}</span>
      </div>
      <div>
        <span style={{ color: crypto?.usd_24h_change < 0 ? "#cc0000" : "#00cc00" }}>
          {crypto?.usd_24h_change?.toLocaleString("en-UK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
        </span>
        <span>
          ${crypto?.usd?.toLocaleString("en-UK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  )
}

export default StatisticsWidget
