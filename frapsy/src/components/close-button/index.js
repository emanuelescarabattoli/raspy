import style from "./style.module.css"

const CloseButton = () => {
  const onClick = () => {
    window.close()
  }
  return (
    <div className={style.mainWrapper} onClick={onClick}>
      <i className="fa-solid fa-power-off"></i>
    </div>
  )
}

export default CloseButton
