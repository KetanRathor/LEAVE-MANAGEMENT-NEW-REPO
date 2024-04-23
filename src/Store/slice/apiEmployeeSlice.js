import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // console.log(builder)
    getEmployees: builder.query({
      query: () => '/employees',
    }),
    addEmployee: builder.mutation({
      query: (newEmployee) => ({
        url: '/employees',
        method: 'POST',
        body: newEmployee,
      }),
    }),
    updateEmployee: builder.mutation({
      query: ({ employeeId, ...updateData }) => ({
        url: `/employees/${employeeId}`,
        method: 'PUT',  // or 'PATCH' if partially updating the data
        body: updateData,
      }),
    }),
    deleteEmployee: builder.mutation({
      query: (employeeId) => ({
        url: `/employees/${employeeId}`,
        method: 'DELETE',
      }),
    })
  }),
  
});

export const { useGetEmployeesQuery,useAddEmployeeMutation,useDeleteEmployeeMutation,useUpdateEmployeeMutation } = employeeApi;
export default employeeApi;
