import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import DatatableComponent from './datatable.component.vue'
import moment from 'moment'

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
]

describe('DatatableComponent', () => {
  it('renders datatable with correct columns and list', () => {
    const wrapper = mount(DatatableComponent, {
      props: {
        columns,
        list
      }
    })

    const headerComponent = wrapper.findComponent({ name: 'datatableHeaderComponent' })
    expect(headerComponent.exists()).toBe(true)
    expect(headerComponent.props('columns')).toEqual(columns)

    const contentComponent = wrapper.findComponent({ name: 'datatableContentComponent' })
    expect(contentComponent.exists()).toBe(true)
    expect(contentComponent.props('columns')).toEqual(columns)
    expect(contentComponent.props('list')).toEqual(list)
  })

  it('renders the correct data in the table', () => {
    const wrapper = mount(DatatableComponent, {
      props: {
        columns,
        list
      }
    })

    const rows = wrapper.findAll('.datatable__content__rows')
    expect(rows.length).toBe(list.length)

    rows.forEach((row, index) => {
      const cells = row.findAll('.datatable__column')
      expect(cells[0].text()).toBe(`${columns[0].label}: ${list[index].id.toString()}`)
      expect(cells[1].text()).toBe(`${columns[1].label}: ${list[index].employeeId}` )
      expect(cells[2].text()).toBe(`${columns[2].label}: ${list[index].employee.name}` )
      expect(cells[3].text()).toBe(`${columns[3].label}: ${moment(new Date(list[index].startDate.replace(' ', 'T'))).format('DD/MM/YYYY hh:mm:ss')}` )
      expect(cells[4].text()).toBe(`${columns[4].label}: ${moment(new Date(list[index].endDate.replace(' ', 'T'))).format('DD/MM/YYYY hh:mm:ss')}` )
      expect(cells[5].text()).toBe(`${columns[5].label}: ${list[index].totalHours.toString()}` )
    })
  })
})