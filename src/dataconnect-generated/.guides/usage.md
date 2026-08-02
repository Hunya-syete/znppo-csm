# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateOffice, useUpdateOffice, useDeleteOffice, useGetOffice, useListOffices, useCreateQrToken, useUpdateQrToken, useDeleteQrToken, useGetQrToken, useListQrTokens } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateOffice();

const { data, isPending, isSuccess, isError, error } = useUpdateOffice(updateOfficeVars);

const { data, isPending, isSuccess, isError, error } = useDeleteOffice(deleteOfficeVars);

const { data, isPending, isSuccess, isError, error } = useGetOffice(getOfficeVars);

const { data, isPending, isSuccess, isError, error } = useListOffices();

const { data, isPending, isSuccess, isError, error } = useCreateQrToken(createQrTokenVars);

const { data, isPending, isSuccess, isError, error } = useUpdateQrToken(updateQrTokenVars);

const { data, isPending, isSuccess, isError, error } = useDeleteQrToken(deleteQrTokenVars);

const { data, isPending, isSuccess, isError, error } = useGetQrToken(getQrTokenVars);

const { data, isPending, isSuccess, isError, error } = useListQrTokens();

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createOffice, updateOffice, deleteOffice, getOffice, listOffices, createQrToken, updateQrToken, deleteQrToken, getQrToken, listQrTokens } from '@dataconnect/generated';


// Operation CreateOffice: 
const { data } = await CreateOffice(dataConnect);

// Operation UpdateOffice:  For variables, look at type UpdateOfficeVars in ../index.d.ts
const { data } = await UpdateOffice(dataConnect, updateOfficeVars);

// Operation DeleteOffice:  For variables, look at type DeleteOfficeVars in ../index.d.ts
const { data } = await DeleteOffice(dataConnect, deleteOfficeVars);

// Operation GetOffice:  For variables, look at type GetOfficeVars in ../index.d.ts
const { data } = await GetOffice(dataConnect, getOfficeVars);

// Operation ListOffices: 
const { data } = await ListOffices(dataConnect);

// Operation CreateQrToken:  For variables, look at type CreateQrTokenVars in ../index.d.ts
const { data } = await CreateQrToken(dataConnect, createQrTokenVars);

// Operation UpdateQrToken:  For variables, look at type UpdateQrTokenVars in ../index.d.ts
const { data } = await UpdateQrToken(dataConnect, updateQrTokenVars);

// Operation DeleteQrToken:  For variables, look at type DeleteQrTokenVars in ../index.d.ts
const { data } = await DeleteQrToken(dataConnect, deleteQrTokenVars);

// Operation GetQrToken:  For variables, look at type GetQrTokenVars in ../index.d.ts
const { data } = await GetQrToken(dataConnect, getQrTokenVars);

// Operation ListQrTokens: 
const { data } = await ListQrTokens(dataConnect);


```