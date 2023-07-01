/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect, useState } from "react";
import { Sampler } from "tone";

// import C1 from "../../public/gunShot.mp3";
// import C2 from "../../public/reload.mp3";

// @ts-ignore
import scribble1 from "../../public/scribble-1.mp3";
// @ts-ignore
import scribble2 from "../../public/scribble-2.mp3";
// @ts-ignore
import scribble3 from "../../public/scribble-3.mp3";
// @ts-ignore
import scribble4 from "../../public/scribble-4.mp3";
// @ts-ignore
import scribble5 from "../../public/scribble-5.mp3";

export const useSampler = () => {
  const [sampler, setSampler] = useState<Sampler | null>(null);

  useEffect(() => {
    const samplerInstance = new Sampler(
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
