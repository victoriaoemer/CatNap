import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import CatNapAddEntry from '@/components/CatNapAddEntry.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';

// Mock Router
const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe('CatNapAddEntry.vue', () => {
  it('renders correctly and updates title and content', async () => {
    const wrapper = mount(CatNapAddEntry, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      props: { large: true },
    });

    const titleInput = wrapper.find('input[type="text"]');
    const contentTextarea = wrapper.find('textarea');

    await titleInput.setValue('Dream Title');
    await contentTextarea.setValue('This is a dream description.');

    expect((titleInput.element as HTMLInputElement).value).toBe('Dream Title');
    expect(contentTextarea.element.value).toBe('This is a dream description.');
  });

  it('allows selecting an emotion', async () => {
    const wrapper = mount(CatNapAddEntry, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      props: { large: true },
    });

    const happyButton = wrapper.find('button.bg-emotion-green');
    await happyButton.trigger('click');

    expect((happyButton.element as HTMLButtonElement).classList.contains('bg-emotion-green')).toBe(true);
  });

  it('shows an error message when fields are incomplete', async () => {
    const wrapper = mount(CatNapAddEntry, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      props: { large: true },
    });

    const addButton = wrapper.find('img[alt="Add"]');
    await addButton.trigger('click');

    expect(wrapper.find('.text-red-500').text()).toBe('Please fill out all fields');
  });

  it('clears the error message when input is provided', async () => {
    const wrapper = mount(CatNapAddEntry, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      props: { large: true },
    });

    const addButton = wrapper.find('img[alt="Add"]');
    await addButton.trigger('click');

    const titleInput = wrapper.find('input[type="text"]');
    await titleInput.setValue('Dream Title');

    expect(wrapper.find('.text-red-500').exists()).toBe(false);
  });
});
