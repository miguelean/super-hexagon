import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { AudioController } from '~components/atoms/Audio'
import { selectBestScore, selectScore } from '~redux/selectors/score'
import { play, resetGame } from '~redux/slices/game'

export const Menu = () => {
  const dispatch = useDispatch()
  const score = useSelector(selectScore)
  const bestScore = useSelector(selectBestScore)

  const handlePLay = () => {
    dispatch(resetGame())
    dispatch(play())
  }
  return (
    <div className='w-full h-full flex divide-x-2 divide-[#ffc8e4] p-4'>
      <div
        className={classnames(
          'h-full flex flex-col p-4 md:p-20 justify-between items-center text-white',
          { 'w-1/2': bestScore, 'w-full': !bestScore }
        )}
      >
        <AudioController />
        {!bestScore && (
          <h1 className='text-4xl mt-8 md:text-8xl md:mt-0 shadow-lg uppercase'>
            SUPERHEXAGON
          </h1>
        )}
        {!!bestScore && (
          <>
            <h2 className='text-3xl md:text-6xl shadow-lg uppercase'>
              Your score
            </h2>
            <p className='text-5xl md:text-8xl shadow-lg'>{score}</p>
          </>
        )}
        {!!bestScore && (
          <div className='flex flex-col gap-4'>
            <p className='w-64 text-center font-semibold text-xl uppercase'>
              {'submit your score'}
            </p>
            <form>
              <input
                className='w-full h-8 md:h-10 rounded-md border-2 border-white bg-black px-4'
                placeholder='Name'
                type='text'
              />
            </form>
            <button
              type='submit'
              className='group w-64 py-1 px-2  md:p-2 border-2 rounded-md shadow-md font-semibold hover:shadow-[#ff99cc] uppercase'
            >
              <p className='group-hover:drop-shadow-[2px_2px_2px_rgba(255,153,204,1)]'>
                {'submit'}
              </p>
            </button>
          </div>
        )}
        <button
          type='button'
          className={classnames(
            'group w-64 p-2 md:p-3 border-2 rounded-md shadow-md font-semibold hover:shadow-[#ff99cc] uppercase',
            {
              'w-64': bestScore,
              'w-1/2 md:w-1/3 absolute top-[60vh] md:top-[50vh]': !bestScore,
            }
          )}
          onClick={handlePLay}
        >
          <p className='group-hover:drop-shadow-[2px_2px_2px_rgba(255,153,204,1)]'>
            {!bestScore ? 'PLAY!' : 'PLAY AGAIN!'}
          </p>
        </button>
      </div>
      {bestScore && (
        <div className='w-1/2 h-full flex flex-col justify-between items-center p-4 md:p-20 text-white text-center'>
          <h2 className='text-3xl md:text-6xl uppercase'>Leaderboard</h2>
          <div className='w-full h-full flex flex-col justify-evenly items-center py-2 md:py-8 px-8 md:px-24'>
            {[...new Array(10)].map((_, idx) => {
              return (
                <div
                  key={idx}
                  className='w-full flex justify-between text-lg md:text-2xl'
                >
                  <span>Player {idx}</span>
                  <span>
                    {idx}
                    {idx}
                    {idx}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
