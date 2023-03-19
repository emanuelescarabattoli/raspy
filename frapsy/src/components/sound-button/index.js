import style from "./style.module.css"
import beep from "../../assets/beep.mp3"
import sonar from "../../assets/sonar.mp3"

const SoundButton = () => {
  const onClick = () => {
    const beepAudio = new Audio(beep);
    const sonarAudio = new Audio(sonar);
    beepAudio.addEventListener('ended', () => {
      sonarAudio.play()
    })
    beepAudio.play()
    sonarAudio.play();
  }
  return (
    <div className={style.mainWrapper} onClick={onClick}>
      <i className="fa-solid fa-play"></i>
    </div>
  )
}

export default SoundButton
