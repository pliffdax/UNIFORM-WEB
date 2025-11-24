import { onCLS, onINP, onLCP, onFCP, onTTFB, Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  console.log('Web Vital:', {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
  });
}

export function reportWebVitals() {
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics); // Заменили onFID на onINP
  onLCP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}