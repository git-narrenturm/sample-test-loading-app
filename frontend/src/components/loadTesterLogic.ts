import { ref } from "vue";
import { fetchItems } from "../services/api";

export interface LoadTestState {
  requestsCount: number;
  delayMs: number;
  sent: number;
  success: number;
  error: number;
  running: boolean;
  completed: boolean;
  elapsedTime: number;
}

export const requestsCount = ref<number>(100);
export const delayMs = ref<number>(100);

export const sent = ref<number>(0);
export const success = ref<number>(0);
export const error = ref<number>(0);

export const running = ref<boolean>(false);
export const completed = ref<boolean>(false);
export const elapsedTime = ref<number>(0);

let intervalId: ReturnType<typeof setInterval> | null = null;

export async function startTest(): Promise<void> {
  sent.value = 0;
  success.value = 0;
  error.value = 0;
  completed.value = false;
  running.value = true;
  elapsedTime.value = 0;

  const startTime = Date.now();

  intervalId = setInterval(() => {
    elapsedTime.value = Number(((Date.now() - startTime) / 1000).toFixed(2));
  }, 100);

  for (let i = 0; i < requestsCount.value; i++) {
    sendRequest();

    if (delayMs.value > 0) {
      await new Promise((resolve) =>
        setTimeout(resolve, delayMs.value)
      );
    }
  }
}

async function sendRequest(): Promise<void> {
  sent.value++;
  
  try {
    await fetchItems();
    success.value++;
  } catch {
    error.value++;
  } finally {
    if (success.value + error.value === requestsCount.value) {
      running.value = false;
      completed.value = true;

      if (intervalId) clearInterval(intervalId);
    }
  }
}
