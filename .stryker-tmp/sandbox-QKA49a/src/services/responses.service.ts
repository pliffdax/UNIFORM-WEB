// @ts-nocheck
function stryNS_9fa48() {
  var g =
    (typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis) ||
    new Function('return this')();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (
    ns.activeMutant === undefined &&
    g.process &&
    g.process.env &&
    g.process.env.__STRYKER_ACTIVE_MUTANT__
  ) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov =
    ns.mutantCoverage ||
    (ns.mutantCoverage = {
      static: {},
      perTest: {},
    });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { apiClient } from '@/lib/api/client';
import { FullFormResponse } from '@/types/response.types';

/**
 * Получить все ответы (submissions) для конкретной формы.
 * Это может быть полезно для владельца формы (админа).
 */
export async function getResponsesForForm(formId: number): Promise<FullFormResponse[]> {
  if (stryMutAct_9fa48('141')) {
    {
    }
  } else {
    stryCov_9fa48('141');
    return apiClient<FullFormResponse[]>(
      stryMutAct_9fa48('142') ? `` : (stryCov_9fa48('142'), `/responses/form/${formId}`),
    );
  }
}

/**
 * Получить конкретный ответ (submission) по его ID.
 */
export async function getResponseById(responseId: number): Promise<FullFormResponse> {
  if (stryMutAct_9fa48('143')) {
    {
    }
  } else {
    stryCov_9fa48('143');
    return apiClient<FullFormResponse>(
      stryMutAct_9fa48('144') ? `` : (stryCov_9fa48('144'), `/responses/${responseId}`),
    );
  }
}

/**
 * Получить все ответы (submissions), отправленные текущим пользователем.
 */
export async function getMyResponses(): Promise<FullFormResponse[]> {
  if (stryMutAct_9fa48('145')) {
    {
    }
  } else {
    stryCov_9fa48('145');
    // apiClient по умолчанию 'requiresAuth = true',
    // поэтому токен пользователя будет автоматически прикреплен.
    return apiClient<FullFormResponse[]>(
      stryMutAct_9fa48('146') ? `` : (stryCov_9fa48('146'), `/responses/my`),
    );
  }
}
