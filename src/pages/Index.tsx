import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const TRACKS = [
  { id: 1, title: "Тёмная сторона", duration: "3:42", genre: "Electronic" },
  { id: 2, title: "Между строк", duration: "4:15", genre: "Alternative" },
  { id: 3, title: "Полночный дождь", duration: "5:03", genre: "Ambient" },
  { id: 4, title: "Вечность", duration: "3:58", genre: "Electronic" },
  { id: 5, title: "Отражение", duration: "4:27", genre: "Alternative" },
];

const ARTIST_IMAGE =
  "https://cdn.poehali.dev/projects/983e6862-56c3-4cbb-b6cb-30778eb137f8/files/4e451ce7-f9ba-4d20-86cc-5879bdc55caf.jpg";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sections = ["home", "about", "music", "contact"];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const playTrack = (id: number) => {
    if (currentTrack === id && isPlaying) {
      setIsPlaying(false);
      if (progressRef.current) clearInterval(progressRef.current);
    } else {
      setCurrentTrack(id);
      setIsPlaying(true);
      setProgress(0);
      if (progressRef.current) clearInterval(progressRef.current);
      progressRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(progressRef.current!);
            setIsPlaying(false);
            return 0;
          }
          return p + 0.5;
        });
      }, 150);
    }
  };

  useEffect(
    () => () => {
      if (progressRef.current) clearInterval(progressRef.current);
    },
    []
  );

  return (
    <div className="bg-obsidian text-white font-body min-h-screen overflow-x-hidden">
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
        style={{
          backdropFilter: "blur(20px)",
          background: "rgba(10,10,10,0.8)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div className="font-display text-xl tracking-[0.3em] text-gold uppercase italic">
          Artist
        </div>

        <div className="hidden md:flex gap-10">
          {[
            ["home", "Главная"],
            ["about", "О мне"],
            ["music", "Музыка"],
            ["contact", "Контакты"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                activeSection === id
                  ? "text-gold"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          className="md:hidden text-gold"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-obsidian/95 flex flex-col items-center justify-center gap-10"
          style={{ backdropFilter: "blur(20px)" }}
        >
          {[
            ["home", "Главная"],
            ["about", "О мне"],
            ["music", "Музыка"],
            ["contact", "Контакты"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-display text-4xl italic text-white/80 hover:text-gold transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={ARTIST_IMAGE}
            alt="Artist"
            className="w-full h-full object-cover opacity-40"
            style={{ filter: "grayscale(30%) contrast(1.2)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,1) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 70% 50%, rgba(201,168,76,0.05) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6">
          <p
            className="text-xs tracking-[0.4em] uppercase text-gold mb-6 opacity-0"
            style={{ animation: "fade-up 0.8s ease-out 0.2s forwards" }}
          >
            Официальный сайт
          </p>
          <h1
            className="font-display text-[clamp(5rem,15vw,14rem)] leading-none font-light tracking-tight opacity-0"
            style={{ animation: "fade-up 1s ease-out 0.4s forwards" }}
          >
            ARTIST
          </h1>
          <div
            className="h-px bg-gold mx-auto mt-6 opacity-0"
            style={{
              animation: "line-expand 1.2s ease-out 1s forwards",
              width: "0%",
            }}
          />
          <p
            className="font-display italic text-gold/70 text-xl mt-6 opacity-0"
            style={{ animation: "fade-up 0.8s ease-out 1.2s forwards" }}
          >
            Музыка без границ
          </p>

          <button
            onClick={() => scrollTo("music")}
            className="mt-12 px-10 py-3 border border-gold/40 text-gold text-xs tracking-[0.3em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-500 opacity-0"
            style={{ animation: "fade-up 0.8s ease-out 1.5s forwards" }}
          >
            Слушать
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-gold/60 mb-4">
              01 — О мне
            </p>
            <h2 className="font-display text-6xl md:text-8xl font-light italic leading-tight mb-8">
              Голос
              <br />
              из тьмы
            </h2>
            <div className="w-12 h-px bg-gold mb-8" />
            <p className="text-white/60 leading-relaxed text-sm mb-6">
              Артист, создающий музыку на стыке электроники и живого звука.
              Каждый трек — это путешествие через эмоции, которые сложно
              выразить словами.
            </p>
            <p className="text-white/60 leading-relaxed text-sm mb-10">
              Более 8 лет на сцене. Выступления по всей России. Авторские
              треки, собирающие тысячи прослушиваний. Музыка — это не просто
              звук, это способ дышать.
            </p>
            <div className="flex gap-12">
              {[
                ["8+", "лет на сцене"],
                ["50+", "концертов"],
                ["12", "треков"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p className="font-display text-4xl text-gold font-light">
                    {num}
                  </p>
                  <p className="text-white/40 text-xs tracking-widest uppercase mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 border border-gold/10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border-l-2 border-t-2 border-gold/40" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r-2 border-b-2 border-gold/40" />
            <img
              src={ARTIST_IMAGE}
              alt="Artist"
              className="w-full aspect-[3/4] object-cover object-top relative"
              style={{
                filter: "grayscale(20%) contrast(1.1)",
                mixBlendMode: "luminosity",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 50%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section
        id="music"
        className="py-32 px-6 md:px-16"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0), rgba(26,26,26,0.5), rgba(10,10,10,0))",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-gold/60 mb-4">
            02 — Музыка
          </p>
          <h2 className="font-display text-6xl md:text-8xl font-light italic leading-tight mb-16">
            Треки
          </h2>

          {currentTrack !== null && (
            <div
              className="mb-10 p-6 border border-gold/20"
              style={{
                background: "rgba(26,26,26,0.8)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => playTrack(currentTrack)}
                  className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-obsidian transition-all duration-300 animate-pulse-gold"
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={18} />
                </button>
                <div>
                  <p className="text-white font-medium">
                    {TRACKS.find((t) => t.id === currentTrack)?.title}
                  </p>
                  <p className="text-white/40 text-xs tracking-widest uppercase">
                    {TRACKS.find((t) => t.id === currentTrack)?.genre}
                  </p>
                </div>
              </div>
              <div className="h-px bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="space-y-0">
            {TRACKS.map((track, i) => (
              <button
                key={track.id}
                onClick={() => playTrack(track.id)}
                className="w-full group flex items-center gap-6 py-5 border-b border-white/5 hover:border-gold/20 transition-all duration-300 text-left"
              >
                <span className="font-display text-3xl text-white/10 group-hover:text-gold/30 transition-colors w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium tracking-wide transition-colors ${
                      currentTrack === track.id
                        ? "text-gold"
                        : "text-white group-hover:text-gold/80"
                    }`}
                  >
                    {track.title}
                  </p>
                  <p className="text-white/30 text-xs tracking-widest uppercase mt-0.5">
                    {track.genre}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white/30 text-xs">{track.duration}</span>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      currentTrack === track.id && isPlaying
                        ? "border-gold text-gold"
                        : "border-white/20 text-white/30 group-hover:border-gold/50 group-hover:text-gold/50"
                    }`}
                  >
                    <Icon
                      name={
                        currentTrack === track.id && isPlaying ? "Pause" : "Play"
                      }
                      size={12}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-gold/60 mb-4">
            03 — Контакты
          </p>
          <h2 className="font-display text-6xl md:text-8xl font-light italic leading-tight mb-6">
            Давай
            <br />
            работать
          </h2>
          <p className="text-white/50 text-sm mb-16 max-w-md">
            Концерты, коллаборации, интервью и другие предложения — пишите.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {[
              { icon: "Mail", label: "Email", value: "artist@email.com" },
              { icon: "Instagram", label: "Instagram", value: "@artist" },
              { icon: "Music", label: "VK Музыка", value: "vk.com/artist" },
              { icon: "Youtube", label: "YouTube", value: "youtube.com/@artist" },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-5 p-6 border border-white/5 hover:border-gold/20 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 border border-white/10 group-hover:border-gold/40 flex items-center justify-center transition-colors">
                  <Icon
                    name={icon}
                    size={16}
                    className="text-white/40 group-hover:text-gold transition-colors"
                  />
                </div>
                <div>
                  <p className="text-white/30 text-xs tracking-widest uppercase mb-1">
                    {label}
                  </p>
                  <p className="text-white/80 text-sm group-hover:text-gold transition-colors">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="border border-white/5 p-8"
            style={{ background: "rgba(26,26,26,0.4)" }}
          >
            <h3 className="font-display text-2xl italic text-white/80 mb-6">
              Отправить сообщение
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-gold/40 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-gold/40 transition-colors"
              />
            </div>
            <textarea
              placeholder="Ваше сообщение..."
              rows={4}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-gold/40 transition-colors mb-4 resize-none"
            />
            <button className="px-10 py-3 bg-gold text-obsidian text-xs tracking-[0.3em] uppercase font-medium hover:bg-gold-light transition-all duration-300">
              Отправить
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display italic text-gold/60 text-sm">Artist — 2026</p>
        <p className="text-white/20 text-xs tracking-widest uppercase">
          Все права защищены
        </p>
      </footer>
    </div>
  );
}
