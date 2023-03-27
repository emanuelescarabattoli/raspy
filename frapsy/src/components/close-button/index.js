import style from "./style.module.css"

const CloseButton = () => {
  const onClick = () => {
    window.close()
  }
  return (
    <button className={style.mainWrapper} onClick={onClick}>
      <i className="fa-solid fa-power-off"></i>
    </button>
  )
}

export default CloseButton
