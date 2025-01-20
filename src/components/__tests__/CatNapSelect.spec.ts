import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CatNapSelect from '@/components/CatNapSelect.vue';

describe('CatNapSelect.vue', () => {
  it('renders placeholder and options correctly', () => {
    const wrapper = mount(CatNapSelect, {
      props: {
        modelValue: '',
        placeholder: 'Select an option...',
        options: ['Option 1', 'Option 2', 'Option 3'],
      },
    });

    const placeholder = wrapper.find('option:disabled');
    expect(placeholder.exists()).toBe(true);
    expect(placeholder.text()).toBe('Select an option...');

    const options = wrapper.findAll('option:not(:disabled)');
    expect(options.length).toBe(3);
    expect(options.map(o => o.text())).toEqual(['Option 1', 'Option 2', 'Option 3']);
  });

  it('binds v-model correctly and emits update event', async () => {
    const wrapper = mount(CatNapSelect, {
      props: {
        modelValue: '',
        options: ['Option 1', 'Option 2'],
      },
    });

    const select = wrapper.find('select');
    await select.setValue('Option 2');

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Option 2']);
  });

  it('renders correctly with no initial modelValue', () => {
    const wrapper = mount(CatNapSelect, {
      props: {
        modelValue: '',
        options: ['Option 1', 'Option 2'],
      },
    });

    const select = wrapper.find('select');
    expect(select.element.value).toBe('');
  });
});
