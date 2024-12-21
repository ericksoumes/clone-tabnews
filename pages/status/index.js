import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function UpdatedAt() {
  const { data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  const UpdatedAtText = data
    ? new Date(data.updated_at).toLocaleString("pt-BR")
    : "Carregando";

  return (
    <div>
      <strong>🕓 Última Atualização: </strong>
      {UpdatedAtText}
    </div>
  );
}

function DataBase() {
  const { data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  const DataBaseText = data
    ? data.dependencies.database.postgres_version
    : "Carregando";

  return (
    <div>
      <strong>🗃️ Postgres Version:</strong> {DataBaseText}
    </div>
  );
}

function MaxConnections() {
  const { data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  const MaxConnectionsText = data
    ? data.dependencies.database.max_connections
    : "Carregando";

  return (
    <div>
      <strong>⬆️ Max Connections:</strong> {MaxConnectionsText}
    </div>
  );
}

function OpenedConections() {
  const { data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  const OpenedConectionsText = data
    ? data.dependencies.database.opened_connections
    : "Carregando";

  return (
    <div>
      <strong>➡️ Opened Connections:</strong> {OpenedConectionsText}
    </div>
  );
}

export default function StatusPage() {
  return (
    <>
      <h1>🌐Status</h1>
      <UpdatedAt />
      <DataBase />
      <MaxConnections />
      <OpenedConections />
    </>
  );
}
