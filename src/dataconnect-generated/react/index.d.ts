import { CreateOfficeData, UpdateOfficeData, UpdateOfficeVariables, DeleteOfficeData, DeleteOfficeVariables, GetOfficeData, GetOfficeVariables, ListOfficesData, CreateQrTokenData, CreateQrTokenVariables, UpdateQrTokenData, UpdateQrTokenVariables, DeleteQrTokenData, DeleteQrTokenVariables, GetQrTokenData, GetQrTokenVariables, ListQrTokensData, CreateFeedbackData, CreateFeedbackVariables, UpdateFeedbackData, UpdateFeedbackVariables, DeleteFeedbackData, DeleteFeedbackVariables, GetFeedbackData, GetFeedbackVariables, ListFeedbacksData, CreateScanLogData, CreateScanLogVariables, UpdateScanLogData, UpdateScanLogVariables, DeleteScanLogData, DeleteScanLogVariables, GetScanLogData, GetScanLogVariables, ListScanLogsData, CreateAdminUserData, CreateAdminUserVariables, UpdateAdminUserData, UpdateAdminUserVariables, DeleteAdminUserData, DeleteAdminUserVariables, GetAdminUserData, GetAdminUserVariables, ListAdminUsersData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateOffice(options?: useDataConnectMutationOptions<CreateOfficeData, FirebaseError, void>): UseDataConnectMutationResult<CreateOfficeData, undefined>;
export function useCreateOffice(dc: DataConnect, options?: useDataConnectMutationOptions<CreateOfficeData, FirebaseError, void>): UseDataConnectMutationResult<CreateOfficeData, undefined>;

export function useUpdateOffice(options?: useDataConnectMutationOptions<UpdateOfficeData, FirebaseError, UpdateOfficeVariables>): UseDataConnectMutationResult<UpdateOfficeData, UpdateOfficeVariables>;
export function useUpdateOffice(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateOfficeData, FirebaseError, UpdateOfficeVariables>): UseDataConnectMutationResult<UpdateOfficeData, UpdateOfficeVariables>;

export function useDeleteOffice(options?: useDataConnectMutationOptions<DeleteOfficeData, FirebaseError, DeleteOfficeVariables>): UseDataConnectMutationResult<DeleteOfficeData, DeleteOfficeVariables>;
export function useDeleteOffice(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteOfficeData, FirebaseError, DeleteOfficeVariables>): UseDataConnectMutationResult<DeleteOfficeData, DeleteOfficeVariables>;

export function useGetOffice(vars: GetOfficeVariables, options?: useDataConnectQueryOptions<GetOfficeData>): UseDataConnectQueryResult<GetOfficeData, GetOfficeVariables>;
export function useGetOffice(dc: DataConnect, vars: GetOfficeVariables, options?: useDataConnectQueryOptions<GetOfficeData>): UseDataConnectQueryResult<GetOfficeData, GetOfficeVariables>;

export function useListOffices(options?: useDataConnectQueryOptions<ListOfficesData>): UseDataConnectQueryResult<ListOfficesData, undefined>;
export function useListOffices(dc: DataConnect, options?: useDataConnectQueryOptions<ListOfficesData>): UseDataConnectQueryResult<ListOfficesData, undefined>;

export function useCreateQrToken(options?: useDataConnectMutationOptions<CreateQrTokenData, FirebaseError, CreateQrTokenVariables>): UseDataConnectMutationResult<CreateQrTokenData, CreateQrTokenVariables>;
export function useCreateQrToken(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQrTokenData, FirebaseError, CreateQrTokenVariables>): UseDataConnectMutationResult<CreateQrTokenData, CreateQrTokenVariables>;

export function useUpdateQrToken(options?: useDataConnectMutationOptions<UpdateQrTokenData, FirebaseError, UpdateQrTokenVariables>): UseDataConnectMutationResult<UpdateQrTokenData, UpdateQrTokenVariables>;
export function useUpdateQrToken(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateQrTokenData, FirebaseError, UpdateQrTokenVariables>): UseDataConnectMutationResult<UpdateQrTokenData, UpdateQrTokenVariables>;

export function useDeleteQrToken(options?: useDataConnectMutationOptions<DeleteQrTokenData, FirebaseError, DeleteQrTokenVariables>): UseDataConnectMutationResult<DeleteQrTokenData, DeleteQrTokenVariables>;
export function useDeleteQrToken(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteQrTokenData, FirebaseError, DeleteQrTokenVariables>): UseDataConnectMutationResult<DeleteQrTokenData, DeleteQrTokenVariables>;

export function useGetQrToken(vars: GetQrTokenVariables, options?: useDataConnectQueryOptions<GetQrTokenData>): UseDataConnectQueryResult<GetQrTokenData, GetQrTokenVariables>;
export function useGetQrToken(dc: DataConnect, vars: GetQrTokenVariables, options?: useDataConnectQueryOptions<GetQrTokenData>): UseDataConnectQueryResult<GetQrTokenData, GetQrTokenVariables>;

export function useListQrTokens(options?: useDataConnectQueryOptions<ListQrTokensData>): UseDataConnectQueryResult<ListQrTokensData, undefined>;
export function useListQrTokens(dc: DataConnect, options?: useDataConnectQueryOptions<ListQrTokensData>): UseDataConnectQueryResult<ListQrTokensData, undefined>;

export function useCreateFeedback(options?: useDataConnectMutationOptions<CreateFeedbackData, FirebaseError, CreateFeedbackVariables>): UseDataConnectMutationResult<CreateFeedbackData, CreateFeedbackVariables>;
export function useCreateFeedback(dc: DataConnect, options?: useDataConnectMutationOptions<CreateFeedbackData, FirebaseError, CreateFeedbackVariables>): UseDataConnectMutationResult<CreateFeedbackData, CreateFeedbackVariables>;

export function useUpdateFeedback(options?: useDataConnectMutationOptions<UpdateFeedbackData, FirebaseError, UpdateFeedbackVariables>): UseDataConnectMutationResult<UpdateFeedbackData, UpdateFeedbackVariables>;
export function useUpdateFeedback(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateFeedbackData, FirebaseError, UpdateFeedbackVariables>): UseDataConnectMutationResult<UpdateFeedbackData, UpdateFeedbackVariables>;

export function useDeleteFeedback(options?: useDataConnectMutationOptions<DeleteFeedbackData, FirebaseError, DeleteFeedbackVariables>): UseDataConnectMutationResult<DeleteFeedbackData, DeleteFeedbackVariables>;
export function useDeleteFeedback(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteFeedbackData, FirebaseError, DeleteFeedbackVariables>): UseDataConnectMutationResult<DeleteFeedbackData, DeleteFeedbackVariables>;

export function useGetFeedback(vars: GetFeedbackVariables, options?: useDataConnectQueryOptions<GetFeedbackData>): UseDataConnectQueryResult<GetFeedbackData, GetFeedbackVariables>;
export function useGetFeedback(dc: DataConnect, vars: GetFeedbackVariables, options?: useDataConnectQueryOptions<GetFeedbackData>): UseDataConnectQueryResult<GetFeedbackData, GetFeedbackVariables>;

export function useListFeedbacks(options?: useDataConnectQueryOptions<ListFeedbacksData>): UseDataConnectQueryResult<ListFeedbacksData, undefined>;
export function useListFeedbacks(dc: DataConnect, options?: useDataConnectQueryOptions<ListFeedbacksData>): UseDataConnectQueryResult<ListFeedbacksData, undefined>;

export function useCreateScanLog(options?: useDataConnectMutationOptions<CreateScanLogData, FirebaseError, CreateScanLogVariables>): UseDataConnectMutationResult<CreateScanLogData, CreateScanLogVariables>;
export function useCreateScanLog(dc: DataConnect, options?: useDataConnectMutationOptions<CreateScanLogData, FirebaseError, CreateScanLogVariables>): UseDataConnectMutationResult<CreateScanLogData, CreateScanLogVariables>;

export function useUpdateScanLog(options?: useDataConnectMutationOptions<UpdateScanLogData, FirebaseError, UpdateScanLogVariables>): UseDataConnectMutationResult<UpdateScanLogData, UpdateScanLogVariables>;
export function useUpdateScanLog(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateScanLogData, FirebaseError, UpdateScanLogVariables>): UseDataConnectMutationResult<UpdateScanLogData, UpdateScanLogVariables>;

export function useDeleteScanLog(options?: useDataConnectMutationOptions<DeleteScanLogData, FirebaseError, DeleteScanLogVariables>): UseDataConnectMutationResult<DeleteScanLogData, DeleteScanLogVariables>;
export function useDeleteScanLog(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteScanLogData, FirebaseError, DeleteScanLogVariables>): UseDataConnectMutationResult<DeleteScanLogData, DeleteScanLogVariables>;

export function useGetScanLog(vars: GetScanLogVariables, options?: useDataConnectQueryOptions<GetScanLogData>): UseDataConnectQueryResult<GetScanLogData, GetScanLogVariables>;
export function useGetScanLog(dc: DataConnect, vars: GetScanLogVariables, options?: useDataConnectQueryOptions<GetScanLogData>): UseDataConnectQueryResult<GetScanLogData, GetScanLogVariables>;

export function useListScanLogs(options?: useDataConnectQueryOptions<ListScanLogsData>): UseDataConnectQueryResult<ListScanLogsData, undefined>;
export function useListScanLogs(dc: DataConnect, options?: useDataConnectQueryOptions<ListScanLogsData>): UseDataConnectQueryResult<ListScanLogsData, undefined>;

export function useCreateAdminUser(options?: useDataConnectMutationOptions<CreateAdminUserData, FirebaseError, CreateAdminUserVariables>): UseDataConnectMutationResult<CreateAdminUserData, CreateAdminUserVariables>;
export function useCreateAdminUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAdminUserData, FirebaseError, CreateAdminUserVariables>): UseDataConnectMutationResult<CreateAdminUserData, CreateAdminUserVariables>;

export function useUpdateAdminUser(options?: useDataConnectMutationOptions<UpdateAdminUserData, FirebaseError, UpdateAdminUserVariables>): UseDataConnectMutationResult<UpdateAdminUserData, UpdateAdminUserVariables>;
export function useUpdateAdminUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAdminUserData, FirebaseError, UpdateAdminUserVariables>): UseDataConnectMutationResult<UpdateAdminUserData, UpdateAdminUserVariables>;

export function useDeleteAdminUser(options?: useDataConnectMutationOptions<DeleteAdminUserData, FirebaseError, DeleteAdminUserVariables>): UseDataConnectMutationResult<DeleteAdminUserData, DeleteAdminUserVariables>;
export function useDeleteAdminUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAdminUserData, FirebaseError, DeleteAdminUserVariables>): UseDataConnectMutationResult<DeleteAdminUserData, DeleteAdminUserVariables>;

export function useGetAdminUser(vars: GetAdminUserVariables, options?: useDataConnectQueryOptions<GetAdminUserData>): UseDataConnectQueryResult<GetAdminUserData, GetAdminUserVariables>;
export function useGetAdminUser(dc: DataConnect, vars: GetAdminUserVariables, options?: useDataConnectQueryOptions<GetAdminUserData>): UseDataConnectQueryResult<GetAdminUserData, GetAdminUserVariables>;

export function useListAdminUsers(options?: useDataConnectQueryOptions<ListAdminUsersData>): UseDataConnectQueryResult<ListAdminUsersData, undefined>;
export function useListAdminUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListAdminUsersData>): UseDataConnectQueryResult<ListAdminUsersData, undefined>;
