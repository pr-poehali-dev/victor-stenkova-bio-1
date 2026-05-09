import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const TRACKS = [
  {
    id: 1,
    title: "Новая жизнь",
    url: "https://music.yandex.ru/album/41645898?utm_medium=copy_link&ref_id=6a9c6daf-25d2-4018-b1ec-ef9d309dc563",
  },
  {
    id: 2,
    title: "Как лёд",
    url: "https://music.yandex.ru/album/41645898?utm_medium=copy_link&ref_id=6a9c6daf-25d2-4018-b1ec-ef9d309dc563",
  },
];

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
    <div className="bg-white text-neutral-900 font-body min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #f0f0f0" : "1px solid transparent",
        }}
      >
        <button
          onClick={() => scrollTo("home")}
          className="text-sm font-medium tracking-tight text-neutral-900"
        >
          Стенковой Виктор
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-sm transition-colors duration-200 ${
                activeSection === id ? "text-neutral-900 font-medium" : "text-neutral-400 hover:text-neutral-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button className="md:hidden text-neutral-700" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8">
          {navLinks.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-3xl font-medium text-neutral-800 hover:text-neutral-500 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20">
        <div className="max-w-4xl">
          <p
            className="text-xs text-neutral-400 tracking-widest uppercase mb-6 opacity-0"
            style={{ animation: "fade-up 0.6s ease-out 0.2s forwards" }}
          >
            Официальный сайт
          </p>
          <h1
            className="font-display font-light leading-[1] opacity-0 text-neutral-900"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 10rem)",
              animation: "fade-up 0.8s ease-out 0.4s forwards",
              letterSpacing: "-0.03em",
            }}
          >
            Стенковой<br />
            <span className="text-neutral-400">Виктор</span>
          </h1>

          <p
            className="text-neutral-500 text-lg mt-8 mb-10 max-w-md opacity-0"
            style={{ animation: "fade-up 0.7s ease-out 0.7s forwards" }}
          >
            Авторская музыка. Живые эмоции.
          </p>

          <div
            className="flex flex-wrap gap-3 opacity-0"
            style={{ animation: "fade-up 0.7s ease-out 0.9s forwards" }}
          >
            <button
              onClick={() => scrollTo("music")}
              className="px-7 py-3 bg-neutral-900 text-white text-sm rounded-full hover:bg-neutral-700 transition-colors duration-200"
            >
              Слушать музыку
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="px-7 py-3 border border-neutral-200 text-neutral-600 text-sm rounded-full hover:border-neutral-400 hover:text-neutral-800 transition-all duration-200"
            >
              Об артисте
            </button>
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-10 left-6 md:left-12 flex items-center gap-4">
          <div className="w-6 h-px bg-neutral-300" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-300">Scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6 md:px-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-neutral-400 tracking-widest uppercase mb-10">О мне</p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-5xl md:text-6xl font-light leading-tight text-neutral-900 mb-6">
                Виктор<br />Стенковой
              </h2>
              <p className="text-neutral-500 leading-relaxed text-sm mb-4">
                Артист и автор, создающий музыку на стыке жанров. Каждый трек — это честный разговор с теми, кто умеет слушать.
              </p>
              <p className="text-neutral-400 leading-relaxed text-sm">
                Живые выступления, авторские тексты и мелодии, которые остаются с тобой надолго.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-2">
              {[["2", "сингла"], ["50+", "концертов"], ["8+", "лет в музыке"]].map(([n, l]) => (
                <div key={l} className="bg-white rounded-2xl p-5 border border-neutral-100">
                  <p className="text-3xl font-light text-neutral-900 mb-1">{n}</p>
                  <p className="text-xs text-neutral-400">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MUSIC */}
      <section id="music" className="py-28 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-neutral-400 tracking-widest uppercase mb-10">Музыка</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-neutral-900 mb-12">
            Треки
          </h2>

          <div className="space-y-3">
            {TRACKS.map((track, i) => (
              <div
                key={track.id}
                className="flex items-center justify-between p-5 rounded-2xl bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200 group"
              >
                <div className="flex items-center gap-5">
                  <span className="text-neutral-300 text-sm w-5">{i + 1}</span>
                  <div>
                    <p className="font-medium text-neutral-900 text-base">{track.title}</p>
                    <p className="text-xs text-neutral-400 mt-0.5 flex items-center gap-1">
                      <Icon name="Music2" size={10} />
                      Яндекс Музыка
                    </p>
                  </div>
                </div>

                <a
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-xs rounded-full hover:bg-neutral-700 transition-colors duration-200"
                >
                  <Icon name="Play" size={11} />
                  Слушать
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-6 md:px-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-neutral-400 tracking-widest uppercase mb-10">Контакты</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-neutral-900 mb-4">
            Напишите мне
          </h2>
          <p className="text-neutral-400 text-sm mb-12 max-w-md">
            По вопросам концертов, сотрудничества и другим предложениям.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {[
              { icon: "Send", label: "Telegram", value: "@stencovoyvictor", url: "https://t.me/stencovoyvictor" },
              { icon: "Mail", label: "Email", value: "victiusi111@gmail.com", url: "mailto:victiusi111@gmail.com" },
              { icon: "Phone", label: "Телефон", value: "+7 953 793 00 51", url: "tel:+79537930051" },
              { icon: "Music2", label: "Яндекс Музыка", value: "Слушать треки", url: "https://music.yandex.ru/album/41645898" },
            ].map(({ icon, label, value, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3 p-5 bg-white rounded-2xl border border-neutral-100 hover:border-neutral-300 hover:shadow-sm transition-all duration-200 group"
              >
                <div className="w-9 h-9 bg-neutral-100 group-hover:bg-neutral-200 rounded-xl flex items-center justify-center transition-colors">
                  <Icon name={icon} size={15} className="text-neutral-600" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-neutral-800">{value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-neutral-100 p-7">
            <h3 className="text-base font-medium text-neutral-800 mb-5">Форма обратной связи</h3>
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Ваше имя"
                className="bg-neutral-50 border border-neutral-200 text-neutral-800 placeholder-neutral-300 px-4 py-3 text-sm rounded-xl focus:outline-none focus:border-neutral-400 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-neutral-50 border border-neutral-200 text-neutral-800 placeholder-neutral-300 px-4 py-3 text-sm rounded-xl focus:outline-none focus:border-neutral-400 transition-colors"
              />
            </div>
            <textarea
              placeholder="Ваше сообщение..."
              rows={4}
              className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 placeholder-neutral-300 px-4 py-3 text-sm rounded-xl focus:outline-none focus:border-neutral-400 transition-colors mb-4 resize-none"
            />
            <button className="px-7 py-3 bg-neutral-900 text-white text-sm rounded-full hover:bg-neutral-700 transition-colors duration-200">
              Отправить
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-100 py-6 px-6 md:px-12 flex items-center justify-between bg-white">
        <p className="text-sm text-neutral-400">Стенковой Виктор — 2026</p>
        <p className="text-xs text-neutral-300 tracking-widest uppercase">Все права защищены</p>
      </footer>
    </div>
  );
}