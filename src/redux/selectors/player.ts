import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~redux/store'

const selectGameState = (state: RootState) => state.game.player

export const selectPlayerH1 = createSelector(
  selectGameState,
  (player) => player.hitbox1
)
export const selectPlayerH2 = createSelector(
  selectGameState,
  (player) => player.hitbox2
)

export const selectPlayerH3 = createSelector(
  selectGameState,
  (player) => player.hitbox3
)
