import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import WelcomePage from '../screens/LoginPage.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(WelcomePage, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
