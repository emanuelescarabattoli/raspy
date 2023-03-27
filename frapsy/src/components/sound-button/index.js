import style from "./style.module.css"

const SoundButton = () => {
  const onClick = () => {
    window.electronAPI.beep();
  }
  return (
    <div className={style.mainWrapper} onClick={onClick}>
      <i className="fa-solid fa-play"></i>
    </div>
  )
}

export default SoundButton
