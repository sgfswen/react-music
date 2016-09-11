import React, { Component } from 'react';

import { Analyser, Song, Sequencer, Sampler, Synth, Monosynth, Gain } from '../src';

import Polysynth from './polysynth';
import Visualization from './visualization';

import './index.css';

export default class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: true,
      tempo: 108
    };

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
    const { tempo } = this.state
    return (
      <div>
        <Song
          playing={this.state.playing}
          tempo={tempo}
        >
          <Analyser onAudioProcess={this.handleAudioProcess}>

            {/* ######################################
                ##### Sequencers come here below ##### 
                ###################################### */}
            
            <Sequencer
              resolution={16}
              bars={1}
            >
              <Sampler
                sample="samples/kick-2.wav"
                steps={[8]}
              />
              <Sampler
                sample="samples/hihat.wav"
                steps={[2, 6,  10, 14]}
              />
              <Sampler
                gain={0.4}
                sample="samples/snare-1.wav"
                steps={[4, 12]}
              />
            </Sequencer>

            <Sequencer bars={2}>
             
              <Synth
                gain={.1}
                type="sawtooth"
                steps={[
                  [2, .3, ['d4', 'f#4']],
                  [6, .3, ['d4', 'f#4']],
                  [10, .3, ['a3', 'e4']],
                  [14, .3, ['a3', 'e4']],

                  [18, .3, ['b3', 'f#4']],
                  [22, .3, ['b3', 'f#4']],
                  [26, .3, ['g3', 'f#4']],
                  [30, .3, ['a3', 'f#4']],
                ]}
              />
            </Sequencer>

            <Sequencer
              resolution={16}
              bars={2}
            >
              <Synth
                gain={0.3}
                type="sine"
                steps={[
                  [0, 1, 'd2'],
                  [2, 1, 'd3'],
                  [3, 1, 'd3'],
                  [8, 6, 'a2'],
                  [16, 6, 'b2'],
                  [24, 3, 'g2'],
                  [28, 3, 'a2'],
                ]}
              />
              
            </Sequencer>

            <Sequencer
              resolution={16}
              bars={8}
            >
              <Gain amount={0.4}>
                <Monosynth
                  glide={0.1}
                  type="triangle"
                  steps={[
                    [2, 1, 'f#4'],
                    [3, 1, 'f#4'],
                    [4, 1, 'f#4'],
                    [6, 1, 'f#4'],
                    [7, 1.5, 'f#4'],
                    [8, 1, 'a4'],
                    [10, 1, 'a4'],
                    [12, 2.5, 'g4'],
                    [14, 3, 'f#4'],

                    [22, 1, 'e4'],
                    [23.25, 1, 'e4'],
                    [26, 1, 'f#4'],

                    [34, 1, 'a4'],
                    [36, 1, 'f#4'],
                    [37, 1, 'f#4'],

                    [39, 2, 'e4'],
                    [42, 1, 'e4'],
                    [44, 1, 'e4'],
                    [46, 1, 'e4'],
                    [48, 3, 'd4'],

                    [66, 1, 'f#4'],
                    [67, 1, 'f#4'],
                    [68, 1, 'f#4'],
                    [70, 1, 'f#4'],
                    [71, 1.5, 'f#4'],
                    [72, 1, 'a4'],
                    [74, 1, 'a4'],
                    [76, 2.5, 'a4'],
                    [78, 2, 'b4'],
                    [81.25, .5, 'a4'],
                    [82, 3, 'f#4'],

                    [96, 1, 'a4'],
                    [97, 1, 'a4'],
                    [99, 2, 'a4'],

                    [104, 1, 'e4'],
                    [105, 1, 'e4'],
                    [107, 2, 'e4'],
                    [110, 1, 'e4'],
                    [111, 3, 'd4']
                  ]}
                />
              </Gain>

              <Gain amount={0.15}>
                <Monosynth
                  glide={0.1}
                  type="triangle"
                  steps={[
                    [2, 1, 'd5'],
                    [3, 1, 'd5'],
                    [4, 1, 'd5'],
                    [6, 1, 'd5'],
                    [7, 1.5, 'd5'],
                    [8, 1, 'c#5'],
                    [10, 1, 'c#5'],
                    [12, 2.5, 'c#5'],
                    [14, 3, 'd5'],

                    [34, 1, 'a4'],
                    [36, 1, 'd5'],
                    [37, 1, 'd5'],

                    [39, 2, 'd5'],
                    [42, 1, 'c#5'],
                    [44, 1, 'c#5'],
                    [46, 1, 'c#5'],
                    [48, 3, 'b4'],

                    [66, 1, 'd5'],
                    [67, 1, 'd5'],
                    [68, 1, 'd5'],
                    [70, 1, 'd5'],
                    [71, 1.5, 'd5'],
                    [72, 1, 'c#5'],
                    [74, 1, 'c#5'],
                    [76, 2.5, 'c#5'],
                    [78, 3, 'd5'],

                    [96, 1, 'a5'],
                    [97, 1, 'a5'],
                    [99, 2, 'f#5'],

                    [104, 1, 'g5'],
                    [105, 1, 'f#5'],
                    [107, 2, 'e5'],
                    [110, 1, 'f#5'],
                    [111, 3, 'd5']
                  ]}
                />
              </Gain>
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
      </div>
    );
  }
}