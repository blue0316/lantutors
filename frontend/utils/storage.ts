/**
 * Utility object with keys to functions pertaining to local storage management.
 *
 * @see TutorProvider
 */

export const storage = {
  setUserLocal: (email: string) =>
    localStorage.setItem('tutor', email),
  getUserLocal: () =>
    JSON.parse(window.localStorage.getItem('tutor') || ''),
  clearUserLocal: () => window.localStorage.removeItem('tutor'),
  setLogoutEvent: () =>
    window.localStorage.setItem(
      'app_logout',
      JSON.stringify(Date.now())
    ),
};
