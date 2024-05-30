import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { describe, it, expect, beforeEach } from 'vitest';
import AppointmentsModal from './appointments.modal.vue';
import CardComponent from '../components/Card/card.component.vue';
import DatatableComponent from '../components/Datatable/datatable.component.vue';
import moment from 'moment';

const columns = [
  { label: 'Id', width: '10%', key: 'id' },
  { label: 'Cor', width: '10%', key: 'color', isElement: true, element: (e) => `<div class="appointments__modal__content__datatable__color" style="background: ${e}"></div>` },
  { label: 'Código', width: '10%', key: 'code' },
  { label: 'Descrição', width: '50%', key: 'description' },
  { label: 'Data', width: '20%', key: 'date', data: (d) => moment(new Date(d.replace(' ', 'T'))).format('DD/MM/YYYY hh:mm:ss') },
];

const list = [
  { id: 1, color: '#ff0000', code: 'A1', description: 'Item 1', date: '2024-05-30 10:00:00' },
  { id: 2, color: '#00ff00', code: 'B2', description: 'Item 2', date: '2024-06-15 12:00:00' }
];

const employee = {
  id: '1',
  active: true,
  image: 'https://via.placeholder.com/150',
  name: 'Sample Name',
  code: '12345'
}

describe('Appointments modal', () => {

  let store;

  beforeEach(() => {
    store = createStore({
      state() {
        return {
          appointments: list
        };
      }
    });
  });

  it('Appointment Datatable', () => {
    const wrapper = mount(AppointmentsModal, {
      props: {
        modalData: {
          employeeId: 1,
        }
      },
      global: {
        plugins: [store]
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

    columns.forEach((column) => {
      const col = headerColumns.find((headerColumn) => headerColumn.label === column.label);
      expect(col.label).toEqual(column.label)
    });

    columns.forEach((column) => {
      const col = contentColumns.find((contentColumn) => contentColumn.label === column.label);
      expect(col.label).toEqual(column.label)
    });

    const rows = wrapper.findAll('.datatable__content__rows')
    expect(rows.length).toBe(list.length)

    rows.forEach((row, index) => {
      const cells = row.findAll('.datatable__column')
      expect(cells[0].text()).toBe(`${columns[0].label}: ${list[index].id.toString()}`)
      expect(cells[1].html().includes(`${columns[1].label}`)).toBe(true)
      expect(cells[2].text()).toBe(`${columns[2].label}: ${list[index].code}`)
      expect(cells[3].text()).toBe(`${columns[3].label}: ${list[index].description}`)
      expect(cells[4].text()).toBe(`${columns[4].label}: ${moment(new Date(list[index].date.replace(' ', 'T'))).format('DD/MM/YYYY hh:mm:ss')}`)
    })

  });

  it('Appointment Card', () => {
    const wrapper = mount(AppointmentsModal, {
      props: {
        modalData: {
          employeeId: 1,
        },
      },
      global: {
        plugins: [store]
      }
    });

    const employeeCard = mount(CardComponent, {
      props: {
        data: employee
      }
    });

    const employeeCardHeader = employeeCard.find('.card__header');
    expect(employeeCardHeader.text()).toContain('1')
    expect(employeeCardHeader.text()).toContain('Ativo')

    const employeeCardImg = employeeCard.find('.card__img img')
    expect(employeeCardImg.attributes('src')).toBe(employee.image)

    const employeeCardContent = employeeCard.find('.card__content__text')
    expect(employeeCardContent.text()).toBe('Sample Name')

    const employeeCardFooter = employeeCard.find('.card__footer__text')
    expect(employeeCardFooter.text()).toBe('Código: 12345')

  })
});