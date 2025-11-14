// @ts-nocheck
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
    postMessage(message) {
      // Просто игнорируем в тестах
    }
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

// window.location mock
delete window.location;
window.location = {
  href: '',
  pathname: '/',
  search: '',
  hash: '',
  assign: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn(),
};

// fetch mock (для unit тестов)
global.fetch = jest.fn();

// Подавить navigation warnings
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
