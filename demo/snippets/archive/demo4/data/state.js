export const STATE = {
  playing: true,
  tempo: 95,

  // individual instrument gain
  instruments: {
    kick: {
      id: 0,
      label: 'Kick',
      gain: 0.75,
      muted: true
    },
    snare: {
      id: 1,
      label: 'Snare',
      gain: 0.7,
      muted: false
    },
    hihat: {
      id: 2,
      label: 'Hi-hat',
      gain: 0.7,
      muted: false
    },
    bouzouki: {
      id: 10,
      label: 'Sample',
      gain: 0.7,
      muted: false
    },
    bass: {
      id: 3,
      label: 'Bass',
      gain: 0.3,
      muted: false
    }
  },

  // audio effects
  effects: {
    moogFilter: {
      id: 2,
      label: 'MoogFilter',
      data: {
        cutoff: {
          label: 'Cutoff',
          value: 0.05,
          min: 0.02,
          max: 1,
          step: 0.01
        }
      }
    },
    delay: {
      id: 1,
      label: 'Delay',
      data: {
        wetLevel: {
          label: 'Wet Level',
          value: 0.65,
          min: 0,
          max: 1,
          step: 0.01,
        },
        feedback: {
          label: 'Feedback',
          value: 0,
          min: 0,
          max: 1,
          step: 0.01
        }
      }
    }
  }
};