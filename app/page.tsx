"use client";

import { useEffect, useRef, useState } from "react";

const nav = [
  { n: "01", label: "Arrival", href: "#arrival" },
  { n: "02", label: "Rooms", href: "#rooms" },
  { n: "03", label: "Table", href: "#table" },
  { n: "04", label: "Bath", href: "#bath" },
  { n: "05", label: "Field notes", href: "#notes" },
  { n: "06", label: "Reserve", href: "#reserve" },
];

const rooms = [
  {
    no: "02",
    name: "The Larch Room",
    view: "Valley side · first light",
    size: "28 m²",
    text: "A quiet corner room lined in untreated larch. A deep window seat, a stove that takes the edge off the morning, and a view that changes colour every hour.",
    image: "/images/room-alpine.jpg",
    hover: "/images/salon.jpg",
  },
  {
    no: "03",
    name: "The Morning Room",
    view: "South terrace · full day sun",
    size: "34 m²",
    text: "Our most requested room. Tall shutters open onto the terrace, where coffee arrives before anyone else is awake. Linen, stone, and very little else.",
    image: "/images/room-suite.jpg",
    hover: "/images/terrace.jpg",
  },
  {
    no: "04",
    name: "The Ridge Suite",
    view: "West ridge · evening light",
    size: "52 m²",
    text: "Two rooms under one roof with a private sitting stove and a bath set against the glass. Made for long evenings when the valley has gone dark.",
    image: "/images/room-loft.jpg",
    hover: "/images/lake.jpg",
  },
];

const notes = [
  {
    no: "i",
    title: "The long way up",
    meta: "On foot · 3 hours",
    text: "Leave before the light reaches the ridge. The trail passes two abandoned sawmills and arrives at a bench we did not build but have come to consider ours.",
    image: "/images/peaks.jpg",
  },
  {
    no: "ii",
    title: "Cold water, warm stone",
    meta: "Every morning · 07:00",
    text: "A short walk through the snow to the wood-fired pool. There is no programme, no music, and no reason to stay longer than you want to.",
    image: "/images/spa-water.jpg",
  },
  {
    no: "iii",
    title: "One table, one evening",
    meta: "Thursday · 19:30",
    text: "Guests and cooks eat together at the long oak table. What is served depends on what came down the valley that morning.",
    image: "/images/dining-table.jpg",
  },
];

const menu = [
  ["To begin", "Celeriac, smoked butter, mountain herbs"],
  ["From the valley", "Char, fermented cabbage, brown butter"],
  ["From the garden", "Beetroot, sheep's yoghurt, dill oil"],
  ["To finish", "Quince, honey, sour cream"],
];

type Stay = { arrival: string; departure: string; guests: string };

function Plate({
  src,
  alt,
  no,
  caption,
  className = "",
  priority = false,
  reveal = true,
}: {
  src: string;
  alt: string;
  no?: string;
  caption?: string;
  className?: string;
  priority?: boolean;
  reveal?: boolean;
}) {
  return (
    <figure className={`plate ${className}`} {...(reveal ? { "data-reveal": true } : {})}>
      <div className="plate__frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} />
      </div>
      {(no || caption) && (
        <figcaption className="plate__caption">
          {no && <span className="plate__no">Pl. {no}</span>}
          {caption && <span>{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("01");
  const [stay, setStay] = useState<Stay>({
    arrival: "",
    departure: "",
    guests: "2 guests",
  });
  const [sent, setSent] = useState(false);
  const heroImg = useRef<HTMLImageElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll("[data-reveal], [data-draw]").forEach((el) => {
      if (reduce) el.classList.add("is-visible");
      else revealObserver.observe(el);
    });

    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = nav.find((item) => item.href === `#${entry.target.id}`);
            if (link) setActive(link.n);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => sectionObserver.observe(s));

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (progressBar.current) {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          progressBar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        }
        if (heroImg.current && !reduce && y < window.innerHeight * 1.3) {
          heroImg.current.style.transform = `translate3d(0, ${y * 0.16}px, 0) scale(1.08)`;
        }
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const goToStay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStay({
      arrival: String(data.get("arrival") || ""),
      departure: String(data.get("departure") || ""),
      guests: String(data.get("guests") || "2 guests"),
    });
    document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" });
  };

  const submitEnquiry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="site">
      <div className="scroll-progress" ref={progressBar} aria-hidden="true" />

      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="PSM Resort, home">
          <span className="wordmark__mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <path d="M20 3 6 34h28L20 3Z" stroke="currentColor" strokeWidth="1.2" />
              <path d="M20 12 12 34M20 12l8 22M13 27h14" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
          <span>PSM Resort</span>
        </a>

        <nav className="topnav" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.n}
              href={item.href}
              className={active === item.n ? "is-current" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="topbar__cta" href="#reserve">
          Reserve <span aria-hidden="true">↗</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
        </button>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <nav aria-label="Mobile">
          {nav.map((item) => (
            <a key={item.n} href={item.href} onClick={() => setMenuOpen(false)}>
              <span>{item.n}</span> {item.label}
            </a>
          ))}
        </nav>
      </div>

      <section className="hero" id="top">
        <div className="hero__paper">
          <div className="hero__folio">
            <span>Field notes from an alpine valley</span>
            <span>No. 01 — Winter / Summer</span>
            <span>A mountain house · 1,480 m</span>
          </div>

          <div className="hero__title-block">
            <h1>
              PSM
              <br />
              Resort
            </h1>
            <p className="hero__lede">
              Where the mountain sets the pace. Fourteen rooms, one long table,
              and a landscape that refuses to be hurried.
            </p>
          </div>

          <form className="stay-form" onSubmit={goToStay}>
            <p className="stay-form__label">Plan a stay</p>
            <div className="stay-form__grid">
              <label>
                <span>Arrival</span>
                <input name="arrival" type="date" required />
              </label>
              <label>
                <span>Departure</span>
                <input name="departure" type="date" required min={stay.arrival || undefined} />
              </label>
              <label>
                <span>Guests</span>
                <select name="guests" defaultValue="2 guests">
                  <option>1 guest</option>
                  <option>2 guests</option>
                  <option>3 guests</option>
                  <option>4 guests</option>
                </select>
              </label>
              <button type="submit" aria-label="Enquire about a stay">
                <span>Enquire</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
            <p className="stay-form__note">
              An enquiry only — no live availability or payment is taken here.
            </p>
          </form>

          <div className="hero__foot">
            <span>47° 07′ N · 12° 38′ E</span>
            <span className="hero__scroll">Scroll to turn the page ↓</span>
          </div>
        </div>

        <div className="hero__plate">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={heroImg}
            className="hero__image"
            src="/images/hero-alps.jpg"
            alt="Snow-lit alpine peaks above a still mountain lake"
            fetchPriority="high"
          />
          <div className="hero__shade" aria-hidden="true" />
          <div className="hero__coordinates">
            <span>Plate 01</span>
            <span>Morning light, late October</span>
          </div>
          <nav className="tab-rail" aria-label="Page index">
            {nav.map((item) => (
              <a
                key={item.n}
                href={item.href}
                className={active === item.n ? "is-current" : undefined}
              >
                <span>{item.n}</span>
                <em>{item.label}</em>
              </a>
            ))}
          </nav>
          <div className="hero__vertical">A quiet alpine valley · 1,480 m</div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              Light <i>✳</i> Stone <i>✳</i> Water <i>✳</i> Wood <i>✳</i> Long tables <i>✳</i>
            </span>
          ))}
        </div>
      </div>

      <section className="arrival" id="arrival">
        <div className="section-marker" data-reveal>
          <span>01</span>
          <span>Arrival</span>
        </div>

        <div className="arrival__body">
          <h2 className="display" data-reveal>
            We built this house around a <em>simple belief:</em> a mountain is
            not a view. It is a way of spending a day.
          </h2>

          <div className="arrival__lower">
            <div className="arrival__copy" data-reveal>
              <p>
                PSM Resort sits on the shoulder of a quiet valley, an hour from
                the nearest town and further still from the nearest hurry. The
                house is deliberately small. Fourteen rooms, a stove room, a
                bath, and one long table where everyone eats together.
              </p>
              <p>
                Come for the snow or come for the heat. The house keeps its own
                time either way — shaped by light, weather, and whatever the
                garden decides to give us.
              </p>
              <a className="text-link" href="#rooms">
                Read the room pages <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="fact-grid" data-reveal>
              {[
                ["14", "Rooms"],
                ["1,480 m", "Above the valley"],
                ["1", "Long table"],
                ["0", "Clocks in the bath"],
              ].map(([n, l]) => (
                <div key={l}>
                  <strong>{n}</strong>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>

          <svg
            className="contour"
            data-draw
            viewBox="0 0 1200 190"
            fill="none"
            aria-hidden="true"
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path
                key={i}
                d={`M0 ${160 - i * 6} C 170 ${150 - i * 10}, 250 ${40 + i * 14}, 390 ${70 + i * 10} S 610 ${150 - i * 4}, 730 ${95 + i * 8} S 960 ${20 + i * 12}, 1200 ${105 - i * 3}`}
                stroke="currentColor"
                strokeWidth="1"
                pathLength={1}
                style={{ "--i": i } as React.CSSProperties}
              />
            ))}
          </svg>

          <figure className="interlude" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/lodge.jpg" alt="The house at dusk, lit from within" loading="lazy" />
            <figcaption>
              <span>Pl. 01a</span>
              <span>The house at dusk — arrival, in one image</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="rooms" id="rooms">
        <div className="rooms__head">
          <div className="section-marker" data-reveal>
            <span>02</span>
            <span>Rooms</span>
          </div>
          <p data-reveal>Three ways to stay. None of them try too hard.</p>
        </div>

        <div className="rooms__list">
          {rooms.map((room) => (
            <article className="room" key={room.no} data-reveal>
              <Plate
                src={room.image}
                alt={`${room.name} at PSM Resort`}
                no={room.no}
                caption={room.view}
                className="room__plate"
                reveal={false}
              />
              <div className="room__hover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={room.hover} alt="" aria-hidden="true" loading="lazy" />
              </div>
              <div className="room__info">
                <div>
                  <h3>{room.name}</h3>
                  <p>{room.text}</p>
                </div>
                <div className="room__meta">
                  <span>{room.size}</span>
                  <span>{room.view}</span>
                  <a href="#reserve">Enquire about this room →</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="table" id="table">
        <div className="table__image" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dining-room.jpg" alt="Warmly lit long-table dining room" loading="lazy" />
          <span className="plate-tag">Pl. 05 — The long table</span>
        </div>
        <div className="table__body">
          <div className="section-marker section-marker--light" data-reveal>
            <span>03</span>
            <span>Table</span>
          </div>
          <h2 className="display display--light" data-reveal>
            Dinner is at seven. <em>You come when you are hungry.</em>
          </h2>
          <p data-reveal>
            There is no à la carte and there are no two identical evenings. The
            kitchen sends what arrived that morning to one long oak table.
            Wine is local, pours are generous, and nobody leaves hungry.
          </p>

          <div className="menu-card" data-reveal>
            <p className="menu-card__head">A typical evening — illustrative menu</p>
            {menu.map(([course, dish]) => (
              <div className="menu-card__row" key={course}>
                <span>{course}</span>
                <span>{dish}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bath" id="bath">
        <div className="bath__copy">
          <div className="section-marker" data-reveal>
            <span>04</span>
            <span>Bath</span>
          </div>
          <h2 className="display" data-reveal>
            Water, stone, <em>and the deliberate absence of everything else.</em>
          </h2>
          <p data-reveal>
            The bathhouse is the quietest room in the house. A wood-fired pool,
            a cold plunge cut into the stone, and a resting room with windows
            facing the ridge. Phones stay in the bedrooms. So do your plans.
          </p>
          <ul className="rituals" data-reveal>
            <li><span>06:30</span> Cold plunge, if you dare</li>
            <li><span>11:00</span> Wood-fired pool, steam room</li>
            <li><span>17:00</span> Quiet hour — no talking</li>
          </ul>
        </div>
        <div className="bath__images">
          <Plate
            src="/images/spa-water.jpg"
            alt="Still water in the wood-fired bath"
            no="06"
            caption="The pool, before anyone arrives"
            className="bath__main"
          />
          <Plate
            src="/images/spa-treatment.jpg"
            alt="Spa treatment room with warm stone"
            no="07"
            caption="Resting room"
            className="bath__small"
          />
          <div className="seal" aria-hidden="true">
            <svg viewBox="0 0 140 140">
              <defs>
                <path id="seal-path" d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
              </defs>
              <text>
                <textPath href="#seal-path">
                  WATER · STONE · SILENCE · WATER · STONE · SILENCE ·&nbsp;
                </textPath>
              </text>
            </svg>
            <span>✳</span>
          </div>
        </div>
      </section>

      <section className="notes" id="notes">
        <div className="notes__head">
          <div className="section-marker" data-reveal>
            <span>05</span>
            <span>Field notes</span>
          </div>
          <h2 className="display" data-reveal>
            Things worth <em>getting up for.</em>
          </h2>
        </div>
        <div className="notes__grid">
          {notes.map((note) => (
            <article className="note" key={note.no} data-reveal>
              <Plate src={note.image} alt={note.title} no={note.no} />
              <h3>{note.title}</h3>
              <p className="note__meta">{note.meta}</p>
              <p className="note__text">{note.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reserve" id="reserve">
        <div className="reserve__decor" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/winter-forest.jpg" alt="" loading="lazy" />
        </div>
        <div className="reserve__inner">
          <div className="section-marker section-marker--light" data-reveal>
            <span>06</span>
            <span>Reserve</span>
          </div>
          <div className="reserve__grid">
            <div data-reveal>
              <h2 className="display display--light">
                The page is yours <em>to fill in.</em>
              </h2>
              <p>
                Send us your dates and we will write back with room options,
                seasonal notes, and a quiet recommendation for how to spend your
                first afternoon.
              </p>
              <div className="reserve__address">
                <span>PSM Resort</span>
                <span>An alpine retreat — location shared on enquiry</span>
                <p className="reserve__disclaimer">
                  This is a concept site. No phone number, email address, or
                  street address is published here.
                </p>
              </div>
            </div>

            {sent ? (
              <div className="enquiry-success" role="status">
                <span aria-hidden="true">✳</span>
                <h3>Noted.</h3>
                <p>
                  This is a concept site, so no message was actually sent. In a
                  live house, this is where a confirmation would arrive.
                </p>
                <button type="button" onClick={() => setSent(false)}>
                  Write another enquiry
                </button>
              </div>
            ) : (
              <form className="enquiry" onSubmit={submitEnquiry} data-reveal>
                <div className="enquiry__row">
                  <label>
                    <span>Name</span>
                    <input name="name" type="text" placeholder="Your name" required />
                  </label>
                  <label>
                    <span>Email</span>
                    <input name="email" type="email" placeholder="you@example.com" required />
                  </label>
                </div>
                <div className="enquiry__row">
                  <label>
                    <span>Arrival</span>
                    <input name="arrival" type="date" value={stay.arrival} onChange={(e) => setStay({ ...stay, arrival: e.target.value })} required />
                  </label>
                  <label>
                    <span>Departure</span>
                    <input name="departure" type="date" value={stay.departure} min={stay.arrival || undefined} onChange={(e) => setStay({ ...stay, departure: e.target.value })} required />
                  </label>
                </div>
                <label>
                  <span>Guests</span>
                  <select value={stay.guests} onChange={(e) => setStay({ ...stay, guests: e.target.value })}>
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                  </select>
                </label>
                <label>
                  <span>Anything we should know?</span>
                  <textarea name="notes" rows={3} placeholder="A celebration, a dietary note, a preferred room…" />
                </label>
                <button type="submit">
                  <span>Send enquiry</span>
                  <span aria-hidden="true">↗</span>
                </button>
                <p className="enquiry__note">
                  Illustrative form — nothing is stored or transmitted.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__top">
          <span className="footer__logo">PSM Resort</span>
          <p>Field notes from an alpine valley.<br />An original concept site, not a real hotel.</p>
          <nav aria-label="Footer">
            {nav.map((item) => (
              <a key={item.n} href={item.href}>{item.label}</a>
            ))}
          </nav>
        </div>
        <div className="footer__bottom">
          <span>© 2026 PSM Resort — a fictional property</span>
          <span>
            Photography: Unsplash contributors (licensed stock). All copy and
            branding original to this project.
          </span>
          <a href="#top">Back to the first page ↑</a>
        </div>
      </footer>
    </main>
  );
}
