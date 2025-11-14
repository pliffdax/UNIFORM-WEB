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
const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}
function getAccessToken() {
  if (stryMutAct_9fa48('0')) {
    {
    }
  } else {
    stryCov_9fa48('0');
    if (
      stryMutAct_9fa48('3')
        ? typeof window !== 'undefined'
        : stryMutAct_9fa48('2')
          ? false
          : stryMutAct_9fa48('1')
            ? true
            : (stryCov_9fa48('1', '2', '3'),
              typeof window === (stryMutAct_9fa48('4') ? '' : (stryCov_9fa48('4'), 'undefined')))
    )
      return null;
    return localStorage.getItem(stryMutAct_9fa48('5') ? '' : (stryCov_9fa48('5'), 'accessToken'));
  }
}
export async function apiClient<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
  if (stryMutAct_9fa48('6')) {
    {
    }
  } else {
    stryCov_9fa48('6');
    const {
      method = stryMutAct_9fa48('7') ? '' : (stryCov_9fa48('7'), 'GET'),
      body,
      headers = {},
      requiresAuth = stryMutAct_9fa48('8') ? false : (stryCov_9fa48('8'), true), // по умолчанию требуется авторизация
    } = config;
    const defaultHeaders: Record<string, string> = stryMutAct_9fa48('9')
      ? {}
      : (stryCov_9fa48('9'),
        {
          'Content-Type': stryMutAct_9fa48('10') ? '' : (stryCov_9fa48('10'), 'application/json'),
        });
    if (
      stryMutAct_9fa48('12')
        ? false
        : stryMutAct_9fa48('11')
          ? true
          : (stryCov_9fa48('11', '12'), requiresAuth)
    ) {
      if (stryMutAct_9fa48('13')) {
        {
        }
      } else {
        stryCov_9fa48('13');
        const token = getAccessToken();
        if (
          stryMutAct_9fa48('15')
            ? false
            : stryMutAct_9fa48('14')
              ? true
              : (stryCov_9fa48('14', '15'), token)
        ) {
          if (stryMutAct_9fa48('16')) {
            {
            }
          } else {
            stryCov_9fa48('16');
            defaultHeaders[stryMutAct_9fa48('17') ? '' : (stryCov_9fa48('17'), 'Authorization')] =
              stryMutAct_9fa48('18') ? `` : (stryCov_9fa48('18'), `Bearer ${token}`);
          }
        }
      }
    }
    const fetchConfig: RequestInit = stryMutAct_9fa48('19')
      ? {}
      : (stryCov_9fa48('19'),
        {
          method,
          headers: stryMutAct_9fa48('20')
            ? {}
            : (stryCov_9fa48('20'),
              {
                ...defaultHeaders,
                ...headers,
              }),
        });
    if (
      stryMutAct_9fa48('23')
        ? body || ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)
        : stryMutAct_9fa48('22')
          ? false
          : stryMutAct_9fa48('21')
            ? true
            : (stryCov_9fa48('21', '22', '23'),
              body &&
                (stryMutAct_9fa48('24')
                  ? []
                  : (stryCov_9fa48('24'),
                    [
                      stryMutAct_9fa48('25') ? '' : (stryCov_9fa48('25'), 'POST'),
                      stryMutAct_9fa48('26') ? '' : (stryCov_9fa48('26'), 'PUT'),
                      stryMutAct_9fa48('27') ? '' : (stryCov_9fa48('27'), 'PATCH'),
                      stryMutAct_9fa48('28') ? '' : (stryCov_9fa48('28'), 'DELETE'),
                    ])
                ).includes(method))
    ) {
      if (stryMutAct_9fa48('29')) {
        {
        }
      } else {
        stryCov_9fa48('29');
        fetchConfig.body = JSON.stringify(body);
      }
    }
    try {
      if (stryMutAct_9fa48('30')) {
        {
        }
      } else {
        stryCov_9fa48('30');
        const response = await fetch(
          stryMutAct_9fa48('31') ? `` : (stryCov_9fa48('31'), `${API_GATEWAY_URL}${endpoint}`),
          fetchConfig,
        );
        if (
          stryMutAct_9fa48('34')
            ? response.status !== 401
            : stryMutAct_9fa48('33')
              ? false
              : stryMutAct_9fa48('32')
                ? true
                : (stryCov_9fa48('32', '33', '34'), response.status === 401)
        ) {
          if (stryMutAct_9fa48('35')) {
            {
            }
          } else {
            stryCov_9fa48('35');
            if (
              stryMutAct_9fa48('38')
                ? typeof window === 'undefined'
                : stryMutAct_9fa48('37')
                  ? false
                  : stryMutAct_9fa48('36')
                    ? true
                    : (stryCov_9fa48('36', '37', '38'),
                      typeof window !==
                        (stryMutAct_9fa48('39') ? '' : (stryCov_9fa48('39'), 'undefined')))
            ) {
              if (stryMutAct_9fa48('40')) {
                {
                }
              } else {
                stryCov_9fa48('40');
                localStorage.removeItem(
                  stryMutAct_9fa48('41') ? '' : (stryCov_9fa48('41'), 'accessToken'),
                );
                window.location.href = stryMutAct_9fa48('42')
                  ? ''
                  : (stryCov_9fa48('42'), '/login');
              }
            }
            throw new Error(stryMutAct_9fa48('43') ? '' : (stryCov_9fa48('43'), 'Unauthorized'));
          }
        }
        if (
          stryMutAct_9fa48('46')
            ? false
            : stryMutAct_9fa48('45')
              ? true
              : stryMutAct_9fa48('44')
                ? response.ok
                : (stryCov_9fa48('44', '45', '46'), !response.ok)
        ) {
          if (stryMutAct_9fa48('47')) {
            {
            }
          } else {
            stryCov_9fa48('47');
            const error = await response.json().catch(
              stryMutAct_9fa48('48')
                ? () => undefined
                : (stryCov_9fa48('48'),
                  () =>
                    stryMutAct_9fa48('49')
                      ? {}
                      : (stryCov_9fa48('49'),
                        {
                          message: stryMutAct_9fa48('50')
                            ? ''
                            : (stryCov_9fa48('50'), 'Unknown error'),
                        })),
            );
            throw new Error(
              stryMutAct_9fa48('53')
                ? error.message && `HTTP Error: ${response.status}`
                : stryMutAct_9fa48('52')
                  ? false
                  : stryMutAct_9fa48('51')
                    ? true
                    : (stryCov_9fa48('51', '52', '53'),
                      error.message ||
                        (stryMutAct_9fa48('54')
                          ? ``
                          : (stryCov_9fa48('54'), `HTTP Error: ${response.status}`))),
            );
          }
        }
        const data = await response.json();
        return data;
      }
    } catch (error) {
      if (stryMutAct_9fa48('55')) {
        {
        }
      } else {
        stryCov_9fa48('55');
        console.error(
          stryMutAct_9fa48('56') ? '' : (stryCov_9fa48('56'), 'API Client Error:'),
          error,
        );
        throw error;
      }
    }
  }
}
