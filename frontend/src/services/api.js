const BASE_URL = 'http://localhost:3001';

export async function fetchItems() {
  const response = await fetch(`${BASE_URL}/api/items`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}