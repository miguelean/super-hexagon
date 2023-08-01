import { SuperHexagon } from '~components/organisms/Superhexagon'
import { Menu } from '~components/organisms/Menu'
import { Score } from '~components/atoms/Score'
import { Audio } from '~components/atoms/Audio'
import { useSelector } from 'react-redux'
import { selectIsPLaying } from '~redux/selectors/isPlaying'

export const Game = () => {
  const isPlaying = useSelector(selectIsPLaying)
  return (
    <>
      {isPlaying && <SuperHexagon />}
      {isPlaying && <Audio />}
      {isPlaying && <Score />}
      {!isPlaying && <Menu />}
    </>
  )
}
