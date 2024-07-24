export function addToSessionStorage(token: string) {
  sessionStorage.setItem('JWT', token);
}

export function getFromSessionStorage() {
  const token = sessionStorage.getItem('JWT')!;
  return token;
}

export function clearSessionStorage() {
  sessionStorage.removeItem('JWT');
}
