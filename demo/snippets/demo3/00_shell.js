import React, { Component } from 'react';
import Mousetrap from 'mousetrap'


/* ############################ */
/* ##### initial state ##### */
/* ############################ */

import { STATE } from './snippets/demo3/data/state'


/* ############################ */
/* ##### instrument steps ##### */
/* ############################ */

import {
  CLAP,
  KICK,
  SNARE,
  HIHAT,
  BASS,
  SYNTH_1,
  SYNTH_2,
  SYNTH_3 
} from './snippets/demo3/data/steps'


/* ############################# */
/* ##### custom components ##### */
/* ############################# */

import Instrument from './snippets/demo3/components/Instrument'
import Effect from './snippets/demo3/components/Effect'


/* ################################## */
/* ##### react-music components ##### */
/* ################################## */

import { 
  Analyser, 
  Song, 
  Sequencer, 
  Sampler, 
  Synth, 
  Delay, 
  MoogFilter 
} from '../src';

import Visualization from './visualization';
import './index.css';


/* ################################ */
/* ##### Demo (App) component ##### */
/* ################################ */

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = STATE;

    this.handleAudioProcess = this.handleAudioProcess.bind(this);
    this.handlePlayToggle = this.handlePlayToggle.bind(this);
    
    this.updateVolume = this.updateVolume.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.updateEffect = this.updateEffect.bind(this);
    this.hotkey = this.hotkey.bind(this);
  }

  handleAudioProcess(analyser) {
    this.visualization.audioProcess(analyser);
  }

  handlePlayToggle() {
    this.setState({
      playing: !this.state.playing,
    });
  }

  /* ##### Update Volume ##### */

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


  /* ##### Mute / Unmute ##### */

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


  /* ##### Effects Controls ##### */

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


  /* ######################### */
  /* ##### render method ##### */
  /* ######################### */

  render() {
    const { tempo, instruments, effects } = this.state
    return (
      <div>
        <Song
          playing={this.state.playing}
          tempo={tempo}
        >
          <Analyser onAudioProcess={this.handleAudioProcess}>

            {/* #################################
                ##### instruments & effects #####
                ################################# */}
            
            <Sequencer bars={8}>
              <Sampler
                gain={0.15}
                sample="samples/crash.wav"
                steps={[92]}
              />
            </Sequencer>

            <Sequencer bars={2}>
              
              <Sampler
                gain={!instruments.clap.muted ? instruments.clap.gain : 0}
                sample="samples/clap.wav"
                steps={CLAP}
              />

              <Sampler
                gain={!instruments.kick.muted ? instruments.kick.gain : 0}
                sample="samples/kick-2.wav"
                steps={KICK}
              />

              <Sampler
                gain={!instruments.snare.muted ? instruments.snare.gain : 0}
                sample="samples/snare-1.wav"
                steps={SNARE}
              />
              <Sampler
                gain={!instruments.hihat.muted ? instruments.hihat.gain : 0}
                sample="samples/hihat.wav"
                steps={HIHAT}
              />

              <Synth
                type="sine"
                gain={!instruments.bass.muted ? instruments.bass.gain : 0}
                steps={BASS}
              />

              <MoogFilter
                bufferSize={1024}
                resonance={3.5}
                cutoff={effects.moogFilter.data.cutoff.value}
              >
                <Delay
                  bypass={0}
                  cutoff={20000}
                  delayTime={270}
                  dryLevel={1}
                  feedback={effects.delay.data.feedback.value}
                  wetLevel={effects.delay.data.wetLevel.value}
                >

                  <Synth
                    type="sawtooth"
                    gain={!instruments.synth1.muted ? instruments.synth1.gain : 0}
                    steps={SYNTH_1}
                  />

                  <Synth
                    type="sawtooth"
                    gain={!instruments.synth2.muted ? instruments.synth2.gain : 0}
                    steps={SYNTH_2}
                  />

                  <Synth
                    type="sawtooth"
                    gain={!instruments.synth3.muted ? instruments.synth3.gain : 0}
                    steps={SYNTH_3}
                  />
                </Delay>
              </MoogFilter>
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

        
        {/* ######################################
            ##### live mixing UI - fun stuff #####
            ###################################### */}

        <div className="controls">
          <div className="panes">
            
            {/* ##### INSTRUMENTS ##### */}

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

            {/* ##### EFFECTS ##### */}

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


  /* ################################ */
  /* ##### keyboard shortcuts!! ##### */
  /* ################################ */  

  componentWillMount() {

    const { instruments } = this.state

    // grab the list of hotkeys from state
    const keysList = Object.keys(instruments)
      .map(item => instruments[item].hotkey )

    // bind each hotkey to Mousetrap
    Mousetrap.bind(keysList, this.hotkey)
  }

  hotkey(e) {  
    const { instruments } = this.state

    // find instrument triggered by hotkey
    const target = Object.keys(instruments)
      .filter( inst => instruments[inst].hotkey === e.key )
    
    // pass this instrument to toggleMute method --> update state
    this.toggleMute(target)
  }
}