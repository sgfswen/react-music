            <Sequencer bars={2}>
              {/* Bass line - loops over 2 bars / 32 steps */}
              
              <Synth
                gain={0.2}
                type="sine"
                steps={[
                  [0, 3, 'g2'],
                  [6, 1, 'g2'],
                  [8, .8, 'a#2'],
                  [11, 1, 'g2'],
                  [14, .75, 'f2'],
                  [16, 5, 'd#2'],
                  [24, 4, 'd2']
                ]}
              />

            </Sequencer>