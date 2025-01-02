import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SignUpPage from '@/components/screens/SignUpPage.vue';

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
    getUsers: vi.fn().mockResolvedValue([{ username: 'testuser' }]),
    createUser: vi.fn(),
    createUserData: vi.fn(),
  })),
}));

describe('SignUpPage.vue', () => {
  it('shows an error for duplicate username', async () => {
    const wrapper = mount(SignUpPage);

    // Set duplicate username
    await wrapper.find('input[placeholder="First Name"]').setValue('John');
    await wrapper.find('input[placeholder="Last Name"]').setValue('Doe');
    await wrapper.find('input[placeholder="Username"]').setValue('testuser');
    await wrapper.find('input[placeholder="Password"]').setValue('password123');
    await wrapper.find('button').trigger('click');
    expect(wrapper.text()).toContain('Username already exists');
  });

  it('shows an error when fields are empty', async () => {
    const wrapper = mount(SignUpPage);

    // Missing last name
    await wrapper.find('input[placeholder="First Name"]').setValue('John');
    await wrapper.find('input[placeholder="Username"]').setValue('testuser');
    await wrapper.find('input[placeholder="Password"]').setValue('password123');
    await wrapper.find('button').trigger('click');
    expect(wrapper.text()).toContain('Please fill out all fields');
  });

  it('redirects on successful sign-up', async () => {
    const wrapper = mount(SignUpPage);

    // Fill in valid user details
    await wrapper.find('input[placeholder="First Name"]').setValue('Jane');
    await wrapper.find('input[placeholder="Last Name"]').setValue('Doe');
    await wrapper.find('input[placeholder="Username"]').setValue('janedoe');
    await wrapper.find('input[placeholder="Password"]').setValue('password123');
    await wrapper.find('button').trigger('click');
    expect(routerPush).toHaveBeenCalledWith('/'); // redirects to login
    expect(routerPush).toHaveBeenCalledTimes(1);
  });
});
