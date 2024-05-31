import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import { describe, it, expect, beforeEach } from 'vitest';
import moment from 'moment';

import BulletinsView from './BulletinsView.vue';

import CardComponent from '../../components/Card/card.component.vue';
import DatatableComponent from '../../components/Datatable/datatable.component.vue';

import BulletinsFilter from '../../filters/bulletins.filter.vue';

const columns = [
  { label: 'Id', width: '10%', key: 'id' },
  { label: 'Id Funcionário', width: '10%', key: 'employeeId' },
  { label: 'Nome', width: '10%', key: 'employee', data: (e) => e.name },
  { label: 'Início', width: '20%', key: 'startDate', data: (d) => moment(new Date(d.replace(' ', 'T'))).format('DD/MM/YYYY hh:mm:ss') },
  { label: 'Fim', width: '20%', key: 'endDate', data: (d) => moment(new Date(d.replace(' ', 'T'))).format('DD/MM/YYYY hh:mm:ss') },
  { label: 'Total em Horas', width: '20%', key: 'totalHours' },
  {
    label: 'Ver apontamentos', width: '20%', key: 'appointments', actions: [
      { label: 'Ver Apontamento', buttonAction: () => {} }
    ]
  }
]

const list = [
  { id: 1, employeeId: 'E1', employee: { name: 'John Doe' }, startDate: '2024-05-30 10:00:00', endDate: '2024-05-30 18:00:00', totalHours: 8, appointments: [] },
  { id: 2, employeeId: 'E2', employee: { name: 'Jane Smith' }, startDate: '2024-06-15 08:00:00', endDate: '2024-06-15 16:00:00', totalHours: 8, appointments: [] }
];

const employee = {
  id: '1',
  active: true,
  image: 'https://via.placeholder.com/150',
  name: 'Sample Name',
  code: '12345'
};

describe('Bulletin View', () => {

  let store;
  let router;

  beforeEach(() => {
    store = createStore({
      state() {
        return {
          bulletins: []
        };
      }
    });

    router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes: [
        {path: '/'}
      ]
    })
  });

  it('If Bulletins view recieves the correct title', () => {
    const wrapper = mount(BulletinsView, {
      global: {
        plugins: [store, router]
      },
    });
    const title = wrapper.findComponent({name: 'titleComponent'});
    expect(title.text()).toEqual('Boletins')
  });

  it('If Bulletins view contain the correct fields', async () => {
    const wrapper = mount(BulletinsView, {
      global: {
        plugins: [store, router]
      },
    });

    const filter = mount(BulletinsFilter, {
      global: {
        plugins: [store, router]
      },
    });

    const inputs = filter.findAll('input');
    const button = filter.find('button');

    expect(inputs.length).toEqual(2);
    expect(inputs[0].attributes('name')).toBe('employeeName');
    expect(inputs[1].attributes('name')).toBe('totalHours');
    expect(button.text()).toEqual('Filtrar');

  });

  it('If Bulletins view recieve the data and render the data correctly', () => {
    const wrapper = mount(BulletinsView, {
      props: {
      },
      global: {
        plugins: [store, router]
      }
    });

    const datatableWrapper = mount(DatatableComponent, {
      props:{
        list,
        columns
      }
    });

    const headerComponent = datatableWrapper.findComponent({ name: 'datatableHeaderComponent', props: { columns } });
    const contentComponent = datatableWrapper.findComponent({ name: 'datatableContentComponent', props: { columns, list } });

    expect(headerComponent.exists()).toBe(true);
    expect(contentComponent.exists()).toBe(true);

    const headerColumns = headerComponent.props('columns');
    const contentColumns = contentComponent.props('columns');

    columns.forEach((column, index) => {
      const col = headerColumns.find((headerColumn) => headerColumn.label === column.label);
      expect(col.label).toEqual(columns[index].label);
    });

    columns.forEach((column, index) => {
      const col = contentColumns.find((contentColumn) => contentColumn.label === column.label);
      expect(col.label).toEqual(columns[index].label);
    });

    const rows = datatableWrapper.findAll('.datatable__content__rows');
    expect(rows.length).toBe(list.length);

    rows.forEach((row, index) => {
      const cells = row.findAll('.datatable__column')
      expect(cells[0].text()).toBe(`${columns[0].label}: ${list[index].id.toString()}`)
      expect(cells[1].text()).toBe(`${columns[1].label}: ${list[index].employeeId}` )
      expect(cells[2].text()).toBe(`${columns[2].label}: ${list[index].employee.name}` )
      expect(cells[3].text()).toBe(`${columns[3].label}: ${moment(new Date(list[index].startDate.replace(' ', 'T'))).format('DD/MM/YYYY hh:mm:ss')}` )
      expect(cells[4].text()).toBe(`${columns[4].label}: ${moment(new Date(list[index].endDate.replace(' ', 'T'))).format('DD/MM/YYYY hh:mm:ss')}` )
      expect(cells[5].text()).toBe(`${columns[5].label}: ${list[index].totalHours.toString()}` )
    });
  });

  it('If Bulletins view has the employee card', () => {
    const wrapper = mount(BulletinsView, {
      props: {},
      global: {
        plugins: [store, router]
      }
    });

    const employeeCard = mount(CardComponent, {
      props: {
        data: employee
      }
    });

    const employeeCardHeader = employeeCard.find('.card__header');
    expect(employeeCardHeader.text()).toContain('1');
    expect(employeeCardHeader.text()).toContain('Ativo');

    const employeeCardImg = employeeCard.find('.card__img img');
    expect(employeeCardImg.attributes('src')).toBe(employee.image);

    const employeeCardContent = employeeCard.find('.card__content__text');
    expect(employeeCardContent.text()).toBe('Sample Name');

    const employeeCardFooter = employeeCard.find('.card__footer__text');
    expect(employeeCardFooter.text()).toBe('Código: 12345');

  })

})