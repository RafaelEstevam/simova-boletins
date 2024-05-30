import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import InputComponent from './input.component.vue'

describe('InputComponent', () => {
  it('renders correctly with required props', () => {
    const wrapper = mount(InputComponent, {
      props: {
        inputName: 'test-input'
      }
    })
    
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('name')).toBe('test-input')
    expect(input.attributes('id')).toBe('test-input')
  })

  it('renders with correct attributes', () => {
    const wrapper = mount(InputComponent, {
      props: {
        inputName: 'test-input',
        placeholder: 'Enter text',
        type: 'password',
        required: true
      }
    })
    
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Enter text')
    expect(input.attributes('type')).toBe('password')
    expect(input.attributes('required')).toBeDefined()
  })

  it('emits update:modelValue event on input', async () => {
    const wrapper = mount(InputComponent, {
      props: {
        inputName: 'test-input'
      }
    })

    const input = wrapper.find('input')
    await input.setValue('new value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new value'])
  })
  
})