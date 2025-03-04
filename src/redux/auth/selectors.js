export const selectUser = (state) => state.auth.user;
export const selectIsAuth = (state) => state.auth.isAuth;
export const selectError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;
export const selectUserId = (state) => state.auth.userId;
export const selectUsersList = (state) => state.auth.usersList;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
