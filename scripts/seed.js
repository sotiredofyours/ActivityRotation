const { db } = require('@vercel/postgres');

async function seedMembers(client) {
  try {
    const createTable = client.sql`
      CREATE TABLE IF NOT EXIST members (
        id SERIAL,
        name VARCHAR,
        surname VARCHAR,
        description VARCHAR,
        image VARCHAR
      );
    `;

    console.log('Created members table');
    return {
      createTable
    };
  } catch (error) {
    console.log('Error while creating members table');
  }
};

async function main() {
  const client = await db.connect();
  await seedMembers(client);
}

main();
