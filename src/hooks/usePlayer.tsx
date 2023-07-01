/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { Player } from "tone";

// @ts-ignore
import inGameMusic from "../../public/inGameMusic.mp3";

export const usePlayer = () => {
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const playerInstance = new Player(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      inGameMusic as any,
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
