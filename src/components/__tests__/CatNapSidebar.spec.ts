import { describe, it, expect } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import CatNapSidebar from '@/components/CatNapSidebar.vue';

describe('CatNapSidebar.vue', () => {
  it('renders navigation links with correct paths', () => {
    const wrapper = mount(CatNapSidebar, {
      props: {
        user: 'testUser',
        mobile: false,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links.length).toBe(3);
    expect(links[0].props('to')).toBe('/dashboard/testUser');
    expect(links[1].props('to')).toBe('/add-entry/testUser');
    expect(links[2].props('to')).toBe('/settings/testUser');
  });

  it('applies correct classes when mobile is true', () => {
    const wrapper = mount(CatNapSidebar, {
      props: {
        user: 'testUser',
        mobile: true,
      },
    });

    const aside = wrapper.find('aside');
    expect(aside.classes()).toContain('absolute');
    expect(aside.classes()).toContain('h-screen');
    expect(aside.classes()).toContain('top-0');
    expect(aside.classes()).toContain('left-0');
    expect(aside.classes()).toContain('rounded-l-none');
  });

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(CatNapSidebar, {
      props: {
        user: 'testUser',
        mobile: true,
      },
    });

    const closeButton = wrapper.find('div > img[alt="Close"]');
    await closeButton.trigger('click');

    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.emitted().close.length).toBe(1);
  });

  it('does not render close button when mobile is false', () => {
    const wrapper = mount(CatNapSidebar, {
      props: {
        user: 'testUser',
        mobile: false,
      },
    });

    const closeButton = wrapper.find('div > img[alt="Close"]');
    expect(closeButton.exists()).toBe(false);
  });
});
