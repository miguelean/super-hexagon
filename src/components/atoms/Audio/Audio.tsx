import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectIsVolumeEnabled, selectVolume } from '~redux/selectors/volume'
import { BiSolidVolumeFull, BiSolidVolumeMute } from 'react-icons/bi'

export const Audio = () => {
  const ref = useRef<HTMLAudioElement>(null)
  const volume = useSelector(selectVolume)
  const isVolumeEnabled = useSelector(selectIsVolumeEnabled)

  useEffect(() => {
    if (ref.current) ref.current.volume = volume
  }, [volume])

  if (!isVolumeEnabled) return null

  return (
    <audio ref={ref} autoPlay>
      <source
        src={`${process.env.NEXT_PUBLIC_HOST}/audio.mp3`}
        type='audio/mpeg'
      />
    </audio>
  )
}
