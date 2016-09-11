            <Sequencer bars={2}>
              <Synth
                gain={0.15}
                type="sawtooth"
                steps={[
                  [0, .6, ['g4', 'a#4', 'd5']],
                  [6, .6, ['g4', 'a4', 'e5']],

                  [16, .6, ['g4', 'a#4', 'f5']],
                  [22, .6, ['g4', 'a4', 'e5']],
                ]}
              />
            </Sequencer>