import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~redux/store'

const selectIntervalsState = (state: RootState) => state.game

export const selectPlayerIntervalId = createSelector(
  selectIntervalsState,
  (interval) => interval.playerIntervalId
)

export const selectSpawnIntervalId = createSelector(
  selectIntervalsState,
  (interval) => interval.spawnIntervalId
)
