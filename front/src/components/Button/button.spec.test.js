import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ButtonComponent from './button.component.vue'

describe('ButtonComponent', () => {
  it('renders the button with correct props', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        id: 'test-button',
        type: 'submit',
        color: 'primary',
        label: 'Click Me'
      }
    })

    expect(wrapper.find('button').attributes('id')).toBe('test-button')
    expect(wrapper.find('button').attributes('type')).toBe('submit')
    expect(wrapper.find('button').classes()).toContain('primary')
    expect(wrapper.find('button').text()).toBe('Click Me')
  })

  it('emits buttonAction event on click', async () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        id: 'test-button',
        type: 'submit',
        variantColor: 'primary',
        label: 'Click Me'
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('buttonAction')
  })
})