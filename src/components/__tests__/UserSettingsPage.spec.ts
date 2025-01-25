import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import UserSettingsPage from '@/components/screens/UserSettingsPage.vue';
import CatNapSidebar from '../CatNapSidebar.vue';

// Mock vue-router
const mockRouterPush = vi.fn();
vi.mock('vue-router', async () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock User store
const mockUserStore = {
  username: 'testuser',
  getUsers: vi.fn().mockResolvedValue([{ username: 'testuser', firstName: 'John', lastName: 'Doe', password: 'password123' }]),
  updateUser: vi.fn(),
  updateUserSettings: vi.fn(),
};



vi.mock('@/types/User', () => ({
  useUserStore: () => mockUserStore,
}));

// Sidebar with toggle button in mobile view
vi.mock('@/components/CatNapSidebar.vue', () => ({
  default: {
    template: '<div class="sidebar-mock" v-if="mobile"><slot /></div>',
    props: ['mobile'],
  },
}));

describe('UserSettingsPage.vue', () => {
  let wrapper: ReturnType<typeof mount>;
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    wrapper = mount(UserSettingsPage, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    vi.restoreAllMocks();
  });

  it('renders the sidebar on small screens', async () => {
    window.innerWidth = 500;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'CatNapSidebar' }).exists()).toBe(true);
  });

  it('does render the sidebar on large screens', async () => {
    window.innerWidth = 1200;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'CatNapSidebar' }).exists()).toBe(true);
  });

  it('toggles the sidebar visibility only when mobile is true', async () => {
    window.innerWidth = 500;
    await wrapper.vm.$nextTick();

    const toggleButton = wrapper.find('button');
    expect(toggleButton.exists()).toBe(true);

    // Check if overflow-hidden is not present before the click
    expect(wrapper.find('div.h-screen').classes()).not.toContain('overflow-hidden');

    await toggleButton.trigger('click');
    await wrapper.vm.$nextTick();

    // Check if overflow-hidden is set after the click
    expect(wrapper.find('div.h-screen').classes()).toContain('overflow-hidden');
    expect(wrapper.findComponent(CatNapSidebar).exists()).toBe(true);
  });
});
