import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~redux/store'

const selectVolumeState = (state: RootState) => state.game.volume

export const selectVolume = createSelector(
  selectVolumeState,
  (volume) => volume
)

export const selectIsVolumeEnabled = createSelector(
  selectVolumeState,
  (volume) => volume > 0
)
