import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Activity, ActivityMember } from "./definitions";

export async function fetchMembersByActivity(){
  noStore();

  try {
    const data = await sql<Array<ActivityMember>>``
    return data.rows;
  }
  catch {
    throw new Error();
  }
}

export async function createMember(member: ActivityMember) {
  const query = {
    text: `INSERT INTO members (name, surname, description, image) VALUES (\$1, \$2, \$3, \$4)`,
    values: [member.name, member.surname, member.description, member.image]
  };

  try {
    await sql.query(query);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createActivity(activity:Activity) {
  const query = {
    text: `INSERT INTO activities (title, description) VALUES (\$1, \$2)`,
    values: [activity.title, activity.description]
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
    text: `UPDATE members SET name = \$1, description = \$2 WHERE id = \$3`,
    values: [member.name, member.description, member.id]
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


export async function addMemberToActivity(activityId: number, memberId: number) {
  const query = {
    text: `INSERT INTO activity_members (activity_id, member_id) VALUES (\$1, \$2)`,
    values: [activityId, memberId]
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
    const result  = await sql.query<ActivityMember>(query);
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
    const result  = await sql.query<Activity>(query);
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
    const result  = await sql.query<ActivityMember>(query);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
