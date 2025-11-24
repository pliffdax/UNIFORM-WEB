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
import {
  Question,
  QuestionWithDetails,
  CreateQuestionDto,
  UpdateQuestionDto,
} from '@/types/question.types';

// Получить ВСЕ вопросы (для списка)
export async function getAllQuestions(): Promise<Question[]> {
  if (stryMutAct_9fa48('129')) {
    {
    }
  } else {
    stryCov_9fa48('129');
    // Мы предполагаем, что твой API отдает список вопросов по этому эндпоинту
    return apiClient<Question[]>(
      stryMutAct_9fa48('130') ? '' : (stryCov_9fa48('130'), '/questions'),
    );
  }
}

// Получить ОДИН вопрос (для страницы просмотра)
export async function getQuestionById(id: number): Promise<QuestionWithDetails> {
  if (stryMutAct_9fa48('131')) {
    {
    }
  } else {
    stryCov_9fa48('131');
    return apiClient<QuestionWithDetails>(
      stryMutAct_9fa48('132') ? `` : (stryCov_9fa48('132'), `/questions/${id}`),
    );
  }
}

// Создать вопрос
export async function createQuestion(data: CreateQuestionDto): Promise<Question> {
  if (stryMutAct_9fa48('133')) {
    {
    }
  } else {
    stryCov_9fa48('133');
    return apiClient<Question>(
      stryMutAct_9fa48('134') ? '' : (stryCov_9fa48('134'), '/questions'),
      stryMutAct_9fa48('135')
        ? {}
        : (stryCov_9fa48('135'),
          {
            method: stryMutAct_9fa48('136') ? '' : (stryCov_9fa48('136'), 'POST'),
            body: data,
          }),
    );
  }
}

// (Может понадобиться в будущем)
// Обновить вопрос
export async function updateQuestion(id: number, data: UpdateQuestionDto): Promise<Question> {
  if (stryMutAct_9fa48('137')) {
    {
    }
  } else {
    stryCov_9fa48('137');
    return apiClient<Question>(
      stryMutAct_9fa48('138') ? `` : (stryCov_9fa48('138'), `/questions/${id}`),
      stryMutAct_9fa48('139')
        ? {}
        : (stryCov_9fa48('139'),
          {
            method: stryMutAct_9fa48('140') ? '' : (stryCov_9fa48('140'), 'PUT'),
            // или 'PUT'
            body: data,
          }),
    );
  }
}
