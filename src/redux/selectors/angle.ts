import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~redux/store'

const selectAngleState = (state: RootState) => state.game.angle

export const selectAngle = createSelector(selectAngleState, (angle) => angle)
