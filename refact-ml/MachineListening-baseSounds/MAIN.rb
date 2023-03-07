##| use_osc "localhost", 12004# Welcome to Sonic Pi


##| step = []
##| midiNotes = []



live_loop :importdata do
  
  ## sync functions from Mr Bomb Music Git hub athttps://github.com/mrbombmusic/sonic-pi-drum-rnn-gui.
  use_real_time
  a = sync "/osc*/notes"
  b = sync "/osc*/times"
  set :notes, a
  set :times, b
  puts a
  
  # my code
  use_synth :pretty_bell
  
  with_fx :echo, phase: 0.3  do
    with_fx :reverb, mix: 0.99, room: 0.9999 do
      a.size.times do
        play a.tick , amp: 0.1
        sleep b.tick/3
      end
    end
  end
  
end



##-----------------------------------------------------------------------------------------------------------------
##------------        BASE TRACK GENERATION  - taken from my first assignment      --------------------------------
##-----------------------------------------------------------------------------------------------------------------

m2_a = [41, 53, 53, :rest, 41, 53, :rest, 46, 58, 46, 58, :rest, 43, 55]
r2 = [4, 1, 3, 2, 2, 1, 3, 4, 1, 3, 1, 3, 4, 1, 3]


use_synth :pretty_bell

base_loop = 6

in_thread do
  with_fx :echo, phase: 0.6  do
    with_fx :reverb, mix: 0.99, room: 0.9999 do
      200.times do
        play m2_a.tick , amp: 0.01, sustain: 30
        sleep r2.look
      end
    end
  end
end
