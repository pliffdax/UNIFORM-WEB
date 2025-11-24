'use client';

import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/api/web-vitals';

export function WebVitalsReporter() {
  useEffect(() => {
    reportWebVitals();
  }, []);

  return null;
}