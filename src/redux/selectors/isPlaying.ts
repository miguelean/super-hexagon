import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~redux/store'

const selectIsPlayingState = (state: RootState) => state.game.isPLaying

export const selectIsPLaying = createSelector(
  selectIsPlayingState,
  (isPLaying) => isPLaying
)
