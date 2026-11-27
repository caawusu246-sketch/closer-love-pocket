
import { useState, useEffect } from 'react'
import {
  Heart, Mail, Moon, Sun, Smile, Music, Camera, CalendarHeart,
  ArrowLeft, Sparkles, Play, Pause, Infinity,
} from 'lucide-react'
import './App.css'
const dailyNotes = [
  "No matter how far apart we are, my heart always knows where home is. It's you.",
  "I wish I could hold you right now, but until then, imagine my arms around you.",
  "You make ordinary days feel special just by existing.",
  "Distance is temporary. My love for you isn't.",
  "If I could teleport anywhere right now, I'd choose right beside you.",
  "You are my favorite notification, my favorite person, and my favorite place.",
  "I hope today gives you at least one reason to smile. If not, remember that you have me.",
  "Every day closer to you is a day worth celebrating.",
  "I love you in ways that words will never fully explain.",
  "Even on difficult days, you never have to face everything alone.",
  "You're the best part of my life, and I can't wait for more memories with you.",
  "Close your eyes for a second and imagine me kissing your forehead.",
  "One day, there won't be screens between our hugs.",
  "I would choose you in every lifetime.",
  "You deserve all the love, peace, and happiness in the world.",
]

function getDailyNote() {
  const today = new Date()
  const dayNumber = Math.floor(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 86400000,
  )

  return dailyNotes[dayNumber % dailyNotes.length]
}
type Section =
  | 'home'
  | 'hug'
  | 'letters'
  | 'miss'
  | 'sleep'
  | 'badday'
  | 'smile'
  | 'memories'
  | 'soundtrack'
  | 'surprise'
  | 'reasons'

const photos = [
  '/images/p1.jpeg',
  '/images/p2.jpg',
  '/images/p3.jpeg',
  '/images/p4.jpg',
  '/images/p5.jpeg',
  '/images/p6.jpg',
  '/images/p7.jpeg',
  '/images/p8.jpg',
  '/images/p9.jpeg',
  '/images/p10.jpg',
  '/images/p11.jpeg',
  '/images/p12.jpg',
  '/images/p13.jpeg',
  '/images/p14.jpg',
  '/images/p15.jpeg',
  '/images/p16.jpg',
  '/images/p17.jpeg',
  '/images/p18.jpeg',
]

const messages = {
  miss: [
    "I know I can't be beside you right now, but if love could travel distance, you'd never spend a single second without feeling mine. ❤️",
    "Distance is temporary. What we have isn't. I would choose you in every city, every timezone, every lifetime.",
    "Close your eyes for a moment. Imagine me holding your hand. I'm right there with you in every way that matters.",
    "I miss the little things most. Your voice, your laugh, your face when you're telling me something exciting. I can't wait to experience them again.",
    "I wish I could hug you right now.",
  "You crossed my mind again. Like always.",
  "If I were there, I'd steal a kiss from you.",
  ],
  sleep: [
    "Put your phone down for a moment, baby. Breathe slowly. You don't have to solve everything tonight. Rest. Tomorrow is a new day, and you're loved through all of it. ❤️",
    "If I were there, I'd kiss your forehead, pull you close, and tell you that you can finally stop thinking. Just sleep, my love.",
    "Imagine my arms around you. You're safe. You're loved. You don't have to be strong all the time. Goodnight, my beautiful girl.",
  ],
  badday: [
    "Today may have been difficult, but it doesn't define you. I'm proud of you for making it through. You don't have to carry everything alone.",
    "I wish I could be there to take some of the weight off your shoulders. Until I can, please remember: you are capable, precious, and deeply loved.",
    "You deserve softness, patience, and kindness — especially from yourself. Take a breath. I'm in your corner. Always.",
    "You make my life better just by being in it.",
  "I love you. That's it. That's the message.",
  "I hope you're taking care of yourself today.",
  "If you need me, I'm always here for you.",
  ],
  smile: [
    "Breaking news: A beautiful girl in Nice has stolen someone's entire heart. The suspect is still smiling about it. ❤️",
    "If you smiled just now, I win. If you didn't, read this again because I'm ridiculously in love with you.",
    "You know what's unfair? You get to be beautiful, funny, smart AND my favourite person. Leave some talent for the rest of us 😂",
    "Official reminder: Chris is completely obsessed with You(Malaikaaaa). This is not a temporary condition.",
    "You're my favorite person. Never forget that.",
  "I wish I could see your smile right now.",
  "Distance can't change how much I love you.",
  "Sending you the biggest virtual hug.",
  "I can't wait until I can hold your hand again.",
  ],
}

const letters = [
  { title: 'When you miss me', emoji: '🫂', text: 'I wish I could close the distance with one step and be right beside you. Until that day, let my love be something you can carry with you. You are never forgotten, never alone, and never too far from my heart.' },
  { title: 'When you feel sad', emoji: '🌧️', text: 'You don’t have to pretend to be okay with me. You can be messy, quiet, emotional, or tired. I love every version of you, not only the happy one. Let yourself feel what you need to feel. I’m here.' },
  { title: 'When you feel insecure', emoji: '🪞', text: 'I wish you could see yourself through my eyes for just one minute. You would understand why I look at you the way I do. You don’t have to compete with anyone. You are you, and that is more than enough for me.' },
  { title: 'When we argue', emoji: '🤍', text: 'Even when we disagree, I never want you to doubt that you matter to me. We are on the same team. I want us to understand each other, grow together, and always find our way back to kindness.' },
  { title: 'When you need reassurance', emoji: '💌', text: 'I am serious about us. Distance is something we are dealing with, not something that changes how I feel about you. I want the ordinary days, the difficult days, and all the beautiful days with you.' },
  { title: 'When you can’t sleep', emoji: '🌙', text: 'If I were there, I’d hold you until your thoughts got quiet. Since I can’t, imagine me beside you, gently rubbing your back and reminding you that tomorrow can wait. Sleep, my love.' },
  { title: 'When you’re happy', emoji: '☀️', text: 'I hope you never stop sharing your happiness with me. Your joy makes me happy too. I want to celebrate every little win, every big dream, and every beautiful moment in your life.' },
  { title: 'When you need to feel loved', emoji: '❤️', text: 'You are loved on the days you feel beautiful and the days you don’t. On the days you are confident and the days you question everything. Nothing you feel makes you less deserving of my love.' },
]

const features: { id: Section; title: string; subtitle: string; icon: typeof Heart; color: string }[] = [
  { id: 'hug', title: 'Hold me', subtitle: 'A little virtual hug', icon: Heart, color: 'rose' },
  { id: 'letters', title: 'Open a letter', subtitle: 'Words from my heart', icon: Mail, color: 'peach' },
  { id: 'miss', title: 'I miss you', subtitle: 'When distance feels hard', icon: Infinity, color: 'lavender' },
  { id: 'sleep', title: 'Can’t sleep', subtitle: 'A little peace tonight', icon: Moon, color: 'blue' },
  { id: 'badday', title: 'Bad day', subtitle: 'Let me remind you', icon: Sun, color: 'yellow' },
  { id: 'smile', title: 'Make me smile', subtitle: 'Something silly & sweet', icon: Smile, color: 'pink' },
]
const loveReasons = [
  "I love your smile and how it can instantly make my day better.",
  "I love how you make me feel at home, even from miles away.",
  "I love hearing about your day, even the little things.",
  "I love your laugh. I wish I could hear it every day.",
  "I love how beautiful you are, inside and out.",
  "I love that I can be myself with you.",
  "I love how you make ordinary moments feel special.",
  "I love your kindness and the way you care.",
  "I love that you're the person I want to tell everything to.",
  "I love thinking about our future together.",
  "I love your voice and how much comfort it brings me.",
  "I love every little memory we've made together.",
  "I love that even when we're far apart, you still feel close to me.",
  "I love how you make me smile without even trying.",
  "I love you because you're you. And that's more than enough.",
  "I love waking up knowing you're part of my life.",
  "I love the way you make me feel loved.",
  "I love that I can miss you this much and still feel so lucky.",
  "I love dreaming about all the places we'll go together.",
  "I love choosing you, every single day.",
  "I love your little habits that make you uniquely you.",
  "I love how proud I am to call you my girlfriend.",
  "I love that no distance could make you less important to me.",
  "I love imagining holding you and not having to let go.",
  "I love you more than I can fit into a message.",
]

const voiceMessages = [
  { title: 'I love you ❤️', file: 'love-you.mp3', subtitle: 'A little reminder from me' },
  { title: 'I love you ❤️', file: 'love-you1.mp3', subtitle: 'Another one, just for you' },
  { title: 'When you miss me 💌', file: 'miss-you.mp3', subtitle: 'For the moments we feel far apart' },
  { title: 'When you have a bad day 🫂', file: 'bad-day.mp3', subtitle: 'I am here for you' },
  { title: 'Goodnight, my love 🌙', file: 'goodnight.mp3', subtitle: 'Listen before you sleep' },
]

function ReunionCountdown() {
  const target = new Date('2027-02-08T00:00:00').getTime()

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const update = () => {
      const difference = Math.max(0, target - Date.now())

      setTime({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
    }

    update()
    const interval = setInterval(update, 1000)

    return () => clearInterval(interval)
  }, [target])

  return (
    <section className="reunion-card">
      <span className="reunion-label">OUR NEXT REUNION ❤️</span>
      <h2>Until I hold you again</h2>

      <div className="countdown">
        <div><strong>{time.days}</strong><span>days</span></div>
        <div><strong>{String(time.hours).padStart(2, '0')}</strong><span>hours</span></div>
        <div><strong>{String(time.minutes).padStart(2, '0')}</strong><span>minutes</span></div>
        <div><strong>{String(time.seconds).padStart(2, '0')}</strong><span>seconds</span></div>
      </div>

      <p>February 8, 2027 · Every second brings me closer to you.</p>
    </section>
  )
}
function App() {
  const [section, setSection] = useState<Section>('home')
  const [letter, setLetter] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [playing, setPlaying] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [secretUnlocked, setSecretUnlocked] = useState(false)
const [heartTaps, setHeartTaps] = useState(0)
const [songs, setSongs] = useState<{ title: string; artist: string; link: string; note: string }[]>(() => {
  try {
    return JSON.parse(localStorage.getItem('closer-songs') || '[]')
  } catch {
    return []
  }
})

const [songTitle, setSongTitle] = useState('')
const [songArtist, setSongArtist] = useState('')
const [songLink, setSongLink] = useState('')
const [songNote, setSongNote] = useState('')
const [envelopeOpen, setEnvelopeOpen] = useState(false)
const [currentReason, setCurrentReason] = useState('')

useEffect(() => {
  localStorage.setItem('closer-songs', JSON.stringify(songs))
}, [songs])

const addSong = () => {
  if (!songTitle.trim() || !songArtist.trim()) return

  setSongs([...songs, {
    title: songTitle,
    artist: songArtist,
    link: songLink,
    note: songNote,
  }])

  setSongTitle('')
  setSongArtist('')
  setSongLink('')
  setSongNote('')
}

  const randomMessage = (key: keyof typeof messages) => {
    const list = messages[key]
    setMessage(list[Math.floor(Math.random() * list.length)])
  }

  const back = () => {
    setSection('home')
    setLetter(null)
    setMessage('')
    setPlaying(false)
    setSelectedPhoto(null)
    setEnvelopeOpen(false)
    setCurrentReason('')
  }

  return (
    <main className="app">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {section === 'home' ? (
        <div className="home">
          <header className="topbar">
            <div
  className="brand"
  onClick={() => {
    const taps = heartTaps + 1
    setHeartTaps(taps)

    if (taps >= 5) {
      setSecretUnlocked(true)
    }
  }}
  style={{ cursor: 'pointer' }}
>
  <Heart fill="currentColor" size={18} /> closer
</div>
            <span className="tag">YOUR LITTLE LOVE POCKET</span>
          </header>

          <section className="hero">
            <div className="hero-photo">
              <img src={photos[0]} alt="Chris and Ronah" className="hero-image" />
              <span className="photo-caption">you + me, always</span>
            </div>
            <div className="hero-copy">
              <span className="eyebrow">A LITTLE PIECE OF CHRIS</span>
              <h1>Hey, Ronah <span>♡</span></h1>
              <p>Whenever you need me,<br />I'm only one tap away.</p>
            </div>
            <div className="floating-heart">♥</div>
          </section>

          <section className="daily-note">
  <Sparkles size={16} />
  <div>
    <small>YOUR DAILY LOVE NOTE ❤️</small>
    <p>{getDailyNote()}</p>
  </div>
  <Heart size={17} fill="currentColor" />
</section>
<ReunionCountdown />
{secretUnlocked && (
  <div className="secret-message">
    <h2>💌 A secret for you</h2>
    <p>
      Ronah, if you found this, here's a reminder that you're
      the most beautiful part of my life. I wish I could be
      beside you right now, but until that day, my heart is
      always with you. I love you endlessly. ❤️
    </p>
  </div>
)}

          <section className="voice-messages">
            <div className="voice-heading">
              <span className="eyebrow">A LITTLE PIECE OF MY VOICE 🎧</span>
              <h2>Voice messages</h2>
              <p>Whenever you want to hear me, I'm right here.</p>
            </div>
            <div className="voice-list">
              {voiceMessages.map((audio) => (
                <div className="voice-card" key={audio.file}>
                  <div className="voice-card-copy"><strong>{audio.title}</strong><small>{audio.subtitle}</small></div>
                  <audio controls preload="none" src={`/audio/${audio.file}`}>Your browser does not support audio playback.</audio>
                </div>
              ))}
            </div>
          </section>
          <h2 className="section-heading">What do you need right now?</h2>
          <div className="feature-grid">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <button key={feature.id} className={`feature-card ${feature.color}`} onClick={() => { setSection(feature.id); setMessage(''); setLetter(null) }}>
                  <span className="feature-icon"><Icon size={21} /></span>
                  <strong>{feature.title}</strong>
                  <small>{feature.subtitle}</small>
                  <span className="card-arrow">↗</span>
                </button>
              )
            })}
          </div>

          <section className="extras">
            <button className="extra-card" onClick={() => setSection('memories')}>
              <Camera size={19} />
              <span><strong>Our little memories</strong><small>Moments I never want to forget</small></span>
              <span>→</span>
            </button>
            <button className="extra-card">
              <CalendarHeart size={19} />
              <span><strong>Until I see you again</strong><small>Our next countdown</small></span>
              <span>→</span>
            </button>
            <button className="extra-card" onClick={() => setSection('surprise')}>
  <Mail size={19} />
  <span><strong>A little surprise</strong><small>Something special for you</small></span>
  <span>→</span>
</button>

<button className="extra-card" onClick={() => setSection('reasons')}>
  <Heart size={19} />
  <span><strong>Reasons I love you</strong><small>A little reminder, every time</small></span>
  <span>→</span>
</button>
           <button className="extra-card" onClick={() => setSection('soundtrack')}>
  <Music size={19} />
  <span><strong>Our soundtrack</strong><small>Songs that remind us of each other</small></span>
  <span>→</span>
</button>
          </section>

          <footer>Made with all my love, by Chris <Heart size={12} fill="currentColor" /></footer>
        </div>
      ) : (
        <div className="inner-page">
          <button className="back-button" onClick={back}><ArrowLeft size={18} /> Back home</button>

          {section === 'hug' && (
            <div className="hug-page">
              <div className="hug-heart" onClick={() => setPlaying(!playing)}>{playing ? '💗' : '❤️'}</div>
              <span className="eyebrow">A HUG FROM ME TO YOU</span>
              <h1>{playing ? 'Feel my love.' : 'Come here, baby.'}</h1>
              <p className="page-copy">I may not be there physically, but imagine my arms wrapped around you. Take a deep breath with me.</p>
              <button className="primary-button" onClick={() => setPlaying(!playing)}>{playing ? <Pause size={18} /> : <Play size={18} />}{playing ? 'Pause your hug' : 'I need your hug'}</button>
              {playing && <div className="hug-message">Breathe in slowly... hold it... breathe out. You are safe, you are loved, and I am yours. ❤️</div>}
              <div className="breathing"><span /> Breathe in · Breathe out <span /></div>
            </div>
          )}

          {section === 'letters' && (
            <div className="letters-page">
              <span className="eyebrow">SEALED WITH LOVE</span>
              <h1>Open when...</h1>
              <p className="page-copy">Choose the letter your heart needs today.</p>
              <div className="letter-grid">
                {letters.map((item, i) => (
                  <button key={i} className="letter-card" onClick={() => setLetter(i)}>
                    <span>{item.emoji}</span><strong>{item.title}</strong><small>Tap to open ♡</small>
                  </button>
                ))}
              </div>
              {letter !== null && (
                <div className="letter-overlay" onClick={() => setLetter(null)}>
                  <div className="letter-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close" onClick={() => setLetter(null)}>×</button>
                    <span className="letter-emoji">{letters[letter].emoji}</span>
                    <h2>{letters[letter].title}</h2>
                    <p>{letters[letter].text}</p>
                    <div className="signature">Forever yours,<br /><strong>Chris ❤️</strong></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {(['miss', 'sleep', 'badday', 'smile'] as const).includes(section as any) && (
            <div className="message-page">
              <div className="message-icon">{section === 'miss' ? '💌' : section === 'sleep' ? '🌙' : section === 'badday' ? '☀️' : '😂'}</div>
              <span className="eyebrow">A MESSAGE FROM CHRIS</span>
              <h1>{section === 'miss' ? 'Missing me?' : section === 'sleep' ? 'Rest, my love.' : section === 'badday' ? 'You’ve got this.' : 'Let me make you smile.'}</h1>
              <p className="page-copy">{message || 'Whenever you need a little reminder, tap below.'}</p>
              <button className="primary-button" onClick={() => randomMessage(section as keyof typeof messages)}><Sparkles size={18} /> {message ? 'Another little message' : 'Give me a message'}</button>
              {section === 'sleep' && <div className="night-note">🌙 A little reminder: you don't have to carry tomorrow tonight.</div>}
            </div>
          )}
{section === 'soundtrack' && (
  <div className="soundtrack-page">
    <span className="eyebrow">THE SOUNDTRACK OF US 🎵</span>
    <h1>Our songs</h1>
    <p className="page-copy">
      Songs that remind us of each other, our memories,
      or moments we wish we could share.
    </p>

    <div className="song-form">
      <input
        placeholder="Song title"
        value={songTitle}
        onChange={(e) => setSongTitle(e.target.value)}
      />

      <input
        placeholder="Artist"
        value={songArtist}
        onChange={(e) => setSongArtist(e.target.value)}
      />

      <input
        placeholder="Spotify or YouTube link (optional)"
        value={songLink}
        onChange={(e) => setSongLink(e.target.value)}
      />

      <textarea
        placeholder="Why does this song remind you of us? ❤️ (optional)"
        value={songNote}
        onChange={(e) => setSongNote(e.target.value)}
      />

      <button className="primary-button" onClick={addSong}>
        <Music size={18} /> Add to our soundtrack
      </button>
    </div>

    <div className="song-list">
      {songs.length === 0 ? (
        <p className="empty-songs">
          Our soundtrack is waiting for its first song. ❤️
        </p>
      ) : (
        songs.map((song, index) => (
          <div className="song-card" key={index}>
            <div className="song-icon">🎵</div>
            <div className="song-info">
              <strong>{song.title}</strong>
              <span>{song.artist}</span>
              {song.note && <p>{song.note}</p>}
              {song.link && (
                <a href={song.link} target="_blank" rel="noreferrer">
                  Listen to this song ↗
                </a>
              )}
            </div>

            <button
              className="delete-song"
              onClick={() => setSongs(songs.filter((_, i) => i !== index))}
            >
              ×
            </button>
          </div>
        ))
      )}
    </div>
  </div>
)}
          {section === 'surprise' && (
            <div className="surprise-page">
              <span className="eyebrow">SOMETHING FROM MY HEART</span>
              <h1>A little surprise 💌</h1>
              <p className="page-copy">I left something here just for you.</p>

              <div
                className={`love-envelope ${envelopeOpen ? 'opened' : ''}`}
                onClick={() => setEnvelopeOpen(true)}
              >
                <div className="envelope">
                  <div className="envelope-flap" />
                  <div className="envelope-letter">
                    <span>My love, Ronah ❤️</span>
                    <p>{`If I could be anywhere in the world right now,
I would be right beside you.

Every day I wish I could hold you, kiss you,
laugh with you, and make more memories together.

Until that day comes, I hope this little corner
of the world reminds you that you are loved,
missed, and thought about every single day.

I can't wait for our next hug.

Forever yours,
Chris ❤️`}</p>
                  </div>
                  <div className="envelope-front">
                    <div className="envelope-heart">♥</div>
                  </div>
                </div>
                {!envelopeOpen && (
                  <p className="envelope-instruction">Tap the envelope to open your letter 💌</p>
                )}
              </div>
            </div>
          )}

          {section === 'reasons' && (
            <div className="reasons-page">
              <span className="eyebrow">25 LITTLE REMINDERS ❤️</span>
              <h1>Reasons I love you</h1>
              <p className="page-copy">And I could keep going forever.</p>
              <div className="reason-card">
                <span className="reason-heart">♥</span>
                <p>{currentReason || 'Tap below for a little reminder of why you mean so much to me.'}</p>
              </div>
              <button className="primary-button" onClick={() => setCurrentReason(loveReasons[Math.floor(Math.random() * loveReasons.length)])}>
                <Sparkles size={18} /> Give me another reason
              </button>
            </div>
          )}

          {section === 'memories' && (
            <div className="memories-page">
              <span className="eyebrow">OUR LITTLE WORLD</span>
              <h1>Memories of us</h1>
              <p className="page-copy">Every picture holds a little piece of my heart.</p>
              <div className="memory-gallery">
                {photos.map((photo, index) => (
                  <button className="memory-photo" key={photo} onClick={() => setSelectedPhoto(photo)}>
                    <img src={photo} alt={`Memory ${index + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
              {selectedPhoto && (
                <div className="photo-overlay" onClick={() => setSelectedPhoto(null)}>
                  <button className="photo-close" onClick={() => setSelectedPhoto(null)}>×</button>
                  <img src={selectedPhoto} alt="Our memory" />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  )
}
export default App
