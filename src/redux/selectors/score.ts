import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~redux/store'

const selectScoreState = (state: RootState) => state.game.score
const selectBestScoreState = (state: RootState) => state.game.score

export const selectScore = createSelector(selectScoreState, (score) =>
  Math.floor(score / 5)
)

export const selectBestScore = createSelector(
  selectBestScoreState,
  (bestScore) => bestScore
)
