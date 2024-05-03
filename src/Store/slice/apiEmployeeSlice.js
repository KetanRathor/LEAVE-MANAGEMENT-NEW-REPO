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
    getEmployees: builder.query({
      query: () => '/employees',
      providesTags: [{data: 'Employees'}],
    }),

    getEmployeesById: builder.query({
      query: (employeeId) => `/employees/employee/${employeeId}`,
      providesTags:[{ data: 'Employees' }]
      providesTags: [{data: 'Employees'}],
    }),

    addEmployee: builder.mutation({
      query: (newEmployee) => ({
        url: '/employees',
        method: 'POST',
        body: newEmployee,
        invalidatesTags:[{ data: 'Employees' }]
      }),
      invalidatesTags: [{data: 'Employees'}],
    }),
    updateEmployee: builder.mutation({
      query: ({ employeeId, ...updateData }) => ({
        url: `/employees/${employeeId}`,
        method: 'PUT',  
        body: updateData,
        invalidatesTags: [{ data: 'Employees' }]
      }),
    }),
    deleteEmployee: builder.mutation({
      query: (employeeId) => ({
        url: `/employees/${employeeId}`,
        method: 'DELETE',
        invalidatesTags:[{ data: 'Employees' }]
      }),
      invalidatesTags:[{ data: 'Employees' }]
    }),
    
    uploadImage:builder.mutation({
      query:({employeeId,imageData})=>({
        url:`employees/upload-image/${employeeId}`,
        method:"POST",
        body: formData(employeeId,imageData),
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "multipart/form-data");
          return headers;
        },
      }),
      invalidatesTags: [{data: 'Employees'}],
    })
  }),
  
});

export const { useGetEmployeesQuery,useGetEmployeesByIdQuery,useAddEmployeeMutation,useUpdateEmployeeMutation, useDeleteEmployeeMutation,useUploadImageMutation } = employeeApi;
export default employeeApi;

function formData(employeeId, imageData) {
  const formData = new FormData();
  formData.append("employeeId", JSON.stringify(employeeId));
  formData.append("image", imageData);
  return formData;
}
