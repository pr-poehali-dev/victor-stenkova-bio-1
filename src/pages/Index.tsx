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

const EMAIL_URL = "https://functions.poehali.dev/7bd8243a-3a99-4e6f-a4b7-73ebe22fa3bf";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState("");

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

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setFormError("Пожалуйста, заполните все поля");
      return;
    }
    setSending(true);
    setFormError("");
    try {
      await fetch(EMAIL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setFormError("Ошибка отправки. Попробуйте ещё раз.");
    } finally {
      setSending(false);
    }
  };

  const navLinks = [
    ["home", "Главная"],
    ["about", "О мне"],
    ["music", "Музыка"],
    ["contact", "Контакты"],
  ];

  return (
    <div className="bg-neutral-950 text-white font-body min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        <button onClick={() => scrollTo("home")} className="text-sm font-medium text-white">
          Стенковой Виктор
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-sm transition-colors duration-200 ${
                activeSection === id ? "text-white font-medium" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button className="md:hidden text-neutral-400" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-neutral-950 flex flex-col items-center justify-center gap-8">
          {navLinks.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-3xl font-medium text-neutral-300 hover:text-white transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20">
        <div className="max-w-4xl">
          <p
            className="text-xs text-neutral-600 tracking-widest uppercase mb-6 opacity-0"
            style={{ animation: "fade-up 0.6s ease-out 0.2s forwards" }}
          >
            Официальный сайт
          </p>
          <h1
            className="font-display font-light leading-[1] opacity-0 text-white"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 10rem)",
              animation: "fade-up 0.8s ease-out 0.4s forwards",
              letterSpacing: "-0.03em",
            }}
          >
            Стенковой<br />
            <span className="text-neutral-600">Виктор</span>
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
              className="px-7 py-3 bg-white text-neutral-900 text-sm rounded-full hover:bg-neutral-200 transition-colors duration-200 font-medium"
            >
              Слушать музыку
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="px-7 py-3 border border-neutral-700 text-neutral-400 text-sm rounded-full hover:border-neutral-500 hover:text-neutral-200 transition-all duration-200"
            >
              Об артисте
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-6 md:left-12 flex items-center gap-4">
          <div className="w-6 h-px bg-neutral-700" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-700">Scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6 md:px-12 bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-neutral-600 tracking-widest uppercase mb-10">О мне</p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-5xl md:text-6xl font-light leading-tight text-white mb-2">
                Виктор<br />Стенковой
              </h2>
              <p className="text-neutral-600 text-xs tracking-widest uppercase mb-6">Артист · Блогер · Исполнитель</p>
              <p className="text-neutral-400 leading-relaxed text-sm mb-4">
                Привет! Меня зовут <span className="text-white font-medium">Виктор Стенковой</span> — артист без границ жанров. Поп, денс, танцевальные биты или что-то совсем неожиданное — я пою то, что зажигает.
              </p>
              <p className="text-neutral-500 leading-relaxed text-sm mb-4">
                Мой девиз простой: любая музыка — на твой вкус. Хочешь поп? Будет поп. Хочешь танцевальный трек, от которого ноги сами идут в пляс? Тоже есть. Я здесь, чтобы создавать то, что ты чувствуешь, а не то, что модно.
              </p>
              <p className="text-neutral-600 leading-relaxed text-sm mb-6">
                Помимо музыки — веду блог, делюсь закулисьем творческого процесса и просто живу на полную. Подписывайся, будет интересно.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://t.me/stencovoyvictor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-800 border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-700 transition-colors duration-200 text-white text-xs font-medium"
                >
                  <Icon name="Send" size={13} />
                  Telegram
                </a>
                <a
                  href="https://www.instagram.com/stenko_viktor?igsh=a3B3MHE2dDU5OTQ4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-800 border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-700 transition-colors duration-200 text-white text-xs font-medium"
                >
                  <Icon name="Instagram" size={13} />
                  Instagram
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 pt-2">
              {[["2", "сингла"], ["3", "года в музыке"], ["∞", "жанров"], ["100%", "от души"]].map(([n, l]) => (
                <div key={l} className="bg-neutral-800 rounded-2xl p-5 border border-neutral-700">
                  <p className="text-3xl font-light text-white mb-1">{n}</p>
                  <p className="text-xs text-neutral-500">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MUSIC */}
      <section id="music" className="py-28 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-neutral-600 tracking-widest uppercase mb-10">Музыка</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white mb-12">
            Треки
          </h2>

          {/* Upcoming release */}
          <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-neutral-900 border border-neutral-700 mb-8">
            <div className="w-2 h-2 rounded-full bg-green-400 shrink-0 animate-pulse" />
            <div className="flex-1">
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Скоро новый релиз</p>
              <p className="text-white text-sm font-medium">«Скоро лето» — 11 мая</p>
            </div>
            <Icon name="Bell" size={15} className="text-neutral-600 shrink-0" />
          </div>

          <div className="space-y-3">
            {TRACKS.map((track, i) => (
              <div
                key={track.id}
                className="flex items-center justify-between p-5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 transition-colors duration-200 border border-neutral-800 hover:border-neutral-700"
              >
                <div className="flex items-center gap-5">
                  <span className="text-neutral-700 text-sm w-5">{i + 1}</span>
                  <div>
                    <p className="font-medium text-white text-base">{track.title}</p>
                    <p className="text-xs text-neutral-600 mt-0.5 flex items-center gap-1">
                      <Icon name="Music2" size={10} />
                      Яндекс Музыка
                    </p>
                  </div>
                </div>

                <a
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-neutral-900 text-xs rounded-full hover:bg-neutral-200 transition-colors duration-200 font-medium"
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
      <section id="contact" className="py-28 px-6 md:px-12 bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-neutral-600 tracking-widest uppercase mb-10">Контакты</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white mb-4">
            Напишите мне
          </h2>
          <p className="text-neutral-500 text-sm mb-12 max-w-md">
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
                className="flex flex-col gap-3 p-5 bg-neutral-800 rounded-2xl border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-750 transition-all duration-200 group"
              >
                <div className="w-9 h-9 bg-neutral-700 group-hover:bg-neutral-600 rounded-xl flex items-center justify-center transition-colors">
                  <Icon name={icon} size={15} className="text-neutral-300" />
                </div>
                <div>
                  <p className="text-xs text-neutral-600 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-neutral-200">{value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* FORM */}
          <div className="bg-neutral-800 rounded-2xl border border-neutral-700 p-7">
            <h3 className="text-base font-medium text-white mb-5">Форма обратной связи</h3>

            {sent ? (
              <div className="flex items-center gap-3 py-6">
                <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={18} className="text-green-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Сообщение отправлено!</p>
                  <p className="text-neutral-500 text-sm">Виктор скоро ответит вам.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-600 px-4 py-3 text-sm rounded-xl focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-600 px-4 py-3 text-sm rounded-xl focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                </div>
                <textarea
                  placeholder="Ваше сообщение..."
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-600 px-4 py-3 text-sm rounded-xl focus:outline-none focus:border-neutral-500 transition-colors mb-4 resize-none"
                />
                {formError && <p className="text-red-400 text-xs mb-3">{formError}</p>}
                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  className="px-7 py-3 bg-white text-neutral-900 text-sm rounded-full hover:bg-neutral-200 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? "Отправляем..." : "Отправить"}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800 py-6 px-6 md:px-12 flex items-center justify-between bg-neutral-950">
        <p className="text-sm text-neutral-600">Стенковой Виктор — 2026</p>
        <p className="text-xs text-neutral-700 tracking-widest uppercase">Все права защищены</p>
      </footer>
    </div>
  );
}