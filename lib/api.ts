const BASE_URL = "https://685013d7e7c42cfd17974a33.mockapi.io";

export async function fetchUsers() {
  const res = await fetch(`${BASE_URL}/taxes`);
  if (!(res.status === 200)) throw new Error("Failed to fetch users");
  return res.json();
}

export async function fetchCountries() {
  const res = await fetch(`${BASE_URL}/countries`, {
    cache: "force-cache", 
  });
  if (!(res.status === 200)) throw new Error("Failed to fetch countries");
  return res.json();
}
