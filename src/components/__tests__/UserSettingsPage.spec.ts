import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import UserSettingsPage from '@/components/screens/UserSettingsPage.vue';

// Mock vue-router
const mockRouterPush = vi.fn();
vi.mock('vue-router', async () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock child components
vi.mock('@/components/CatNapSidebar.vue', () => ({
  default: {
    template: '<div><slot /></div>',
  },
}));

describe('UserSettingsPage.vue', () => {
  it('renders the sidebar and toggles it', async () => {
    const wrapper = mount(UserSettingsPage, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    // Verify sidebar is initially hidden
    expect(wrapper.findComponent({ name: 'CatNapSidebar' }).exists()).toBe(true);
    expect(wrapper.classes()).not.toContain('overflow-hidden');

    // Toggle sidebar
    await wrapper.find('button').trigger('click');
    expect(wrapper.classes()).toContain('overflow-hidden');
  });

});
