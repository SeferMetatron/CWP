const GET = async (BASE_URL) => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

const POST = async (BASE_URL, body) => {
  return await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const DELETE = async (BASE_URL, id) => {
  return await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const BASE_URL =
  "https://api.themoviedb.org/3/discover/movie?with_genres=53&api_key=7a90f646e8bc9debee71e38dca588197";
export { GET, POST, DELETE, BASE_URL };
