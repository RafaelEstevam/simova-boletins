import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import { describe, it, expect, beforeEach } from 'vitest';

import EmployeesView from './EmployeesView.vue';
import EmployeesFilter from '../../filters/employees.filter.vue';

const employees = [
  {
    id: '1',
    active: true,
    image: 'https://via.placeholder.com/150',
    name: 'Sample Name 1',
    code: '12345'
  },
  {
    id: '2',
    active: true,
    image: 'https://via.placeholder.com/150',
    name: 'Sample Name 2',
    code: '12345'
  }
]

describe('Employee View', () => {

  let store;
  let router;

  beforeEach(() => {
    store = createStore({
      state() {
        return {
          employees: employees
        };
      }
    });

    router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes: [
        { path: '/' }
      ]
    })
  });

  it('If Employees view recieves the correct title', () => {
    const wrapper = mount(EmployeesView, {
      global: {
        plugins: [store, router]
      },
    });
    const title = wrapper.findComponent({ name: 'titleComponent' });
    expect(title.text()).toEqual('Funcionários')
  });

  it('If Employees view contain the correct fields', async () => {
    const wrapper = mount(EmployeesView, {
      global: {
        plugins: [store, router]
      },
    });

    const filter = mount(EmployeesFilter, {
      global: {
        plugins: [store, router]
      },
    });

    const inputs = filter.findAll('input');
    const selects = filter.findAll('select');
    const button = filter.find('button');

    expect(inputs.length).toEqual(1);
    expect(selects.length).toEqual(1);
    expect(inputs[0].attributes('name')).toBe('employeeName');
    expect(selects[0].attributes('name')).toBe('employeeActive');
    expect(button.text()).toEqual('Filtrar');

  });

  it('If Employees view render a list of cards', async () => {
    const wrapper = mount(EmployeesView, {
      global: {
        plugins: [store, router]
      },
    });

    const employeesCards = wrapper.findAllComponents({ name: 'cardComponent' });

    employees.forEach((employee, index) => {
      const employeeCard = employeesCards[index];

      expect(employeeCard.classes()).toContain('card--active')

      const header = employeeCard.find('.card__header')
      expect(header.text()).toContain(employees[index].id)
      expect(header.text()).toContain('Ativo')

      const img = employeeCard.find('.card__img img')
      expect(img.attributes('src')).toBe(employees[index].image)

      const content = employeeCard.find('.card__content__text')
      expect(content.text()).toBe(employees[index].name)

      const footer = employeeCard.find('.card__footer__text')
      expect(footer.text()).toBe(`Código: ${employees[index].code}`)

    });

  })

})