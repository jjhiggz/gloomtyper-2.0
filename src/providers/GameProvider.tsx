import { type GameText, type Category } from "@prisma/client";
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
import { type TrackedWord } from "~/types";
import { apiRaw } from "~/utils/api";
import { createTrackedWords, getRandomItem } from "~/utils/typing-test-utils";

type Setter<T> = Dispatch<SetStateAction<T>>;

export type GameState = "none-selected" | "pending" | "active" | "finished";

type TGameContext = {
  correctCount: number;
  incorrectCount: number;
  setCorrectCount: Setter<number>;
  setIncorrectCount: Setter<number>;
  activeCategory: Category | null;
  setActiveCategory: Setter<Category | null>;
  activeGame: GameText | null;
  startGame: (categoryId: Category["id"]) => Promise<unknown>;
  setActiveGame: Setter<GameText | null>;
  inputHandler: ChangeEventHandler<HTMLInputElement>;
  inputState: string;
  inputRef: RefObject<HTMLInputElement>;
  trackedWords: TrackedWord[];
  wordIndex: number;
};

const GameContext = createContext<TGameContext | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeGame, setActiveGame] = useState<null | GameText>(null);

  const startGame = async (categoryId?: Category["id"]) => {
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

  const sampler = useSampler();
  const player = usePlayer();

  const [wordIndex, setWordIndex] = useState(0);
  const [inputState, setInputState] = useState("");
  const [trackedWords, setTrackedWords] = useState<TrackedWord[]>([]);

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
    const lastKey = e.target.value.at(-1);

    if (lastKey === " ") {
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
        startGame,
        inputHandler,
        inputRef,
        trackedWords,
        wordIndex,
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
