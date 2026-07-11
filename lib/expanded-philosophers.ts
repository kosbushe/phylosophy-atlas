import type { Philosopher } from "@/lib/philosophers";
import { axialProfiles } from "@/lib/profiles-axial";
import { classicalProfiles } from "@/lib/profiles-classical";
import { earlyModernProfiles } from "@/lib/profiles-earlymodern";
import { enlightenmentProfiles } from "@/lib/profiles-enlightenment";
import { lateProfiles } from "@/lib/profiles-late";
import { medievalProfiles } from "@/lib/profiles-medieval";
import { nineteenthProfiles } from "@/lib/profiles-nineteenth";
import { twentiethProfilesA } from "@/lib/profiles-twentieth-a";
import { twentiethProfilesB } from "@/lib/profiles-twentieth-b";
import { supplementAncientProfiles } from "@/lib/profiles-supplement-ancient";
import { supplementFoundationProfiles } from "@/lib/profiles-supplement-foundations";
import { supplementModernProfiles } from "@/lib/profiles-supplement-modern";
import { supplementTwentiethProfiles } from "@/lib/profiles-supplement-twentieth";
import { supplementContemporaryProfiles } from "@/lib/profiles-supplement-contemporary";

export const expandedPhilosophers: Philosopher[] = [
  ...axialProfiles,
  ...classicalProfiles,
  ...lateProfiles,
  ...medievalProfiles,
  ...earlyModernProfiles,
  ...enlightenmentProfiles,
  ...nineteenthProfiles,
  ...twentiethProfilesA,
  ...twentiethProfilesB,
  ...supplementAncientProfiles,
  ...supplementFoundationProfiles,
  ...supplementModernProfiles,
  ...supplementTwentiethProfiles,
  ...supplementContemporaryProfiles,
];
