let id = 0;

export function useSequentialId(base: string = "id") {
  return `${base}-${++id}`;
}
