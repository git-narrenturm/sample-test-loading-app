const BASE_URL: string = import.meta.env.VITE_API_URL;

export interface Item {
  id: number;
  name: string;
  created_at: Date
}

export async function fetchItems(): Promise<Item[]> {
  const response = await fetch(`${BASE_URL}/api/item`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as Item[];
}
