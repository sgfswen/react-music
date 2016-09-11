export const STATE = {
  playing: true,
  tempo: 100,

  // individual instrument gain
  instruments: {
    kick: {
      id: 0,
      label: 'Kick',
      gain: 0.5,
      muted: true,
      effects: []
    },
    snare: {
      id: 1,
      label: 'Snare',
      gain: 0.7,
      muted: true,
      effects: []
    },
    hihat: {
      id: 2,
      label: 'Hi-hat',
      gain: 0.7,
      muted: true,
      effects: []
    },
    bass: {
      id: 3,
      label: 'Bass',
      gain: 0.3,
      muted: false,
      effects: []
    },
    chords: {
      id: 4,
      label: 'Chords',
      gain: 0.1,
      muted: false,
      effects: []
    },
    tuneLow: {
      id: 5,
      label: 'Low Melody',
      gain: 0.1,
      muted: false,
      effects: []
    },
    tuneHigh: {
      id: 6,
      label: 'High Melody',
      gain: 0.75,
      muted: true,
      effects: ['delay']
    }
  },

  // audio effects
  effects: {
    delay: {
      id: 1,
      label: 'Delay',
      data: {
        wetLevel: {
          label: 'Wet Level',
          value: 0.6,
          min: 0,
          max: 1,
          step: 0.01
        },
        feedback: {
          label: 'Feedback',
          value: 0.2,
          min: 0,
          max: 1,
          step: 0.01
        },
        cutoff: {
          label: 'Cutoff',
          value: 20000,
          min: 0,
          max: 20000,
          step: 1
        }
      }
    }
  }
};