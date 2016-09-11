import React, { Component } from 'react';
import { Analyser, Song, Sequencer, Sampler, Synth } from '../src';
import Visualization from './visualization';
import './index.css';

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {playing: true};
    this.handleAudioProcess = this.handleAudioProcess.bind(this);
    this.handlePlayToggle = this.handlePlayToggle.bind(this);
  }
  handleAudioProcess(analyser) {
    this.visualization.audioProcess(analyser);
  }
  handlePlayToggle() {
    this.setState({
      playing: !this.state.playing,
    });
  }


  /* ######################### */
  /* ##### render method ##### */
  /* ######################### */

  render() {
    return (
      <div>
        <Song
          playing={this.state.playing}
          tempo={105}
        >
          <Analyser 
            onAudioProcess={this.handleAudioProcess}
          >
          
            {/* ######################################
                ##### Sequencers come here below ##### 
                ###################################### */}


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
      </div>
    );
  }
}