import Head from "next/head";
import { useState } from "react";
import { GameBoard } from "~/components/GameBoard";
import { GameCategories } from "~/components/GameCategories";
import { GameStats } from "~/components/GameStats";
import NoSSR from "~/components/NoSSR";

function Home() {
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  return (
    <>
      <Head>
        <title>QuickTyper</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center border-r-8 bg-gradient-to-b from-[#2e026d] to-[#15162c] px-24">
        <GameCategories />
        <GameStats
          correctCount={correctCount}
          incorrectCount={incorrectCount}
        />
        <NoSSR>
          <GameBoard
            setCorrectCount={setCorrectCount}
            setIncorrectCount={setIncorrectCount}
          />
        </NoSSR>
      </main>
    </>
  );
}

export default function HomePage(props: any) {
  return (
    // <NoSSR>
    <Home />
    // </NoSSR>
  );
}
