export function getCookie(name: string) {
  for (const entryStr of document.cookie.split("; ")) {
    const [entryName, entryValue] = entryStr.split("=");

    if (decodeURIComponent(entryName) === name) {
      return decodeURIComponent(entryValue);
    }
  }
}
