import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AdminUser_Key {
  id: UUIDString;
  __typename?: 'AdminUser_Key';
}

export interface CreateAdminUserData {
  adminUser_insert: AdminUser_Key;
}

export interface CreateAdminUserVariables {
  username: string;
  email: string;
  role: string;
}

export interface CreateFeedbackData {
  feedback_insert: Feedback_Key;
}

export interface CreateFeedbackVariables {
  rating: number;
  message: string;
  qrTokenId: UUIDString;
}

export interface CreateOfficeData {
  office_insert: Office_Key;
}

export interface CreateQrTokenData {
  qrToken_insert: QrToken_Key;
}

export interface CreateQrTokenVariables {
  officeId: UUIDString;
  token: string;
}

export interface CreateScanLogData {
  scanLog_insert: ScanLog_Key;
}

export interface CreateScanLogVariables {
  qrTokenId: UUIDString;
  ip: string;
}

export interface DeleteAdminUserData {
  adminUser_delete?: AdminUser_Key | null;
}

export interface DeleteAdminUserVariables {
  id: UUIDString;
}

export interface DeleteFeedbackData {
  feedback_delete?: Feedback_Key | null;
}

export interface DeleteFeedbackVariables {
  id: UUIDString;
}

export interface DeleteOfficeData {
  office_delete?: Office_Key | null;
}

export interface DeleteOfficeVariables {
  id: UUIDString;
}

export interface DeleteQrTokenData {
  qrToken_delete?: QrToken_Key | null;
}

export interface DeleteQrTokenVariables {
  id: UUIDString;
}

export interface DeleteScanLogData {
  scanLog_delete?: ScanLog_Key | null;
}

export interface DeleteScanLogVariables {
  id: UUIDString;
}

export interface Feedback_Key {
  id: UUIDString;
  __typename?: 'Feedback_Key';
}

export interface GetAdminUserData {
  adminUser?: {
    username: string;
    email: string;
    role: string;
  };
}

export interface GetAdminUserVariables {
  id: UUIDString;
}

export interface GetFeedbackData {
  feedback?: {
    rating: number;
    message: string;
    qrToken: {
      tokenString: string;
    };
  };
}

export interface GetFeedbackVariables {
  id: UUIDString;
}

export interface GetOfficeData {
  office?: {
    name: string;
    locationCode: string;
    description?: string | null;
  };
}

export interface GetOfficeVariables {
  id: UUIDString;
}

export interface GetQrTokenData {
  qrToken?: {
    tokenString: string;
    status: string;
    office: {
      name: string;
    };
  };
}

export interface GetQrTokenVariables {
  id: UUIDString;
}

export interface GetScanLogData {
  scanLog?: {
    timestamp: TimestampString;
    ipAddress: string;
  };
}

export interface GetScanLogVariables {
  id: UUIDString;
}

export interface ListAdminUsersData {
  adminUsers: ({
    id: UUIDString;
    username: string;
    email: string;
  } & AdminUser_Key)[];
}

export interface ListFeedbacksData {
  feedbacks: ({
    id: UUIDString;
    rating: number;
    submittedAt: TimestampString;
  } & Feedback_Key)[];
}

export interface ListOfficesData {
  offices: ({
    id: UUIDString;
    name: string;
    locationCode: string;
  } & Office_Key)[];
}

export interface ListQrTokensData {
  qrTokens: ({
    id: UUIDString;
    tokenString: string;
    status: string;
  } & QrToken_Key)[];
}

export interface ListScanLogsData {
  scanLogs: ({
    id: UUIDString;
    timestamp: TimestampString;
  } & ScanLog_Key)[];
}

export interface Office_Key {
  id: UUIDString;
  __typename?: 'Office_Key';
}

export interface QrToken_Key {
  id: UUIDString;
  __typename?: 'QrToken_Key';
}

export interface ScanLog_Key {
  id: UUIDString;
  __typename?: 'ScanLog_Key';
}

export interface UpdateAdminUserData {
  adminUser_update?: AdminUser_Key | null;
}

export interface UpdateAdminUserVariables {
  id: UUIDString;
  role?: string | null;
}

export interface UpdateFeedbackData {
  feedback_update?: Feedback_Key | null;
}

export interface UpdateFeedbackVariables {
  id: UUIDString;
  message?: string | null;
}

export interface UpdateOfficeData {
  office_update?: Office_Key | null;
}

export interface UpdateOfficeVariables {
  id: UUIDString;
  name?: string | null;
}

export interface UpdateQrTokenData {
  qrToken_update?: QrToken_Key | null;
}

export interface UpdateQrTokenVariables {
  id: UUIDString;
  status?: string | null;
}

export interface UpdateScanLogData {
  scanLog_update?: ScanLog_Key | null;
}

export interface UpdateScanLogVariables {
  id: UUIDString;
  ip?: string | null;
}

interface CreateOfficeRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateOfficeData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateOfficeData, undefined>;
  operationName: string;
}
export const createOfficeRef: CreateOfficeRef;

export function createOffice(): MutationPromise<CreateOfficeData, undefined>;
export function createOffice(dc: DataConnect): MutationPromise<CreateOfficeData, undefined>;

interface UpdateOfficeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOfficeVariables): MutationRef<UpdateOfficeData, UpdateOfficeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateOfficeVariables): MutationRef<UpdateOfficeData, UpdateOfficeVariables>;
  operationName: string;
}
export const updateOfficeRef: UpdateOfficeRef;

export function updateOffice(vars: UpdateOfficeVariables): MutationPromise<UpdateOfficeData, UpdateOfficeVariables>;
export function updateOffice(dc: DataConnect, vars: UpdateOfficeVariables): MutationPromise<UpdateOfficeData, UpdateOfficeVariables>;

interface DeleteOfficeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOfficeVariables): MutationRef<DeleteOfficeData, DeleteOfficeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteOfficeVariables): MutationRef<DeleteOfficeData, DeleteOfficeVariables>;
  operationName: string;
}
export const deleteOfficeRef: DeleteOfficeRef;

export function deleteOffice(vars: DeleteOfficeVariables): MutationPromise<DeleteOfficeData, DeleteOfficeVariables>;
export function deleteOffice(dc: DataConnect, vars: DeleteOfficeVariables): MutationPromise<DeleteOfficeData, DeleteOfficeVariables>;

interface GetOfficeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOfficeVariables): QueryRef<GetOfficeData, GetOfficeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOfficeVariables): QueryRef<GetOfficeData, GetOfficeVariables>;
  operationName: string;
}
export const getOfficeRef: GetOfficeRef;

export function getOffice(vars: GetOfficeVariables, options?: ExecuteQueryOptions): QueryPromise<GetOfficeData, GetOfficeVariables>;
export function getOffice(dc: DataConnect, vars: GetOfficeVariables, options?: ExecuteQueryOptions): QueryPromise<GetOfficeData, GetOfficeVariables>;

interface ListOfficesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOfficesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListOfficesData, undefined>;
  operationName: string;
}
export const listOfficesRef: ListOfficesRef;

export function listOffices(options?: ExecuteQueryOptions): QueryPromise<ListOfficesData, undefined>;
export function listOffices(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOfficesData, undefined>;

interface CreateQrTokenRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQrTokenVariables): MutationRef<CreateQrTokenData, CreateQrTokenVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQrTokenVariables): MutationRef<CreateQrTokenData, CreateQrTokenVariables>;
  operationName: string;
}
export const createQrTokenRef: CreateQrTokenRef;

export function createQrToken(vars: CreateQrTokenVariables): MutationPromise<CreateQrTokenData, CreateQrTokenVariables>;
export function createQrToken(dc: DataConnect, vars: CreateQrTokenVariables): MutationPromise<CreateQrTokenData, CreateQrTokenVariables>;

interface UpdateQrTokenRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQrTokenVariables): MutationRef<UpdateQrTokenData, UpdateQrTokenVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQrTokenVariables): MutationRef<UpdateQrTokenData, UpdateQrTokenVariables>;
  operationName: string;
}
export const updateQrTokenRef: UpdateQrTokenRef;

export function updateQrToken(vars: UpdateQrTokenVariables): MutationPromise<UpdateQrTokenData, UpdateQrTokenVariables>;
export function updateQrToken(dc: DataConnect, vars: UpdateQrTokenVariables): MutationPromise<UpdateQrTokenData, UpdateQrTokenVariables>;

interface DeleteQrTokenRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQrTokenVariables): MutationRef<DeleteQrTokenData, DeleteQrTokenVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteQrTokenVariables): MutationRef<DeleteQrTokenData, DeleteQrTokenVariables>;
  operationName: string;
}
export const deleteQrTokenRef: DeleteQrTokenRef;

export function deleteQrToken(vars: DeleteQrTokenVariables): MutationPromise<DeleteQrTokenData, DeleteQrTokenVariables>;
export function deleteQrToken(dc: DataConnect, vars: DeleteQrTokenVariables): MutationPromise<DeleteQrTokenData, DeleteQrTokenVariables>;

interface GetQrTokenRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQrTokenVariables): QueryRef<GetQrTokenData, GetQrTokenVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQrTokenVariables): QueryRef<GetQrTokenData, GetQrTokenVariables>;
  operationName: string;
}
export const getQrTokenRef: GetQrTokenRef;

export function getQrToken(vars: GetQrTokenVariables, options?: ExecuteQueryOptions): QueryPromise<GetQrTokenData, GetQrTokenVariables>;
export function getQrToken(dc: DataConnect, vars: GetQrTokenVariables, options?: ExecuteQueryOptions): QueryPromise<GetQrTokenData, GetQrTokenVariables>;

interface ListQrTokensRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQrTokensData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListQrTokensData, undefined>;
  operationName: string;
}
export const listQrTokensRef: ListQrTokensRef;

export function listQrTokens(options?: ExecuteQueryOptions): QueryPromise<ListQrTokensData, undefined>;
export function listQrTokens(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListQrTokensData, undefined>;

interface CreateFeedbackRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFeedbackVariables): MutationRef<CreateFeedbackData, CreateFeedbackVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateFeedbackVariables): MutationRef<CreateFeedbackData, CreateFeedbackVariables>;
  operationName: string;
}
export const createFeedbackRef: CreateFeedbackRef;

export function createFeedback(vars: CreateFeedbackVariables): MutationPromise<CreateFeedbackData, CreateFeedbackVariables>;
export function createFeedback(dc: DataConnect, vars: CreateFeedbackVariables): MutationPromise<CreateFeedbackData, CreateFeedbackVariables>;

interface UpdateFeedbackRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFeedbackVariables): MutationRef<UpdateFeedbackData, UpdateFeedbackVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateFeedbackVariables): MutationRef<UpdateFeedbackData, UpdateFeedbackVariables>;
  operationName: string;
}
export const updateFeedbackRef: UpdateFeedbackRef;

export function updateFeedback(vars: UpdateFeedbackVariables): MutationPromise<UpdateFeedbackData, UpdateFeedbackVariables>;
export function updateFeedback(dc: DataConnect, vars: UpdateFeedbackVariables): MutationPromise<UpdateFeedbackData, UpdateFeedbackVariables>;

interface DeleteFeedbackRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFeedbackVariables): MutationRef<DeleteFeedbackData, DeleteFeedbackVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteFeedbackVariables): MutationRef<DeleteFeedbackData, DeleteFeedbackVariables>;
  operationName: string;
}
export const deleteFeedbackRef: DeleteFeedbackRef;

export function deleteFeedback(vars: DeleteFeedbackVariables): MutationPromise<DeleteFeedbackData, DeleteFeedbackVariables>;
export function deleteFeedback(dc: DataConnect, vars: DeleteFeedbackVariables): MutationPromise<DeleteFeedbackData, DeleteFeedbackVariables>;

interface GetFeedbackRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFeedbackVariables): QueryRef<GetFeedbackData, GetFeedbackVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetFeedbackVariables): QueryRef<GetFeedbackData, GetFeedbackVariables>;
  operationName: string;
}
export const getFeedbackRef: GetFeedbackRef;

export function getFeedback(vars: GetFeedbackVariables, options?: ExecuteQueryOptions): QueryPromise<GetFeedbackData, GetFeedbackVariables>;
export function getFeedback(dc: DataConnect, vars: GetFeedbackVariables, options?: ExecuteQueryOptions): QueryPromise<GetFeedbackData, GetFeedbackVariables>;

interface ListFeedbacksRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListFeedbacksData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListFeedbacksData, undefined>;
  operationName: string;
}
export const listFeedbacksRef: ListFeedbacksRef;

export function listFeedbacks(options?: ExecuteQueryOptions): QueryPromise<ListFeedbacksData, undefined>;
export function listFeedbacks(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListFeedbacksData, undefined>;

interface CreateScanLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateScanLogVariables): MutationRef<CreateScanLogData, CreateScanLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateScanLogVariables): MutationRef<CreateScanLogData, CreateScanLogVariables>;
  operationName: string;
}
export const createScanLogRef: CreateScanLogRef;

export function createScanLog(vars: CreateScanLogVariables): MutationPromise<CreateScanLogData, CreateScanLogVariables>;
export function createScanLog(dc: DataConnect, vars: CreateScanLogVariables): MutationPromise<CreateScanLogData, CreateScanLogVariables>;

interface UpdateScanLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateScanLogVariables): MutationRef<UpdateScanLogData, UpdateScanLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateScanLogVariables): MutationRef<UpdateScanLogData, UpdateScanLogVariables>;
  operationName: string;
}
export const updateScanLogRef: UpdateScanLogRef;

export function updateScanLog(vars: UpdateScanLogVariables): MutationPromise<UpdateScanLogData, UpdateScanLogVariables>;
export function updateScanLog(dc: DataConnect, vars: UpdateScanLogVariables): MutationPromise<UpdateScanLogData, UpdateScanLogVariables>;

interface DeleteScanLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteScanLogVariables): MutationRef<DeleteScanLogData, DeleteScanLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteScanLogVariables): MutationRef<DeleteScanLogData, DeleteScanLogVariables>;
  operationName: string;
}
export const deleteScanLogRef: DeleteScanLogRef;

export function deleteScanLog(vars: DeleteScanLogVariables): MutationPromise<DeleteScanLogData, DeleteScanLogVariables>;
export function deleteScanLog(dc: DataConnect, vars: DeleteScanLogVariables): MutationPromise<DeleteScanLogData, DeleteScanLogVariables>;

interface GetScanLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetScanLogVariables): QueryRef<GetScanLogData, GetScanLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetScanLogVariables): QueryRef<GetScanLogData, GetScanLogVariables>;
  operationName: string;
}
export const getScanLogRef: GetScanLogRef;

export function getScanLog(vars: GetScanLogVariables, options?: ExecuteQueryOptions): QueryPromise<GetScanLogData, GetScanLogVariables>;
export function getScanLog(dc: DataConnect, vars: GetScanLogVariables, options?: ExecuteQueryOptions): QueryPromise<GetScanLogData, GetScanLogVariables>;

interface ListScanLogsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListScanLogsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListScanLogsData, undefined>;
  operationName: string;
}
export const listScanLogsRef: ListScanLogsRef;

export function listScanLogs(options?: ExecuteQueryOptions): QueryPromise<ListScanLogsData, undefined>;
export function listScanLogs(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListScanLogsData, undefined>;

interface CreateAdminUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAdminUserVariables): MutationRef<CreateAdminUserData, CreateAdminUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAdminUserVariables): MutationRef<CreateAdminUserData, CreateAdminUserVariables>;
  operationName: string;
}
export const createAdminUserRef: CreateAdminUserRef;

export function createAdminUser(vars: CreateAdminUserVariables): MutationPromise<CreateAdminUserData, CreateAdminUserVariables>;
export function createAdminUser(dc: DataConnect, vars: CreateAdminUserVariables): MutationPromise<CreateAdminUserData, CreateAdminUserVariables>;

interface UpdateAdminUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAdminUserVariables): MutationRef<UpdateAdminUserData, UpdateAdminUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAdminUserVariables): MutationRef<UpdateAdminUserData, UpdateAdminUserVariables>;
  operationName: string;
}
export const updateAdminUserRef: UpdateAdminUserRef;

export function updateAdminUser(vars: UpdateAdminUserVariables): MutationPromise<UpdateAdminUserData, UpdateAdminUserVariables>;
export function updateAdminUser(dc: DataConnect, vars: UpdateAdminUserVariables): MutationPromise<UpdateAdminUserData, UpdateAdminUserVariables>;

interface DeleteAdminUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAdminUserVariables): MutationRef<DeleteAdminUserData, DeleteAdminUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAdminUserVariables): MutationRef<DeleteAdminUserData, DeleteAdminUserVariables>;
  operationName: string;
}
export const deleteAdminUserRef: DeleteAdminUserRef;

export function deleteAdminUser(vars: DeleteAdminUserVariables): MutationPromise<DeleteAdminUserData, DeleteAdminUserVariables>;
export function deleteAdminUser(dc: DataConnect, vars: DeleteAdminUserVariables): MutationPromise<DeleteAdminUserData, DeleteAdminUserVariables>;

interface GetAdminUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAdminUserVariables): QueryRef<GetAdminUserData, GetAdminUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAdminUserVariables): QueryRef<GetAdminUserData, GetAdminUserVariables>;
  operationName: string;
}
export const getAdminUserRef: GetAdminUserRef;

export function getAdminUser(vars: GetAdminUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetAdminUserData, GetAdminUserVariables>;
export function getAdminUser(dc: DataConnect, vars: GetAdminUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetAdminUserData, GetAdminUserVariables>;

interface ListAdminUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAdminUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAdminUsersData, undefined>;
  operationName: string;
}
export const listAdminUsersRef: ListAdminUsersRef;

export function listAdminUsers(options?: ExecuteQueryOptions): QueryPromise<ListAdminUsersData, undefined>;
export function listAdminUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAdminUsersData, undefined>;

