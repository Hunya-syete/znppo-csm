# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetOffice*](#getoffice)
  - [*ListOffices*](#listoffices)
  - [*GetQrToken*](#getqrtoken)
  - [*ListQrTokens*](#listqrtokens)
  - [*GetFeedback*](#getfeedback)
  - [*ListFeedbacks*](#listfeedbacks)
  - [*GetScanLog*](#getscanlog)
  - [*ListScanLogs*](#listscanlogs)
  - [*GetAdminUser*](#getadminuser)
  - [*ListAdminUsers*](#listadminusers)
- [**Mutations**](#mutations)
  - [*CreateOffice*](#createoffice)
  - [*UpdateOffice*](#updateoffice)
  - [*DeleteOffice*](#deleteoffice)
  - [*CreateQrToken*](#createqrtoken)
  - [*UpdateQrToken*](#updateqrtoken)
  - [*DeleteQrToken*](#deleteqrtoken)
  - [*CreateFeedback*](#createfeedback)
  - [*UpdateFeedback*](#updatefeedback)
  - [*DeleteFeedback*](#deletefeedback)
  - [*CreateScanLog*](#createscanlog)
  - [*UpdateScanLog*](#updatescanlog)
  - [*DeleteScanLog*](#deletescanlog)
  - [*CreateAdminUser*](#createadminuser)
  - [*UpdateAdminUser*](#updateadminuser)
  - [*DeleteAdminUser*](#deleteadminuser)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetOffice
You can execute the `GetOffice` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getOffice(vars: GetOfficeVariables, options?: ExecuteQueryOptions): QueryPromise<GetOfficeData, GetOfficeVariables>;

interface GetOfficeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOfficeVariables): QueryRef<GetOfficeData, GetOfficeVariables>;
}
export const getOfficeRef: GetOfficeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOffice(dc: DataConnect, vars: GetOfficeVariables, options?: ExecuteQueryOptions): QueryPromise<GetOfficeData, GetOfficeVariables>;

interface GetOfficeRef {
  ...
  (dc: DataConnect, vars: GetOfficeVariables): QueryRef<GetOfficeData, GetOfficeVariables>;
}
export const getOfficeRef: GetOfficeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOfficeRef:
```typescript
const name = getOfficeRef.operationName;
console.log(name);
```

### Variables
The `GetOffice` query requires an argument of type `GetOfficeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOfficeVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetOffice` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOfficeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOfficeData {
  office?: {
    name: string;
    locationCode: string;
    description?: string | null;
  };
}
```
### Using `GetOffice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOffice, GetOfficeVariables } from '@dataconnect/generated';

// The `GetOffice` query requires an argument of type `GetOfficeVariables`:
const getOfficeVars: GetOfficeVariables = {
  id: ..., 
};

// Call the `getOffice()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOffice(getOfficeVars);
// Variables can be defined inline as well.
const { data } = await getOffice({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOffice(dataConnect, getOfficeVars);

console.log(data.office);

// Or, you can use the `Promise` API.
getOffice(getOfficeVars).then((response) => {
  const data = response.data;
  console.log(data.office);
});
```

### Using `GetOffice`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOfficeRef, GetOfficeVariables } from '@dataconnect/generated';

// The `GetOffice` query requires an argument of type `GetOfficeVariables`:
const getOfficeVars: GetOfficeVariables = {
  id: ..., 
};

// Call the `getOfficeRef()` function to get a reference to the query.
const ref = getOfficeRef(getOfficeVars);
// Variables can be defined inline as well.
const ref = getOfficeRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOfficeRef(dataConnect, getOfficeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.office);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.office);
});
```

## ListOffices
You can execute the `ListOffices` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listOffices(options?: ExecuteQueryOptions): QueryPromise<ListOfficesData, undefined>;

interface ListOfficesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOfficesData, undefined>;
}
export const listOfficesRef: ListOfficesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOffices(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOfficesData, undefined>;

interface ListOfficesRef {
  ...
  (dc: DataConnect): QueryRef<ListOfficesData, undefined>;
}
export const listOfficesRef: ListOfficesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOfficesRef:
```typescript
const name = listOfficesRef.operationName;
console.log(name);
```

### Variables
The `ListOffices` query has no variables.
### Return Type
Recall that executing the `ListOffices` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOfficesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListOfficesData {
  offices: ({
    id: UUIDString;
    name: string;
    locationCode: string;
  } & Office_Key)[];
}
```
### Using `ListOffices`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOffices } from '@dataconnect/generated';


// Call the `listOffices()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOffices();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOffices(dataConnect);

console.log(data.offices);

// Or, you can use the `Promise` API.
listOffices().then((response) => {
  const data = response.data;
  console.log(data.offices);
});
```

### Using `ListOffices`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOfficesRef } from '@dataconnect/generated';


// Call the `listOfficesRef()` function to get a reference to the query.
const ref = listOfficesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOfficesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.offices);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.offices);
});
```

## GetQrToken
You can execute the `GetQrToken` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getQrToken(vars: GetQrTokenVariables, options?: ExecuteQueryOptions): QueryPromise<GetQrTokenData, GetQrTokenVariables>;

interface GetQrTokenRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQrTokenVariables): QueryRef<GetQrTokenData, GetQrTokenVariables>;
}
export const getQrTokenRef: GetQrTokenRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQrToken(dc: DataConnect, vars: GetQrTokenVariables, options?: ExecuteQueryOptions): QueryPromise<GetQrTokenData, GetQrTokenVariables>;

interface GetQrTokenRef {
  ...
  (dc: DataConnect, vars: GetQrTokenVariables): QueryRef<GetQrTokenData, GetQrTokenVariables>;
}
export const getQrTokenRef: GetQrTokenRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQrTokenRef:
```typescript
const name = getQrTokenRef.operationName;
console.log(name);
```

### Variables
The `GetQrToken` query requires an argument of type `GetQrTokenVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQrTokenVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetQrToken` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQrTokenData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetQrTokenData {
  qrToken?: {
    tokenString: string;
    status: string;
    office: {
      name: string;
    };
  };
}
```
### Using `GetQrToken`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQrToken, GetQrTokenVariables } from '@dataconnect/generated';

// The `GetQrToken` query requires an argument of type `GetQrTokenVariables`:
const getQrTokenVars: GetQrTokenVariables = {
  id: ..., 
};

// Call the `getQrToken()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQrToken(getQrTokenVars);
// Variables can be defined inline as well.
const { data } = await getQrToken({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQrToken(dataConnect, getQrTokenVars);

console.log(data.qrToken);

// Or, you can use the `Promise` API.
getQrToken(getQrTokenVars).then((response) => {
  const data = response.data;
  console.log(data.qrToken);
});
```

### Using `GetQrToken`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQrTokenRef, GetQrTokenVariables } from '@dataconnect/generated';

// The `GetQrToken` query requires an argument of type `GetQrTokenVariables`:
const getQrTokenVars: GetQrTokenVariables = {
  id: ..., 
};

// Call the `getQrTokenRef()` function to get a reference to the query.
const ref = getQrTokenRef(getQrTokenVars);
// Variables can be defined inline as well.
const ref = getQrTokenRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQrTokenRef(dataConnect, getQrTokenVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.qrToken);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.qrToken);
});
```

## ListQrTokens
You can execute the `ListQrTokens` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listQrTokens(options?: ExecuteQueryOptions): QueryPromise<ListQrTokensData, undefined>;

interface ListQrTokensRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQrTokensData, undefined>;
}
export const listQrTokensRef: ListQrTokensRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listQrTokens(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListQrTokensData, undefined>;

interface ListQrTokensRef {
  ...
  (dc: DataConnect): QueryRef<ListQrTokensData, undefined>;
}
export const listQrTokensRef: ListQrTokensRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listQrTokensRef:
```typescript
const name = listQrTokensRef.operationName;
console.log(name);
```

### Variables
The `ListQrTokens` query has no variables.
### Return Type
Recall that executing the `ListQrTokens` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListQrTokensData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListQrTokensData {
  qrTokens: ({
    id: UUIDString;
    tokenString: string;
    status: string;
  } & QrToken_Key)[];
}
```
### Using `ListQrTokens`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listQrTokens } from '@dataconnect/generated';


// Call the `listQrTokens()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listQrTokens();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listQrTokens(dataConnect);

console.log(data.qrTokens);

// Or, you can use the `Promise` API.
listQrTokens().then((response) => {
  const data = response.data;
  console.log(data.qrTokens);
});
```

### Using `ListQrTokens`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listQrTokensRef } from '@dataconnect/generated';


// Call the `listQrTokensRef()` function to get a reference to the query.
const ref = listQrTokensRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listQrTokensRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.qrTokens);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.qrTokens);
});
```

## GetFeedback
You can execute the `GetFeedback` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getFeedback(vars: GetFeedbackVariables, options?: ExecuteQueryOptions): QueryPromise<GetFeedbackData, GetFeedbackVariables>;

interface GetFeedbackRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFeedbackVariables): QueryRef<GetFeedbackData, GetFeedbackVariables>;
}
export const getFeedbackRef: GetFeedbackRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getFeedback(dc: DataConnect, vars: GetFeedbackVariables, options?: ExecuteQueryOptions): QueryPromise<GetFeedbackData, GetFeedbackVariables>;

interface GetFeedbackRef {
  ...
  (dc: DataConnect, vars: GetFeedbackVariables): QueryRef<GetFeedbackData, GetFeedbackVariables>;
}
export const getFeedbackRef: GetFeedbackRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getFeedbackRef:
```typescript
const name = getFeedbackRef.operationName;
console.log(name);
```

### Variables
The `GetFeedback` query requires an argument of type `GetFeedbackVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetFeedbackVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetFeedback` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFeedbackData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetFeedbackData {
  feedback?: {
    rating: number;
    message: string;
    qrToken: {
      tokenString: string;
    };
  };
}
```
### Using `GetFeedback`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getFeedback, GetFeedbackVariables } from '@dataconnect/generated';

// The `GetFeedback` query requires an argument of type `GetFeedbackVariables`:
const getFeedbackVars: GetFeedbackVariables = {
  id: ..., 
};

// Call the `getFeedback()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getFeedback(getFeedbackVars);
// Variables can be defined inline as well.
const { data } = await getFeedback({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getFeedback(dataConnect, getFeedbackVars);

console.log(data.feedback);

// Or, you can use the `Promise` API.
getFeedback(getFeedbackVars).then((response) => {
  const data = response.data;
  console.log(data.feedback);
});
```

### Using `GetFeedback`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getFeedbackRef, GetFeedbackVariables } from '@dataconnect/generated';

// The `GetFeedback` query requires an argument of type `GetFeedbackVariables`:
const getFeedbackVars: GetFeedbackVariables = {
  id: ..., 
};

// Call the `getFeedbackRef()` function to get a reference to the query.
const ref = getFeedbackRef(getFeedbackVars);
// Variables can be defined inline as well.
const ref = getFeedbackRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getFeedbackRef(dataConnect, getFeedbackVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.feedback);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.feedback);
});
```

## ListFeedbacks
You can execute the `ListFeedbacks` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listFeedbacks(options?: ExecuteQueryOptions): QueryPromise<ListFeedbacksData, undefined>;

interface ListFeedbacksRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListFeedbacksData, undefined>;
}
export const listFeedbacksRef: ListFeedbacksRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listFeedbacks(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListFeedbacksData, undefined>;

interface ListFeedbacksRef {
  ...
  (dc: DataConnect): QueryRef<ListFeedbacksData, undefined>;
}
export const listFeedbacksRef: ListFeedbacksRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listFeedbacksRef:
```typescript
const name = listFeedbacksRef.operationName;
console.log(name);
```

### Variables
The `ListFeedbacks` query has no variables.
### Return Type
Recall that executing the `ListFeedbacks` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFeedbacksData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListFeedbacksData {
  feedbacks: ({
    id: UUIDString;
    rating: number;
    submittedAt: TimestampString;
  } & Feedback_Key)[];
}
```
### Using `ListFeedbacks`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listFeedbacks } from '@dataconnect/generated';


// Call the `listFeedbacks()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listFeedbacks();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listFeedbacks(dataConnect);

console.log(data.feedbacks);

// Or, you can use the `Promise` API.
listFeedbacks().then((response) => {
  const data = response.data;
  console.log(data.feedbacks);
});
```

### Using `ListFeedbacks`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listFeedbacksRef } from '@dataconnect/generated';


// Call the `listFeedbacksRef()` function to get a reference to the query.
const ref = listFeedbacksRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listFeedbacksRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.feedbacks);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.feedbacks);
});
```

## GetScanLog
You can execute the `GetScanLog` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getScanLog(vars: GetScanLogVariables, options?: ExecuteQueryOptions): QueryPromise<GetScanLogData, GetScanLogVariables>;

interface GetScanLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetScanLogVariables): QueryRef<GetScanLogData, GetScanLogVariables>;
}
export const getScanLogRef: GetScanLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getScanLog(dc: DataConnect, vars: GetScanLogVariables, options?: ExecuteQueryOptions): QueryPromise<GetScanLogData, GetScanLogVariables>;

interface GetScanLogRef {
  ...
  (dc: DataConnect, vars: GetScanLogVariables): QueryRef<GetScanLogData, GetScanLogVariables>;
}
export const getScanLogRef: GetScanLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getScanLogRef:
```typescript
const name = getScanLogRef.operationName;
console.log(name);
```

### Variables
The `GetScanLog` query requires an argument of type `GetScanLogVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetScanLogVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetScanLog` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetScanLogData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetScanLogData {
  scanLog?: {
    timestamp: TimestampString;
    ipAddress: string;
  };
}
```
### Using `GetScanLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getScanLog, GetScanLogVariables } from '@dataconnect/generated';

// The `GetScanLog` query requires an argument of type `GetScanLogVariables`:
const getScanLogVars: GetScanLogVariables = {
  id: ..., 
};

// Call the `getScanLog()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getScanLog(getScanLogVars);
// Variables can be defined inline as well.
const { data } = await getScanLog({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getScanLog(dataConnect, getScanLogVars);

console.log(data.scanLog);

// Or, you can use the `Promise` API.
getScanLog(getScanLogVars).then((response) => {
  const data = response.data;
  console.log(data.scanLog);
});
```

### Using `GetScanLog`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getScanLogRef, GetScanLogVariables } from '@dataconnect/generated';

// The `GetScanLog` query requires an argument of type `GetScanLogVariables`:
const getScanLogVars: GetScanLogVariables = {
  id: ..., 
};

// Call the `getScanLogRef()` function to get a reference to the query.
const ref = getScanLogRef(getScanLogVars);
// Variables can be defined inline as well.
const ref = getScanLogRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getScanLogRef(dataConnect, getScanLogVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.scanLog);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.scanLog);
});
```

## ListScanLogs
You can execute the `ListScanLogs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listScanLogs(options?: ExecuteQueryOptions): QueryPromise<ListScanLogsData, undefined>;

interface ListScanLogsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListScanLogsData, undefined>;
}
export const listScanLogsRef: ListScanLogsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listScanLogs(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListScanLogsData, undefined>;

interface ListScanLogsRef {
  ...
  (dc: DataConnect): QueryRef<ListScanLogsData, undefined>;
}
export const listScanLogsRef: ListScanLogsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listScanLogsRef:
```typescript
const name = listScanLogsRef.operationName;
console.log(name);
```

### Variables
The `ListScanLogs` query has no variables.
### Return Type
Recall that executing the `ListScanLogs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListScanLogsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListScanLogsData {
  scanLogs: ({
    id: UUIDString;
    timestamp: TimestampString;
  } & ScanLog_Key)[];
}
```
### Using `ListScanLogs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listScanLogs } from '@dataconnect/generated';


// Call the `listScanLogs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listScanLogs();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listScanLogs(dataConnect);

console.log(data.scanLogs);

// Or, you can use the `Promise` API.
listScanLogs().then((response) => {
  const data = response.data;
  console.log(data.scanLogs);
});
```

### Using `ListScanLogs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listScanLogsRef } from '@dataconnect/generated';


// Call the `listScanLogsRef()` function to get a reference to the query.
const ref = listScanLogsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listScanLogsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.scanLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.scanLogs);
});
```

## GetAdminUser
You can execute the `GetAdminUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAdminUser(vars: GetAdminUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetAdminUserData, GetAdminUserVariables>;

interface GetAdminUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAdminUserVariables): QueryRef<GetAdminUserData, GetAdminUserVariables>;
}
export const getAdminUserRef: GetAdminUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAdminUser(dc: DataConnect, vars: GetAdminUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetAdminUserData, GetAdminUserVariables>;

interface GetAdminUserRef {
  ...
  (dc: DataConnect, vars: GetAdminUserVariables): QueryRef<GetAdminUserData, GetAdminUserVariables>;
}
export const getAdminUserRef: GetAdminUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAdminUserRef:
```typescript
const name = getAdminUserRef.operationName;
console.log(name);
```

### Variables
The `GetAdminUser` query requires an argument of type `GetAdminUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAdminUserVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetAdminUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAdminUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAdminUserData {
  adminUser?: {
    username: string;
    email: string;
    role: string;
  };
}
```
### Using `GetAdminUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAdminUser, GetAdminUserVariables } from '@dataconnect/generated';

// The `GetAdminUser` query requires an argument of type `GetAdminUserVariables`:
const getAdminUserVars: GetAdminUserVariables = {
  id: ..., 
};

// Call the `getAdminUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAdminUser(getAdminUserVars);
// Variables can be defined inline as well.
const { data } = await getAdminUser({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAdminUser(dataConnect, getAdminUserVars);

console.log(data.adminUser);

// Or, you can use the `Promise` API.
getAdminUser(getAdminUserVars).then((response) => {
  const data = response.data;
  console.log(data.adminUser);
});
```

### Using `GetAdminUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAdminUserRef, GetAdminUserVariables } from '@dataconnect/generated';

// The `GetAdminUser` query requires an argument of type `GetAdminUserVariables`:
const getAdminUserVars: GetAdminUserVariables = {
  id: ..., 
};

// Call the `getAdminUserRef()` function to get a reference to the query.
const ref = getAdminUserRef(getAdminUserVars);
// Variables can be defined inline as well.
const ref = getAdminUserRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAdminUserRef(dataConnect, getAdminUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.adminUser);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.adminUser);
});
```

## ListAdminUsers
You can execute the `ListAdminUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAdminUsers(options?: ExecuteQueryOptions): QueryPromise<ListAdminUsersData, undefined>;

interface ListAdminUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAdminUsersData, undefined>;
}
export const listAdminUsersRef: ListAdminUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAdminUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAdminUsersData, undefined>;

interface ListAdminUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListAdminUsersData, undefined>;
}
export const listAdminUsersRef: ListAdminUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAdminUsersRef:
```typescript
const name = listAdminUsersRef.operationName;
console.log(name);
```

### Variables
The `ListAdminUsers` query has no variables.
### Return Type
Recall that executing the `ListAdminUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAdminUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAdminUsersData {
  adminUsers: ({
    id: UUIDString;
    username: string;
    email: string;
  } & AdminUser_Key)[];
}
```
### Using `ListAdminUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAdminUsers } from '@dataconnect/generated';


// Call the `listAdminUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAdminUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAdminUsers(dataConnect);

console.log(data.adminUsers);

// Or, you can use the `Promise` API.
listAdminUsers().then((response) => {
  const data = response.data;
  console.log(data.adminUsers);
});
```

### Using `ListAdminUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAdminUsersRef } from '@dataconnect/generated';


// Call the `listAdminUsersRef()` function to get a reference to the query.
const ref = listAdminUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAdminUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.adminUsers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.adminUsers);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateOffice
You can execute the `CreateOffice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createOffice(): MutationPromise<CreateOfficeData, undefined>;

interface CreateOfficeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateOfficeData, undefined>;
}
export const createOfficeRef: CreateOfficeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOffice(dc: DataConnect): MutationPromise<CreateOfficeData, undefined>;

interface CreateOfficeRef {
  ...
  (dc: DataConnect): MutationRef<CreateOfficeData, undefined>;
}
export const createOfficeRef: CreateOfficeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOfficeRef:
```typescript
const name = createOfficeRef.operationName;
console.log(name);
```

### Variables
The `CreateOffice` mutation has no variables.
### Return Type
Recall that executing the `CreateOffice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOfficeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOfficeData {
  office_insert: Office_Key;
}
```
### Using `CreateOffice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOffice } from '@dataconnect/generated';


// Call the `createOffice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOffice();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOffice(dataConnect);

console.log(data.office_insert);

// Or, you can use the `Promise` API.
createOffice().then((response) => {
  const data = response.data;
  console.log(data.office_insert);
});
```

### Using `CreateOffice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOfficeRef } from '@dataconnect/generated';


// Call the `createOfficeRef()` function to get a reference to the mutation.
const ref = createOfficeRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOfficeRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.office_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.office_insert);
});
```

## UpdateOffice
You can execute the `UpdateOffice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateOffice(vars: UpdateOfficeVariables): MutationPromise<UpdateOfficeData, UpdateOfficeVariables>;

interface UpdateOfficeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOfficeVariables): MutationRef<UpdateOfficeData, UpdateOfficeVariables>;
}
export const updateOfficeRef: UpdateOfficeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateOffice(dc: DataConnect, vars: UpdateOfficeVariables): MutationPromise<UpdateOfficeData, UpdateOfficeVariables>;

interface UpdateOfficeRef {
  ...
  (dc: DataConnect, vars: UpdateOfficeVariables): MutationRef<UpdateOfficeData, UpdateOfficeVariables>;
}
export const updateOfficeRef: UpdateOfficeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateOfficeRef:
```typescript
const name = updateOfficeRef.operationName;
console.log(name);
```

### Variables
The `UpdateOffice` mutation requires an argument of type `UpdateOfficeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateOfficeVariables {
  id: UUIDString;
  name?: string | null;
}
```
### Return Type
Recall that executing the `UpdateOffice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateOfficeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateOfficeData {
  office_update?: Office_Key | null;
}
```
### Using `UpdateOffice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateOffice, UpdateOfficeVariables } from '@dataconnect/generated';

// The `UpdateOffice` mutation requires an argument of type `UpdateOfficeVariables`:
const updateOfficeVars: UpdateOfficeVariables = {
  id: ..., 
  name: ..., // optional
};

// Call the `updateOffice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateOffice(updateOfficeVars);
// Variables can be defined inline as well.
const { data } = await updateOffice({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateOffice(dataConnect, updateOfficeVars);

console.log(data.office_update);

// Or, you can use the `Promise` API.
updateOffice(updateOfficeVars).then((response) => {
  const data = response.data;
  console.log(data.office_update);
});
```

### Using `UpdateOffice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateOfficeRef, UpdateOfficeVariables } from '@dataconnect/generated';

// The `UpdateOffice` mutation requires an argument of type `UpdateOfficeVariables`:
const updateOfficeVars: UpdateOfficeVariables = {
  id: ..., 
  name: ..., // optional
};

// Call the `updateOfficeRef()` function to get a reference to the mutation.
const ref = updateOfficeRef(updateOfficeVars);
// Variables can be defined inline as well.
const ref = updateOfficeRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateOfficeRef(dataConnect, updateOfficeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.office_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.office_update);
});
```

## DeleteOffice
You can execute the `DeleteOffice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteOffice(vars: DeleteOfficeVariables): MutationPromise<DeleteOfficeData, DeleteOfficeVariables>;

interface DeleteOfficeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOfficeVariables): MutationRef<DeleteOfficeData, DeleteOfficeVariables>;
}
export const deleteOfficeRef: DeleteOfficeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteOffice(dc: DataConnect, vars: DeleteOfficeVariables): MutationPromise<DeleteOfficeData, DeleteOfficeVariables>;

interface DeleteOfficeRef {
  ...
  (dc: DataConnect, vars: DeleteOfficeVariables): MutationRef<DeleteOfficeData, DeleteOfficeVariables>;
}
export const deleteOfficeRef: DeleteOfficeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteOfficeRef:
```typescript
const name = deleteOfficeRef.operationName;
console.log(name);
```

### Variables
The `DeleteOffice` mutation requires an argument of type `DeleteOfficeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteOfficeVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteOffice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteOfficeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteOfficeData {
  office_delete?: Office_Key | null;
}
```
### Using `DeleteOffice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteOffice, DeleteOfficeVariables } from '@dataconnect/generated';

// The `DeleteOffice` mutation requires an argument of type `DeleteOfficeVariables`:
const deleteOfficeVars: DeleteOfficeVariables = {
  id: ..., 
};

// Call the `deleteOffice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteOffice(deleteOfficeVars);
// Variables can be defined inline as well.
const { data } = await deleteOffice({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteOffice(dataConnect, deleteOfficeVars);

console.log(data.office_delete);

// Or, you can use the `Promise` API.
deleteOffice(deleteOfficeVars).then((response) => {
  const data = response.data;
  console.log(data.office_delete);
});
```

### Using `DeleteOffice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteOfficeRef, DeleteOfficeVariables } from '@dataconnect/generated';

// The `DeleteOffice` mutation requires an argument of type `DeleteOfficeVariables`:
const deleteOfficeVars: DeleteOfficeVariables = {
  id: ..., 
};

// Call the `deleteOfficeRef()` function to get a reference to the mutation.
const ref = deleteOfficeRef(deleteOfficeVars);
// Variables can be defined inline as well.
const ref = deleteOfficeRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteOfficeRef(dataConnect, deleteOfficeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.office_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.office_delete);
});
```

## CreateQrToken
You can execute the `CreateQrToken` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createQrToken(vars: CreateQrTokenVariables): MutationPromise<CreateQrTokenData, CreateQrTokenVariables>;

interface CreateQrTokenRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQrTokenVariables): MutationRef<CreateQrTokenData, CreateQrTokenVariables>;
}
export const createQrTokenRef: CreateQrTokenRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQrToken(dc: DataConnect, vars: CreateQrTokenVariables): MutationPromise<CreateQrTokenData, CreateQrTokenVariables>;

interface CreateQrTokenRef {
  ...
  (dc: DataConnect, vars: CreateQrTokenVariables): MutationRef<CreateQrTokenData, CreateQrTokenVariables>;
}
export const createQrTokenRef: CreateQrTokenRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQrTokenRef:
```typescript
const name = createQrTokenRef.operationName;
console.log(name);
```

### Variables
The `CreateQrToken` mutation requires an argument of type `CreateQrTokenVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQrTokenVariables {
  officeId: UUIDString;
  token: string;
}
```
### Return Type
Recall that executing the `CreateQrToken` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQrTokenData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQrTokenData {
  qrToken_insert: QrToken_Key;
}
```
### Using `CreateQrToken`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQrToken, CreateQrTokenVariables } from '@dataconnect/generated';

// The `CreateQrToken` mutation requires an argument of type `CreateQrTokenVariables`:
const createQrTokenVars: CreateQrTokenVariables = {
  officeId: ..., 
  token: ..., 
};

// Call the `createQrToken()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQrToken(createQrTokenVars);
// Variables can be defined inline as well.
const { data } = await createQrToken({ officeId: ..., token: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQrToken(dataConnect, createQrTokenVars);

console.log(data.qrToken_insert);

// Or, you can use the `Promise` API.
createQrToken(createQrTokenVars).then((response) => {
  const data = response.data;
  console.log(data.qrToken_insert);
});
```

### Using `CreateQrToken`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQrTokenRef, CreateQrTokenVariables } from '@dataconnect/generated';

// The `CreateQrToken` mutation requires an argument of type `CreateQrTokenVariables`:
const createQrTokenVars: CreateQrTokenVariables = {
  officeId: ..., 
  token: ..., 
};

// Call the `createQrTokenRef()` function to get a reference to the mutation.
const ref = createQrTokenRef(createQrTokenVars);
// Variables can be defined inline as well.
const ref = createQrTokenRef({ officeId: ..., token: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQrTokenRef(dataConnect, createQrTokenVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.qrToken_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.qrToken_insert);
});
```

## UpdateQrToken
You can execute the `UpdateQrToken` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateQrToken(vars: UpdateQrTokenVariables): MutationPromise<UpdateQrTokenData, UpdateQrTokenVariables>;

interface UpdateQrTokenRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQrTokenVariables): MutationRef<UpdateQrTokenData, UpdateQrTokenVariables>;
}
export const updateQrTokenRef: UpdateQrTokenRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQrToken(dc: DataConnect, vars: UpdateQrTokenVariables): MutationPromise<UpdateQrTokenData, UpdateQrTokenVariables>;

interface UpdateQrTokenRef {
  ...
  (dc: DataConnect, vars: UpdateQrTokenVariables): MutationRef<UpdateQrTokenData, UpdateQrTokenVariables>;
}
export const updateQrTokenRef: UpdateQrTokenRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQrTokenRef:
```typescript
const name = updateQrTokenRef.operationName;
console.log(name);
```

### Variables
The `UpdateQrToken` mutation requires an argument of type `UpdateQrTokenVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateQrTokenVariables {
  id: UUIDString;
  status?: string | null;
}
```
### Return Type
Recall that executing the `UpdateQrToken` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQrTokenData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQrTokenData {
  qrToken_update?: QrToken_Key | null;
}
```
### Using `UpdateQrToken`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQrToken, UpdateQrTokenVariables } from '@dataconnect/generated';

// The `UpdateQrToken` mutation requires an argument of type `UpdateQrTokenVariables`:
const updateQrTokenVars: UpdateQrTokenVariables = {
  id: ..., 
  status: ..., // optional
};

// Call the `updateQrToken()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQrToken(updateQrTokenVars);
// Variables can be defined inline as well.
const { data } = await updateQrToken({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQrToken(dataConnect, updateQrTokenVars);

console.log(data.qrToken_update);

// Or, you can use the `Promise` API.
updateQrToken(updateQrTokenVars).then((response) => {
  const data = response.data;
  console.log(data.qrToken_update);
});
```

### Using `UpdateQrToken`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQrTokenRef, UpdateQrTokenVariables } from '@dataconnect/generated';

// The `UpdateQrToken` mutation requires an argument of type `UpdateQrTokenVariables`:
const updateQrTokenVars: UpdateQrTokenVariables = {
  id: ..., 
  status: ..., // optional
};

// Call the `updateQrTokenRef()` function to get a reference to the mutation.
const ref = updateQrTokenRef(updateQrTokenVars);
// Variables can be defined inline as well.
const ref = updateQrTokenRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQrTokenRef(dataConnect, updateQrTokenVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.qrToken_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.qrToken_update);
});
```

## DeleteQrToken
You can execute the `DeleteQrToken` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteQrToken(vars: DeleteQrTokenVariables): MutationPromise<DeleteQrTokenData, DeleteQrTokenVariables>;

interface DeleteQrTokenRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQrTokenVariables): MutationRef<DeleteQrTokenData, DeleteQrTokenVariables>;
}
export const deleteQrTokenRef: DeleteQrTokenRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteQrToken(dc: DataConnect, vars: DeleteQrTokenVariables): MutationPromise<DeleteQrTokenData, DeleteQrTokenVariables>;

interface DeleteQrTokenRef {
  ...
  (dc: DataConnect, vars: DeleteQrTokenVariables): MutationRef<DeleteQrTokenData, DeleteQrTokenVariables>;
}
export const deleteQrTokenRef: DeleteQrTokenRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteQrTokenRef:
```typescript
const name = deleteQrTokenRef.operationName;
console.log(name);
```

### Variables
The `DeleteQrToken` mutation requires an argument of type `DeleteQrTokenVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteQrTokenVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteQrToken` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteQrTokenData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteQrTokenData {
  qrToken_delete?: QrToken_Key | null;
}
```
### Using `DeleteQrToken`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteQrToken, DeleteQrTokenVariables } from '@dataconnect/generated';

// The `DeleteQrToken` mutation requires an argument of type `DeleteQrTokenVariables`:
const deleteQrTokenVars: DeleteQrTokenVariables = {
  id: ..., 
};

// Call the `deleteQrToken()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteQrToken(deleteQrTokenVars);
// Variables can be defined inline as well.
const { data } = await deleteQrToken({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteQrToken(dataConnect, deleteQrTokenVars);

console.log(data.qrToken_delete);

// Or, you can use the `Promise` API.
deleteQrToken(deleteQrTokenVars).then((response) => {
  const data = response.data;
  console.log(data.qrToken_delete);
});
```

### Using `DeleteQrToken`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteQrTokenRef, DeleteQrTokenVariables } from '@dataconnect/generated';

// The `DeleteQrToken` mutation requires an argument of type `DeleteQrTokenVariables`:
const deleteQrTokenVars: DeleteQrTokenVariables = {
  id: ..., 
};

// Call the `deleteQrTokenRef()` function to get a reference to the mutation.
const ref = deleteQrTokenRef(deleteQrTokenVars);
// Variables can be defined inline as well.
const ref = deleteQrTokenRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteQrTokenRef(dataConnect, deleteQrTokenVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.qrToken_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.qrToken_delete);
});
```

## CreateFeedback
You can execute the `CreateFeedback` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createFeedback(vars: CreateFeedbackVariables): MutationPromise<CreateFeedbackData, CreateFeedbackVariables>;

interface CreateFeedbackRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFeedbackVariables): MutationRef<CreateFeedbackData, CreateFeedbackVariables>;
}
export const createFeedbackRef: CreateFeedbackRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createFeedback(dc: DataConnect, vars: CreateFeedbackVariables): MutationPromise<CreateFeedbackData, CreateFeedbackVariables>;

interface CreateFeedbackRef {
  ...
  (dc: DataConnect, vars: CreateFeedbackVariables): MutationRef<CreateFeedbackData, CreateFeedbackVariables>;
}
export const createFeedbackRef: CreateFeedbackRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createFeedbackRef:
```typescript
const name = createFeedbackRef.operationName;
console.log(name);
```

### Variables
The `CreateFeedback` mutation requires an argument of type `CreateFeedbackVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateFeedbackVariables {
  rating: number;
  message: string;
  qrTokenId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateFeedback` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateFeedbackData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateFeedbackData {
  feedback_insert: Feedback_Key;
}
```
### Using `CreateFeedback`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createFeedback, CreateFeedbackVariables } from '@dataconnect/generated';

// The `CreateFeedback` mutation requires an argument of type `CreateFeedbackVariables`:
const createFeedbackVars: CreateFeedbackVariables = {
  rating: ..., 
  message: ..., 
  qrTokenId: ..., 
};

// Call the `createFeedback()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createFeedback(createFeedbackVars);
// Variables can be defined inline as well.
const { data } = await createFeedback({ rating: ..., message: ..., qrTokenId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createFeedback(dataConnect, createFeedbackVars);

console.log(data.feedback_insert);

// Or, you can use the `Promise` API.
createFeedback(createFeedbackVars).then((response) => {
  const data = response.data;
  console.log(data.feedback_insert);
});
```

### Using `CreateFeedback`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createFeedbackRef, CreateFeedbackVariables } from '@dataconnect/generated';

// The `CreateFeedback` mutation requires an argument of type `CreateFeedbackVariables`:
const createFeedbackVars: CreateFeedbackVariables = {
  rating: ..., 
  message: ..., 
  qrTokenId: ..., 
};

// Call the `createFeedbackRef()` function to get a reference to the mutation.
const ref = createFeedbackRef(createFeedbackVars);
// Variables can be defined inline as well.
const ref = createFeedbackRef({ rating: ..., message: ..., qrTokenId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createFeedbackRef(dataConnect, createFeedbackVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.feedback_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.feedback_insert);
});
```

## UpdateFeedback
You can execute the `UpdateFeedback` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateFeedback(vars: UpdateFeedbackVariables): MutationPromise<UpdateFeedbackData, UpdateFeedbackVariables>;

interface UpdateFeedbackRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFeedbackVariables): MutationRef<UpdateFeedbackData, UpdateFeedbackVariables>;
}
export const updateFeedbackRef: UpdateFeedbackRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateFeedback(dc: DataConnect, vars: UpdateFeedbackVariables): MutationPromise<UpdateFeedbackData, UpdateFeedbackVariables>;

interface UpdateFeedbackRef {
  ...
  (dc: DataConnect, vars: UpdateFeedbackVariables): MutationRef<UpdateFeedbackData, UpdateFeedbackVariables>;
}
export const updateFeedbackRef: UpdateFeedbackRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateFeedbackRef:
```typescript
const name = updateFeedbackRef.operationName;
console.log(name);
```

### Variables
The `UpdateFeedback` mutation requires an argument of type `UpdateFeedbackVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateFeedbackVariables {
  id: UUIDString;
  message?: string | null;
}
```
### Return Type
Recall that executing the `UpdateFeedback` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateFeedbackData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateFeedbackData {
  feedback_update?: Feedback_Key | null;
}
```
### Using `UpdateFeedback`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateFeedback, UpdateFeedbackVariables } from '@dataconnect/generated';

// The `UpdateFeedback` mutation requires an argument of type `UpdateFeedbackVariables`:
const updateFeedbackVars: UpdateFeedbackVariables = {
  id: ..., 
  message: ..., // optional
};

// Call the `updateFeedback()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateFeedback(updateFeedbackVars);
// Variables can be defined inline as well.
const { data } = await updateFeedback({ id: ..., message: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateFeedback(dataConnect, updateFeedbackVars);

console.log(data.feedback_update);

// Or, you can use the `Promise` API.
updateFeedback(updateFeedbackVars).then((response) => {
  const data = response.data;
  console.log(data.feedback_update);
});
```

### Using `UpdateFeedback`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateFeedbackRef, UpdateFeedbackVariables } from '@dataconnect/generated';

// The `UpdateFeedback` mutation requires an argument of type `UpdateFeedbackVariables`:
const updateFeedbackVars: UpdateFeedbackVariables = {
  id: ..., 
  message: ..., // optional
};

// Call the `updateFeedbackRef()` function to get a reference to the mutation.
const ref = updateFeedbackRef(updateFeedbackVars);
// Variables can be defined inline as well.
const ref = updateFeedbackRef({ id: ..., message: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateFeedbackRef(dataConnect, updateFeedbackVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.feedback_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.feedback_update);
});
```

## DeleteFeedback
You can execute the `DeleteFeedback` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteFeedback(vars: DeleteFeedbackVariables): MutationPromise<DeleteFeedbackData, DeleteFeedbackVariables>;

interface DeleteFeedbackRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFeedbackVariables): MutationRef<DeleteFeedbackData, DeleteFeedbackVariables>;
}
export const deleteFeedbackRef: DeleteFeedbackRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteFeedback(dc: DataConnect, vars: DeleteFeedbackVariables): MutationPromise<DeleteFeedbackData, DeleteFeedbackVariables>;

interface DeleteFeedbackRef {
  ...
  (dc: DataConnect, vars: DeleteFeedbackVariables): MutationRef<DeleteFeedbackData, DeleteFeedbackVariables>;
}
export const deleteFeedbackRef: DeleteFeedbackRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteFeedbackRef:
```typescript
const name = deleteFeedbackRef.operationName;
console.log(name);
```

### Variables
The `DeleteFeedback` mutation requires an argument of type `DeleteFeedbackVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteFeedbackVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteFeedback` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteFeedbackData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteFeedbackData {
  feedback_delete?: Feedback_Key | null;
}
```
### Using `DeleteFeedback`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFeedback, DeleteFeedbackVariables } from '@dataconnect/generated';

// The `DeleteFeedback` mutation requires an argument of type `DeleteFeedbackVariables`:
const deleteFeedbackVars: DeleteFeedbackVariables = {
  id: ..., 
};

// Call the `deleteFeedback()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteFeedback(deleteFeedbackVars);
// Variables can be defined inline as well.
const { data } = await deleteFeedback({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteFeedback(dataConnect, deleteFeedbackVars);

console.log(data.feedback_delete);

// Or, you can use the `Promise` API.
deleteFeedback(deleteFeedbackVars).then((response) => {
  const data = response.data;
  console.log(data.feedback_delete);
});
```

### Using `DeleteFeedback`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteFeedbackRef, DeleteFeedbackVariables } from '@dataconnect/generated';

// The `DeleteFeedback` mutation requires an argument of type `DeleteFeedbackVariables`:
const deleteFeedbackVars: DeleteFeedbackVariables = {
  id: ..., 
};

// Call the `deleteFeedbackRef()` function to get a reference to the mutation.
const ref = deleteFeedbackRef(deleteFeedbackVars);
// Variables can be defined inline as well.
const ref = deleteFeedbackRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteFeedbackRef(dataConnect, deleteFeedbackVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.feedback_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.feedback_delete);
});
```

## CreateScanLog
You can execute the `CreateScanLog` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createScanLog(vars: CreateScanLogVariables): MutationPromise<CreateScanLogData, CreateScanLogVariables>;

interface CreateScanLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateScanLogVariables): MutationRef<CreateScanLogData, CreateScanLogVariables>;
}
export const createScanLogRef: CreateScanLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createScanLog(dc: DataConnect, vars: CreateScanLogVariables): MutationPromise<CreateScanLogData, CreateScanLogVariables>;

interface CreateScanLogRef {
  ...
  (dc: DataConnect, vars: CreateScanLogVariables): MutationRef<CreateScanLogData, CreateScanLogVariables>;
}
export const createScanLogRef: CreateScanLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createScanLogRef:
```typescript
const name = createScanLogRef.operationName;
console.log(name);
```

### Variables
The `CreateScanLog` mutation requires an argument of type `CreateScanLogVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateScanLogVariables {
  qrTokenId: UUIDString;
  ip: string;
}
```
### Return Type
Recall that executing the `CreateScanLog` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateScanLogData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateScanLogData {
  scanLog_insert: ScanLog_Key;
}
```
### Using `CreateScanLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createScanLog, CreateScanLogVariables } from '@dataconnect/generated';

// The `CreateScanLog` mutation requires an argument of type `CreateScanLogVariables`:
const createScanLogVars: CreateScanLogVariables = {
  qrTokenId: ..., 
  ip: ..., 
};

// Call the `createScanLog()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createScanLog(createScanLogVars);
// Variables can be defined inline as well.
const { data } = await createScanLog({ qrTokenId: ..., ip: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createScanLog(dataConnect, createScanLogVars);

console.log(data.scanLog_insert);

// Or, you can use the `Promise` API.
createScanLog(createScanLogVars).then((response) => {
  const data = response.data;
  console.log(data.scanLog_insert);
});
```

### Using `CreateScanLog`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createScanLogRef, CreateScanLogVariables } from '@dataconnect/generated';

// The `CreateScanLog` mutation requires an argument of type `CreateScanLogVariables`:
const createScanLogVars: CreateScanLogVariables = {
  qrTokenId: ..., 
  ip: ..., 
};

// Call the `createScanLogRef()` function to get a reference to the mutation.
const ref = createScanLogRef(createScanLogVars);
// Variables can be defined inline as well.
const ref = createScanLogRef({ qrTokenId: ..., ip: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createScanLogRef(dataConnect, createScanLogVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.scanLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.scanLog_insert);
});
```

## UpdateScanLog
You can execute the `UpdateScanLog` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateScanLog(vars: UpdateScanLogVariables): MutationPromise<UpdateScanLogData, UpdateScanLogVariables>;

interface UpdateScanLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateScanLogVariables): MutationRef<UpdateScanLogData, UpdateScanLogVariables>;
}
export const updateScanLogRef: UpdateScanLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateScanLog(dc: DataConnect, vars: UpdateScanLogVariables): MutationPromise<UpdateScanLogData, UpdateScanLogVariables>;

interface UpdateScanLogRef {
  ...
  (dc: DataConnect, vars: UpdateScanLogVariables): MutationRef<UpdateScanLogData, UpdateScanLogVariables>;
}
export const updateScanLogRef: UpdateScanLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateScanLogRef:
```typescript
const name = updateScanLogRef.operationName;
console.log(name);
```

### Variables
The `UpdateScanLog` mutation requires an argument of type `UpdateScanLogVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateScanLogVariables {
  id: UUIDString;
  ip?: string | null;
}
```
### Return Type
Recall that executing the `UpdateScanLog` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateScanLogData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateScanLogData {
  scanLog_update?: ScanLog_Key | null;
}
```
### Using `UpdateScanLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateScanLog, UpdateScanLogVariables } from '@dataconnect/generated';

// The `UpdateScanLog` mutation requires an argument of type `UpdateScanLogVariables`:
const updateScanLogVars: UpdateScanLogVariables = {
  id: ..., 
  ip: ..., // optional
};

// Call the `updateScanLog()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateScanLog(updateScanLogVars);
// Variables can be defined inline as well.
const { data } = await updateScanLog({ id: ..., ip: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateScanLog(dataConnect, updateScanLogVars);

console.log(data.scanLog_update);

// Or, you can use the `Promise` API.
updateScanLog(updateScanLogVars).then((response) => {
  const data = response.data;
  console.log(data.scanLog_update);
});
```

### Using `UpdateScanLog`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateScanLogRef, UpdateScanLogVariables } from '@dataconnect/generated';

// The `UpdateScanLog` mutation requires an argument of type `UpdateScanLogVariables`:
const updateScanLogVars: UpdateScanLogVariables = {
  id: ..., 
  ip: ..., // optional
};

// Call the `updateScanLogRef()` function to get a reference to the mutation.
const ref = updateScanLogRef(updateScanLogVars);
// Variables can be defined inline as well.
const ref = updateScanLogRef({ id: ..., ip: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateScanLogRef(dataConnect, updateScanLogVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.scanLog_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.scanLog_update);
});
```

## DeleteScanLog
You can execute the `DeleteScanLog` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteScanLog(vars: DeleteScanLogVariables): MutationPromise<DeleteScanLogData, DeleteScanLogVariables>;

interface DeleteScanLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteScanLogVariables): MutationRef<DeleteScanLogData, DeleteScanLogVariables>;
}
export const deleteScanLogRef: DeleteScanLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteScanLog(dc: DataConnect, vars: DeleteScanLogVariables): MutationPromise<DeleteScanLogData, DeleteScanLogVariables>;

interface DeleteScanLogRef {
  ...
  (dc: DataConnect, vars: DeleteScanLogVariables): MutationRef<DeleteScanLogData, DeleteScanLogVariables>;
}
export const deleteScanLogRef: DeleteScanLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteScanLogRef:
```typescript
const name = deleteScanLogRef.operationName;
console.log(name);
```

### Variables
The `DeleteScanLog` mutation requires an argument of type `DeleteScanLogVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteScanLogVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteScanLog` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteScanLogData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteScanLogData {
  scanLog_delete?: ScanLog_Key | null;
}
```
### Using `DeleteScanLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteScanLog, DeleteScanLogVariables } from '@dataconnect/generated';

// The `DeleteScanLog` mutation requires an argument of type `DeleteScanLogVariables`:
const deleteScanLogVars: DeleteScanLogVariables = {
  id: ..., 
};

// Call the `deleteScanLog()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteScanLog(deleteScanLogVars);
// Variables can be defined inline as well.
const { data } = await deleteScanLog({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteScanLog(dataConnect, deleteScanLogVars);

console.log(data.scanLog_delete);

// Or, you can use the `Promise` API.
deleteScanLog(deleteScanLogVars).then((response) => {
  const data = response.data;
  console.log(data.scanLog_delete);
});
```

### Using `DeleteScanLog`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteScanLogRef, DeleteScanLogVariables } from '@dataconnect/generated';

// The `DeleteScanLog` mutation requires an argument of type `DeleteScanLogVariables`:
const deleteScanLogVars: DeleteScanLogVariables = {
  id: ..., 
};

// Call the `deleteScanLogRef()` function to get a reference to the mutation.
const ref = deleteScanLogRef(deleteScanLogVars);
// Variables can be defined inline as well.
const ref = deleteScanLogRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteScanLogRef(dataConnect, deleteScanLogVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.scanLog_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.scanLog_delete);
});
```

## CreateAdminUser
You can execute the `CreateAdminUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAdminUser(vars: CreateAdminUserVariables): MutationPromise<CreateAdminUserData, CreateAdminUserVariables>;

interface CreateAdminUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAdminUserVariables): MutationRef<CreateAdminUserData, CreateAdminUserVariables>;
}
export const createAdminUserRef: CreateAdminUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAdminUser(dc: DataConnect, vars: CreateAdminUserVariables): MutationPromise<CreateAdminUserData, CreateAdminUserVariables>;

interface CreateAdminUserRef {
  ...
  (dc: DataConnect, vars: CreateAdminUserVariables): MutationRef<CreateAdminUserData, CreateAdminUserVariables>;
}
export const createAdminUserRef: CreateAdminUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAdminUserRef:
```typescript
const name = createAdminUserRef.operationName;
console.log(name);
```

### Variables
The `CreateAdminUser` mutation requires an argument of type `CreateAdminUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAdminUserVariables {
  username: string;
  email: string;
  role: string;
}
```
### Return Type
Recall that executing the `CreateAdminUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAdminUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAdminUserData {
  adminUser_insert: AdminUser_Key;
}
```
### Using `CreateAdminUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAdminUser, CreateAdminUserVariables } from '@dataconnect/generated';

// The `CreateAdminUser` mutation requires an argument of type `CreateAdminUserVariables`:
const createAdminUserVars: CreateAdminUserVariables = {
  username: ..., 
  email: ..., 
  role: ..., 
};

// Call the `createAdminUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAdminUser(createAdminUserVars);
// Variables can be defined inline as well.
const { data } = await createAdminUser({ username: ..., email: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAdminUser(dataConnect, createAdminUserVars);

console.log(data.adminUser_insert);

// Or, you can use the `Promise` API.
createAdminUser(createAdminUserVars).then((response) => {
  const data = response.data;
  console.log(data.adminUser_insert);
});
```

### Using `CreateAdminUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAdminUserRef, CreateAdminUserVariables } from '@dataconnect/generated';

// The `CreateAdminUser` mutation requires an argument of type `CreateAdminUserVariables`:
const createAdminUserVars: CreateAdminUserVariables = {
  username: ..., 
  email: ..., 
  role: ..., 
};

// Call the `createAdminUserRef()` function to get a reference to the mutation.
const ref = createAdminUserRef(createAdminUserVars);
// Variables can be defined inline as well.
const ref = createAdminUserRef({ username: ..., email: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAdminUserRef(dataConnect, createAdminUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.adminUser_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.adminUser_insert);
});
```

## UpdateAdminUser
You can execute the `UpdateAdminUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAdminUser(vars: UpdateAdminUserVariables): MutationPromise<UpdateAdminUserData, UpdateAdminUserVariables>;

interface UpdateAdminUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAdminUserVariables): MutationRef<UpdateAdminUserData, UpdateAdminUserVariables>;
}
export const updateAdminUserRef: UpdateAdminUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAdminUser(dc: DataConnect, vars: UpdateAdminUserVariables): MutationPromise<UpdateAdminUserData, UpdateAdminUserVariables>;

interface UpdateAdminUserRef {
  ...
  (dc: DataConnect, vars: UpdateAdminUserVariables): MutationRef<UpdateAdminUserData, UpdateAdminUserVariables>;
}
export const updateAdminUserRef: UpdateAdminUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAdminUserRef:
```typescript
const name = updateAdminUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateAdminUser` mutation requires an argument of type `UpdateAdminUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAdminUserVariables {
  id: UUIDString;
  role?: string | null;
}
```
### Return Type
Recall that executing the `UpdateAdminUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAdminUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAdminUserData {
  adminUser_update?: AdminUser_Key | null;
}
```
### Using `UpdateAdminUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAdminUser, UpdateAdminUserVariables } from '@dataconnect/generated';

// The `UpdateAdminUser` mutation requires an argument of type `UpdateAdminUserVariables`:
const updateAdminUserVars: UpdateAdminUserVariables = {
  id: ..., 
  role: ..., // optional
};

// Call the `updateAdminUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAdminUser(updateAdminUserVars);
// Variables can be defined inline as well.
const { data } = await updateAdminUser({ id: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAdminUser(dataConnect, updateAdminUserVars);

console.log(data.adminUser_update);

// Or, you can use the `Promise` API.
updateAdminUser(updateAdminUserVars).then((response) => {
  const data = response.data;
  console.log(data.adminUser_update);
});
```

### Using `UpdateAdminUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAdminUserRef, UpdateAdminUserVariables } from '@dataconnect/generated';

// The `UpdateAdminUser` mutation requires an argument of type `UpdateAdminUserVariables`:
const updateAdminUserVars: UpdateAdminUserVariables = {
  id: ..., 
  role: ..., // optional
};

// Call the `updateAdminUserRef()` function to get a reference to the mutation.
const ref = updateAdminUserRef(updateAdminUserVars);
// Variables can be defined inline as well.
const ref = updateAdminUserRef({ id: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAdminUserRef(dataConnect, updateAdminUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.adminUser_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.adminUser_update);
});
```

## DeleteAdminUser
You can execute the `DeleteAdminUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteAdminUser(vars: DeleteAdminUserVariables): MutationPromise<DeleteAdminUserData, DeleteAdminUserVariables>;

interface DeleteAdminUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAdminUserVariables): MutationRef<DeleteAdminUserData, DeleteAdminUserVariables>;
}
export const deleteAdminUserRef: DeleteAdminUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAdminUser(dc: DataConnect, vars: DeleteAdminUserVariables): MutationPromise<DeleteAdminUserData, DeleteAdminUserVariables>;

interface DeleteAdminUserRef {
  ...
  (dc: DataConnect, vars: DeleteAdminUserVariables): MutationRef<DeleteAdminUserData, DeleteAdminUserVariables>;
}
export const deleteAdminUserRef: DeleteAdminUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAdminUserRef:
```typescript
const name = deleteAdminUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteAdminUser` mutation requires an argument of type `DeleteAdminUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAdminUserVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAdminUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAdminUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAdminUserData {
  adminUser_delete?: AdminUser_Key | null;
}
```
### Using `DeleteAdminUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAdminUser, DeleteAdminUserVariables } from '@dataconnect/generated';

// The `DeleteAdminUser` mutation requires an argument of type `DeleteAdminUserVariables`:
const deleteAdminUserVars: DeleteAdminUserVariables = {
  id: ..., 
};

// Call the `deleteAdminUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAdminUser(deleteAdminUserVars);
// Variables can be defined inline as well.
const { data } = await deleteAdminUser({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAdminUser(dataConnect, deleteAdminUserVars);

console.log(data.adminUser_delete);

// Or, you can use the `Promise` API.
deleteAdminUser(deleteAdminUserVars).then((response) => {
  const data = response.data;
  console.log(data.adminUser_delete);
});
```

### Using `DeleteAdminUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAdminUserRef, DeleteAdminUserVariables } from '@dataconnect/generated';

// The `DeleteAdminUser` mutation requires an argument of type `DeleteAdminUserVariables`:
const deleteAdminUserVars: DeleteAdminUserVariables = {
  id: ..., 
};

// Call the `deleteAdminUserRef()` function to get a reference to the mutation.
const ref = deleteAdminUserRef(deleteAdminUserVars);
// Variables can be defined inline as well.
const ref = deleteAdminUserRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAdminUserRef(dataConnect, deleteAdminUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.adminUser_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.adminUser_delete);
});
```

