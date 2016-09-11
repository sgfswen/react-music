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