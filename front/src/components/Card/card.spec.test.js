import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CardComponent from './card.component.vue'

describe('CardComponent', () => {
  it('renders the card with correct data', () => {
    const data = {
      id: '1',
      active: true,
      image: 'https://via.placeholder.com/150',
      name: 'Sample Name',
      code: '12345'
    }

    const wrapper = mount(CardComponent, {
      props: {
        data
      }
    })

    const card = wrapper.find('.card')
    expect(card.classes()).toContain('card--active')

    const header = wrapper.find('.card__header')
    expect(header.text()).toContain('1')
    expect(header.text()).toContain('Ativo')

    const img = wrapper.find('.card__img img')
    expect(img.attributes('src')).toBe(data.image)

    const content = wrapper.find('.card__content__text')
    expect(content.text()).toBe('Sample Name')

    const footer = wrapper.find('.card__footer__text')
    expect(footer.text()).toBe('Código: 12345')
  })

  it('emits cardAction event on click', async () => {
    const data = {
      id: '1',
      active: true,
      image: 'https://via.placeholder.com/150',
      name: 'Sample Name',
      code: '12345'
    }

    const wrapper = mount(CardComponent, {
      props: {
        data
      }
    })

    await wrapper.find('.card').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('cardAction')
    expect(wrapper.emitted('cardAction')[0]).toEqual([data])
  })
})