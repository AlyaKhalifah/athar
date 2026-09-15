/*
 * أثر / الذاكرة الملموسة: warm editorial modernism, ivory paper, sidr-green ink,
 * asymmetric composition, quiet reveals, and the handwritten trace as a recurring motif.
 */
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpLeft, Download, Eye, Feather, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";

const buildMemories = (word: string) => {
  const normalized = word.trim().toLowerCase();
  const profile = [
    {
      words: ["بيت", "أهل", "عائلة", "منزل"],
      details: [
        `في «${word}» تبدأ الحكاية من عتبة تعرف خطواتك قبل أن تصل.`,
        `لـ«${word}» صوت مفتاح، وضحكة تأتي من الغرفة المجاورة.`,
        `ملمس «${word}» يدٌ تربّت على كتفك وتقول: أنت في مكانك.`,
        `يسكن «${word}» في نافذة مضيئة، وفي اسم ينادى بحب.`,
        `يبقى من «${word}» شعور العودة، حتى عندما نكون بعيدين.`,
      ],
    },
    {
      words: ["قهوة", "فنجان", "دلة"],
      details: [
        `في «${word}» صباحٌ يتأنى كي يجمع الوجوه حوله.`,
        `لـ«${word}» صوت صبّة هادئة تسبق الكلام وتفتح المجلس.`,
        `ملمس «${word}» دفء فنجان بين يدين تعرفان معنى الرفقة.`,
        `تسكن «${word}» على طرف مجلس، حيث تبدأ السوالف بلا موعد.`,
        `يبقى من «${word}» طعم لحظة قالت لنا: خذ وقتك.`,
      ],
    },
    {
      words: ["بحر", "مكة", "نخلة", "جدة", "جدّة"],
      details: [
        `في «${word}» طريقٌ مفتوح يجعل القلب أخفّ كلما مشى.`,
        `لـ«${word}» صوت موج، أو دعاء، أو ريح تمرّ بين سعف النخل.`,
        `ملمس «${word}» ملحٌ دافئ وشمسٌ تحفظ لون الأيام.`,
        `تسكن «${word}» في جهة نعرفها حتى ونحن لا نراها.`,
        `يبقى من «${word}» أفقٌ واسع يعلّمنا أن المكان يمكن أن يحتوينا.`,
      ],
    },
    {
      words: ["وطن", "سعودية", "بلد", "كرم", "أمان", "سلام"],
      details: [
        `في «${word}» تتسع الحكاية لأكثر من قلب وأكثر من بيت.`,
        `لـ«${word}» صوت خطوات كثيرة تمشي في اتجاه واحد.`,
        `ملمس «${word}» يدٌ ممدودة قبل أن نطلب، وبابٌ لا يُغلق.`,
        `تسكن «${word}» في التفاصيل الصغيرة التي تجعل الغريب قريبًا.`,
        `يبقى من «${word}» وعدٌ هادئ بأن القادم يمكن أن يكون أجمل.`,
      ],
    },
  ].find(({ words }) => words.some((candidate) => normalized.includes(candidate)));

  const details = profile?.details || [
    `من «${word}» يبدأ شعور صغير يكبر كلما منحناه وقتًا.`,
    `لـ«${word}» نبرة خاصة؛ كأنها تنادينا باسم لا يسمعه سوانا.`,
    `ملمس «${word}» دفءٌ لا يحتاج إلى شرح كي يصل.`,
    `تسكن «${word}» في مكان أو شخص أو لحظة نعود إليها من الداخل.`,
    `يبقى من «${word}» أثرٌ دافئ لا يشبه أي ذاكرة أخرى.`,
  ];

  return details.map((detail, index) => ({
    label: ["البداية", "صوتها", "ملمسها", "مكانها", "ما يبقى"][index],
    detail,
    glyph: String(index + 1).padStart(2, "0"),
  }));
};

const buildCardMessage = (word: string) => {
  const normalized = word.trim().toLowerCase();
  const matched = [
    { words: ["بيت", "أهل", "عائلة", "منزل"], line: `في «${word}» دفءٌ يعرف الطريق إلى القلب، حتى لو تغيّر المكان.` },
    { words: ["أمان", "سلام", "طمأنينة"], line: `في «${word}» مساحة نعود إليها ونحن مطمئنون أن لنا مكانًا.` },
    { words: ["قهوة", "فنجان", "دلة"], line: `في «${word}» صباحٌ صغير يجمعنا قبل أن تبدأ الحكايات.` },
    { words: ["بحر", "مكة", "نخلة", "جدة", "جدّة"], line: `في «${word}» مكانٌ يترك ظله فينا، حتى بعد أن نبتعد عنه.` },
    { words: ["طفولة", "ذكريات", "حنين", "ماضي"], line: `في «${word}» صوتٌ قديم لا يبهت؛ يكفي أن نتذكره كي نبتسم.` },
    { words: ["وطن", "سعودية", "بلد", "كرم"], line: `في «${word}» اتساعٌ يشبهنا؛ كثير من القلوب، وبيت واحد.` },
  ].find(({ words }) => words.some((candidate) => normalized.includes(candidate)));

  return matched?.line || `في «${word}» معنى خاص بك؛ أثرٌ دافئ لا يشبه أي ذاكرة أخرى.`;
};

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
  const cardMessage = useMemo(() => buildCardMessage(activeWord), [activeWord]);

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

  const downloadCard = async () => {
    const scale = 2;
    const cardWidth = 540;
    const cardHeight = 315;
    const canvas = document.createElement("canvas");
    canvas.width = cardWidth * scale;
    canvas.height = cardHeight * scale;
    const context = canvas.getContext("2d");
    if (!context) {
      toast("تعذر تجهيز صورة البطاقة.");
      return;
    }

    await document.fonts?.ready;
    context.scale(scale, scale);
    context.direction = "rtl";
    context.textBaseline = "alphabetic";
    context.fillStyle = "#315c4b";
    context.fillRect(0, 0, cardWidth, cardHeight);

    const roundedRect = (x: number, y: number, width: number, height: number, radius: number) => {
      context.beginPath();
      context.moveTo(x + radius, y);
      context.arcTo(x + width, y, x + width, y + height, radius);
      context.arcTo(x + width, y + height, x, y + height, radius);
      context.arcTo(x, y + height, x, y, radius);
      context.arcTo(x, y, x + width, y, radius);
      context.closePath();
    };

    context.strokeStyle = "rgba(244,240,233,.34)";
    context.lineWidth = 1;
    roundedRect(12, 12, cardWidth - 24, cardHeight - 24, 2);
    context.stroke();

    // The full tactile ornament: ٩, outlined ٦, three dots, and the circular trace.
    context.save();
    context.textAlign = "left";
    context.fillStyle = "#e8c9af";
    context.globalAlpha = 0.92;
    context.font = '700 74px "DM Mono", monospace';
    context.fillText("٩", 25, 105);
    context.globalAlpha = 0.5;
    context.font = '700 74px "DM Mono", monospace';
    context.strokeStyle = "#e8c9af";
    context.lineWidth = 1;
    context.strokeText("٦", 58, 140);
    context.globalAlpha = 0.82;
    context.fillStyle = "#e8c9af";
    [[89, 14], [78, 75], [21, 95]].forEach(([x, y]) => {
      context.beginPath();
      context.arc(x, y, 2.5, 0, Math.PI * 2);
      context.fill();
    });
    context.globalAlpha = 0.28;
    context.strokeStyle = "#e8c9af";
    context.beginPath();
    context.arc(-18, cardHeight + 18, 120, Math.PI * 1.12, Math.PI * 1.82);
    context.stroke();
    context.restore();

    context.fillStyle = "rgba(244,240,233,.74)";
    context.font = '500 10px "DM Mono", monospace';
    context.textAlign = "right";
    context.fillText("أثر / ٩٦", cardWidth - 25, 24);
    context.textAlign = "left";
    context.fillText(todayArabic(), 25, 24);

    context.textAlign = "right";
    context.fillStyle = "rgba(244,240,233,.75)";
    context.font = '500 12px "IBM Plex Sans Arabic", Arial, sans-serif';
    context.fillText("السعودية بالنسبة لي هي", cardWidth - 25, 125);
    context.fillStyle = "#e8c9af";
    context.font = '700 38px "Noto Kufi Arabic", Arial, sans-serif';
    context.fillText(activeWord, cardWidth - 25, 173);

    context.fillStyle = "#f0ded0";
    context.font = '400 10px "IBM Plex Sans Arabic", Arial, sans-serif';
    const messageWords = `«${cardMessage}»`.split(" ");
    const messageLines: string[] = [];
    let messageLine = "";
    messageWords.forEach((part) => {
      const candidate = messageLine ? `${messageLine} ${part}` : part;
      if (context.measureText(candidate).width > 430 && messageLine) {
        messageLines.push(messageLine);
        messageLine = part;
      } else {
        messageLine = candidate;
      }
    });
    if (messageLine) messageLines.push(messageLine);
    messageLines.slice(0, 2).forEach((line, index) => context.fillText(line, cardWidth - 25, 208 + index * 14));
    context.strokeStyle = "#d0a98d";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(cardWidth - 25, 233);
    context.lineTo(cardWidth - 110, 233);
    context.stroke();

    context.fillStyle = "rgba(244,240,233,.78)";
    context.font = '500 10px "IBM Plex Sans Arabic", Arial, sans-serif';
    context.fillText(name || "ذاكرة شخصية", cardWidth - 25, cardHeight - 25);
    context.textAlign = "left";
    context.font = '500 9px "DM Mono", monospace';
    context.fillText("ATHAR / MEMORY", 25, cardHeight - 25);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.96));
    if (!blob) {
      toast("تعذر إنشاء صورة البطاقة.");
      return;
    }

    const file = new File([blob], "athar-memory.jpg", { type: "image/jpeg" });
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "بطاقة أثر", text: `أثر / ٩٦ — ${activeWord}` });
        toast("تم تجهيز بطاقتك للمشاركة.");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "athar-memory.jpg";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 10000);
    toast("تم تنزيل بطاقتك كصورة JPEG.");
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
        <div className="edition"><span>اليوم الوطني</span><b>٩٦</b></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-number" aria-hidden="true">96</div>
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
            <div className="card-ornament" aria-hidden="true"><span>٩</span><span>٦</span><i /><i /><i /></div>
            <div className="card-top"><span>أثر / ٩٦</span><span>{todayArabic()}</span></div>
            <div className="card-center"><span>السعودية بالنسبة لي هي</span><strong>{activeWord}</strong><span className="card-quote">«{cardMessage}»</span><span className="card-line" /></div>
            <div className="card-bottom"><span>{name || "ذاكرة شخصية"}</span><span className="card-mark"><i /><i /><i /></span></div>
          </article>
          <div className="card-actions"><button className="ink-button" onClick={downloadCard}><Download size={16} /> حمّل البطاقة JPG</button><button className="text-button" onClick={shareCard}><ArrowUpLeft size={16} /> انسخ رابط بطاقتي</button><button className="text-button" onClick={() => { setWall(true); document.getElementById("wall")?.scrollIntoView({ behavior: "smooth" }); }}><Eye size={16} /> شاهد الذاكرة الجماعية</button></div>
          <div className="add-memory"><p>هل تريد أن تضيف ذاكرتك إلى ذاكرة السعودية؟</p><div><input aria-label="اسمك" value={name} onChange={(event) => setName(event.target.value)} placeholder="اسمك (اختياري)" /><button onClick={saveMemory} disabled={saved}>{saved ? "تمت الإضافة" : "أضف أثري"}</button></div></div>
        </div>
      </section>}

      <section className={`wall ${wall ? "wall-visible" : "wall-scattered"}`} id="wall">
        <div className="wall-heading"><div><p className="eyebrow">THE COLLECTIVE MEMORY</p><h2>آلاف الكلمات،<br /><em>وطن واحد.</em></h2></div><div className="wall-side"><p className="wall-description">كل كلمة هنا تركها شخص ما. معًا، لا نصنع صورة للسعودية؛ نصنع المساحة التي تتسع لكل ما تعنيه.</p><button className="text-button wall-reveal" aria-pressed={wall} onClick={() => setWall((value) => !value)}>{wall ? "أعد الكلمات إلى بدايتها" : "شاهد الكلمات وهي تتجمع"} <ArrowLeft size={16} /></button></div></div>
        <div className="word-wall" aria-label={wall ? "كلمات الذاكرة وقد تجمعت في شكل رقم ٩٦" : "كلمات الذاكرة قبل التجميع"}>{displayedWallWords.map(([item, by], index) => { const position = wallPositions[index] || [50, 50]; return <span key={`${item}-${index}`} style={{ "--i": index, "--x": position[0], "--y": position[1] } as React.CSSProperties}>{item}<small>{by}</small></span>; })}</div>
        <div className="wall-footer"><span>ذاكرة مفتوحة للجميع</span><span className="wall-counter">{displayedWallWords.length} أثرًا محفوظًا في هذه اللحظة</span><Feather size={18} /></div>
      </section>

      <footer className="footer"><span className="brand"><span className="brand-mark"><i /><i /><i /></span> أثر</span><span>صُنع من الذاكرة، لا من الصور.</span><span>اليوم الوطني السعودي ٩٦</span></footer>
    </main>
  );
}
