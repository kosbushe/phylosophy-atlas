import { ideaExamplesA } from "@/lib/idea-examples-a";
import { ideaExamplesB } from "@/lib/idea-examples-b";
import { ideaExamplesC } from "@/lib/idea-examples-c";

export const ideaExamples: Record<string, readonly string[]> = {
  ...ideaExamplesA,
  ...ideaExamplesB,
  ...ideaExamplesC,
};
