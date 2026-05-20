"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { homeHeroImages, heroProofPoints } from "@/lib/site-content";

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % homeHeroImages.length);
    }, 9000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero-shell" aria-label="PMD Mu Sigma Alumni Association introduction">
      <div className="hero-media" aria-hidden="true">
        {homeHeroImages.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className={index === activeIndex ? "active" : ""}
          />
        ))}
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow">Mu Sigma alumni home base</p>
        <h1>PMD Mu Sigma Alumni Association</h1>
        <p>
          A living front door for alumni to reconnect, support the Impact Fund, and see the moments we have already built together.
        </p>
        <div className="button-row">
          <Link className="button primary" href="/impact-fund">
            Support the Impact Fund
          </Link>
          <Link className="button secondary on-dark" href="/events">
            See recent events
          </Link>
        </div>
        <p className="hero-meta">Donations are live. PMD Open and Alumni BBQ recaps are now part of the public archive.</p>
        <div className="hero-proof" aria-label="Alumni site priorities">
          {heroProofPoints.map((point) => (
            <div key={point.label}>
              <strong>{point.label}</strong>
              <span>{point.description}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-dots" aria-label="Hero slide controls">
        {homeHeroImages.map((image, index) => (
          <button
            key={image.src}
            className={index === activeIndex ? "active" : ""}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
