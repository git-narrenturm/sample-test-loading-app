<template>
  <div class="container p-4">
    <h1>Sample Test Loading App: api/items API</h1>

    <div class="form-group mb-3">
      <label for="requestsCount">Количество запросов:</label>
      <input
        type="number"
        v-model.number="requestsCount"
        id="requestsCount"
        class="form-control"
      />
    </div>

    <div class="form-group mb-3">
      <label for="delayMs">Задержка между запросами (ms):</label>
      <input
        type="number"
        v-model.number="delayMs"
        id="delayMs"
        class="form-control"
      />
    </div>

    <button class="btn btn-primary mb-3" @click="startTest" :disabled="running">
      {{ running ? "Тест идёт..." : "Старт нагрузочного теста" }}
    </button>

    <div v-if="running || completed">
      <p>Отправлено запросов: {{ sent }}</p>
      <p>Успешно: {{ success }}</p>
      <p>С ошибкой: {{ error }}</p>
      <p>Время выполнения: {{ elapsedTime }} сек</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { fetchItems } from '../services/api';

const requestsCount = ref(100);
const delayMs = ref(100);

const sent = ref(0);
const success = ref(0);
const error = ref(0);

const running = ref(false);
const completed = ref(false);
const elapsedTime = ref(0);

let intervalId = null;

async function startTest() {
  sent.value = 0;
  success.value = 0;
  error.value = 0;
  completed.value = false;
  running.value = true;
  elapsedTime.value = 0;

  const startTime = Date.now();

  // обновляем время каждые 100 мс
  intervalId = setInterval(() => {
    elapsedTime.value = ((Date.now() - startTime) / 1000).toFixed(2);
  }, 100);

  for (let i = 0; i < requestsCount.value; i++) {
    sendRequest(i);
    if (delayMs.value > 0) {
      await new Promise(resolve => setTimeout(resolve, delayMs.value));
    }
  }
}

async function sendRequest(i) {
  sent.value++;
  try {
    await fetchItems();
    success.value++;
  } catch (e) {
    error.value++;
  } finally {
    if (sent.value === requestsCount.value) {
      running.value = false;
      completed.value = true;
      clearInterval(intervalId);
    }
  }
}
</script>
