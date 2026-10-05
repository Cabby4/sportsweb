const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4001/api";

export const getNews = async () => {
  try {
    const response = await fetch(`${API_URL}/news`);

    console.log("News API status:", response.status);

    const data = await response.json();

    console.log("News API response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch news");
    }

    return data;
  } catch (error) {
    console.error("News API error:", error);
    throw error;
  }
};


export const getNewsById = async (id) => {
  const response = await fetch(`${API_URL}/news/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch news article");
  }

  return response.json();
};

export const getTeams = async () => {
  const response = await fetch(`${API_URL}/teams`);

  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }

  return response.json();
};

export const getTeamById = async (id) => {
  const response = await fetch(`${API_URL}/teams/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch team");
  }

  return response.json();
};

export const getFixtures = async () => {
  const response = await fetch(`${API_URL}/fixtures`);

  if (!response.ok) {
    throw new Error("Failed to fetch fixtures");
  }

  return response.json();
};

export const getFixtureById = async (id) => {
  const response = await fetch(`${API_URL}/fixtures/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch fixture");
  }

  return response.json();
};

export const getResults = async () => {
  const response = await fetch(`${API_URL}/results`);

  if (!response.ok) {
    throw new Error("Failed to fetch results");
  }

  return response.json();
};

export const getResultById = async (id) => {
  const response = await fetch(`${API_URL}/results/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch result");
  }

  return response.json();
};

export const getTransfers = async () => {
  const response = await fetch(`${API_URL}/transfers`);

  if (!response.ok) {
    throw new Error("Failed to fetch transfers");
  }

  return response.json();
};

export const getTransferById = async (id) => {
  const response = await fetch(`${API_URL}/transfers/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch transfer");
  }

  return response.json();
};

export const searchNews = async (query) => {
  const response = await fetch(
    `${API_URL}/news?search=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search news");
  }

  return response.json();
};

export const searchTeams = async (query) => {
  const response = await fetch(
    `${API_URL}/teams?search=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search teams");
  }

  return response.json();
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("cabbyToken");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createNews = async (newsData) => {
  const token = localStorage.getItem("cabbyToken");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const response = await fetch(`${API_URL}/news`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newsData),
  });

  const data = await response.json();

  console.log("Create news response:", data);

  if (!response.ok) {
    throw new Error(data.message || "Failed to create news");
  }

  return data;
};

export const updateNews = async (id, newsData) => {
  const response = await fetch(`${API_URL}/news/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(newsData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update news");
  }

  return data;
};

export const deleteNews = async (id) => {
  const response = await fetch(`${API_URL}/news/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete news");
  }

  return data;
};

export const createTeam = async (teamData) => {
  const response = await fetch(`${API_URL}/teams`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(teamData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create team");
  }

  return data;
};

export const updateTeam = async (id, teamData) => {
  const response = await fetch(`${API_URL}/teams/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(teamData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update team");
  }

  return data;
};

export const deleteTeam = async (id) => {
  const response = await fetch(`${API_URL}/teams/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete team");
  }

  return data;
};

export const createFixture = async (fixtureData) => {
  const response = await fetch(`${API_URL}/fixtures`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(fixtureData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create fixture");
  }

  return data;
};

export const updateFixture = async (id, fixtureData) => {
  const response = await fetch(`${API_URL}/fixtures/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(fixtureData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update fixture");
  }

  return data;
};

export const deleteFixture = async (id) => {
  const response = await fetch(`${API_URL}/fixtures/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete fixture");
  }

  return data;
};

export const createResult = async (resultData) => {
  const response = await fetch(`${API_URL}/results`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(resultData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create result");
  }

  return data;
};

export const updateResult = async (id, resultData) => {
  const response = await fetch(`${API_URL}/results/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(resultData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update result");
  }

  return data;
};

export const deleteResult = async (id) => {
  const response = await fetch(`${API_URL}/results/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete result");
  }

  return data;
};

export const createTransfer = async (transferData) => {
  const response = await fetch(`${API_URL}/transfers`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(transferData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create transfer"
    );
  }

  return data;
};

export const updateTransfer = async (id, transferData) => {
  const response = await fetch(
    `${API_URL}/transfers/${id}`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(transferData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update transfer"
    );
  }

  return data;
};

export const deleteTransfer = async (id) => {
  const response = await fetch(
    `${API_URL}/transfers/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete transfer"
    );
  }

  return data;
};