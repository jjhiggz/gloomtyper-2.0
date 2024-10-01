import { type Quote, type Category } from "@prisma/client";
import {
  createContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useState,
  useContext,
  useEffect,
  useRef,
  type ChangeEventHandler,
  type RefObject,
} from "react";
import { usePlayer } from "~/hooks/usePlayer";
import { useSampler } from "~/hooks/useSampler";
import useTimer from "~/hooks/useTimer";
import { type TrackedWord } from "~/types";
import { apiRaw } from "~/utils/api";
import { createTrackedWords, getRandomItem } from "~/utils/typing-test-utils";
import { useKeyListener } from "~/hooks/useKeyListener";
import { useLocalStorageState } from "~/hooks/useLocalStorageState";
import { useBeforeRefresh } from "~/hooks/useBeforeRefresh";

type Setter<T> = Dispatch<SetStateAction<T>>;

export type GameState = "none-selected" | "pending" | "active" | "finished";

type TGameContext = {
  correctCount: number;
  incorrectCount: number;
  setCorrectCount: Setter<number>;
  setIncorrectCount: Setter<number>;
  activeCategory: Category | null;
  setActiveCategory: Setter<Category | null>;
  activeGame: Quote | null;
  loadGame: (categoryId: Category["id"]) => Promise<unknown>;
  setActiveGame: Setter<Quote | null>;
  inputHandler: ChangeEventHandler<HTMLInputElement>;
  inputState: string;
  inputRef: RefObject<HTMLInputElement>;
  trackedWords: TrackedWord[];
  wordIndex: number;
  timerProps: ReturnType<typeof useTimer>;
  gameState: GameState;
};

const GameContext = createContext<TGameContext | null>(null);

const getGameState = ({
  activeGame,
  isRunning,
  totalCount,
}: {
  activeGame: null | Quote;
  isRunning: boolean;
  totalCount: number;
}): GameState => {
  if (!activeGame) return "none-selected";
  if (isRunning) return "active";
  if (totalCount) return "finished";
  if (!totalCount) return "pending";
  throw new Error("Unhandled Case in `getGameState`");
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [correctCount, setCorrectCount] = useLocalStorageState(
    "correctCount",
    0
  );
  const [incorrectCount, setIncorrectCount] = useLocalStorageState(
    "incorrectCount",
    0
  );
  const [activeCategory, setActiveCategory] =
    useLocalStorageState<Category | null>("activeCategory", null);
  const [activeGame, setActiveGame] = useLocalStorageState<null | Quote>(
    "activeGame",
    null
  );
  const [wordIndex, setWordIndex] = useLocalStorageState("wordIndex", 0);
  const [inputState, setInputState] = useLocalStorageState("inputState", "");
  const timerProps = useTimer(0);

  const sampler = useSampler();
  const player = usePlayer();

  const [trackedWords, setTrackedWords] = useState<TrackedWord[]>([]);

  const gameState = getGameState({
    activeGame,
    isRunning: timerProps.isRunning,
    totalCount: correctCount + incorrectCount,
  });

  const resetToNextGame = () => {
    setCorrectCount(0);
    setIncorrectCount(0);
    setActiveGame(null);
    setWordIndex(0);
    setInputState("");
    setTrackedWords([]);
    timerProps.pause();
    timerProps.reset();
  };

  const loadGame = async (categoryId?: Category["id"]) => {
    resetToNextGame();
    inputRef.current?.focus();
    if (categoryId) {
      const category = await apiRaw.gameRouter.getCategory
        .query(categoryId)
        .catch(() => null);

      setActiveCategory(category);

      if (!category) return;

      const randomGame = await apiRaw.gameRouter.getRandomGameWithCategoryId
        .query(categoryId)
        .catch(() => null);
      if (!randomGame) return;
      setActiveGame(randomGame);
    } else {
      const randomGame = await apiRaw.gameRouter.getRandomGame
        .query()
        .catch(() => null);

      if (!randomGame) return;
      setActiveGame(randomGame);
    }
  };

  useBeforeRefresh(() => {
    resetToNextGame();
  });

  useEffect(() => {
    if (wordIndex === 1) {
      player?.start();
    }
    if (wordIndex === trackedWords.length) {
      player?.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIndex]);

  useEffect(() => {
    if (activeGame) inputRef.current?.focus();
  }, [activeGame]);

  useEffect(() => {
    if (activeGame) setTrackedWords(createTrackedWords(activeGame.content));
    else setTrackedWords([]);
  }, [activeGame]);

  const inputRef = useRef<HTMLInputElement>(null);

  const inputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const mostRecentKey = e.target.value.at(-1);
    const isFirstWord = wordIndex === 0;
    const isLastWord = wordIndex === trackedWords.length - 1;
    const isLastWordComplete =
      inputState.length === trackedWords?.at(-1)?.correct?.length && isLastWord;

    const isCompleteByWordCount =
      incorrectCount + correctCount >= trackedWords.length;

    if (isCompleteByWordCount) {
      timerProps.pause();
    }
    if (isLastWordComplete && !isCompleteByWordCount) {
      const trackedWord = trackedWords[wordIndex];
      if (trackedWord?.correct !== trackedWord?.current) {
        setIncorrectCount((incorrectCount) => incorrectCount + 1);
      } else {
        setCorrectCount((correctCount) => correctCount + 1);
      }
    }

    if (isCompleteByWordCount || isLastWordComplete) {
      return;
    }
    // if (isComplete) alert("Complete");
    // if (isComplete) {
    //   return;
    // }

    // if (isComplete) timerProps.pause();

    const hasFirstLetterBeenTyped = isFirstWord && e.target.value.length === 1;

    if (hasFirstLetterBeenTyped && !timerProps.isRunning) {
      timerProps.start();
    }

    if (mostRecentKey === " ") {
      const trackedWord = trackedWords[wordIndex];
      sampler?.triggerAttack("C5");
      if (trackedWord?.correct !== trackedWord?.current) {
        setIncorrectCount((incorrectCount) => incorrectCount + 1);
      } else {
        setCorrectCount((correctCount) => correctCount + 1);
      }

      setWordIndex(wordIndex + 1);
      setInputState("");
      return;
    }

    const key = getRandomItem(["C1", "C2", "C3"]);
    sampler?.triggerAttack(key);
    setInputState(e.target.value);
    setTrackedWords(
      trackedWords.map((trackedWord, trackedWordIndex) => {
        if (trackedWordIndex !== wordIndex) {
          return trackedWord;
        }
        return { ...trackedWord, current: e.target.value };
      })
    );
  };

  useKeyListener({
    activeWhen: gameState === "finished" || gameState === "none-selected",
    keys: ["Tab"],
    handler: () => {
      resetToNextGame();
      loadGame(activeCategory?.id).catch(console.error);
    },
  });
  return (
    <GameContext.Provider
      value={{
        inputState,
        correctCount,
        setCorrectCount,
        incorrectCount,
        setIncorrectCount,
        activeCategory,
        setActiveCategory,
        activeGame,
        setActiveGame,
        loadGame,
        inputHandler,
        inputRef,
        trackedWords,
        wordIndex,
        timerProps,
        gameState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameProvider = () => {
  const context = useContext(GameContext);
  if (!context)
    throw new Error(
      `Please use 'useGameProvider' within the context of a 'GameProvider'`
    );
  return context;
};
