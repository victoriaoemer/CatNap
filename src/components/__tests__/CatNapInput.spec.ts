import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CatNapInput from '@/components/CatNapInput.vue';

describe('CatNapInput.vue', () => {
  it('renders the correct placeholder and type', () => {
    const wrapper = mount(CatNapInput, {
      props: {
        modelValue: '',
        placeholder: 'Enter text...',
        type: 'password',
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe('Enter text...');
    expect(input.attributes('type')).toBe('password');
  });

  it('binds v-model correctly', async () => {
    const wrapper = mount(CatNapInput, {
      props: {
        modelValue: '',
      },
    });

    const input = wrapper.find('input');
    await input.setValue('test value');

    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['test value']);
  });

  it('applies the correct classes when settings is true', () => {
    const wrapper = mount(CatNapInput, {
      props: {
        modelValue: '',
        settings: true,
      },
    });

    expect(wrapper.find('div').classes()).toContain('bg-[#3B32AB]');
    expect(wrapper.find('div').classes()).toContain('border-[#3E2FE9]');
  });

  it('applies the correct classes when settings is false', () => {
    const wrapper = mount(CatNapInput, {
      props: {
        modelValue: '',
        settings: false,
      },
    });

    expect(wrapper.find('div').classes()).toContain('gradient-border-bottom');
  });

  it('matches the snapshot', () => {
    const wrapper = mount(CatNapInput, {
      props: {
        modelValue: '',
        placeholder: 'Enter text...',
        type: 'password',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
