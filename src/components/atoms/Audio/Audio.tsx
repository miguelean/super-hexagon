export const Audio = () => {
  return (
    <audio autoPlay>
      <source
        src={`${process.env.NEXT_PUBLIC_HOST}/audio.mp3`}
        type='audio/mpeg'
      />
    </audio>
  )
}
