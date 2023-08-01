import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type Position = {
  x: number
  y: number
}

export type PlayerState = {
  isPLaying: boolean
  player: {
    hitbox1: Position | null
    hitbox2: Position | null
    hitbox3: Position | null
  }
  angle: string
  score: number
  spawnIntervalId?: NodeJS.Timer
  playerIntervalId?: NodeJS.Timer
}

const initialState: PlayerState = {
  isPLaying: false,
  player: { hitbox1: null, hitbox2: null, hitbox3: null },
  angle: '0',
  score: 0,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    play: (state) => {
      state.isPLaying = true
    },
    pause: (state) => {
      state.isPLaying = false
    },
    setSpawnIntervalId: (state, action: PayloadAction<NodeJS.Timer>) => {
      state.spawnIntervalId = action.payload
    },
    setPlayerIntervalId: (state, action: PayloadAction<NodeJS.Timer>) => {
      state.playerIntervalId = action.payload
    },
    updatePosition: (
      state,
      action: PayloadAction<{
        hitbox1: Position | null
        hitbox2: Position | null
        hitbox3: Position | null
      }>
    ) => {
      if (action.payload) state.player = { ...action.payload }
    },
    updateAngle: (
      state,
      action: PayloadAction<{ angle: string | undefined | null }>
    ) => {
      if (action.payload?.angle) state.angle = action.payload.angle
    },
    updateScore: (state) => {
      state.score += 1
    },
    resetGame: (state) => {
      state.player = { hitbox1: null, hitbox2: null, hitbox3: null }
      state.angle = '0'
      state.score = 0
    },
  },
})

export const {
  play,
  pause,
  setSpawnIntervalId,
  setPlayerIntervalId,
  updatePosition,
  updateAngle,
  updateScore,
  resetGame,
} = gameSlice.actions

export default gameSlice.reducer
