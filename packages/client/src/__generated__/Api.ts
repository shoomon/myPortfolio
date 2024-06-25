/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Portfolio {
  id: number
  title: string
  contents: string
  name: string
  birth: string
  locate: string
  graduated: string
  eMail: string
  skills: string[]
  gitUrl: string
}

export interface UpdatePortfolioDto {
  /** 제목 */
  title: string
  /** 내용 */
  contents: string
  /** 이름 */
  name: string
  /** 사는 지역 */
  locate: string
  /** 학력 */
  graduated: string
  /** 메일주소 */
  eMail: string
  /** 깃허브 주소 */
  gitUrl: string
}

/** 스킬 분류 */
export enum Part {
  BackEnd = 'Back-End',
  FrontEnd = 'Front-End',
  Database = 'Database',
  VersionControl = 'Version Control',
  Tools = 'Tools',
}

export interface CreateSkillDto {
  /** 스킬명 */
  name: string
  /** 스킬 이미지 */
  imageUrl: string
  /** 스킬 분류 */
  part: Part
  /** 스킬 노출 순서 */
  index: number
}

export interface UpadateSkillDto {
  /** 스킬명 */
  name: string
  /** 스킬 이미지 */
  imageUrl: string
  /** 스킬 분류 */
  part: Part
  /** 스킬 노출 순서 */
  index: number
}

export interface DiaryDto {
  id: number
  title: string
  contents: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
}

export interface PageInfo {
  page: number
  hasNextPage: boolean
  total: number
}

export interface GetDiariesResponse {
  data: DiaryDto[]
  pageInfo: PageInfo
}

export interface CreateDiaryDto {
  /** 제목 */
  title: string
  /** 내용 */
  contents: string
}

export interface Diaries {
  id: number
  title: string
  contents: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
}

export interface UpdateDiaryDto {
  /** 변경할 제목 */
  title: string
  /** 변경할 내용 */
  contents: string
}

export interface GuestBook {
  id: number
  name: string
  password: string
  contents: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  isVisible: boolean
}

export interface GetGuestBooksResponse {
  data: GuestBook[]
  pageInfo: PageInfo
}

export interface CreateGuestBookDto {
  /** 게스트 이름 */
  name: string
  /** 게시글 비밀번호 */
  password: string
  /** 내용 */
  contents: string
}

export interface UpdateGuestBookDto {
  /** 변경할 이름 */
  name: string
  /** 비밀번호 */
  password: string
  /** 변경할 내용 */
  contents: string
}

export interface ReportDto {
  /** 신고할 게시글 */
  id: number
  /** 신고사유 */
  reason: string
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = ''
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  }

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch((e) => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title APIs for Portfolio Web
 * @version 1.0
 * @contact
 *
 * for soomin's portfolio-web
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  portfolio = {
    /**
     * No description
     *
     * @tags portfolio
     * @name PortfolioControllerGet
     * @request GET:/portfolio
     */
    portfolioControllerGet: (params: RequestParams = {}) =>
      this.request<Portfolio, any>({
        path: `/portfolio`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags portfolio
     * @name PortfolioControllerUpdate
     * @request PATCH:/portfolio
     */
    portfolioControllerUpdate: (data: UpdatePortfolioDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/portfolio`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  }
  skills = {
    /**
     * No description
     *
     * @tags skill
     * @name SkillsControllerGet
     * @request GET:/skills
     */
    skillsControllerGet: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/skills`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags skill
     * @name SkillsControllerCreate
     * @request POST:/skills
     */
    skillsControllerCreate: (data: CreateSkillDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/skills`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags skill
     * @name SkillsControllerUpdate
     * @request PATCH:/skills/{id}
     */
    skillsControllerUpdate: (id: number, data: UpadateSkillDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/skills/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags skill
     * @name SkillsControllerDelete
     * @request DELETE:/skills/{id}
     */
    skillsControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/skills/${id}`,
        method: 'DELETE',
        ...params,
      }),
  }
  diaries = {
    /**
     * No description
     *
     * @tags diaries
     * @name DiariesControllerGet
     * @request GET:/diaries
     */
    diariesControllerGet: (
      query: {
        /**
         * Page number
         * @example 1
         */
        page: number
        /**
         * Page size
         * @example 5
         */
        size: number
      },
      params: RequestParams = {},
    ) =>
      this.request<any, GetDiariesResponse>({
        path: `/diaries`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags diaries
     * @name DiariesControllerCreate
     * @request POST:/diaries
     */
    diariesControllerCreate: (data: CreateDiaryDto, params: RequestParams = {}) =>
      this.request<Diaries, any>({
        path: `/diaries`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags diaries
     * @name DiariesControllerUpdate
     * @request PATCH:/diaries/{id}
     */
    diariesControllerUpdate: (id: number, data: UpdateDiaryDto, params: RequestParams = {}) =>
      this.request<Diaries, any>({
        path: `/diaries/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags diaries
     * @name DiariesControllerDelete
     * @request DELETE:/diaries/{id}
     */
    diariesControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/diaries/${id}`,
        method: 'DELETE',
        ...params,
      }),
  }
  guestBooks = {
    /**
     * No description
     *
     * @tags guest-book
     * @name GuestBooksControllerGet
     * @request GET:/guest-books
     */
    guestBooksControllerGet: (
      query: {
        /**
         * Page number
         * @example 1
         */
        page: number
        /**
         * Page size
         * @example 5
         */
        size: number
      },
      params: RequestParams = {},
    ) =>
      this.request<GetGuestBooksResponse, any>({
        path: `/guest-books`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags guest-book
     * @name GuestBooksControllerCreate
     * @request POST:/guest-books
     */
    guestBooksControllerCreate: (data: CreateGuestBookDto, params: RequestParams = {}) =>
      this.request<GuestBook, any>({
        path: `/guest-books`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags guest-book
     * @name GuestBooksControllerUpdate
     * @request PATCH:/guest-books/{id}
     */
    guestBooksControllerUpdate: (id: number, data: UpdateGuestBookDto, params: RequestParams = {}) =>
      this.request<GuestBook, any>({
        path: `/guest-books/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags guest-book
     * @name GuestBooksControllerDelete
     * @request DELETE:/guest-books/{id}
     */
    guestBooksControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/guest-books/${id}`,
        method: 'DELETE',
        ...params,
      }),
  }
  reports = {
    /**
     * No description
     *
     * @tags report
     * @name ReportsControllerGetNotReviewed
     * @request GET:/reports
     */
    reportsControllerGetNotReviewed: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/reports`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name ReportsControllerCreateReport
     * @request POST:/reports
     */
    reportsControllerCreateReport: (data: ReportDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/reports`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name ReportsControllerRestore
     * @request PATCH:/reports/{id}
     */
    reportsControllerRestore: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/reports/${id}`,
        method: 'PATCH',
        ...params,
      }),
  }
}
