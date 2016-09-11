import React, { Component } from 'react';
import { Analyser, Song, Sequencer, Sampler, Synth, Delay } from '../src';

import { BASS, CHORDS, TUNE_LOW, TUNE_HIGH } from './snippets/demo3/data/steps'
import { STATE } from './snippets/demo3/data/state'
import Instrument from './snippets/demo3/components/Instrument'
import Effect from './snippets/demo3/components/Effect'

import Visualization from './visualization';
import './index.css';

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = STATE;

    this.handleAudioProcess = this.handleAudioProcess.bind(this);
    this.handlePlayToggle = this.handlePlayToggle.bind(this);
    this.updateVolume = this.updateVolume.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.updateEffect = this.updateEffect.bind(this);
  }

  handleAudioProcess(analyser) {
    this.visualization.audioProcess(analyser);
  }

  handlePlayToggle() {
    this.setState({
      playing: !this.state.playing,
    });
  }
  
  updateVolume(itemId, value) {
    const newState = {
      ...this.state.instruments,
      [itemId]: {
        ...this.state.instruments[itemId],
        gain: parseFloat(value)
      }
    }
    this.setState({
      instruments: newState
    })
  }

  toggleMute(itemId) {
    const newState = {
      ...this.state.instruments,
      [itemId]: {
        ...this.state.instruments[itemId],
        muted: !this.state.instruments[itemId].muted
      }
    }
    this.setState({
      instruments: newState
    })
  }

  updateEffect(effect, setting, value) {
    const newState = {
      ...this.state.effects,
      [effect]: {
        ...this.state.effects[effect],
        data: {
          ...this.state.effects[effect].data,
          [setting]: {
            ...this.state.effects[effect].data[setting],
            value: parseFloat(value)
          }
        }
      }
    }
    this.setState({
      effects: newState
    })
  }

  render() {
    const { tempo, instruments, effects } = this.state
    return (
      <div>
        <Song
          playing={this.state.playing}
          tempo={tempo}
        >
          <Analyser onAudioProcess={this.handleAudioProcess}>
            <Sequencer
              resolution={16}
              bars={2}
            >
              <Sampler
                gain={!instruments.kick.muted ? instruments.kick.gain : 0}
                sample="samples/kick-2.wav"
                steps={[
                  0, 7.25, 8, 10, 
                  16, 18, 26
                ]}
              />

              <Sampler
                gain={!instruments.snare.muted ? instruments.snare.gain : 0}
                sample="samples/snare-1.wav"
                steps={[4, 12, 20, 28]}
              />
              <Sampler
                gain={!instruments.hihat.muted ? instruments.hihat.gain : 0}
                sample="samples/hihat.wav"
                steps={[
                  0,2,4,6,8,10,12,14,
                  16,18,20,22,24,26,28,30
                ]}
              />
            </Sequencer>

            <Sequencer bars={8}>

              <Synth
                gain={!instruments.bass.muted ? instruments.bass.gain : 0}
                type="sine"
                steps={BASS}
              />
              
              <Synth
                envelope={{
                  attack: 0.8,
                  release: 0.8,
                  sustain: 0.5,
                  decay: 1
                }}
                gain={!instruments.chords.muted ? instruments.chords.gain : 0}
                type="triangle"
                steps={CHORDS}
              />
              
              <Synth
                envelope={{
                  attack: 0.01,
                  sustain: 0.3,
                  decay: 1,
                  release: 0.5
                }}
                gain={!instruments.tuneLow.muted ? instruments.tuneLow.gain : 0}
                type="triangle"
                steps={TUNE_LOW}
              />
            
              <Delay
                bypass={0}
                cutoff={effects.delay.data.cutoff.value}
                delayTime={tempo * 6}
                dryLevel={1}
                feedback={effects.delay.data.feedback.value}
                wetLevel={effects.delay.data.wetLevel.value}
              >
                <Synth
                  envelope={{
                    attack: 0.25,
                    release: 0.1,
                    sustain: 0.8,
                    decay: 1
                  }}
                  gain={!instruments.tuneHigh.muted ? instruments.tuneHigh.gain : 0}
                  type="triangle"
                  steps={TUNE_HIGH}
                />
              </Delay>

            </Sequencer>
          </Analyser>
        </Song>

        <Visualization ref={(c) => { this.visualization = c; }} />

        <button
          className="react-music-button"
          type="button"
          onClick={this.handlePlayToggle}
        >
          {this.state.playing ? 'Stop' : 'Play'}
        </button>

        <div className="controls"> 
          <div className="panes">
            {/* audio instruments */}
            {Object.keys(this.state.instruments).map((inst, i) => {
              const item =this.state.instruments[inst]
              return (
                <Instrument 
                  key={i}
                  itemId={inst}
                  item={item}
                  updateVolume={this.updateVolume}
                  toggleMute={this.toggleMute}
                />
              )
            })}
            {/* audio effects */}
            {Object.keys(this.state.effects).map((effect, i) => {
              const item =this.state.effects[effect]
              return (
                <Effect 
                  key={i}
                  name={effect}
                  item={item}
                  updateEffect={this.updateEffect}
                />
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}