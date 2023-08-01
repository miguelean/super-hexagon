import { useDispatch, useSelector } from 'react-redux'
import { selectScore } from '~redux/selectors/score'
import { play, resetGame } from '~redux/slices/game'

export const Menu = () => {
  const dispatch = useDispatch()
  const score = useSelector(selectScore)

  const handlePLay = () => {
    dispatch(resetGame())
    dispatch(play())
  }
  return (
    <div className='w-full h-full flex flex-col justify-evenly items-center'>
      {score > 0 && <h1 className='text-white text-7xl'>Score: {score}</h1>}
      <button className='w-56 p-3 border-2 rounded-md' onClick={handlePLay}>
        PLAY
      </button>
    </div>
  )
}
