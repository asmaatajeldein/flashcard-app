import { PrismaClient } from '@prisma/client';

// intialize prisma client
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'lorelaigilmore@email.com' },
    update: {},
    create: {
      email: 'lorelaigilmore@email.com',
      hash: 'superhashed',
      decks: {
        create: {
          title: 'deck 1',
          flashcards: {
            create: [
              { front: 'faze', back: 'to distub someone' },
              { front: 'heedless', back: 'reckless' },
            ],
          },
        },
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'rorygilmore@email.com' },
    update: {},
    create: {
      email: 'rorygilmore@email.com',
      hash: 'sosuperhashed',
      decks: {
        create: {
          title: 'deck 1',
          flashcards: {
            create: [
              { front: 'reciporcal', back: 'mutual' },
              { front: 'persevere', back: 'means persist' },
            ],
          },
        },
      },
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    // close prisma client at the end
    await prisma.$disconnect();
  });
