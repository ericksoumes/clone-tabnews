import database from "infra/database.js";
import { InternalServerError } from "infra/errors";

async function status(request, response) {
  try {
    const updatedAt = new Date().toISOString();
    const postgresVersion = await database.query("SHOW server_version");
    const postgresVersionString = postgresVersion.rows[0].server_version;
    const maxConnections = await database.query("SHOW max_connections;");
    const maxConnectionsNumber = parseInt(
      maxConnections.rows[0].max_connections,
    );
    const databaseName = process.env.POSTGRES_DB;
    const openedConnections = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    });
    const openedConnectionsNumber = openedConnections.rows[0].count;
    response.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          postgres_version: postgresVersionString,
          max_connections: maxConnectionsNumber,
          opened_connections: openedConnectionsNumber,
        },
      },
    });
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });

    console.log("\n Erro dentro do Controller");
    console.error(publicErrorObject);

    response.status(500).json(publicErrorObject);
  }
}
export default status;
