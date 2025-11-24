import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '30s', target: 10 },   // Разогрев: 10 пользователей
    { duration: '1m', target: 50 },    // Нормальная нагрузка: 50 пользователей
    { duration: '30s', target: 100 },   // Пиковая нагрузка: 100 пользователей
    { duration: '1m', target: 50 },     // Снижение: 50 пользователей
    { duration: '30s', target: 0 },     // Завершение
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% запросов должны быть < 1 сек
    errors: ['rate<0.1'],              // Ошибок должно быть < 10%
  },
};

const FRONTEND_URL = __ENV.FRONTEND_URL || 'http://localhost:3000';

export default function () {
  let homeRes = http.get(`${FRONTEND_URL}/`);
  check(homeRes, {
    'home page status is 200': (r) => r.status === 200,
    'home page response time < 1s': (r) => r.timings.duration < 1000,
  }) || errorRate.add(1);

  sleep(1);

  let loginRes = http.get(`${FRONTEND_URL}/login`);
  check(loginRes, {
    'login page status is 200': (r) => r.status === 200,
    'login page response time < 1s': (r) => r.timings.duration < 1000,
  }) || errorRate.add(1);

  sleep(1);

  let registerRes = http.get(`${FRONTEND_URL}/registration`);
  check(registerRes, {
    'registration page status is 200': (r) => r.status === 200,
    'registration page response time < 1s': (r) => r.timings.duration < 1000,
  }) || errorRate.add(1);

  sleep(1);


  let formsListRes = http.get(`${FRONTEND_URL}/forms/list`);
  check(formsListRes, {
    'forms list page status is 200': (r) => r.status === 200,
    'forms list response time < 1s': (r) => r.timings.duration < 1000,
  }) || errorRate.add(1);

  sleep(1);

  let createFormRes = http.get(`${FRONTEND_URL}/forms/create`);
  check(createFormRes, {
    'create form page status is 200': (r) => r.status === 200,
    'create form response time < 1s': (r) => r.timings.duration < 1000,
  }) || errorRate.add(1);

  sleep(2);
}