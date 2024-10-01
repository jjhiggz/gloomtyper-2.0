import { useGameProvider } from "~/providers/GameProvider";
import { api } from "~/utils/api";

export const GameCategories = () => {
  const { activeCategory, setActiveCategory, setActiveGame } =
    useGameProvider();

  const { data: categoryData } = api.gameRouter.getAllCategories.useQuery();

  const { data: gamesData } = api.gameRouter.getAllGamesWithCategoryId.useQuery(
    activeCategory?.id || null,
    { enabled: !!activeCategory }
  );

  return (
    <div>
      <h1 className="text-6xl text-white">Categories</h1>
      <h3 className="text-5xl text-white">
        {activeCategory?.name || "no category selected"}
      </h3>
      <div className="flex">
        {!categoryData && <h3>loading...</h3>}
        {categoryData && (
          <div>
            {categoryData.map((category) => (
              <li
                key={category.id}
                className="text-white"
                onClick={() => {
                  setActiveCategory(category);
                }}
              >
                {category.name}
              </li>
            ))}
          </div>
        )}
      </div>
      <h1 className="text-6xl text-white">Games</h1>
      {!gamesData && <h3>loading...</h3>}
      {gamesData && (
        <div>
          {gamesData?.map((game) => (
            <li
              key={game.id}
              className="text-white"
              onClick={() => {
                setActiveGame(game);
              }}
            >
              {game.name}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};
