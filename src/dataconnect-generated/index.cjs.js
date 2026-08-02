const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'znpppo-feedback-and-qr-system-1',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const createOfficeRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOffice');
}
createOfficeRef.operationName = 'CreateOffice';
exports.createOfficeRef = createOfficeRef;

exports.createOffice = function createOffice(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(createOfficeRef(dcInstance, inputVars));
}
;

const updateOfficeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOffice', inputVars);
}
updateOfficeRef.operationName = 'UpdateOffice';
exports.updateOfficeRef = updateOfficeRef;

exports.updateOffice = function updateOffice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateOfficeRef(dcInstance, inputVars));
}
;

const deleteOfficeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteOffice', inputVars);
}
deleteOfficeRef.operationName = 'DeleteOffice';
exports.deleteOfficeRef = deleteOfficeRef;

exports.deleteOffice = function deleteOffice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteOfficeRef(dcInstance, inputVars));
}
;

const getOfficeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOffice', inputVars);
}
getOfficeRef.operationName = 'GetOffice';
exports.getOfficeRef = getOfficeRef;

exports.getOffice = function getOffice(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOfficeRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listOfficesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOffices');
}
listOfficesRef.operationName = 'ListOffices';
exports.listOfficesRef = listOfficesRef;

exports.listOffices = function listOffices(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listOfficesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createQrTokenRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQrToken', inputVars);
}
createQrTokenRef.operationName = 'CreateQrToken';
exports.createQrTokenRef = createQrTokenRef;

exports.createQrToken = function createQrToken(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createQrTokenRef(dcInstance, inputVars));
}
;

const updateQrTokenRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQrToken', inputVars);
}
updateQrTokenRef.operationName = 'UpdateQrToken';
exports.updateQrTokenRef = updateQrTokenRef;

exports.updateQrToken = function updateQrToken(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateQrTokenRef(dcInstance, inputVars));
}
;

const deleteQrTokenRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteQrToken', inputVars);
}
deleteQrTokenRef.operationName = 'DeleteQrToken';
exports.deleteQrTokenRef = deleteQrTokenRef;

exports.deleteQrToken = function deleteQrToken(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteQrTokenRef(dcInstance, inputVars));
}
;

const getQrTokenRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQrToken', inputVars);
}
getQrTokenRef.operationName = 'GetQrToken';
exports.getQrTokenRef = getQrTokenRef;

exports.getQrToken = function getQrToken(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getQrTokenRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listQrTokensRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQrTokens');
}
listQrTokensRef.operationName = 'ListQrTokens';
exports.listQrTokensRef = listQrTokensRef;

exports.listQrTokens = function listQrTokens(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listQrTokensRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createFeedbackRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateFeedback', inputVars);
}
createFeedbackRef.operationName = 'CreateFeedback';
exports.createFeedbackRef = createFeedbackRef;

exports.createFeedback = function createFeedback(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createFeedbackRef(dcInstance, inputVars));
}
;

const updateFeedbackRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateFeedback', inputVars);
}
updateFeedbackRef.operationName = 'UpdateFeedback';
exports.updateFeedbackRef = updateFeedbackRef;

exports.updateFeedback = function updateFeedback(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateFeedbackRef(dcInstance, inputVars));
}
;

const deleteFeedbackRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFeedback', inputVars);
}
deleteFeedbackRef.operationName = 'DeleteFeedback';
exports.deleteFeedbackRef = deleteFeedbackRef;

exports.deleteFeedback = function deleteFeedback(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteFeedbackRef(dcInstance, inputVars));
}
;

const getFeedbackRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetFeedback', inputVars);
}
getFeedbackRef.operationName = 'GetFeedback';
exports.getFeedbackRef = getFeedbackRef;

exports.getFeedback = function getFeedback(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getFeedbackRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listFeedbacksRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFeedbacks');
}
listFeedbacksRef.operationName = 'ListFeedbacks';
exports.listFeedbacksRef = listFeedbacksRef;

exports.listFeedbacks = function listFeedbacks(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listFeedbacksRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createScanLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateScanLog', inputVars);
}
createScanLogRef.operationName = 'CreateScanLog';
exports.createScanLogRef = createScanLogRef;

exports.createScanLog = function createScanLog(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createScanLogRef(dcInstance, inputVars));
}
;

const updateScanLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateScanLog', inputVars);
}
updateScanLogRef.operationName = 'UpdateScanLog';
exports.updateScanLogRef = updateScanLogRef;

exports.updateScanLog = function updateScanLog(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateScanLogRef(dcInstance, inputVars));
}
;

const deleteScanLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteScanLog', inputVars);
}
deleteScanLogRef.operationName = 'DeleteScanLog';
exports.deleteScanLogRef = deleteScanLogRef;

exports.deleteScanLog = function deleteScanLog(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteScanLogRef(dcInstance, inputVars));
}
;

const getScanLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetScanLog', inputVars);
}
getScanLogRef.operationName = 'GetScanLog';
exports.getScanLogRef = getScanLogRef;

exports.getScanLog = function getScanLog(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getScanLogRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listScanLogsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListScanLogs');
}
listScanLogsRef.operationName = 'ListScanLogs';
exports.listScanLogsRef = listScanLogsRef;

exports.listScanLogs = function listScanLogs(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listScanLogsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createAdminUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAdminUser', inputVars);
}
createAdminUserRef.operationName = 'CreateAdminUser';
exports.createAdminUserRef = createAdminUserRef;

exports.createAdminUser = function createAdminUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createAdminUserRef(dcInstance, inputVars));
}
;

const updateAdminUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAdminUser', inputVars);
}
updateAdminUserRef.operationName = 'UpdateAdminUser';
exports.updateAdminUserRef = updateAdminUserRef;

exports.updateAdminUser = function updateAdminUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateAdminUserRef(dcInstance, inputVars));
}
;

const deleteAdminUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAdminUser', inputVars);
}
deleteAdminUserRef.operationName = 'DeleteAdminUser';
exports.deleteAdminUserRef = deleteAdminUserRef;

exports.deleteAdminUser = function deleteAdminUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteAdminUserRef(dcInstance, inputVars));
}
;

const getAdminUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAdminUser', inputVars);
}
getAdminUserRef.operationName = 'GetAdminUser';
exports.getAdminUserRef = getAdminUserRef;

exports.getAdminUser = function getAdminUser(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getAdminUserRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAdminUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAdminUsers');
}
listAdminUsersRef.operationName = 'ListAdminUsers';
exports.listAdminUsersRef = listAdminUsersRef;

exports.listAdminUsers = function listAdminUsers(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAdminUsersRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
