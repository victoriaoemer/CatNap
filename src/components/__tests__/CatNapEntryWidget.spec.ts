import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import CatNapEntryWidget from "@/components/CatNapEntryWidget.vue";
import CatNapAddEntry from "@/components/CatNapAddEntry.vue";
import { useUserStore } from "@/types/User";

// Mock User Store
vi.mock("@/types/User", () => ({
  useUserStore: vi.fn(() => ({
    userData: {
      username: "testuser",
      data: [
        { title: "Dream 1", content: "Flying in the sky", emotion: 5 },
        { title: "Dream 2", content: "Lost in a maze", emotion: 2 },
      ],
    },
    updateEntries: vi.fn(),
  })),
}));

describe("CatNapEntryWidget.vue", () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userStore: ReturnType<typeof useUserStore>;

  beforeEach(() => {
    vi.restoreAllMocks();
    const pinia = createTestingPinia({ createSpy: vi.fn });
    userStore = useUserStore(pinia);
  });

  it("renders the component correctly", () => {
    const wrapper = mount(CatNapEntryWidget, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("always displays the add entry component", () => {
    const wrapper = mount(CatNapEntryWidget, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    expect(wrapper.findComponent(CatNapAddEntry).exists()).toBe(true);
  });

});
