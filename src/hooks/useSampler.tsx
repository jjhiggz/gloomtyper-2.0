/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect, useState } from "react";
import { Sampler } from "tone";

// import C1 from "../../public/gunShot.mp3";
// import C2 from "../../public/reload.mp3";

import scribble1 from "../../public/scribble-1.mp3";
import scribble2 from "../../public/scribble-2.mp3";
import scribble3 from "../../public/scribble-3.mp3";
import scribble4 from "../../public/scribble-4.mp3";
import scribble5 from "../../public/scribble-5.mp3";

export const useSampler = () => {
  const [sampler, setSampler] = useState<Sampler | null>(null);

  useEffect(() => {
    const samplerInstance = new Sampler(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      {
        C1: scribble1,
        C2: scribble2,
        C3: scribble3,
        C4: scribble4,
        C5: scribble5,
      },
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
