 export function handleApiResponse(set: any, response: any, successMessage: string) {
  if (response) {
    set({ apiSuccess: successMessage, apiError: null });
  } else {
    set({
      apiError: { general: "An unexpected error occurred" },
      apiSuccess: "",
    });
  }
}

 export function handleApiError(set: any, error: any) {
  const errorObj: { [key: string]: string } = {};

  if (error.response?.data?.errors) {
    error.response.data.errors.forEach(
      (err: { field: string; message: string }) => {
        errorObj[err.field] = err.message;
      }
    );
  } else if (error.response?.data?.error) {
    errorObj.general = error.response.data.error;
  } else {
    errorObj.general = "An unexpected error occurred";
  }

  set({ apiError: errorObj, apiSuccess: "" });
}
