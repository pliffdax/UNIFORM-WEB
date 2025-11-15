import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import 'whatwg-fetch';
import { WritableStream, ReadableStream, TransformStream } from 'web-streams-polyfill';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.WritableStream = WritableStream;
global.ReadableStream = ReadableStream;
global.TransformStream = TransformStream;

if (typeof global.BroadcastChannel === 'undefined') {
  global.BroadcastChannel = class BroadcastChannel {
    constructor(name) {
      this.name = name;
      this.listeners = [];
    }
    postMessage(message) {}
    addEventListener(type, listener) {
      this.listeners.push(listener);
    }
    removeEventListener(type, listener) {
      this.listeners = this.listeners.filter(l => l !== listener);
    }
    close() {
      this.listeners = [];
    }
  };
}

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

if (typeof window !== 'undefined' && window.location) {
  try {
    Object.defineProperty(window.location, 'assign', {
      configurable: true,
      writable: true,
      value: jest.fn(function (url) {
        this.href = url;
      }),
    });
    Object.defineProperty(window.location, 'replace', {
      configurable: true,
      writable: true,
      value: jest.fn(function (url) {
        this.href = url;
      }),
    });
  } catch (e) {}
}

global.fetch = jest.fn();

const originalError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Not implemented: navigation')) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
