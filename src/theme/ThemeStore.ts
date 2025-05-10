import { computed, reactive, type Ref, ref, toRefs, type ToRefs, unref, watchEffect } from "vue";
import type { Services } from "@/services.ts";
import type { Stores } from "@/stores.ts";

export const enum Theme {
    LIGHT = "light",
    DARK = "dark",
    SYSTEM = "system",
}

const userPreferenceThemeKey = "theme";

const queryDarkColourScheme = window.matchMedia("(prefers-color-scheme: dark)");
const systemTheme = ref(queryDarkColourScheme.matches ? Theme.DARK : Theme.LIGHT);
queryDarkColourScheme.addEventListener("change", (e: MediaQueryListEvent) => {
    systemTheme.value = e.matches ? Theme.DARK : Theme.LIGHT;
});

interface State {
    selectedTheme: Theme;
}

export interface ThemeStore extends Readonly<ToRefs<State>> {
    readonly theme: Ref<Theme>;
}

export default function useThemeStore(services: Services, _store: Stores): ThemeStore {
    const { userPreferencesService } = services;

    const state = reactive<State>({
        selectedTheme: userPreferencesService.getItem(userPreferenceThemeKey, () => Theme.SYSTEM),
    });

    const theme = computed(() =>
        state.selectedTheme === Theme.SYSTEM ? unref(systemTheme) : state.selectedTheme,
    );

    watchEffect(() => {
        if (state.selectedTheme === Theme.SYSTEM) {
            userPreferencesService.removeItem(userPreferenceThemeKey);
        } else {
            userPreferencesService.setItem(userPreferenceThemeKey, state.selectedTheme);
        }
    });

    return {
        ...toRefs(state),
        theme,
    };
}
