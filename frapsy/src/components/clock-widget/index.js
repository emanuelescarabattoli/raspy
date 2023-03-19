import style from "./style.module.css"

const ClockWidget = ({ dateTime }) => {
  return (
    <div className={style.mainWrapper}>
      <span className={style.time}>{dateTime.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}</span>
      <span className={style.date}>{dateTime.toLocaleDateString("it-IT", { year: "numeric", month: "2-digit", day: "2-digit" })}</span>
    </div>
  )
}

export default ClockWidget
