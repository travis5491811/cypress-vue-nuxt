/* eslint-disable import/no-absolute-path */
// import '/node_modules/bootstrap-vue/dist/bootstrap-vue.css'
import '/assets/css/main.scss'
import '/assets/css/formStyles.scss'
import '/components/Logo.css'

import { mount } from '@cypress/vue'
import { BRow, BCol, BFormInput, BButton } from 'bootstrap-vue'
import Logo from './Logo.vue'

describe('<Logo />', () => {
  it('contains an svg', () => {
    mount(Logo, {
      stubs: {
        // used to register custom or third-party components
        'b-form-input': BFormInput,
        'b-row': BRow,
        'b-col': BCol,
        'b-button': BButton,
      },
    })
    cy.get('svg').should('be.visible')
  })
})
