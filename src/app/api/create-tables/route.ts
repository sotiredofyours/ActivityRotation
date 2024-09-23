import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS members (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255),
          surname VARCHAR(255),
          description TEXT,
          image VARCHAR(255)
        );
      `;

    await sql`
        CREATE TABLE IF NOT EXISTS activities (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255),
          description VARCHAR(255)
        );
    `;

    await sql`
        CREATE TABLE IF NOT EXISTS activity_member (
          id SERIAL PRIMARY KEY,
          activity_id INTEGER NOT NULL,
          member_id INTEGER NOT NULL,
          FOREIGN KEY (activity_id) REFERENCES activities(id),
          FOREIGN KEY (member_id) REFERENCES members(id),
          UNIQUE (activity_id, member_id)
        );
    `
    
    return NextResponse.json({}, { status: 200 })
  }
  catch(ex) {
    return NextResponse.json(JSON.stringify(ex), { status: 505 })
  };
};
