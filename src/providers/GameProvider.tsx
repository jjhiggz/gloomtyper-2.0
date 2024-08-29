import { type GameText, type Category } from "@prisma/client";
import {
  createContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useState,
  useContext,
} from "react";
import { apiRaw } from "~/utils/api";

type Setter<T> = Dispatch<SetStateAction<T>>;

type TGameContext = {
  correctCount: number;
  incorrectCount: number;
  setCorrectCount: Setter<number>;
  setIncorrectCount: Setter<number>;
  activeCategory: Category | null;
  setActiveCategory: Setter<Category | null>;
  activeGame: GameText | null;
  startGameForCategory: (categoryId: Category["id"]) => Promise<unknown>;
  setActiveGame: Setter<GameText | null>;
};

const GameContext = createContext<TGameContext | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeGame, setActiveGame] = useState<null | GameText>(null);

  const startGameForCategory = async (categoryId: Category["id"]) => {
    const randomGame = await apiRaw.gameRouter.getRandomGameWithCategoryId
      .query(categoryId)
      .catch(() => null);
    if (!randomGame) return;
    setActiveGame(randomGame);
  };

  return (
    <GameContext.Provider
      value={{
        correctCount,
        setCorrectCount,
        incorrectCount,
        setIncorrectCount,
        activeCategory,
        setActiveCategory,
        activeGame,
        setActiveGame,
        startGameForCategory,
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
