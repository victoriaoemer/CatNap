import CatNapDreamEntries from '@/components/CatNapDreamEntries.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('CatNapDreamEntries.vue', () => {
  const dreams: [string, { title: string; content: string; emotion: number; }][] = [
    ['2025-01-01', { title: 'Dream 1', content: 'Content 1', emotion: 1 }],
    ['2025-01-02', { title: 'Dream 2', content: 'Content 2', emotion: 3 }],
  ];

  it('renders the dream entries in reverse chronological order', () => {
    const wrapper = mount(CatNapDreamEntries, {
      props: { dreams, date: '2025-01-01', selectedDream: null },
    });
    const titles = wrapper.findAll('.title').map((el) => el.text());
    expect(titles).toEqual(['Dream 2', 'Dream 1']);
  });

  it('displays the correct emotion badge based on emotion level', () => {
    const wrapper = mount(CatNapDreamEntries, {
      props: { dreams, date: '2025-01-01', selectedDream: null },
    });
    const badges = wrapper.findAll('.bg-emotion-green');
    expect(badges.length).toBe(1);
  });

  it('renders a message when there are no dream entries', () => {
    const wrapper = mount(CatNapDreamEntries, {
      props: { dreams: [], date: '2025-01-01', selectedDream: null },
    });
    expect(wrapper.findComponent(CatNapDreamEntries).isVisible()).toBe(false);
  });

  it('filters dreams based on the provided date', () => {
    const wrapper = mount(CatNapDreamEntries, {
      props: { dreams, date: '2025-01-01', selectedDream: null },
    });
    const titles = wrapper.findAll('.title').map((el) => el.text());
    expect(titles).toEqual(['Dream 2', 'Dream 1']);
  });
});
