import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from '@/components/screens/LoginPage.vue';

// Mock vue-router
const routerPush = vi.fn();
vi.mock('vue-router', async () => ({
  useRouter: () => ({
    push: routerPush,
  }),
}));

// Mock User store
vi.mock('@/types/User', () => ({
  useUserStore: vi.fn(() => ({
    getUsers: vi.fn().mockResolvedValue([
      { username: 'testuser', password: 'password123', firstName: 'John', lastName: 'Doe' },
    ]),
  })),
}));

describe('LoginPage.vue', () => {
  it('renders the login form', () => {
    const wrapper = mount(LoginPage);
    expect(wrapper.find('input[placeholder="Username"]').exists()).toBe(true);
    expect(wrapper.find('input[placeholder="Password"]').exists()).toBe(true);
    expect(wrapper.find('button').text()).toContain('Login');
  });

  it('shows an error when fields are empty', async () => {
    const wrapper = mount(LoginPage);
    await wrapper.find('button').trigger('click');
    expect(wrapper.text()).toContain('Please enter a username and password');
  });

  it('shows an error for incorrect credentials', async () => {
    const wrapper = mount(LoginPage);
    await wrapper.find('input[placeholder="Username"]').setValue('testuser');
    await wrapper.find('input[placeholder="Password"]').setValue('wrongpassword');
    await wrapper.find('button').trigger('click');
    expect(wrapper.text()).toContain('Password is incorrect');
  });

  it('redirects on successful login', async () => {
    const wrapper = mount(LoginPage);
    await wrapper.find('input[placeholder="Username"]').setValue('testuser');
    await wrapper.find('input[placeholder="Password"]').setValue('password123');
    await wrapper.find('button').trigger('click');
    expect(routerPush).toHaveBeenCalledWith('/dashboard/testuser');
  });
});
