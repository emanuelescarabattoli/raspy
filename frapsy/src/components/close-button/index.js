import style from "./style.module.css"

const CloseButton = () => {
  return (
    <div className={style.mainWrapper} onClick={() => window.close()}>
      <i className="fa-solid fa-power-off"></i>
    </div>
  )
}

export default CloseButton
