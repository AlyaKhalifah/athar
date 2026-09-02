/*
 * أثر / الذاكرة الملموسة: warm editorial modernism, ivory paper, sidr-green ink,
 * asymmetric composition, quiet reveals, and the handwritten trace as a recurring motif.
 */
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpLeft, Copy, Eye, Feather, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";

const memories = [
  { label: "صوت بعيد", detail: "أذان يمرّ من نافذة مفتوحة، فيعيد للوقت مكانه.", glyph: "01" },
  { label: "رائحة", detail: "قهوة تُصبّ ببطء. فنجان صغير، وحكاية تكبر.", glyph: "02" },
  { label: "مكان", detail: "بيت قديم يعرف أسماءنا قبل أن نناديه.", glyph: "03" },
  { label: "امتداد", detail: "بحرٌ لا يشرح نفسه، لكنه يترك ملحه في الذاكرة.", glyph: "04" },
  { label: "وعد", detail: "طريق حديث، ونخلة تقف عند حافته كأنها تعرف القادم.", glyph: "05" },
];

const wallWords = [
  ["أهل", "—"], ["بيت", "—"], ["أمان", "—"], ["قهوة", "—"], ["طفولة", "—"],
  ["بحر", "—"], ["طموح", "—"], ["جدّة", "—"], ["سوالف", "—"], ["غيمة", "—"],
  ["ذكريات", "—"], ["نخلة", "—"], ["وعد", "—"], ["رجعة", "—"], ["أثر", "—"],
];

function todayArabic() {
  return new Intl.DateTimeFormat("ar-SA", { day: "numeric", month: "long", year: "numeric" }).format(new Date());
}

export default function Home() {
  const [word, setWord] = useState("");
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [sound, setSound] = useState(false);
  const [wall, setWall] = useState(false);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  const activeWord = word.trim() || "ذكريات";
  const progress = Math.round((revealed / memories.length) * 100);
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
    if (revealed < memories.length) setRevealed((value) => value + 1);
    else setShowCard(true);
  };

  const copyCard = async () => {
    await navigator.clipboard?.writeText(cardText);
    toast("نُسخت بطاقتك إلى الذاكرة.");
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
              {revealed === 0 ? <><p className="serif-note">هناك أشياء لا تظهر من أول نظرة.</p><p>اضغط على الزر. كل كشف يترك علامة جديدة.</p></> : <><span className="reveal-index">{memories[revealed - 1].glyph} — {memories[revealed - 1].label}</span><h3>{memories[revealed - 1].detail}</h3><p>طبقة جديدة من ذاكرتك، أضيفت إلى الأثر.</p></>}
              <button className="reveal-button" onClick={revealNext}>{revealed === memories.length ? "اصنع بطاقتي" : revealed === 0 ? "اكشف أول أثر" : "اكشف التالي"}<ArrowLeft size={17} /></button>
            </div>
          </div>
        </div>
      </section>

      {showCard && <section className="card-section" id="card">
        <div className="section-aside"><span>ما بقي</span><b>٠٣ / ٠٣</b></div>
        <div className="memory-card-wrap">
          <div className="card-intro"><p className="eyebrow">هذه ليست صورة السعودية</p><h2>هذه الأشياء<br /><em>التي جعلتها السعودية.</em></h2></div>
          <article className="memory-card" aria-label="بطاقتك الرقمية">
            <div className="card-top"><span>أثر / ٩٥</span><span>{todayArabic()}</span></div>
            <div className="card-center"><span>السعودية بالنسبة لي هي</span><strong>{activeWord}</strong><span className="card-line" /></div>
            <div className="card-bottom"><span>{name || "ذاكرة شخصية"}</span><span className="card-mark"><i /><i /><i /></span></div>
          </article>
          <div className="card-actions"><button className="ink-button" onClick={copyCard}><Copy size={16} /> انسخ البطاقة</button><button className="text-button" onClick={() => setWall(true)}><Eye size={16} /> شاهد الذاكرة الجماعية</button></div>
          <div className="add-memory"><p>هل تريد أن تضيف ذاكرتك إلى ذاكرة السعودية؟</p><div><input aria-label="اسمك" value={name} onChange={(event) => setName(event.target.value)} placeholder="اسمك (اختياري)" /><button onClick={saveMemory} disabled={saved}>{saved ? "تمت الإضافة" : "أضف أثري"}</button></div></div>
        </div>
      </section>}

      <section className={`wall ${wall ? "wall-visible" : ""}`} id="wall">
        <div className="wall-heading"><div><p className="eyebrow">THE COLLECTIVE MEMORY</p><h2>آلاف الكلمات،<br /><em>وطن واحد.</em></h2></div><p className="wall-description">كل كلمة هنا تركها شخص ما. معًا، لا نصنع صورة للسعودية؛ نصنع المساحة التي تتسع لكل ما تعنيه.</p></div>
        <div className="word-wall">{wallWords.map(([item, by], index) => <span key={item} style={{ "--i": index } as React.CSSProperties}>{item}<small>{by}</small></span>)}</div>
        <div className="wall-footer"><span>ذاكرة مفتوحة للجميع</span><span className="wall-counter">{wallWords.length + (saved ? 1 : 0)} أثرًا محفوظًا في هذه اللحظة</span><Feather size={18} /></div>
      </section>

      <footer className="footer"><span className="brand"><span className="brand-mark"><i /><i /><i /></span> أثر</span><span>صُنع من الذاكرة، لا من الصور.</span><span>اليوم الوطني السعودي ٩٥</span></footer>
    </main>
  );
}
