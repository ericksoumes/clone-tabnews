import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitFotAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(responseBody.updated_at).toBeDefined();

      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

      expect(typeof responseBody.dependencies.database.postgres_version).toBe(
        "string",
      );
      expect(responseBody.dependencies.database.postgres_version).toBe("16.0");

      expect(typeof responseBody.dependencies.database.max_connections).toBe(
        "number",
      );
      expect(
        responseBody.dependencies.database.max_connections,
      ).toBeGreaterThan(0);

      expect(typeof responseBody.dependencies.database.opened_connections).toBe(
        "number",
      );
      expect(responseBody.dependencies.database.opened_connections).toBe(1);
    });
  });
});
