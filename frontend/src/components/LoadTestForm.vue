<template>
  <div class="container p-4">
    <h1>Sample Test Loading App: api/item API</h1>

    <div class="form-group mb-3">
      <label for="requestsCount">Количество запросов:</label>
      <input type="number" v-model.number="requestsCount" class="form-control" />
    </div>

    <div class="form-group mb-3">
      <label>Задержка (ms):</label>
      <input type="number" v-model.number="delayMs" class="form-control" />
    </div>

    <button class="btn btn-primary mb-3" @click="startTest" :disabled="running">
      {{ running ? "Тест идёт..." : "Старт нагрузочного теста" }}
    </button>

    <div v-if="running || completed">
      <p>Отправлено: {{ sent }}</p>
      <p>Успешно: {{ success }}</p>
      <p>Ошибки: {{ error }}</p>
      <p>Время: {{ elapsedTime }} сек</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  requestsCount,
  delayMs,
  sent,
  success,
  error,
  running,
  completed,
  elapsedTime,
  startTest,
} from "./loadTesterLogic";
</script>
