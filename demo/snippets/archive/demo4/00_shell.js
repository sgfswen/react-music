import React, { Component } from 'react';
import { Analyser, Song, Sequencer, Sampler, Synth, Delay, MoogFilter } from '../src';

import { BASS, CHORDS, TUNE_LOW, TUNE_HIGH } from './snippets/demo4/data/steps'
import { STATE } from './snippets/demo4/data/state'
import Instrument from './snippets/demo4/components/Instrument'
import Effect from './snippets/demo4/components/Effect'

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
                  16, 24, 26
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
              
              <MoogFilter
                bufferSize={1024}
                resonance={3.5}
                cutoff={effects.moogFilter.data.cutoff.value}
              >
                <Delay
                  bypass={0}
                  cutoff={20000}
                  delayTime={tempo * 5}
                  dryLevel={1}
                  feedback={effects.delay.data.feedback.value}
                  wetLevel={effects.delay.data.wetLevel.value}
                >
                  <Sampler
                    gain={!instruments.bouzouki.muted ? instruments.bouzouki.gain : 0}
                    sample="samples/sample-2.wav"
                    steps={[[0, 0.94]]}
                  />
                </Delay>
              </MoogFilter>

              <Sampler
                gain={0.15}
                sample="samples/crash.wav"
                steps={[96.5]}
              />

            </Sequencer>

            <Sequencer bars={8}>

              <Synth
                gain={!instruments.bass.muted ? instruments.bass.gain : 0}
                type="sine"
                steps={BASS}
              />
             
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
          
          {/*
            <h4>Tempo</h4>
            <input 
              type="range" 
              min={20} 
              max={180} 
              defaultValue={this.state.tempo}
              onChange={(e) => this.setState({ tempo: parseInt(e.target.value)} )}
            />
            <p>{this.state.tempo}</p>
          */}
          
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
                  updateFilter={this.updateFilter}
                />
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}