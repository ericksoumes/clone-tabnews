import retry from "async-retry";
import database from "infra/database.js";
import migrator from "models/migrator";
import user from "models/user.js";
import { faker } from "@faker-js/faker/.";

async function waitFotAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 5000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public");
}

async function runPendingMigrations() {
  await migrator.runPendindMigrations();
}

async function createUser(ObjectUser) {
  return await user.create({
    username:
      ObjectUser?.username || faker.internet.username().replace(/[_.-]/g, ""),
    email: ObjectUser?.email || faker.internet.email(),
    password: ObjectUser?.password || "senha123",
  });
}

const orchestrator = {
  waitFotAllServices,
  clearDatabase,
  runPendingMigrations,
  createUser,
};

export default orchestrator;
