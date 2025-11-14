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
import { LoginDto, RegisterDto, AuthResponse, CurrentUser } from '@/types/auth.types';
export async function login(credentials: LoginDto): Promise<AuthResponse> {
  if (stryMutAct_9fa48('61')) {
    {
    }
  } else {
    stryCov_9fa48('61');
    const response = await apiClient<AuthResponse>(
      stryMutAct_9fa48('62') ? '' : (stryCov_9fa48('62'), '/auth/login'),
      stryMutAct_9fa48('63')
        ? {}
        : (stryCov_9fa48('63'),
          {
            method: stryMutAct_9fa48('64') ? '' : (stryCov_9fa48('64'), 'POST'),
            body: credentials,
            requiresAuth: stryMutAct_9fa48('65') ? true : (stryCov_9fa48('65'), false),
          }),
    );
    if (
      stryMutAct_9fa48('68')
        ? typeof window === 'undefined'
        : stryMutAct_9fa48('67')
          ? false
          : stryMutAct_9fa48('66')
            ? true
            : (stryCov_9fa48('66', '67', '68'),
              typeof window !== (stryMutAct_9fa48('69') ? '' : (stryCov_9fa48('69'), 'undefined')))
    ) {
      if (stryMutAct_9fa48('70')) {
        {
        }
      } else {
        stryCov_9fa48('70');
        localStorage.setItem(
          stryMutAct_9fa48('71') ? '' : (stryCov_9fa48('71'), 'accessToken'),
          response.accessToken,
        );
        localStorage.setItem(
          stryMutAct_9fa48('72') ? '' : (stryCov_9fa48('72'), 'refreshToken'),
          response.refreshToken,
        );
      }
    }
    return response;
  }
}
export async function register(userData: RegisterDto): Promise<AuthResponse> {
  if (stryMutAct_9fa48('73')) {
    {
    }
  } else {
    stryCov_9fa48('73');
    const response = await apiClient<AuthResponse>(
      stryMutAct_9fa48('74') ? '' : (stryCov_9fa48('74'), '/auth/register'),
      stryMutAct_9fa48('75')
        ? {}
        : (stryCov_9fa48('75'),
          {
            method: stryMutAct_9fa48('76') ? '' : (stryCov_9fa48('76'), 'POST'),
            body: userData,
            requiresAuth: stryMutAct_9fa48('77') ? true : (stryCov_9fa48('77'), false),
          }),
    );
    if (
      stryMutAct_9fa48('80')
        ? typeof window === 'undefined'
        : stryMutAct_9fa48('79')
          ? false
          : stryMutAct_9fa48('78')
            ? true
            : (stryCov_9fa48('78', '79', '80'),
              typeof window !== (stryMutAct_9fa48('81') ? '' : (stryCov_9fa48('81'), 'undefined')))
    ) {
      if (stryMutAct_9fa48('82')) {
        {
        }
      } else {
        stryCov_9fa48('82');
        localStorage.setItem(
          stryMutAct_9fa48('83') ? '' : (stryCov_9fa48('83'), 'accessToken'),
          response.accessToken,
        );
        localStorage.setItem(
          stryMutAct_9fa48('84') ? '' : (stryCov_9fa48('84'), 'refreshToken'),
          response.refreshToken,
        );
      }
    }
    return response;
  }
}
export async function logout(): Promise<void> {
  if (stryMutAct_9fa48('85')) {
    {
    }
  } else {
    stryCov_9fa48('85');
    if (
      stryMutAct_9fa48('88')
        ? typeof window === 'undefined'
        : stryMutAct_9fa48('87')
          ? false
          : stryMutAct_9fa48('86')
            ? true
            : (stryCov_9fa48('86', '87', '88'),
              typeof window !== (stryMutAct_9fa48('89') ? '' : (stryCov_9fa48('89'), 'undefined')))
    ) {
      if (stryMutAct_9fa48('90')) {
        {
        }
      } else {
        stryCov_9fa48('90');
        localStorage.removeItem(stryMutAct_9fa48('91') ? '' : (stryCov_9fa48('91'), 'accessToken'));
        localStorage.removeItem(
          stryMutAct_9fa48('92') ? '' : (stryCov_9fa48('92'), 'refreshToken'),
        );
      }
    }
    try {
      if (stryMutAct_9fa48('93')) {
        {
        }
      } else {
        stryCov_9fa48('93');
        await apiClient(
          stryMutAct_9fa48('94') ? '' : (stryCov_9fa48('94'), '/auth/logout'),
          stryMutAct_9fa48('95')
            ? {}
            : (stryCov_9fa48('95'),
              {
                method: stryMutAct_9fa48('96') ? '' : (stryCov_9fa48('96'), 'POST'),
              }),
        );
      }
    } catch (error) {
      if (stryMutAct_9fa48('97')) {
        {
        }
      } else {
        stryCov_9fa48('97');
        console.error(
          stryMutAct_9fa48('98') ? '' : (stryCov_9fa48('98'), 'Failed to logout:'),
          error,
        );
        throw error;
      }
    }
  }
}
export async function getCurrentUser(): Promise<CurrentUser> {
  if (stryMutAct_9fa48('99')) {
    {
    }
  } else {
    stryCov_9fa48('99');
    return apiClient<CurrentUser>(
      stryMutAct_9fa48('100') ? '' : (stryCov_9fa48('100'), '/auth/me'),
    );
  }
}

// === ОБНОВИТЬ ТОКЕН ===
export async function refreshAccessToken(): Promise<string> {
  if (stryMutAct_9fa48('101')) {
    {
    }
  } else {
    stryCov_9fa48('101');
    const refreshToken = localStorage.getItem(
      stryMutAct_9fa48('102') ? '' : (stryCov_9fa48('102'), 'refreshToken'),
    );
    if (
      stryMutAct_9fa48('105')
        ? false
        : stryMutAct_9fa48('104')
          ? true
          : stryMutAct_9fa48('103')
            ? refreshToken
            : (stryCov_9fa48('103', '104', '105'), !refreshToken)
    ) {
      if (stryMutAct_9fa48('106')) {
        {
        }
      } else {
        stryCov_9fa48('106');
        throw new Error(
          stryMutAct_9fa48('107') ? '' : (stryCov_9fa48('107'), 'No refresh token found'),
        );
      }
    }
    const response = await apiClient<{
      accessToken: string;
    }>(
      stryMutAct_9fa48('108') ? '' : (stryCov_9fa48('108'), '/auth/refresh'),
      stryMutAct_9fa48('109')
        ? {}
        : (stryCov_9fa48('109'),
          {
            method: stryMutAct_9fa48('110') ? '' : (stryCov_9fa48('110'), 'POST'),
            body: stryMutAct_9fa48('111')
              ? {}
              : (stryCov_9fa48('111'),
                {
                  refreshToken,
                }),
            requiresAuth: stryMutAct_9fa48('112') ? true : (stryCov_9fa48('112'), false),
          }),
    );
    localStorage.setItem(
      stryMutAct_9fa48('113') ? '' : (stryCov_9fa48('113'), 'accessToken'),
      response.accessToken,
    );
    return response.accessToken;
  }
}
