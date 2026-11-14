import { type ComponentInstance, nextTick } from "vue";
import { VIcon, VSnackbar } from "vuetify/components";
import { type ComponentMountingOptions, mount, type VueWrapper } from "@vue/test-utils";

import UserNotification from "@/notifications/UserNotification.vue";
import { defineStores, type Stores, StoresKey } from "@/stores.ts";
import { Theme } from "@/theme/ThemeStore.ts";

import { mockServices } from "@tests/mocks.ts";
import { vuetify } from "@tests/vuetify.ts";

describe.each([Theme.LIGHT, Theme.SYSTEM, Theme.DARK])("UserNotification (theme=%s)", theme => {
  type Instance = ComponentInstance<typeof UserNotification>;
  let mountFunction: (
    options?: ComponentMountingOptions<Instance, Instance["$props"]>,
  ) => Promise<VueWrapper<Instance>>;

  let stores: Stores;

  function verifyNotification(
    wrapper: VueWrapper<Instance>,
    expected: { displayed: boolean; icon?: string; colour?: string; message?: string },
  ) {
    const snackbar = wrapper.getComponent(VSnackbar);
    const isDisplayed = snackbar.props("modelValue") ?? false;
    const icon = isDisplayed ? snackbar.getComponent(VIcon).props("icon") : undefined;
    const colour = isDisplayed ? snackbar.props("color") : undefined;
    const message = isDisplayed ? snackbar.text() : undefined;

    expect(isDisplayed).to.equal(expected.displayed);
    expect(icon).to.equal(expected.icon);
    expect(colour).to.equal(expected.colour);
    expect(message).to.equal(expected.message);
  }

  beforeEach(() => {
    stores = defineStores(mockServices());
    mountFunction = async options => {
      const wrapper = mount(UserNotification, {
        global: {
          plugins: [vuetify],
          provide: {
            [StoresKey]: stores,
          },
          renderStubDefaultSlot: true,
        },
        props: {
          theme,
        },
        shallow: true,
        ...options,
      });
      await nextTick();
      return wrapper;
    };
  });

  it("renders nothing when there is no notification", async () => {
    const wrapper = await mountFunction({});

    verifyNotification(wrapper, { displayed: false });
  });

  it("renders a single info notification with the correct icon, colour and message", async () => {
    const wrapper = await mountFunction({});

    // noinspection ES6MissingAwait
    stores.notificationsStore.notifyInfo("test info message");
    await nextTick();

    verifyNotification(wrapper, {
      displayed: true,
      icon: "mdi-information-variant-circle",
      colour: "info",
      message: "test info message",
    });
  });

  it("renders a single success notification with the correct icon, colour and message", async () => {
    const wrapper = await mountFunction({});

    // noinspection ES6MissingAwait
    stores.notificationsStore.notifySuccess("test success message");
    await nextTick();

    verifyNotification(wrapper, {
      displayed: true,
      icon: "mdi-check-circle",
      colour: "success",
      message: "test success message",
    });
  });

  it("renders a single warning notification with the correct icon, colour and message", async () => {
    const wrapper = await mountFunction({});

    // noinspection ES6MissingAwait
    stores.notificationsStore.notifyWarning("test warning message");
    await nextTick();

    verifyNotification(wrapper, {
      displayed: true,
      icon: "mdi-alert-circle",
      colour: "warning",
      message: "test warning message",
    });
  });

  it("renders a single error notification with the correct icon, colour and message", async () => {
    const wrapper = await mountFunction({});

    // noinspection ES6MissingAwait
    stores.notificationsStore.notifyError("test error message");
    await nextTick();

    verifyNotification(wrapper, {
      displayed: true,
      icon: "mdi-close-circle",
      colour: "error",
      message: "test error message",
    });
  });

  it("renders multiple notifications with the correct icon, colour and message", async () => {
    const wrapper = await mountFunction({});

    // noinspection ES6MissingAwait
    stores.notificationsStore.notifyInfo("test info message");
    // noinspection ES6MissingAwait
    stores.notificationsStore.notifySuccess("test success message");
    // noinspection ES6MissingAwait
    stores.notificationsStore.notifyWarning("test warning message");
    // noinspection ES6MissingAwait
    stores.notificationsStore.notifyError("test error message");
    await nextTick();

    verifyNotification(wrapper, {
      displayed: true,
      icon: "mdi-information-variant-circle",
      colour: "info",
      message: "test info message",
    });
    await stores.notificationsStore.dismissCurrentNotification();

    verifyNotification(wrapper, {
      displayed: true,
      icon: "mdi-check-circle",
      colour: "success",
      message: "test success message",
    });
    await stores.notificationsStore.dismissCurrentNotification();

    verifyNotification(wrapper, {
      displayed: true,
      icon: "mdi-alert-circle",
      colour: "warning",
      message: "test warning message",
    });
    await stores.notificationsStore.dismissCurrentNotification();

    verifyNotification(wrapper, {
      displayed: true,
      icon: "mdi-close-circle",
      colour: "error",
      message: "test error message",
    });
    await stores.notificationsStore.dismissCurrentNotification();

    verifyNotification(wrapper, { displayed: false });
  });
});
