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
import { Form, CreateFormDto, Question } from '@/types/form.types';
import { SubmitResponseDto } from '@/types/response.types';

// Получить все формы
export async function getAllForms(): Promise<Form[]> {
  if (stryMutAct_9fa48('114')) {
    {
    }
  } else {
    stryCov_9fa48('114');
    return apiClient<Form[]>(stryMutAct_9fa48('115') ? '' : (stryCov_9fa48('115'), '/forms'));
  }
}

// Получить форму по ID
export async function getFormById(id: number): Promise<Form> {
  if (stryMutAct_9fa48('116')) {
    {
    }
  } else {
    stryCov_9fa48('116');
    return apiClient<Form>(stryMutAct_9fa48('117') ? `` : (stryCov_9fa48('117'), `/forms/${id}`));
  }
}

// Создать форму
export async function createForm(data: CreateFormDto): Promise<Form> {
  if (stryMutAct_9fa48('118')) {
    {
    }
  } else {
    stryCov_9fa48('118');
    return apiClient<Form>(
      stryMutAct_9fa48('119') ? '' : (stryCov_9fa48('119'), '/forms'),
      stryMutAct_9fa48('120')
        ? {}
        : (stryCov_9fa48('120'),
          {
            method: stryMutAct_9fa48('121') ? '' : (stryCov_9fa48('121'), 'POST'),
            body: data,
          }),
    );
  }
}

// Получить вопросы формы
export async function getFormQuestions(formId: number): Promise<Question[]> {
  if (stryMutAct_9fa48('122')) {
    {
    }
  } else {
    stryCov_9fa48('122');
    return apiClient<Question[]>(
      stryMutAct_9fa48('123') ? `` : (stryCov_9fa48('123'), `/forms/${formId}/questions`),
    );
  }
}

// Отправить ответы на форму
export async function submitFormResponse({ formId, answers }: SubmitResponseDto): Promise<void> {
  if (stryMutAct_9fa48('124')) {
    {
    }
  } else {
    stryCov_9fa48('124');
    return apiClient(
      stryMutAct_9fa48('125') ? `` : (stryCov_9fa48('125'), `/responses`),
      stryMutAct_9fa48('126')
        ? {}
        : (stryCov_9fa48('126'),
          {
            method: stryMutAct_9fa48('127') ? '' : (stryCov_9fa48('127'), 'POST'),
            body: stryMutAct_9fa48('128')
              ? {}
              : (stryCov_9fa48('128'),
                {
                  formId,
                  answers,
                }),
          }),
    );
  }
}
