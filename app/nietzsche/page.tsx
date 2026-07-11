import { PhilosopherProfile } from "@/components/PhilosopherProfile";
import { getPhilosopher } from "@/lib/philosophers";

export default function NietzschePage() {
  return <PhilosopherProfile philosopher={getPhilosopher("nietzsche")} />;
}
