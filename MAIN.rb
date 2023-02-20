use_osc "localhost", 12004# Welcome to Sonic Pi


step = []
midiNotes = []


live_loop :importdata do
  use_real_time
  a = sync "/osc*/notes"
  b = sync "/osc*/times"
  set :notes, a
  set :times, b
  puts a
  a.size.times do
    play a.tick , amp: 0.5
    sleep b.tick
  end
end
