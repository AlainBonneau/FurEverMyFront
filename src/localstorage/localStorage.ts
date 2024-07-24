export function addToLocalStorage(refreshToken: string) {
  localStorage.setItem('refreshJWT', refreshToken);
}

export function getFromLocalStorage() {
  const refreshToken = localStorage.getItem('refreshJWT')!;
  return refreshToken;
}

export function clearLocalStorage() {
  localStorage.removeItem('refreshJWT');
}
