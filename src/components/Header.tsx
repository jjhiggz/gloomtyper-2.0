import React from "react";
import { useGameProvider } from "~/providers/GameProvider";
import { api } from "~/utils/api";

export const Header = () => {
  const { data: allCategories } = api.gameRouter.getAllCategories.useQuery();
  const { startGameForCategory } = useGameProvider();
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center space-x-4">
        {/* Logo or Brand Name */}
        <div className="cursor-pointer text-xl font-bold text-gray-800">
          Gloomtyper
        </div>
      </div>
      <nav className="flex items-center justify-center space-x-4 rounded-2xl bg-gray-300 p-3 text-gray-800">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          <button className="cursor-default text-gray-700">Categories: </button>
          <button className="mx-2 text-gray-600">|</button>

          {(allCategories ?? []).map((category) => (
            <button
              className="hover:text-white"
              key={category.id}
              onClick={() => {
                startGameForCategory(category.id).catch(() => {
                  console.error("something went wrong starting game");
                });
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
