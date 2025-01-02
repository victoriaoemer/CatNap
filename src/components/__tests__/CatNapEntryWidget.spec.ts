import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import CatNapEntryWidget from '@/components/CatNapEntryWidget.vue';

describe('CatNapEntryWidget.vue', () => {
  it('renders the add entry form and dream entries', () => {
    const wrapper = mount(CatNapEntryWidget, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              user: {
                username: 'testuser',
                data: {
                  '2025-01-01': {
                    title: 'Test Dream',
                    content: 'Test content',
                    emotion: 2,
                  },
                },
              },
            },
            createSpy: vi.fn,
          }),
        ],
      },
      props: {
        userData: {
          data: [{ title: 'Test Dream', content: 'Test content', emotion: 2 }],
          username: 'testuser',
          settings: {
            themeQuote: '',
            themeImage: '',
            profilePicture: 0,
          },
        },
      },
    });

    expect(wrapper.text()).toContain('Your Dream Diary');
    expect(wrapper.findComponent({ name: 'CatNapAddEntry' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'CatNapDreamEntries' }).exists()).toBe(true);
  });
});
