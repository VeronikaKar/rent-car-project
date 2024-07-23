export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsError = (state) => state.auth.isError;
export const selectUser = (state) => state.auth.user;
export const selectIsRefresh = (state) => state.auth.isRefreshing;
