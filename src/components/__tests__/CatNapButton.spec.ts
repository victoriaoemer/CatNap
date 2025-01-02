import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Button from '@/components/CatNapButton.vue';

describe('CatNapButton.vue', () => {
  it('renders a filled button with the correct text', () => {
    const wrapper = mount(Button, {
      props: {
        text: 'Click Me',
        type: 'filled',
      },
    });

    // controls if the filled button is rendered
    const button = wrapper.find('button.gradient-bg');
    expect(button.exists()).toBe(true);

    // controls if the text is rendered correctly
    expect(button.text()).toBe('Click Me');
  });

  it('renders an outline button with the correct text', () => {
    const wrapper = mount(Button, {
      props: {
        text: 'Outline Button',
        type: 'outline',
      },
    });

    // controls if the outline button is rendered
    const button = wrapper.find('button.border');
    expect(button.exists()).toBe(true);

    // controls if the text is rendered correctly
    expect(button.text()).toBe('Outline Button');
  });

  it('does not render any button if type is invalid', () => {
    const wrapper = mount(Button, {
      props: {
        text: 'Invalid Button',
        type: 'invalid',
      },
    });

    // controls if the button is not rendered
    expect(wrapper.find('button').exists()).toBe(false);
  });

  // snapshot testing
  it('matches snapshot for filled button', () => {
    const wrapper = mount(Button, {
      props: {
        text: 'Snapshot Button',
        type: 'filled',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches snapshot for outline button', () => {
    const wrapper = mount(Button, {
      props: {
        text: 'Snapshot Button',
        type: 'outline',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
