import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CatNapDreamEntries from '@/components/CatNapDreamEntries.vue';

describe('CatNapDreamEntries.vue', () => {
  const dreams: [string, { title: string; content: string; emotion: number; }][] = [
    ['2025-01-01', { title: 'Dream 1', content: 'Content 1', emotion: 1 }],
    ['2025-01-02', { title: 'Dream 2', content: 'Content 2', emotion: 3 }],
  ];

  it('displays dream entries in reverse order', () => {
    const wrapper = mount(CatNapDreamEntries, {
      props: { dreams },
    });
    const titles = wrapper.findAll('.title').map((el) => el.text());
    expect(titles).toEqual(['Dream 2', 'Dream 1']);
  });

  it('shows the correct emotion badge', () => {
    const wrapper = mount(CatNapDreamEntries, {
      props: { dreams },
    });
    const badges = wrapper.findAll('.bg-emotion-green');
    expect(badges.length).toBe(1);
  });
});
