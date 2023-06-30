import { useEffect, useState } from "react";
import { Player } from "tone";

import inGameMusic from "../../public/inGameMusic.mp3";

export const usePlayer = () => {
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const playerInstance = new Player(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      inGameMusic,
      () => {
        setPlayer(playerInstance);
      }
    ).toDestination();
    return () => {
      // playerInstance.disconnect();
    };
  }, []);

  return player;
};
