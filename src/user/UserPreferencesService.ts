export type ValueProvider<T> = () => T;

export interface UserPreferencesService {
  getItem<T>(key: string, defaultValueProvider: ValueProvider<T>): T;
  setItem<T>(key: string, item: T): void;
  removeItem(key: string): void;
}

export function useUserPreferencesService(
  storage = globalThis.localStorage,
): UserPreferencesService {
  return {
    getItem<T>(key: string, defaultValueProvider: ValueProvider<T>): T {
      const serializedValue = storage.getItem(key);
      try {
        return serializedValue ? (JSON.parse(serializedValue) satisfies T) : defaultValueProvider();
      } catch (_e) {
        storage.removeItem(key);
        return defaultValueProvider();
      }
    },

    setItem<T>(key: string, item: T) {
      const serializedValue = JSON.stringify(item);
      storage.setItem(key, serializedValue);
    },

    removeItem(key: string) {
      storage.removeItem(key);
    },
  };
}
