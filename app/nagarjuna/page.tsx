import { PhilosopherProfile } from "@/components/PhilosopherProfile";
import { getPhilosopher } from "@/lib/philosophers";

export default function NagarjunaPage() {
  return <PhilosopherProfile philosopher={getPhilosopher("nagarjuna")} />;
}
