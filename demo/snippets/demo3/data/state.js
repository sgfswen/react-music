export const STATE = {
  playing: true,
  tempo: 108,

  // individual instrument gain
  instruments: {
    kick: {
      label: 'Kick',
      gain: 0.75,
      muted: true,
      hotkey: 'a'
    },
    snare: {
      label: 'Snare',
      gain: 0.7,
      muted: true,
      hotkey: 's'
    },
    hihat: {
      label: 'Hi-hat',
      gain: 0.7,
      muted: true,
      hotkey: 'd'
    },
    clap: {
      label: 'Clap',
      gain: 0.25,
      muted: true,
      hotkey: 'f'
    },
    bass: {
      label: 'Bass',
      gain: 0.3,
      muted: true,
      hotkey: 'h'
    },
    synth1: {
      label: 'Synth 1',
      gain: 0.7,
      muted: false,
      hotkey: 'j'
    },
    synth2: {
      label: 'Synth 2',
      gain: 0.7,
      muted: true,
      hotkey: 'k'
    },
    synth3: {
      label: 'Synth 3',
      gain: 0.7,
      muted: true,
      hotkey: 'l'
    },
  },

  // audio effects
  effects: {
    moogFilter: {
      id: 2,
      label: 'MoogFilter',
      data: {
        cutoff: {
          label: 'Cutoff',
          value: 1,
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