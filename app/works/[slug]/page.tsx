import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { works } from "@/app/works/data";
import { BlurFade } from "@/components/ui/blur-fade";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = works.find((item) => item.slug === slug);

  if (!work) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 md:px-10 md:py-24">
      <BlurFade delay={0.1} direction="up">
        <Link
          href="/#works"
          className="inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← 모든 작업물 보기
        </Link>
      </BlurFade>

      <BlurFade delay={0.16} direction="up" className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {work.title}
        </h1>
        <p className="text-lg text-muted-foreground">{work.summary}</p>
      </BlurFade>

      <BlurFade delay={0.24} direction="up">
        <div className="relative h-[360px] overflow-hidden rounded-3xl border border-border/80 bg-card md:h-[460px]">
          <Image
            src={work.thumbnail}
            alt={`${work.title} 대표 이미지`}
            fill
            sizes="(min-width: 1024px) 72rem, 100vw"
            className="object-contain p-12 md:p-16"
            priority
          />
        </div>
      </BlurFade>

      <BlurFade delay={0.32} direction="up">
        <article className="rounded-3xl border border-border/80 bg-card p-6 leading-8 text-muted-foreground md:p-8">
          {work.description}
        </article>
      </BlurFade>

      <BlurFade delay={0.4} direction="up" className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">외부 링크</h2>
        <div className="flex flex-wrap gap-3">
          {work.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border/80 bg-muted/40 px-5 text-sm font-medium transition-colors hover:bg-muted"
            >
              {link.label}
            </a>
          ))}
        </div>
      </BlurFade>
    </main>
  );
}
