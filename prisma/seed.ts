const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function runSeed() {

    await prisma.category.deleteMany()
    await prisma.gameText.deleteMany()

    const bookQuotes = await prisma.category.create({
        data: {
            name: "Book Quotes",
        }
    })

    const jokes = await prisma.category.create({
        data: {
            name: "jokes",
        }
    })

    await prisma.gameText.create({
        data: {
            name: "Dad Joke 1",
            content: "Why did the fish cross the road? Because it was running from the chicken",
            categories: {
                connect: [{
                    id: jokes.id
                }]
            }
        }
    })


    await prisma.gameText.create({
        data: {
            name: "Mom Joke",
            content: "Your mom is so cool, that she literally knows drake, and introduced you to him at a concert once.",
            categories: {
                connect: [{
                    id: jokes.id
                }]
            }
        }
    })

    await prisma.gameText.create({
        data: {
            name: "LOTR Quote 1",
            content: "It's a Dangerous Business, Frodo, Going Out Your Door.",
            categories: {
                connect: [{
                    id: jokes.id
                }, {
                    id: bookQuotes.id
                }]
            }
        }
    })

}


runSeed()
    .then(() => {
        console.log("seeded")
    }).catch((e) => {
        console.error(e)
        console.error("something went wrong")
    })