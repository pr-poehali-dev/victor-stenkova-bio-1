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
    <div className="bg-stone-100 text-stone-900 font-body min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(245,244,241,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
        }}
      >
        <button onClick={() => scrollTo("home")} className="text-sm font-medium text-stone-900">
          Стенковой Виктор
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-sm transition-colors duration-200 ${
                activeSection === id ? "text-stone-900 font-medium" : "text-stone-400 hover:text-stone-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button className="md:hidden text-stone-500" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-stone-100 flex flex-col items-center justify-center gap-8">
          {navLinks.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-3xl font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 bg-stone-100">
        <div className="max-w-4xl">
          <p
            className="text-xs text-stone-400 tracking-widest uppercase mb-6 opacity-0"
            style={{ animation: "fade-up 0.6s ease-out 0.2s forwards" }}
          >
            Официальный сайт
          </p>
          <h1
            className="font-display font-light leading-[1] opacity-0 text-stone-900"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 10rem)",
              animation: "fade-up 0.8s ease-out 0.4s forwards",
              letterSpacing: "-0.03em",
            }}
          >
            Стенковой<br />
            <span className="text-stone-400">Виктор</span>
          </h1>

          <p
            className="text-stone-500 text-lg mt-8 mb-10 max-w-md opacity-0"
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
              className="px-7 py-3 bg-stone-900 text-stone-100 text-sm rounded-full hover:bg-stone-700 transition-colors duration-200 font-medium"
            >
              Слушать музыку
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="px-7 py-3 border border-stone-300 text-stone-500 text-sm rounded-full hover:border-stone-500 hover:text-stone-700 transition-all duration-200"
            >
              Об артисте
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-6 md:left-12 flex items-center gap-4">
          <div className="w-6 h-px bg-stone-300" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400">Scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6 md:px-12 bg-stone-200">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-stone-400 tracking-widest uppercase mb-10">О мне</p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-5xl md:text-6xl font-light leading-tight text-stone-900 mb-2">
                Виктор<br />Стенковой
              </h2>
              <p className="text-stone-400 text-xs tracking-widest uppercase mb-6">Артист · Блогер · Исполнитель</p>
              <p className="text-stone-600 leading-relaxed text-sm mb-4">
                Привет! Меня зовут <span className="text-stone-900 font-medium">Виктор Стенковой</span> — артист без границ жанров. Поп, денс, танцевальные биты или что-то совсем неожиданное — я пою то, что зажигает.
              </p>
              <p className="text-stone-500 leading-relaxed text-sm mb-4">
                Мой девиз простой: любая музыка — на твой вкус. Хочешь поп? Будет поп. Хочешь танцевальный трек, от которого ноги сами идут в пляс? Тоже есть. Я здесь, чтобы создавать то, что ты чувствуешь, а не то, что модно.
              </p>
              <p className="text-stone-400 leading-relaxed text-sm mb-6">
                Помимо музыки — веду блог, делюсь закулисьем творческого процесса и просто живу на полную. Подписывайся, будет интересно.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://t.me/stencovoyvictor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-100 border border-stone-300 hover:border-stone-500 hover:bg-stone-50 transition-colors duration-200 text-stone-700 text-xs font-medium"
                >
                  <Icon name="Send" size={13} />
                  Telegram
                </a>
                <a
                  href="https://www.instagram.com/stenko_viktor?igsh=a3B3MHE2dDU5OTQ4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-100 border border-stone-300 hover:border-stone-500 hover:bg-stone-50 transition-colors duration-200 text-stone-700 text-xs font-medium"
                >
                  <Icon name="Instagram" size={13} />
                  Instagram
                </a>
                <a
                  href="https://youtube.com/@stencovoyvictor?si=BPBnUJd3FdCgB3Mi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-100 border border-stone-300 hover:border-stone-500 hover:bg-stone-50 transition-colors duration-200 text-stone-700 text-xs font-medium"
                >
                  <Icon name="Youtube" size={13} />
                  YouTube
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 pt-2">
              {[["2", "сингла"], ["3", "года в музыке"], ["∞", "жанров"], ["100%", "от души"]].map(([n, l]) => (
                <div key={l} className="bg-stone-100 rounded-2xl p-5 border border-stone-300">
                  <p className="text-3xl font-light text-stone-900 mb-1">{n}</p>
                  <p className="text-xs text-stone-400">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MUSIC */}
      <section id="music" className="py-28 px-6 md:px-12 bg-stone-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-stone-400 tracking-widest uppercase mb-10">Музыка</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-stone-900 mb-12">
            Треки
          </h2>

          {/* Upcoming release */}
          <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-stone-200 border border-stone-300 mb-8">
            <div className="w-2 h-2 rounded-full bg-green-500 shrink-0 animate-pulse" />
            <div className="flex-1">
              <p className="text-[10px] text-stone-400 uppercase tracking-widest">Скоро новый релиз</p>
              <p className="text-stone-800 text-sm font-medium">«Скоро лето» — 11 мая</p>
            </div>
            <Icon name="Bell" size={15} className="text-stone-400 shrink-0" />
          </div>

          <div className="space-y-3">
            {TRACKS.map((track, i) => (
              <div
                key={track.id}
                className="flex items-center justify-between p-5 rounded-2xl bg-stone-200 hover:bg-stone-300 transition-colors duration-200 border border-stone-300 hover:border-stone-400"
              >
                <div className="flex items-center gap-5">
                  <span className="text-stone-400 text-sm w-5">{i + 1}</span>
                  <div>
                    <p className="font-medium text-stone-900 text-base">{track.title}</p>
                    <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
                      <Icon name="Music2" size={10} />
                      Яндекс Музыка
                    </p>
                  </div>
                </div>

                <a
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-stone-100 text-xs rounded-full hover:bg-stone-700 transition-colors duration-200 font-medium"
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
      <section id="contact" className="py-28 px-6 md:px-12 bg-stone-200">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-stone-400 tracking-widest uppercase mb-10">Контакты</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-stone-900 mb-4">
            Напишите мне
          </h2>
          <p className="text-stone-500 text-sm mb-12 max-w-md">
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
                className="flex flex-col gap-3 p-5 bg-stone-100 rounded-2xl border border-stone-300 hover:border-stone-400 hover:bg-stone-50 transition-all duration-200 group"
              >
                <div className="w-9 h-9 bg-stone-200 group-hover:bg-stone-300 rounded-xl flex items-center justify-center transition-colors">
                  <Icon name={icon} size={15} className="text-stone-600" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-stone-700">{value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* FORM */}
          <div className="bg-stone-100 rounded-2xl border border-stone-300 p-7">
            <h3 className="text-base font-medium text-stone-900 mb-5">Форма обратной связи</h3>

            {sent ? (
              <div className="flex items-center gap-3 py-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-stone-900 font-medium">Сообщение отправлено!</p>
                  <p className="text-stone-500 text-sm">Виктор скоро ответит вам.</p>
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
                    className="bg-stone-200 border border-stone-300 text-stone-900 placeholder-stone-400 px-4 py-3 text-sm rounded-xl focus:outline-none focus:border-stone-500 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-stone-200 border border-stone-300 text-stone-900 placeholder-stone-400 px-4 py-3 text-sm rounded-xl focus:outline-none focus:border-stone-500 transition-colors"
                  />
                </div>
                <textarea
                  placeholder="Ваше сообщение..."
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-stone-200 border border-stone-300 text-stone-900 placeholder-stone-400 px-4 py-3 text-sm rounded-xl focus:outline-none focus:border-stone-500 transition-colors resize-none mb-3"
                />
                {formError && <p className="text-red-500 text-xs mb-3">{formError}</p>}
                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  className="px-6 py-3 bg-stone-900 text-stone-100 text-sm rounded-full hover:bg-stone-700 transition-colors duration-200 font-medium disabled:opacity-50"
                >
                  {sending ? "Отправляю..." : "Отправить"}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-300 py-8 px-6 md:px-12 bg-stone-100">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-400">Стенковой Виктор — 2026</p>
          <div className="flex items-center gap-3">
            <a href="https://t.me/stencovoyvictor" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-200 border border-stone-300 hover:border-stone-400 hover:bg-stone-300 transition-colors duration-200 text-stone-500 hover:text-stone-800">
              <Icon name="Send" size={14} />
            </a>
            <a href="https://www.instagram.com/stenko_viktor?igsh=a3B3MHE2dDU5OTQ4" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-200 border border-stone-300 hover:border-stone-400 hover:bg-stone-300 transition-colors duration-200 text-stone-500 hover:text-stone-800">
              <Icon name="Instagram" size={14} />
            </a>
            <a href="https://youtube.com/@stencovoyvictor?si=BPBnUJd3FdCgB3Mi" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-200 border border-stone-300 hover:border-stone-400 hover:bg-stone-300 transition-colors duration-200 text-stone-500 hover:text-stone-800">
              <Icon name="Youtube" size={14} />
            </a>
          </div>
          <p className="text-xs text-stone-400 tracking-widest uppercase">Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}
