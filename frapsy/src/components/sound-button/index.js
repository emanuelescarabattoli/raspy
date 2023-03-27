import style from "./style.module.css"

const SoundButton = () => {
  const onClick = () => {
    window.electronAPI.beep();
  }
  return (
    <button className={style.mainWrapper} onClick={onClick}>
      <i className="fa-solid fa-play"></i>
    </button>
  )
}

export default SoundButton
