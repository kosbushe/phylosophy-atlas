import type { Philosopher } from "@/lib/philosophers";

type Pair = readonly [title: string, text: string];
type MilestoneSeed = readonly [date: string, title: string, text: string];
type SourceSeed = readonly [label: string, detail: string, href: string];

export type ProfileSeed = Omit<
  Philosopher,
  "color" | "mapPosition" | "ideas" | "milestones" | "distortion" | "sources"
> & {
  ideas: readonly Pair[];
  milestones: readonly MilestoneSeed[];
  distortion: readonly [myth: string, correction: string];
  sources: readonly SourceSeed[];
};

export function defineProfile(seed: ProfileSeed): Philosopher {
  return {
    ...seed,
    color: "#d43b2d",
    mapPosition: "50%",
    ideas: seed.ideas.map(([title, text]) => ({ title, text })),
    milestones: seed.milestones.map(([date, title, text]) => ({ date, title, text })),
    distortion: {
      myth: seed.distortion[0],
      correction: seed.distortion[1],
    },
    sources: seed.sources.map(([label, detail, href]) => ({ label, detail, href })),
  };
}
