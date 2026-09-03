/*
 * أثر / الذاكرة الملموسة: warm editorial modernism, ivory paper, sidr-green ink,
 * asymmetric composition, quiet reveals, and the handwritten trace as a recurring motif.
 */
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpLeft, Copy, Eye, Feather, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";

const buildMemories = (word: string) => [
  { label: "البداية", detail: `من كلمة «${word}» يبدأ الخيط؛ شيء صغير يفتح بابًا كبيرًا.`, glyph: "01" },
  { label: "صوتها", detail: `في «${word}» نبرة بيت يعرفك، وصوت يعود إليك مهما ابتعدت.`, glyph: "02" },
  { label: "ملمسها", detail: `لو كان لـ«${word}» ملمس، لكان دفء يدٍ تمسك بك قبل أن تسأل.`, glyph: "03" },
  { label: "مكانها", detail: `تسكن «${word}» في طريق، أو فنجان، أو نافذة تطل على أول الحكاية.`, glyph: "04" },
  { label: "ما يبقى", detail: `حين تتغير التفاصيل، تبقى «${word}» كأثر هادئ لا يحتاج إلى صورة.`, glyph: "05" },
];

const sharedState = () => {
  const params = new URLSearchParams(window.location.search);
  const pathWord = window.location.pathname.startsWith("/memory/") ? decodeURIComponent(window.location.pathname.split("/")[2] || "") : "";
  return { word: params.get("word") || pathWord, name: params.get("name") || "" };
};

const wallWords = [
  ["أهل", "—"], ["بيت", "—"], ["أمان", "—"], ["قهوة", "—"], ["طفولة", "—"],
  ["بحر", "—"], ["طموح", "—"], ["جدّة", "—"], ["سوالف", "—"], ["غيمة", "—"],
  ["ذكريات", "—"], ["نخلة", "—"], ["وعد", "—"], ["رجعة", "—"], ["أثر", "—"],
  ["مكة", "—"], ["وطن", "—"], ["مستقبل", "—"], ["سعودية", "—"], ["حنين", "—"], ["ضحكة", "—"],
  ["جذور", "—"], ["كرم", "—"], ["سفر", "—"], ["وعد", "—"], ["أمان", "—"], ["قبلة", "—"], ["عمر", "—"], ["سوالف", "—"], ["صبح", "—"], ["نخلة", "—"], ["أثر", "—"],
];

const wallPositions = [
  [27, 18], [35, 18], [43, 18], [43, 34], [43, 50], [35, 50], [27, 50], [27, 68], [35, 80], [43, 80], [43, 66],
  [58, 18], [68, 18], [78, 18], [58, 34], [58, 50], [68, 50], [78, 50], [78, 66], [78, 80], [68, 80], [58, 80],
];

function todayArabic() {
  return new Intl.DateTimeFormat("ar-SA", { day: "numeric", month: "long", year: "numeric" }).format(new Date());
}

export default function Home() {
  const shared = useMemo(sharedState, []);
  const [word, setWord] = useState(shared.word);
  const [started, setStarted] = useState(Boolean(shared.word));
  const [revealed, setRevealed] = useState(0);
  const [showCard, setShowCard] = useState(Boolean(shared.word));
  const [sound, setSound] = useState(false);
  const [wall, setWall] = useState(() => new URLSearchParams(window.location.search).get("wall") === "1");
  const [name, setName] = useState(shared.name);
  const [saved, setSaved] = useState(false);

  const activeWord = word.trim() || "ذكريات";
  const journeyMemories = useMemo(() => buildMemories(activeWord), [activeWord]);
  const progress = Math.round((revealed / journeyMemories.length) * 100);
  const displayedWallWords = saved ? [...wallWords, [activeWord, name || "أنت"]] : wallWords;
  const cardText = useMemo(() => `السعودية بالنسبة لي هي: ${activeWord}\n${todayArabic()}\nأثر`, [activeWord]);

  const begin = () => {
    if (!word.trim()) {
      toast("اكتب كلمة واحدة أولًا؛ كلمة تشبهك.");
      return;
    }
    setStarted(true);
    document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" });
  };

  const revealNext = () => {
    if (revealed < journeyMemories.length) setRevealed((value) => value + 1);
    else setShowCard(true);
  };

  const copyCard = async () => {
    await navigator.clipboard?.writeText(cardText);
    toast("نُسخت بطاقتك إلى الذاكرة.");
  };

  const shareCard = async () => {
    const slug = activeWord.slice(0, 32) || "athar";
    const url = `${window.location.origin}/memory/${encodeURIComponent(slug)}?word=${encodeURIComponent(activeWord)}${name ? `&name=${encodeURIComponent(name)}` : ""}`;
    window.history.replaceState({}, "", url);
    await navigator.clipboard?.writeText(url);
    toast("نُسخ رابط بطاقتك الخاصة.");
  };

  const saveMemory = () => {
    localStorage.setItem("athar-memory", JSON.stringify({ word: activeWord, name, date: new Date().toISOString() }));
    setSaved(true);
    toast("أُضيفت كلمتك إلى هذا المتصفح.");
  };

  return (
    <main className="athar-shell" dir="rtl">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="أثر، العودة للبداية">
          <span className="brand-mark"><i /><i /><i /></span>
          <span>أثر</span>
        </a>
        <nav className="topnav" aria-label="التنقل الرئيسي">
          <a href="#story">الفكرة</a>
          <a href="#wall">ذاكرة السعودية</a>
        </nav>
        <div className="edition"><span>اليوم الوطني</span><b>٩٥</b></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-number" aria-hidden="true">95</div>
        <div className="hero-copy">
          <p className="eyebrow"><span className="rule" /> تجربة ذاكرة رقمية <span>٠١ / ٠٣</span></p>
          <h1>لو اختفت كل الصور،<br /><em>كيف ستتذكر السعودية؟</em></h1>
          <p className="hero-intro">ليست خريطة. ليست صورة. اترك كلمة واحدة فقط، ودعها تقودك إلى ما يبقى.</p>
          <div className="word-entry">
            <label htmlFor="memory-word">الكلمة التي تمثّل السعودية بالنسبة لك</label>
            <div className="input-row">
              <input id="memory-word" value={word} onChange={(event) => setWord(event.target.value)} onKeyDown={(event) => event.key === "Enter" && begin()} maxLength={24} placeholder="أهل، بيت، طموح..." />
              <button className="ink-button" onClick={begin}>ابدأ الرحلة <ArrowLeft size={17} /></button>
            </div>
            <span className="input-note">كلمة واحدة. أثر واحد. ذاكرة لا تشبه سواها.</span>
          </div>
        </div>
        <div className="hero-foot"><span>مرّر لتبدأ</span><ArrowUpLeft size={16} /><span className="vertical-line" /></div>
      </section>

      <section className={`journey ${started ? "journey-started" : ""}`} id="journey">
        <div className="section-aside"><span>رحلة قصيرة</span><b>٠٢ / ٠٣</b></div>
        <div className="journey-main">
          <div className="journey-heading">
            <div><p className="eyebrow">كل كلمة تفتح نافذة</p><h2>{started ? `لنكتشف ما حول «${activeWord}»` : "ابدأ من كلمتك"}</h2></div>
            <button className="sound-toggle" onClick={() => setSound(!sound)} aria-label={sound ? "إيقاف الصوت" : "تشغيل الصوت"}>{sound ? <Volume2 size={17} /> : <VolumeX size={17} />} <span>{sound ? "الصوت يعمل" : "الصوت متوقف"}</span></button>
          </div>
          <div className="progress-wrap"><div className="progress-meta"><span>{String(revealed).padStart(2, "0")} / 05</span><span>{progress}%</span></div><div className="progress-track"><span style={{ width: `${Math.max(progress, 2)}%` }} /></div></div>
          <div className="reveal-stage">
            <div className="trace-ring"><span>{revealed === 0 ? "أثر" : String(revealed).padStart(2, "0")}</span></div>
            <div className="reveal-copy">
              {revealed === 0 ? <><p className="serif-note">هناك أشياء لا تظهر من أول نظرة.</p><p>اضغط على الزر. كل كشف يترك علامة جديدة.</p></> : <><span className="reveal-index">{journeyMemories[revealed - 1].glyph} — {journeyMemories[revealed - 1].label}</span><h3>{journeyMemories[revealed - 1].detail}</h3><p>طبقة جديدة من ذاكرتك، أضيفت إلى الأثر.</p></>}
              <button className="reveal-button" onClick={revealNext}>{revealed === journeyMemories.length ? "اصنع بطاقتي" : revealed === 0 ? "اكشف أول أثر" : "اكشف التالي"}<ArrowLeft size={17} /></button>
            </div>
          </div>
        </div>
      </section>

      {showCard && <section className="card-section" id="card">
        <div className="section-aside"><span>ما بقي</span><b>٠٣ / ٠٣</b></div>
        <div className="memory-card-wrap">
          <div className="card-intro"><p className="eyebrow">هذه ليست صورة السعودية</p><h2>هذه الأشياء<br /><em>التي جعلتها السعودية.</em></h2></div>
            <article className="memory-card" aria-label="بطاقتك الرقمية">
            <div className="card-ornament" aria-hidden="true"><span>٩</span><span>٥</span><i /><i /><i /></div>
            <div className="card-top"><span>أثر / ٩٥</span><span>{todayArabic()}</span></div>
            <div className="card-center"><span>السعودية بالنسبة لي هي</span><strong>{activeWord}</strong><span className="card-quote">«الكلمة التي بقيت، حين اختفت الصور.»</span><span className="card-line" /></div>
            <div className="card-bottom"><span>{name || "ذاكرة شخصية"}</span><span className="card-mark"><i /><i /><i /></span></div>
          </article>
          <div className="card-actions"><button className="ink-button" onClick={copyCard}><Copy size={16} /> انسخ البطاقة</button><button className="text-button" onClick={shareCard}><ArrowUpLeft size={16} /> انسخ رابط بطاقتي</button><button className="text-button" onClick={() => { setWall(true); document.getElementById("wall")?.scrollIntoView({ behavior: "smooth" }); }}><Eye size={16} /> شاهد الذاكرة الجماعية</button></div>
          <div className="add-memory"><p>هل تريد أن تضيف ذاكرتك إلى ذاكرة السعودية؟</p><div><input aria-label="اسمك" value={name} onChange={(event) => setName(event.target.value)} placeholder="اسمك (اختياري)" /><button onClick={saveMemory} disabled={saved}>{saved ? "تمت الإضافة" : "أضف أثري"}</button></div></div>
        </div>
      </section>}

      <section className={`wall ${wall ? "wall-visible" : "wall-scattered"}`} id="wall">
        <div className="wall-heading"><div><p className="eyebrow">THE COLLECTIVE MEMORY</p><h2>آلاف الكلمات،<br /><em>وطن واحد.</em></h2></div><div className="wall-side"><p className="wall-description">كل كلمة هنا تركها شخص ما. معًا، لا نصنع صورة للسعودية؛ نصنع المساحة التي تتسع لكل ما تعنيه.</p><button className="text-button wall-reveal" aria-pressed={wall} onClick={() => setWall((value) => !value)}>{wall ? "أعد الكلمات إلى بدايتها" : "شاهد الكلمات وهي تتجمع"} <ArrowLeft size={16} /></button></div></div>
        <div className="word-wall" aria-label={wall ? "كلمات الذاكرة وقد تجمعت في شكل رقم ٩٥" : "كلمات الذاكرة قبل التجميع"}>{displayedWallWords.map(([item, by], index) => { const position = wallPositions[index] || [50, 50]; return <span key={`${item}-${index}`} style={{ "--i": index, "--x": position[0], "--y": position[1] } as React.CSSProperties}>{item}<small>{by}</small></span>; })}</div>
        <div className="wall-footer"><span>ذاكرة مفتوحة للجميع</span><span className="wall-counter">{displayedWallWords.length} أثرًا محفوظًا في هذه اللحظة</span><Feather size={18} /></div>
      </section>

      <footer className="footer"><span className="brand"><span className="brand-mark"><i /><i /><i /></span> أثر</span><span>صُنع من الذاكرة، لا من الصور.</span><span>اليوم الوطني السعودي ٩٥</span></footer>
    </main>
  );
}
