import Image from "next/image";
import Link from "next/link";
import HeroLightSpot from "@/components/hero-light-spot";
import { BlurFade } from "@/components/ui/blur-fade";
import ContactForm from "@/components/contact-form";
import { works } from "@/app/works/data";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 py-16 md:px-10 md:py-24">
      <section
        id="hero"
        className="relative grid gap-10 overflow-hidden rounded-3xl border border-border/60 px-8 py-12 pb-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-16 md:px-14 md:py-16"
      >
        <Image
          src="/hero-mesh-gradient.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
          aria-hidden="true"
        />
        <HeroLightSpot />

        {/* Hero 좌측: 텍스트 */}
        <div className="relative z-10 space-y-6">
          <BlurFade delay={0.1} direction="up">
            <p className="inline-flex rounded-full border border-border bg-muted/50 px-4 py-1 text-sm font-medium text-muted-foreground">
              Portfolio 2026
            </p>
          </BlurFade>
          <BlurFade delay={0.2} direction="up">
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-balance md:text-7xl">
              김희진
            </h1>
          </BlurFade>
          <BlurFade delay={0.3} direction="up">
            <p className="max-w-xl text-xl text-muted-foreground md:text-2xl">
              UX 디자이너
            </p>
          </BlurFade>
          <BlurFade delay={0.42} direction="up">
            <a
              href="mailto:gimigimi85@gmail.com"
              className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/15 bg-foreground px-7 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              프로젝트 문의하기
            </a>
          </BlurFade>
        </div>

        {/* Hero 우측: 아바타 */}
        <BlurFade delay={0.35} direction="up" className="relative z-10 flex items-center justify-center md:justify-end">
          <div className="relative h-52 w-52 overflow-hidden rounded-full border border-border/80 bg-muted/30 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.6)] md:h-64 md:w-64">
            <Image
              src="/avatar.png"
              alt="김희진 프로필 사진"
              fill
              sizes="(min-width: 768px) 16rem, 13rem"
              className="object-cover"
              priority
            />
          </div>
        </BlurFade>
      </section>

      <section id="about" className="space-y-6">
        <BlurFade delay={0.1} inView direction="up">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            About
          </h2>
        </BlurFade>

        <div className="grid gap-8 md:grid-cols-12 md:gap-10 md:items-start">
          <BlurFade delay={0.2} inView direction="up" className="md:col-span-7">
            <div className="space-y-4 rounded-3xl border border-border/80 bg-card p-6 leading-7 text-muted-foreground md:p-8">
              <p>Mobile 제품 UX 디자이너</p>
              <p>
                사용자 맥락과 비즈니스 목표를 연결하는 경험 설계를 통해
                제품의 사용성과 완성도를 높이는 데 집중합니다.
              </p>
            </div>
          </BlurFade>

          <div className="space-y-6 md:col-span-5">
            <BlurFade delay={0.3} inView direction="up">
              <div className="space-y-4 rounded-3xl border border-border/80 bg-card p-6 md:p-8">
                <h3 className="text-lg font-semibold tracking-tight">경력 요약</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="text-sm">2015~ 현재</p>
                  <p className="text-base font-medium text-foreground">
                    삼성전자 MX 사업부 UX 디자이너
                  </p>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.4} inView direction="up">
              <div className="space-y-3 rounded-3xl border border-border/80 bg-card p-6 md:p-8">
                <h3 className="text-lg font-semibold tracking-tight">연락처</h3>
                <p className="text-muted-foreground">gimigimi85@gmail.com</p>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="works" className="space-y-6">
        <BlurFade delay={0.1} inView direction="up">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Works
          </h2>
        </BlurFade>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work, index) => (
            <BlurFade
              key={work.slug}
              delay={0.16 + index * 0.08}
              inView
              direction="up"
            >
              <Link
                href={`/works/${work.slug}`}
                className="group block overflow-hidden rounded-3xl border border-border/80 bg-card transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 w-full border-b border-border/70 bg-muted/30">
                  <Image
                    src={work.thumbnail}
                    alt={`${work.title} 썸네일`}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                    className="object-contain p-10 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2 p-6">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {work.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{work.summary}</p>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="contact" className="space-y-6">
        <BlurFade delay={0.1} inView direction="up">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Contact
          </h2>
        </BlurFade>

        <BlurFade delay={0.2} inView direction="up">
          <div className="rounded-3xl border border-border/80 bg-card p-6 md:p-8">
            <p className="text-muted-foreground">
              프로젝트 문의·강의 협업, 편하게 보내주세요
            </p>
            <ContactForm />
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
