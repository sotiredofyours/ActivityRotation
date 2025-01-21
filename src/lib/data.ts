'use server'

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Activity, ActivityMember } from "./definitions";

export async function fetchMembersByActivity() {
  noStore();

  try {
    const data = await sql<Array<ActivityMember>>``
    return data.rows;
  }
  catch {
    throw new Error();
  }
}

export async function createMember(member: ActivityMember): Promise<number> {
  const query = {
    text: `INSERT INTO members (name, surname, description, image) VALUES (\$1, \$2, \$3, \$4) RETURNING id`,
    values: [member.name, member.surname, member.description, member.image]
  };

  try {
    const result = await sql.query(query);
    return Number.parseInt(result.rows[0].id);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createActivity(activity: Activity) {
  const query = {
    text: `INSERT INTO activities (title, description, period, day) VALUES (\$1, \$2, \$3, \$4)`,
    values: [activity.title, activity.description, activity.period, activity.day]
  };

  try {
    await sql.query(query);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateMember(member: ActivityMember) {
  const query = {
    text: `UPDATE members SET name = \$1, surname = \$2, description = \$3 WHERE id = \$4`,
    values: [member.name, member.surname, member.description, member.id]
  };

  try {
    await sql.query(query);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateActivity(activity: Activity) {
  const query = {
    text: `UPDATE activities SET title = \$1, description = \$2, period = \$3, day = \$4 WHERE id = \$5`,
    values: [activity.title, activity.description, activity.period, activity.day, activity.id]
  };

  try {
    await sql.query(query);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteActivity(id: number) {
  const query = {
    text: `DELETE FROM activities WHERE id = \$1`,
    values: [id]
  };

  try {
    await sql.query(query);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteMember(id: number) {
  const query = {
    text: `DELETE FROM members WHERE id = \$1`,
    values: [id]
  };

  try {
    await sql.query(query);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteMemberFromActivity(activtyId: number, memberId: number) {
  const query = {
    text: `DELETE FROM activity_member WHERE activity_id = \$1 AND member_id = \$2`,
    values: [activtyId, memberId]
  };

  try {
    console.log(query)
    await sql.query(query);
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function addMemberToActivity(activityId: number, memberId: number, nextChangeDate: Date) {
  const query = {
    text: `
      INSERT INTO activity_member (activity_id, member_id, next_change_date)
      VALUES (\$1, \$2, \$3)
      RETURNING *;
    `,
    values: [activityId, memberId, nextChangeDate]
  };

  try {
    await sql.query(query);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllMembersInActivity(id: number) {
  const query = {
    text:
    `SELECT m.*
     FROM members m
     INNER JOIN activity_member am ON m.id = am.member_id
     WHERE am.activity_id = \$1`,
    values: [id]
  };

  try {
    const result = await sql.query<ActivityMember>(query);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllActivities() {
  const query = {
    text: `SELECT * FROM activities`
  };

  try {
    const result = await sql.query<Activity>(query);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllMembers() {
  const query = {
    text: `SELECT * FROM members`
  };

  try {
    const result = await sql.query<ActivityMember>(query);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getNextChangeDate(activityId: number, memberId: number): Promise<Date> {
  const query = {
    text:`
    SELECT next_change_date FROM activity_member
    WHERE activity_id = \$1 AND member_id = \$2
    `,
    values: [activityId, memberId]
  };

  try {
    const result = await sql.query<{ next_change_date: Date }>(query);
    return result.rows[0].next_change_date;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
