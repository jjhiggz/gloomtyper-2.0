import { useEffect, useState } from "react";
import { Sampler } from "tone";

import C1 from "../../public/gunShot.mp3";
import C2 from "../../public/reload.mp3";

export const useSampler = () => {
  const [sampler, setSampler] = useState<Sampler | null>(null);

  useEffect(() => {
    const samplerInstance = new Sampler(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      { C1: C1, C2 },
      {
        onload: () => {
          setSampler(samplerInstance);
        },
      }
    ).toDestination();
    return () => {
      samplerInstance.disconnect();
    };
  }, []);

  return sampler;
};
