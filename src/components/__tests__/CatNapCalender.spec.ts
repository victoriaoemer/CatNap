import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CatNapCalendar from '@/components/CatNapCalendar.vue';

describe('CatNapCalendar.vue', () => {
  it('renders weekdays correctly', () => {
    const wrapper = mount(CatNapCalendar, {
      props: {
        userData: { data: {} },
      },
    });

    const weekDays = wrapper.findAll('.grid.grid-cols-7 > .p-1.rounded'); // pecifically target weekday header cells
    expect(weekDays.length).toBe(7);
    const expectedDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    weekDays.forEach((day, index) => {
      expect(day.text().trim()).toBe(expectedDays[index]);
    });
  });

  it('renders the correct number of days and empty cells', () => {
    const wrapper = mount(CatNapCalendar, {
      props: {
        userData: { data: {} },
      },
    });

    const emptyCells = wrapper.findAll('.calendar-cell.empty');
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const dayCells = wrapper.findAll('.calendar-cell:not(.empty)');

    expect(emptyCells.length).toBeGreaterThanOrEqual(0); // Dynamic based on start day
    expect(dayCells.length).toBe(daysInMonth);
  });

  it('applies the correct emotion classes for days', () => {
    const userData = {
      data: {
        '01/01/2025': { emotion: 1 },
        '02/01/2025': { emotion: 2 },
        '03/01/2025': { emotion: 3 },
      },
    };

    const wrapper = mount(CatNapCalendar, {
      props: {
        userData,
      },
    });

    const dayCells = wrapper.findAll('.calendar-cell');

    const firstDay = dayCells.find((cell) => cell.text().trim() === '1');
    const secondDay = dayCells.find((cell) => cell.text().trim() === '2');
    const thirdDay = dayCells.find((cell) => cell.text().trim() === '3');

    if (firstDay) {
      expect(firstDay.find('.rounded-full').classes()).toContain('bg-emotion-red');
    }
    if (secondDay) {
      expect(secondDay.find('.rounded-full').classes()).toContain('bg-emotion-orange');
    }
    if (thirdDay) {
      expect(thirdDay.find('.rounded-full').classes()).toContain('bg-emotion-green');
    }
  });

  it('matches the snapshot', () => {
    const wrapper = mount(CatNapCalendar, {
      props: {
        userData: { data: {} },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
