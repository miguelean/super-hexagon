import { useDispatch, useSelector } from 'react-redux'
import { selectIsVolumeEnabled, selectVolume } from '~redux/selectors/volume'
import { BiSolidVolumeFull, BiSolidVolumeMute } from 'react-icons/bi'
import { switchVolume } from '~redux/slices/game'

export const AudioController = () => {
  const dispatch = useDispatch()

  const isVolumeEnabled = useSelector(selectIsVolumeEnabled)
  const volume = useSelector(selectVolume)

  const handleSwithVolume = () => {
    dispatch(switchVolume(volume === 0 ? 0.4 : 0))
  }

  return (
    <button
      className='absolute bottom-3 right-3 md:bottom-10 md:right-14 drop-shadow-[1px_1px_8px_rgba(255,153,204,1)]'
      onClick={handleSwithVolume}
    >
      {isVolumeEnabled ? (
        <BiSolidVolumeFull size={32} />
      ) : (
        <BiSolidVolumeMute size={32} />
      )}
    </button>
  )
}
