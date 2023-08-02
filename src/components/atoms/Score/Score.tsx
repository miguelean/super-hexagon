import { useSelector } from 'react-redux'
import { selectScore } from '~redux/selectors/score'

export const Score = () => {
  const score = useSelector(selectScore)
  return (
    <div className='fixed w-14 h-14 top-3 right-3 text-3xl text-center p-2 shadow-lg bg-black border-2 border-white rounded-md text-white'>
      {score}
    </div>
  )
}
