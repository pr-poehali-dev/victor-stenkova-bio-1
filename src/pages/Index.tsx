import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const TRACKS = [
  {
    id: 1,
    title: "Новая жизнь",
    url: "https://music.yandex.ru/album/41645898?utm_medium=copy_link&ref_id=6a9c6daf-25d2-4018-b1ec-ef9d309dc563",
    tag: "Премьера",
  },
  {
    id: 2,
    title: "Как лёд",
    url: "https://music.yandex.ru/album/41645898?utm_medium=copy_link&ref_id=6a9c6daf-25d2-4018-b1ec-ef9d309dc563",
    tag: "Хит",
  },
];

const BG_IMAGE =
  "https://cdn.poehali.dev/projects/983e6862-56c3-4cbb-b6cb-30778eb137f8/files/13712907-27d9-466c-9c61-8458719ccc9e.jpg";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "music", "contact"];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.4 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    ["home", "Главная"],
    ["about", "О мне"],
    ["music", "Музыка"],
    ["contact", "Контакты"],
  ];

  return (
    <div className="bg-stone-50 text-stone-900 font-body min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(250,248,245,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
        }}
      >
        <button onClick={() => scrollTo("home")} className="font-display text-lg tracking-[0.25em] uppercase italic text-stone-800">
          Artist
        </button>

        <div className="hidden md:flex items-center gap-9">
          {navLinks.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-[11px] tracking-[0.22em] uppercase font-medium transition-all duration-300 ${
                activeSection === id ? "text-stone-900" : "text-stone-400 hover:text-stone-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button className="md:hidden text-stone-700" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-stone-50/97 flex flex-col items-center justify-center gap-9" style={{ backdropFilter: "blur(12px)" }}>
          {navLinks.map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} className="font-display text-5xl italic text-stone-700 hover:text-stone-900 transition-colors">
              {label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 z-0">
          <img src={BG_IMAGE} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(245,240,235,0.4) 100%)" }} />
        </div>

        {/* Decorative lines */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-stone-300 to-transparent opacity-60" style={{ left: "8%" }} />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-stone-300 to-transparent opacity-60" style={{ right: "8%" }} />

        <div className="relative z-10 w-full px-10 md:px-24 pt-28">
          <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-8 opacity-0" style={{ animation: "fade-up 0.7s ease-out 0.3s forwards" }}>
            Официальный сайт артиста
          </p>

          <h1
            className="font-display font-light leading-[0.88] opacity-0"
            style={{
              fontSize: "clamp(5rem, 16vw, 15rem)",
              animation: "fade-up 1s ease-out 0.5s forwards",
              letterSpacing: "-0.02em",
            }}
          >
            Artist
          </h1>

          <div className="flex items-end gap-8 mt-10 opacity-0" style={{ animation: "fade-up 0.8s ease-out 0.9s forwards" }}>
            <div className="h-px flex-1 max-w-xs bg-stone-300" />
            <p className="font-display italic text-stone-500 text-lg">
              Музыка, которая остаётся
            </p>
          </div>

          <div className="flex gap-4 mt-12 opacity-0" style={{ animation: "fade-up 0.8s ease-out 1.2s forwards" }}>
            <button
              onClick={() => scrollTo("music")}
              className="px-8 py-3 bg-stone-900 text-stone-50 text-[11px] tracking-[0.25em] uppercase hover:bg-stone-700 transition-colors duration-300"
            >
              Слушать музыку
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="px-8 py-3 border border-stone-300 text-stone-600 text-[11px] tracking-[0.25em] uppercase hover:border-stone-500 hover:text-stone-800 transition-all duration-300"
            >
              Об артисте
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-40">
          <div className="w-px h-14 bg-gradient-to-b from-stone-400 to-transparent" />
          <span className="text-[9px] tracking-[0.4em] uppercase text-stone-400">Scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-10 md:px-24" style={{ background: "linear-gradient(to bottom, #faf8f5, #f0ebe3)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16">
            <div>
              <p className="text-[10px] tracking-[0.45em] uppercase text-stone-400 mb-6">01 — О мне</p>
              <div className="sticky top-32">
                <div className="flex gap-8 flex-col">
                  {[["8+", "лет в музыке"], ["50+", "живых концертов"], ["2", "сингла"]].map(([n, l]) => (
                    <div key={l} className="border-l-2 border-stone-200 pl-5">
                      <p className="font-display text-5xl font-light text-stone-800">{n}</p>
                      <p className="text-[10px] tracking-widest uppercase text-stone-400 mt-1">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-6xl md:text-7xl font-light italic leading-tight mb-10 text-stone-800">
                Звук,<br />который<br />чувствуют
              </h2>
              <div className="h-px w-16 bg-stone-300 mb-8" />
              <p className="text-stone-600 leading-loose text-sm mb-5 max-w-lg">
                Артист, создающий авторскую музыку на пересечении жанров. Каждый трек — это честный разговор с теми, кто умеет слушать.
              </p>
              <p className="text-stone-500 leading-loose text-sm max-w-lg">
                Живые выступления по всей стране. Авторские тексты. Музыка, в которой узнаёшь себя.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MUSIC */}
      <section id="music" className="py-32 px-10 md:px-24 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] tracking-[0.45em] uppercase text-stone-400 mb-6">02 — Музыка</p>
          <h2 className="font-display text-6xl md:text-7xl font-light italic leading-tight mb-16 text-stone-800">
            Треки
          </h2>

          <div className="space-y-5">
            {TRACKS.map((track, i) => (
              <div
                key={track.id}
                className="group border border-stone-200 hover:border-stone-400 transition-all duration-300 bg-white hover:bg-stone-50"
                style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.03)" }}
              >
                <div className="flex items-center gap-6 p-7">
                  <span className="font-display text-4xl font-light text-stone-200 group-hover:text-stone-300 transition-colors w-10 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-2xl italic font-light text-stone-800 group-hover:text-stone-900 transition-colors">
                      {track.title}
                    </p>
                    <span className="inline-block mt-1 text-[9px] tracking-[0.3em] uppercase text-stone-400 border border-stone-200 px-2 py-0.5">
                      {track.tag}
                    </span>
                  </div>
                  <a
                    href={track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-stone-50 text-[10px] tracking-[0.25em] uppercase hover:bg-stone-700 transition-colors duration-300 shrink-0"
                  >
                    <Icon name="ExternalLink" size={12} />
                    Слушать
                  </a>
                </div>

                {/* Яндекс Музыка badge */}
                <div className="border-t border-stone-100 px-7 py-3 flex items-center gap-2">
                  <Icon name="Music2" size={12} className="text-stone-300" />
                  <span className="text-[9px] tracking-[0.3em] uppercase text-stone-300">Яндекс Музыка</span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-stone-400 text-xs text-center tracking-wide">
            Нажми «Слушать» — откроется трек на Яндекс Музыке
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-10 md:px-24" style={{ background: "linear-gradient(to bottom, #f0ebe3, #faf8f5)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] tracking-[0.45em] uppercase text-stone-400 mb-6">03 — Контакты</p>
          <h2 className="font-display text-6xl md:text-7xl font-light italic leading-tight mb-6 text-stone-800">
            Напиши<br />мне
          </h2>
          <p className="text-stone-500 text-sm mb-16 max-w-md leading-relaxed">
            По вопросам концертов, сотрудничества или просто поговорить о музыке.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-14">
            {[
              { icon: "Mail", label: "Email", value: "artist@email.com" },
              { icon: "Instagram", label: "Instagram", value: "@artist" },
              { icon: "Music2", label: "VK Музыка", value: "vk.com/artist" },
              { icon: "Youtube", label: "YouTube", value: "youtube.com/@artist" },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-5 bg-white border border-stone-100 hover:border-stone-300 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-9 h-9 bg-stone-100 group-hover:bg-stone-200 flex items-center justify-center transition-colors shrink-0">
                  <Icon name={icon} size={15} className="text-stone-500" />
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.35em] uppercase text-stone-400 mb-0.5">{label}</p>
                  <p className="text-stone-700 text-sm group-hover:text-stone-900 transition-colors">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-stone-100 p-8" style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.04)" }}>
            <h3 className="font-display text-2xl italic text-stone-700 mb-6">Форма обратной связи</h3>
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Ваше имя"
                className="bg-stone-50 border border-stone-200 text-stone-800 placeholder-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-stone-50 border border-stone-200 text-stone-800 placeholder-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-400 transition-colors"
              />
            </div>
            <textarea
              placeholder="Ваше сообщение..."
              rows={4}
              className="w-full bg-stone-50 border border-stone-200 text-stone-800 placeholder-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-400 transition-colors mb-4 resize-none"
            />
            <button className="px-10 py-3 bg-stone-900 text-stone-50 text-[11px] tracking-[0.3em] uppercase hover:bg-stone-700 transition-colors duration-300">
              Отправить
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-100 py-8 px-10 md:px-24 flex flex-col md:flex-row items-center justify-between gap-4 bg-stone-50">
        <p className="font-display italic text-stone-400 text-sm">Artist — 2026</p>
        <p className="text-stone-300 text-[10px] tracking-widest uppercase">Все права защищены</p>
      </footer>
    </div>
  );
}
