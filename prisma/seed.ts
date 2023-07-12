import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function runSeed() {
  await prisma.category.deleteMany();
  await prisma.gameText.deleteMany();

  const bookQuotes = await prisma.category.create({
    data: {
      name: "Book Quotes",
    },
  });

  const jokes = await prisma.category.create({
    data: {
      name: "Jokes",
    },
  });

  const jonQuotes = await prisma.category.create({
    data: {
      name: "Jon Quotes",
    },
  });

  await prisma.gameText.create({
    data: {
      name: "Dad Joke 1",
      content:
        "Why did the fish cross the road? Because it was running from the chicken",
      categories: {
        connect: [
          {
            id: jokes.id,
          },
        ],
      },
    },
  });

  await prisma.gameText.create({
    data: {
      name: "Mom Joke",
      content:
        "Your mom is so cool, that she literally knows drake, and introduced you to him at a concert once.",
      categories: {
        connect: [
          {
            id: jokes.id,
          },
        ],
      },
    },
  });

  await prisma.gameText.create({
    data: {
      name: "LOTR Quote 1",
      content: "It's a Dangerous Business, Frodo, Going Out Your Door.",
      categories: {
        connect: [
          {
            id: jokes.id,
          },
          {
            id: bookQuotes.id,
          },
        ],
      },
    },
  });

  await prisma.gameText.create({
    data: {
      name: "My House isn't Your Junkyard Lyrics",
      content: `My Brain's a bit f**ked up, my hearts in the right place, believe me when I say I'm trying my best. My best days are sloppy my worst days are junkyard, I'm clean but I'm dirty I have to confess. No seriously I couldn't lie to a baby but baby this curse shows that maybe you're blessed. When I met you I was all I had... So I let people treat me like a rag.`,
      categories: {
        connect: [
          {
            id: jokes.id,
          },
          {
            id: bookQuotes.id,
          },
        ],
      },
    },
  });

  await prisma.gameText.create({
    data: {
      name: "My House isn't Your Junkyard Lyrics",
      content: `I feel your light, but everything is black. I know you're right, where my heart is at. There's nothing wrong, with the way I'm sensing you. And I'm shooting for the moon. I'll be your puppy eyed idiot, I swear I'll keep every dirty thought of you I have so innocent. Is that your smell I want to swim in it, at least we're both in hell and we're not alone but hey I'm feeling it`,
      categories: {
        connect: [
          {
            id: jokes.id,
          },
          {
            id: bookQuotes.id,
          },
        ],
      },
    },
  });
}

runSeed()
  .then(() => {
    console.log("seeded");
  })
  .catch((e) => {
    console.error(e);
    console.error("something went wrong");
  });
