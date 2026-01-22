import { useState, useEffect } from 'react';
import { Sparkles, Share2, RotateCcw } from 'lucide-react';

const crystalFortunes = [
  { message: "A mysterious stranger will bring unexpected joy into your life.", category: "Fate", symbol: "🌟", energy: "Positive", moonPhase: "Waxing Crescent", element: "Air", spirit: "The Wanderer", action: "Keep your eyes open for new faces this week." },
  { message: "The stars align in your favor — take that leap of faith.", category: "Opportunity", symbol: "⭐", energy: "Powerful", moonPhase: "Full Moon", element: "Fire", spirit: "The Phoenix", action: "Act boldly before the moon wanes." },
  { message: "Your creativity will unlock doors you never knew existed.", category: "Inspiration", symbol: "🎨", energy: "Flowing", moonPhase: "First Quarter", element: "Water", spirit: "The Muse", action: "Begin a creative project within three days." },
  { message: "A forgotten dream will resurface and guide your path.", category: "Dreams", symbol: "💭", energy: "Mystical", moonPhase: "New Moon", element: "Water", spirit: "The Dreamer", action: "Keep a dream journal by your bed tonight." },
  { message: "Trust the whispers of your intuition; they speak truth.", category: "Wisdom", symbol: "👁️", energy: "Intuitive", moonPhase: "Waning Gibbous", element: "Water", spirit: "The Seer", action: "Meditate before making important decisions." },
  { message: "An old friend holds the key to a new adventure.", category: "Connection", symbol: "🔑", energy: "Warm", moonPhase: "Waxing Gibbous", element: "Earth", spirit: "The Companion", action: "Reach out to someone from your past." },
  { message: "The universe is conspiring to bring you abundance.", category: "Prosperity", symbol: "💰", energy: "Abundant", moonPhase: "Full Moon", element: "Earth", spirit: "The Harvest Keeper", action: "Express gratitude for what you already have." },
  { message: "A secret admirer watches from afar.", category: "Love", symbol: "💕", energy: "Romantic", moonPhase: "Waxing Crescent", element: "Fire", spirit: "The Lover", action: "Be more observant of those around you." },
  { message: "Your patience will be rewarded tenfold.", category: "Perseverance", symbol: "🌱", energy: "Steady", moonPhase: "Last Quarter", element: "Earth", spirit: "The Ancient Oak", action: "Stay the course — results are coming." },
  { message: "A magical opportunity approaches with the next full moon.", category: "Timing", symbol: "🌕", energy: "Charged", moonPhase: "Full Moon", element: "Spirit", spirit: "The Moon Witch", action: "Prepare a ritual or intention for the full moon." },
];

const tarotCards = [
  { name: "The Star", meaning: "Hope, inspiration, and serenity guide your journey.", icon: "⭐", number: "XVII", element: "Air", advice: "Keep faith in your dreams. Healing and renewal are on their way.", keywords: ["Hope", "Faith", "Renewal", "Serenity", "Inspiration"] },
  { name: "The Moon", meaning: "Trust your intuition through uncertain times.", icon: "🌙", number: "XVIII", element: "Water", advice: "Pay attention to your dreams and subconscious messages.", keywords: ["Intuition", "Illusion", "Mystery", "Subconscious", "Dreams"] },
  { name: "The Sun", meaning: "Joy, success, and vitality shine upon you.", icon: "☀️", number: "XIX", element: "Fire", advice: "Embrace positivity and let your true self shine.", keywords: ["Joy", "Success", "Vitality", "Confidence", "Truth"] },
  { name: "The Lovers", meaning: "A meaningful connection awaits you.", icon: "💕", number: "VI", element: "Air", advice: "Follow your heart in matters of love and important choices.", keywords: ["Love", "Union", "Choices", "Harmony", "Partnership"] },
  { name: "The Magician", meaning: "You have all the tools you need to succeed.", icon: "🪄", number: "I", element: "Air", advice: "Channel your willpower and talents to manifest your desires.", keywords: ["Willpower", "Skill", "Manifestation", "Power", "Action"] },
  { name: "Wheel of Fortune", meaning: "Change is coming — embrace the cycle.", icon: "🎡", number: "X", element: "Fire", advice: "Accept that change is inevitable. Trust the cycle.", keywords: ["Destiny", "Change", "Cycles", "Luck", "Turning Point"] },
  { name: "The High Priestess", meaning: "Hidden knowledge will soon be revealed.", icon: "🔮", number: "II", element: "Water", advice: "Look inward for answers. Trust your inner voice.", keywords: ["Intuition", "Mystery", "Inner Knowledge", "Patience", "Reflection"] },
  { name: "The Empress", meaning: "Abundance and creativity flow through you.", icon: "👑", number: "III", element: "Earth", advice: "Nurture yourself and others. Abundance is favored now.", keywords: ["Abundance", "Fertility", "Nature", "Creativity", "Nurturing"] },
  { name: "Death", meaning: "An ending makes way for a powerful rebirth.", icon: "🦋", number: "XIII", element: "Water", advice: "Release what no longer serves you. Transformation awaits.", keywords: ["Transformation", "Endings", "Rebirth", "Release", "Transition"] },
  { name: "The Hermit", meaning: "Seek solitude to find your inner light.", icon: "🏔️", number: "IX", element: "Earth", advice: "Take time for introspection. Answers are found in stillness.", keywords: ["Solitude", "Wisdom", "Guidance", "Introspection", "Searching"] },
];

const cauldronAnswers = [
  { answer: "It is certain", symbol: "✨", energy: "Definite Yes", spirits: "All spirits agree", ingredient: "Dragon's blood resin", smoke: "rises steady and true" },
  { answer: "Without a doubt", symbol: "🌟", energy: "Strong Yes", spirits: "The ancestors confirm", ingredient: "Moonflower petals", smoke: "spirals upward with clarity" },
  { answer: "Yes, definitely", symbol: "💫", energy: "Clear Yes", spirits: "Benevolent forces align", ingredient: "Crushed amber", smoke: "glows with golden light" },
  { answer: "The spirits say yes", symbol: "👻", energy: "Affirmed", spirits: "Whispers of approval echo", ingredient: "White sage ash", smoke: "dances with joy" },
  { answer: "Ask again when the moon rises", symbol: "🌙", energy: "Uncertain", spirits: "The veil is too thick", ingredient: "Evening primrose", smoke: "swirls in confusion" },
  { answer: "The brew bubbles uncertain", symbol: "🫧", energy: "Unclear", spirits: "Conflicting energies present", ingredient: "Morning dew", smoke: "shifts between colors" },
  { answer: "Concentrate and ask again", symbol: "🧘", energy: "Unfocused", spirits: "Your intention needs clarity", ingredient: "Clear quartz dust", smoke: "disperses too quickly" },
  { answer: "The bones say no", symbol: "🦴", energy: "Definite No", spirits: "Warning signs appear", ingredient: "Blackthorn berries", smoke: "sinks to the bottom" },
  { answer: "Very doubtful", symbol: "⚫", energy: "Strong No", spirits: "Shadows gather in response", ingredient: "Obsidian shards", smoke: "turns dark and heavy" },
  { answer: "The spirits align in favor", symbol: "🔮", energy: "Blessed Yes", spirits: "Ancient ones give blessing", ingredient: "Elderflower essence", smoke: "forms a crown above" },
];

const zodiacData = {
  "♈ Aries": { fortune: "Your fiery spirit attracts powerful opportunities today.", element: "Fire", planet: "Mars", dates: "Mar 21 - Apr 19", love: "Passion ignites — express your feelings boldly.", career: "Leadership roles call to you.", lucky: { number: 9, color: "Red", day: "Tuesday" }, advice: "Channel your energy wisely." },
  "♉ Taurus": { fortune: "Patience brings a beautiful reward this week.", element: "Earth", planet: "Venus", dates: "Apr 20 - May 20", love: "Steady devotion deepens an important bond.", career: "Financial gains come through careful planning.", lucky: { number: 6, color: "Green", day: "Friday" }, advice: "Embrace change even when comfort calls." },
  "♊ Gemini": { fortune: "Your words hold magic — speak your dreams into existence.", element: "Air", planet: "Mercury", dates: "May 21 - Jun 20", love: "Flirtatious energy surrounds you.", career: "Networking opens unexpected doors.", lucky: { number: 5, color: "Yellow", day: "Wednesday" }, advice: "Focus on one goal at a time." },
  "♋ Cancer": { fortune: "The moon whispers secrets of love and comfort.", element: "Water", planet: "Moon", dates: "Jun 21 - Jul 22", love: "Emotional depth creates lasting intimacy.", career: "Trust your instincts on that decision.", lucky: { number: 2, color: "Silver", day: "Monday" }, advice: "Set boundaries to protect your heart." },
  "♌ Leo": { fortune: "Your radiance draws admirers from unexpected places.", element: "Fire", planet: "Sun", dates: "Jul 23 - Aug 22", love: "Romance blooms when you shine.", career: "Creative projects gain recognition.", lucky: { number: 1, color: "Gold", day: "Sunday" }, advice: "Share the spotlight generously." },
  "♍ Virgo": { fortune: "Details you notice will lead to a grand discovery.", element: "Earth", planet: "Mercury", dates: "Aug 23 - Sep 22", love: "Small gestures speak loudest.", career: "Your precision solves hidden problems.", lucky: { number: 5, color: "Navy Blue", day: "Wednesday" }, advice: "Release perfectionism." },
  "♎ Libra": { fortune: "Balance restored — harmony flows into your relationships.", element: "Air", planet: "Venus", dates: "Sep 23 - Oct 22", love: "Partnership energy is strong.", career: "Diplomacy wins the day.", lucky: { number: 6, color: "Pink", day: "Friday" }, advice: "Make a decision — indecision costs more." },
  "♏ Scorpio": { fortune: "Deep transformation brings rebirth and power.", element: "Water", planet: "Pluto", dates: "Oct 23 - Nov 21", love: "Vulnerability is your strength.", career: "Hidden information surfaces.", lucky: { number: 8, color: "Black", day: "Tuesday" }, advice: "Forgive the past to unlock your future." },
  "♐ Sagittarius": { fortune: "Adventure calls — say yes to the unknown.", element: "Fire", planet: "Jupiter", dates: "Nov 22 - Dec 21", love: "Freedom and love can coexist.", career: "Expansion is favored. Think bigger.", lucky: { number: 3, color: "Purple", day: "Thursday" }, advice: "Commit to a path." },
  "♑ Capricorn": { fortune: "Your persistence builds mountains others only dream of.", element: "Earth", planet: "Saturn", dates: "Dec 22 - Jan 19", love: "Loyalty is rewarded.", career: "Hard work pays off — recognition is coming.", lucky: { number: 4, color: "Brown", day: "Saturday" }, advice: "Rest is productive too." },
  "♒ Aquarius": { fortune: "Your unique vision inspires a movement.", element: "Air", planet: "Uranus", dates: "Jan 20 - Feb 18", love: "Intellectual connection sparks romance.", career: "Innovation sets you apart.", lucky: { number: 7, color: "Electric Blue", day: "Saturday" }, advice: "Ground your ideas in action." },
  "♓ Pisces": { fortune: "Dreams and reality merge — pay attention to signs.", element: "Water", planet: "Neptune", dates: "Feb 19 - Mar 20", love: "Soulmate energy surrounds you.", career: "Creative and spiritual work flourishes.", lucky: { number: 11, color: "Sea Green", day: "Thursday" }, advice: "Protect your energy." },
};

export default function App() {
  const [mode, setMode] = useState(null);
  const [crystalResult, setCrystalResult] = useState(null);
  const [tarotResult, setTarotResult] = useState(null);
  const [cauldronResult, setCauldronResult] = useState(null);
  const [zodiacResult, setZodiacResult] = useState(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [selectedSign, setSelectedSign] = useState(null);
  const [showCopied, setShowCopied] = useState(false);
  const [stars, setStars] = useState([]);
  const [showShareCard, setShowShareCard] = useState(false);

  useEffect(() => {
    const newStars = [...Array(40)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 10 + 6,
      delay: Math.random() * 3,
    }));
    setStars(newStars);
  }, []);

  const revealCrystal = () => {
    setIsRevealing(true);
    setCrystalResult(null);
    setTimeout(() => {
      setCrystalResult(crystalFortunes[Math.floor(Math.random() * crystalFortunes.length)]);
      setIsRevealing(false);
    }, 2000);
  };

  const revealTarot = () => {
    setIsRevealing(true);
    setTarotResult(null);
    setTimeout(() => {
      setTarotResult(tarotCards[Math.floor(Math.random() * tarotCards.length)]);
      setIsRevealing(false);
    }, 2000);
  };

  const revealCauldron = () => {
    setIsRevealing(true);
    setCauldronResult(null);
    setTimeout(() => {
      setCauldronResult(cauldronAnswers[Math.floor(Math.random() * cauldronAnswers.length)]);
      setIsRevealing(false);
    }, 2000);
  };

  const revealZodiac = () => {
    if (!selectedSign) return;
    setIsRevealing(true);
    setZodiacResult(null);
    setTimeout(() => {
      setZodiacResult(zodiacData[selectedSign]);
      setIsRevealing(false);
    }, 2000);
  };

  const getShareContent = () => {
    if (mode === 'crystal' && crystalResult) return { type: 'Crystal Ball', icon: '🔮', message: crystalResult.message, detail: crystalResult.spirit };
    if (mode === 'tarot' && tarotResult) return { type: 'Tarot', icon: tarotResult.icon, message: tarotResult.name, detail: tarotResult.meaning };
    if (mode === '8ball' && cauldronResult) return { type: 'Cauldron', icon: cauldronResult.symbol, message: cauldronResult.answer, detail: cauldronResult.spirits };
    if (mode === 'zodiac' && zodiacResult) return { type: 'Star Chart', icon: selectedSign?.split(' ')[0], message: zodiacResult.fortune, detail: selectedSign?.split(' ')[1] };
    return { type: 'Fortune', icon: '🐈‍⬛', message: 'Mystery awaits...', detail: '' };
  };

  const shareFortune = () => {
    setShowShareCard(true);
  };

  const copyShareText = () => {
    const content = getShareContent();
    const text = `🐈‍⬛ The Black Cat's Eye 🐈‍⬛\n━━━━━━━━━━━━━━━━━━━━\n${content.icon} ${content.type}\n\n"${content.message}"\n\n✨ ${content.detail}\n━━━━━━━━━━━━━━━━━━━━\nGet your fortune at The Black Cat's Eye!`;
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const reset = () => {
    setMode(null);
    setCrystalResult(null);
    setTarotResult(null);
    setCauldronResult(null);
    setZodiacResult(null);
    setSelectedSign(null);
    setShowShareCard(false);
  };

  const ShareCard = () => {
    const content = getShareContent();
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowShareCard(false)}>
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <div className="w-72 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg shadow-2xl overflow-hidden border-4 border-amber-800" style={{ fontFamily: 'serif' }}>
            <div className="bg-amber-800 text-amber-100 text-center py-2 text-xs tracking-widest">
              ✦ ✦ ✦ MYSTIC FORTUNE ✦ ✦ ✦
            </div>
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-center py-3 border-b-4 border-amber-600">
              <div className="text-4xl mb-1">🐈‍⬛</div>
              <h2 className="text-amber-400 font-bold text-lg tracking-wide">The Black Cat's Eye</h2>
              <p className="text-amber-600 text-xs italic">~ Fortune Telling Machine ~</p>
            </div>
            <div className="bg-amber-700 text-amber-100 text-center py-1 text-sm font-bold tracking-wider">
              {content.icon} {content.type.toUpperCase()} {content.icon}
            </div>
            <div className="p-4 text-center bg-amber-50 border-y-2 border-amber-300" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(180,140,80,0.1) 20px, rgba(180,140,80,0.1) 21px)' }}>
              <div className="text-5xl mb-3">{content.icon}</div>
              <p className="text-gray-800 italic text-sm leading-relaxed px-2">"{content.message}"</p>
              {content.detail && (
                <p className="text-amber-700 text-xs mt-3 font-medium">✨ {content.detail} ✨</p>
              )}
            </div>
            <div className="bg-gray-900 text-center py-2 flex justify-center gap-3 text-lg">
              <span>🌙</span><span>⭐</span><span>🔮</span><span>✨</span><span>🕯️</span>
            </div>
            <div className="bg-amber-800 text-amber-200 text-center py-2">
              <p className="text-xs tracking-wider">~ Your destiny awaits ~</p>
            </div>
            <div className="absolute top-10 left-2 text-amber-600 text-2xl">☽</div>
            <div className="absolute top-10 right-2 text-amber-600 text-2xl">☾</div>
          </div>
          <div className="flex justify-center gap-3 mt-4">
            <button onClick={copyShareText} className="bg-amber-600 hover:bg-amber-500 text-white py-2 px-6 rounded-full transition-all hover:scale-105 flex items-center gap-2 font-medium">
              {showCopied ? '✓ Copied!' : '📋 Copy Text'}
            </button>
            <button onClick={() => setShowShareCard(false)} className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-full transition-all hover:scale-105">
              Close
            </button>
          </div>
          <p className="text-center text-emerald-400 text-xs mt-3 italic">Screenshot this card to share!</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-emerald-950 to-black overflow-hidden relative flex flex-col items-center justify-center p-4">
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); } 50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.7), 0 0 60px rgba(16, 185, 129, 0.3); } }
        @keyframes cauldron { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
        @keyframes flame { 0%, 100% { transform: scaleY(1) scaleX(1); opacity: 1; } 50% { transform: scaleY(1.2) scaleX(0.9); opacity: 0.8; } }
        @keyframes card-flip { 0% { transform: rotateY(0deg) scale(0.8); } 50% { transform: rotateY(90deg) scale(1.1); } 100% { transform: rotateY(0deg) scale(1); } }
        @keyframes reveal { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.3); } }
        .glow { animation: glow 2s ease-in-out infinite; }
        .float { animation: float 3s ease-in-out infinite; }
        .cauldron-anim { animation: cauldron 2s ease-in-out infinite; }
        .flame { animation: flame 0.5s ease-in-out infinite; }
        .card-flip { animation: card-flip 1.5s ease-out forwards; }
        .reveal { animation: reveal 0.8s ease-out forwards; }
      `}</style>

      {stars.map((star) => (
        <div key={star.id} className="absolute text-emerald-400" style={{ left: star.left, top: star.top, fontSize: star.size, animation: `twinkle ${2 + Math.random() * 2}s ease-in-out ${star.delay}s infinite` }}>✦</div>
      ))}

      <div className="absolute top-4 left-4 text-4xl float">🌙</div>
      <div className="absolute top-6 right-6 text-3xl float" style={{ animationDelay: '0.5s' }}>🦇</div>
      <div className="absolute top-20 left-12 text-2xl float" style={{ animationDelay: '1s' }}>🕯️</div>
      <div className="absolute bottom-16 left-6 text-3xl cauldron-anim">🧹</div>
      <div className="absolute bottom-12 right-8 text-4xl float" style={{ animationDelay: '0.3s' }}>🐈‍⬛</div>
      <div className="absolute top-16 right-16 text-2xl float" style={{ animationDelay: '1.2s' }}>🕸️</div>
      <div className="absolute bottom-32 left-1/4 text-2xl float" style={{ animationDelay: '0.8s' }}>🦉</div>
      <div className="absolute top-1/3 left-6 text-xl float" style={{ animationDelay: '1.5s' }}>🍄</div>
      <div className="absolute bottom-20 right-1/4 text-2xl float" style={{ animationDelay: '0.6s' }}>🌿</div>

      <div className="relative z-10 text-center max-w-lg w-full">
        <div className="text-5xl mb-2">🐈‍⬛</div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300 mb-1" style={{ textShadow: '0 0 30px rgba(34, 197, 94, 0.5)', fontFamily: 'serif' }}>
          The Black Cat's Eye
        </h1>
        <p className="text-emerald-400 mb-6 text-sm italic">~ Peer into the darkness, find your truth ~</p>

        {!mode && (
          <div className="grid grid-cols-2 gap-4 reveal">
            <button onClick={() => setMode('crystal')} className="bg-gray-900/70 hover:bg-gray-800/80 border border-emerald-600/40 rounded-xl p-5 transition-all hover:scale-105 hover:border-emerald-400/60 group">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🔮</div>
              <div className="text-emerald-200 font-medium text-sm">Crystal Ball</div>
              <div className="text-emerald-500 text-xs mt-1">Scry the mists</div>
            </button>
            <button onClick={() => setMode('tarot')} className="bg-gray-900/70 hover:bg-gray-800/80 border border-emerald-600/40 rounded-xl p-5 transition-all hover:scale-105 hover:border-emerald-400/60 group">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🃏</div>
              <div className="text-emerald-200 font-medium text-sm">Tarot Cards</div>
              <div className="text-emerald-500 text-xs mt-1">Draw your fate</div>
            </button>
            <button onClick={() => setMode('8ball')} className="bg-gray-900/70 hover:bg-gray-800/80 border border-emerald-600/40 rounded-xl p-5 transition-all hover:scale-105 hover:border-emerald-400/60 group">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🫧</div>
              <div className="text-emerald-200 font-medium text-sm">Cauldron</div>
              <div className="text-emerald-500 text-xs mt-1">Stir for answers</div>
            </button>
            <button onClick={() => setMode('zodiac')} className="bg-gray-900/70 hover:bg-gray-800/80 border border-emerald-600/40 rounded-xl p-5 transition-all hover:scale-105 hover:border-emerald-400/60 group">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">⭐</div>
              <div className="text-emerald-200 font-medium text-sm">Star Chart</div>
              <div className="text-emerald-500 text-xs mt-1">Read the heavens</div>
            </button>
          </div>
        )}

        {mode === 'crystal' && !crystalResult && !isRevealing && (
          <div className="reveal">
            <div className="text-7xl mb-4 glow rounded-full inline-block p-4 float">🔮</div>
            <p className="text-emerald-300 mb-6 italic">Gaze deep into the crystal... let the mists part...</p>
            <button onClick={revealCrystal} className="bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-600 hover:to-green-500 text-white font-medium py-3 px-8 rounded-full transition-all hover:scale-105 glow">
              <Sparkles className="inline mr-2" size={18} />Reveal My Fortune
            </button>
          </div>
        )}

        {mode === 'crystal' && crystalResult && !isRevealing && (
          <div className="reveal">
            <div className="bg-gray-900/80 border border-emerald-500/50 rounded-2xl p-5 mb-6 glow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-emerald-500 text-sm">{crystalResult.category}</span>
                <span className="text-emerald-500 text-sm">{crystalResult.moonPhase} 🌙</span>
              </div>
              <div className="text-4xl mb-3">{crystalResult.symbol}</div>
              <p className="text-lg text-emerald-100 italic leading-relaxed mb-4">"{crystalResult.message}"</p>
              <div className="border-t border-emerald-600/30 pt-4 space-y-2 text-left text-sm">
                <div className="flex justify-between"><span className="text-emerald-400">Element:</span><span className="text-emerald-200">{crystalResult.element}</span></div>
                <div className="flex justify-between"><span className="text-emerald-400">Spirit Guide:</span><span className="text-emerald-200">{crystalResult.spirit}</span></div>
                <div className="flex justify-between"><span className="text-emerald-400">Energy:</span><span className="text-emerald-200">{crystalResult.energy}</span></div>
              </div>
              <div className="border-t border-emerald-600/30 pt-3 mt-3">
                <p className="text-emerald-300 text-sm"><span className="text-yellow-400">🕯️ Guidance:</span> {crystalResult.action}</p>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={shareFortune} className="bg-gray-800/60 hover:bg-gray-700/60 text-emerald-200 py-2 px-6 rounded-full transition-all hover:scale-105 flex items-center gap-2 border border-emerald-600/30">
                <Share2 size={18} />Share
              </button>
              <button onClick={reset} className="bg-gray-800/60 hover:bg-gray-700/60 text-emerald-200 py-2 px-6 rounded-full transition-all hover:scale-105 flex items-center gap-2 border border-emerald-600/30">
                <RotateCcw size={18} />New Reading
              </button>
            </div>
          </div>
        )}

        {mode === 'tarot' && !tarotResult && !isRevealing && (
          <div className="reveal">
            <div className="text-7xl mb-4 float">🃏</div>
            <p className="text-emerald-300 mb-6 italic">Shuffle the ancient deck... let your spirit guide the draw...</p>
            <button onClick={revealTarot} className="bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-600 hover:to-green-500 text-white font-medium py-3 px-8 rounded-full transition-all hover:scale-105 glow">
              <Sparkles className="inline mr-2" size={18} />Draw a Card
            </button>
          </div>
        )}

        {mode === 'tarot' && tarotResult && !isRevealing && (
          <div className="card-flip">
            <div className="bg-gradient-to-b from-gray-900/90 to-emerald-950/80 border-2 border-emerald-500/60 rounded-2xl p-5 mb-6 glow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-emerald-500 text-sm font-medium">{tarotResult.number}</span>
                <span className="text-emerald-500 text-sm">{tarotResult.element}</span>
              </div>
              <div className="text-5xl mb-2">{tarotResult.icon}</div>
              <h3 className="text-xl font-bold text-emerald-300 mb-2">{tarotResult.name}</h3>
              <p className="text-emerald-200 italic text-sm mb-3">{tarotResult.meaning}</p>
              <div className="border-t border-emerald-600/30 pt-3 mt-3">
                <p className="text-emerald-100 text-sm mb-3">🌿 <span className="font-medium">Guidance:</span> {tarotResult.advice}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {tarotResult.keywords.map((keyword, i) => (
                    <span key={i} className="bg-emerald-800/50 text-emerald-200 text-xs px-2 py-1 rounded-full border border-emerald-600/30">{keyword}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={shareFortune} className="bg-gray-800/60 hover:bg-gray-700/60 text-emerald-200 py-2 px-6 rounded-full transition-all hover:scale-105 flex items-center gap-2 border border-emerald-600/30">
                <Share2 size={18} />Share
              </button>
              <button onClick={reset} className="bg-gray-800/60 hover:bg-gray-700/60 text-emerald-200 py-2 px-6 rounded-full transition-all hover:scale-105 flex items-center gap-2 border border-emerald-600/30">
                <RotateCcw size={18} />New Reading
              </button>
            </div>
          </div>
        )}

        {mode === '8ball' && !cauldronResult && !isRevealing && (
          <div className="reveal">
            <div className="text-7xl mb-4 cauldron-anim">🫕</div>
            <div className="flex justify-center gap-1 mb-2">
              <span className="text-2xl flame">🔥</span>
              <span className="text-2xl flame" style={{ animationDelay: '0.2s' }}>🔥</span>
              <span className="text-2xl flame" style={{ animationDelay: '0.4s' }}>🔥</span>
            </div>
            <p className="text-emerald-300 mb-6 italic">Focus your question... stir the bubbling cauldron...</p>
            <button onClick={revealCauldron} className="bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-600 hover:to-green-500 text-white font-medium py-3 px-8 rounded-full transition-all hover:scale-105 glow">
              <Sparkles className="inline mr-2" size={18} />Stir the Cauldron
            </button>
          </div>
        )}

        {mode === '8ball' && cauldronResult && !isRevealing && (
          <div className="reveal">
            <div className="bg-gray-900/80 border border-emerald-500/50 rounded-2xl p-5 mb-6 glow">
              <div className="text-4xl mb-3">{cauldronResult.symbol}</div>
              <p className="text-xl text-emerald-100 font-medium mb-2">"{cauldronResult.answer}"</p>
              <p className="text-emerald-400 text-sm italic mb-4">The smoke {cauldronResult.smoke}</p>
              <div className="border-t border-emerald-600/30 pt-4 space-y-2 text-left text-sm">
                <div className="flex justify-between"><span className="text-emerald-400">Energy Reading:</span><span className="text-emerald-200">{cauldronResult.energy}</span></div>
                <div className="flex justify-between"><span className="text-emerald-400">Spirit Message:</span><span className="text-emerald-200">{cauldronResult.spirits}</span></div>
                <div className="flex justify-between"><span className="text-emerald-400">Key Ingredient:</span><span className="text-emerald-200">{cauldronResult.ingredient}</span></div>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={shareFortune} className="bg-gray-800/60 hover:bg-gray-700/60 text-emerald-200 py-2 px-6 rounded-full transition-all hover:scale-105 flex items-center gap-2 border border-emerald-600/30">
                <Share2 size={18} />Share
              </button>
              <button onClick={reset} className="bg-gray-800/60 hover:bg-gray-700/60 text-emerald-200 py-2 px-6 rounded-full transition-all hover:scale-105 flex items-center gap-2 border border-emerald-600/30">
                <RotateCcw size={18} />New Reading
              </button>
            </div>
          </div>
        )}

        {mode === 'zodiac' && !zodiacResult && !isRevealing && (
          <div className="reveal">
            <p className="text-emerald-300 mb-4 italic">Under which stars were you born?</p>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {Object.keys(zodiacData).map((sign) => (
                <button key={sign} onClick={() => setSelectedSign(sign)} className={`p-2 rounded-lg text-lg transition-all border ${selectedSign === sign ? 'bg-emerald-700 border-emerald-400 scale-110' : 'bg-gray-900/60 border-emerald-700/30 hover:bg-gray-800/60 hover:border-emerald-600/50'}`}>
                  {sign.split(' ')[0]}
                </button>
              ))}
            </div>
            {selectedSign && (
              <button onClick={revealZodiac} className="bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-600 hover:to-green-500 text-white font-medium py-3 px-8 rounded-full transition-all hover:scale-105 glow">
                <Sparkles className="inline mr-2" size={18} />Read the Stars
              </button>
            )}
          </div>
        )}

        {mode === 'zodiac' && zodiacResult && !isRevealing && (
          <div className="reveal">
            <div className="bg-gray-900/80 border border-emerald-500/50 rounded-2xl p-5 mb-6 glow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-3xl">{selectedSign.split(' ')[0]}</span>
                <span className="text-emerald-500 text-sm">{zodiacResult.dates}</span>
              </div>
              <h3 className="text-xl font-bold text-emerald-200 mb-1">{selectedSign.split(' ')[1]}</h3>
              <div className="flex justify-center gap-4 text-xs text-emerald-500 mb-3">
                <span>{zodiacResult.element}</span>
                <span>{zodiacResult.planet}</span>
              </div>
              <p className="text-base text-emerald-100 italic mb-4">"{zodiacResult.fortune}"</p>
              <div className="border-t border-emerald-600/30 pt-3 space-y-2 text-left text-sm">
                <p className="text-emerald-200"><span className="text-pink-400">Love:</span> {zodiacResult.love}</p>
                <p className="text-emerald-200"><span className="text-yellow-400">Career:</span> {zodiacResult.career}</p>
                <p className="text-emerald-200"><span className="text-emerald-300">Advice:</span> {zodiacResult.advice}</p>
              </div>
              <div className="border-t border-emerald-600/30 pt-3 mt-3">
                <p className="text-emerald-500 text-xs mb-2">Blessed charms:</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  <span className="bg-emerald-800/50 text-emerald-200 text-xs px-3 py-1 rounded-full border border-emerald-600/30">{zodiacResult.lucky.number}</span>
                  <span className="bg-emerald-800/50 text-emerald-200 text-xs px-3 py-1 rounded-full border border-emerald-600/30">{zodiacResult.lucky.color}</span>
                  <span className="bg-emerald-800/50 text-emerald-200 text-xs px-3 py-1 rounded-full border border-emerald-600/30">{zodiacResult.lucky.day}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={shareFortune} className="bg-gray-800/60 hover:bg-gray-700/60 text-emerald-200 py-2 px-6 rounded-full transition-all hover:scale-105 flex items-center gap-2 border border-emerald-600/30">
                <Share2 size={18} />Share
              </button>
              <button onClick={reset} className="bg-gray-800/60 hover:bg-gray-700/60 text-emerald-200 py-2 px-6 rounded-full transition-all hover:scale-105 flex items-center gap-2 border border-emerald-600/30">
                <RotateCcw size={18} />New Reading
              </button>
            </div>
          </div>
        )}

        {showShareCard && <ShareCard />}

        {isRevealing && (
          <div className="text-center">
            <div className="text-7xl mb-4" style={{ animation: 'cauldron 0.5s ease-in-out infinite' }}>🐈‍⬛</div>
            <p className="text-emerald-300 animate-pulse italic">The cat's eye glows... secrets emerge...</p>
          </div>
        )}

        {mode && (
          <button onClick={reset} className="mt-6 bg-gray-800/60 hover:bg-gray-700/60 text-emerald-300 py-2 px-6 rounded-full transition-all hover:scale-105 border border-emerald-600/30">
            ← Back to The Cat's Eye
          </button>
        )}
      </div>
    </div>
  );
}
