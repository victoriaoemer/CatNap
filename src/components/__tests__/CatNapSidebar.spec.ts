import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import CatNapSidebar from "@/components/CatNapSidebar.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createTestingPinia } from "@pinia/testing";

// Mock Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/dashboard/:user", name: "Dashboard", component: {} },
    { path: "/add-entry/:user", name: "AddEntry", component: {} },
    { path: "/settings/:user", name: "Settings", component: {} },
  ],
});

describe("CatNapSidebar.vue", () => {
  let wrapper: ReturnType<typeof mount>;
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    wrapper = mount(CatNapSidebar, {
      global: {
        plugins: [router, createTestingPinia({ createSpy: vi.fn })],
      },
      props: { user: "testuser" },
    });
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    vi.restoreAllMocks();
  });

  it("renders the sidebar", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the correct navigation links", async () => {
    router.push("/");
    await router.isReady();

    const links = wrapper.findAll("a"); // Finds all anchor elements
    expect(links).toHaveLength(3); // Expect Dashboard, Add Entry, Settings

    expect(links[0].attributes("href")).toContain("/dashboard/testuser");
    expect(links[1].attributes("href")).toContain("/add-entry/testuser");
    expect(links[2].attributes("href")).toContain("/settings/testuser");
  });

  it("renders the sidebar on small screens", async () => {
    window.innerWidth = 500;
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the sidebar on large screens", async () => {
    window.innerWidth = 1200;
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });
});
