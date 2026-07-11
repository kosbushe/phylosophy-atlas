import { PhilosopherProfile } from "@/components/PhilosopherProfile";
import { getPhilosopher } from "@/lib/philosophers";

export default function SocratesPage() {
  return <PhilosopherProfile philosopher={getPhilosopher("socrates")} />;
}
