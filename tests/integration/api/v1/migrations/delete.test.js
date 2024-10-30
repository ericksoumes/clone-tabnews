import database from "infra/database.js";

beforeAll(cleanDataBase);

async function cleanDataBase() {
  await database.query("drop schema public cascade; create schema public");
}

test("DELETE to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "DELETE",
  });
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
