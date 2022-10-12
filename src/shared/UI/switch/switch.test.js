/**
 *  @vitest-environment happy-dom
 */

import { it, describe, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VSwitch from './VSwitch.vue';

describe('VSwitch Test', () => {
  it('should render', () => {
    const wrapper = mount(VSwitch);

    expect(wrapper.find('input[type=checkbox]').exists()).toBeTruthy();

    expect(wrapper.find('span').exists()).toBeTruthy();
  });

  it('should change state', async () => {
    const wrapper = mount({
      data() {
        return {
          checked: false
        };
      },
      template: '<v-switch v-model:checked="checked" />',
      components: { 'v-switch': VSwitch }
    });

    const currencySwitch = wrapper.find('input[type=checkbox]');

    await currencySwitch.setValue();
    expect(wrapper.vm.checked).toEqual(true);
  });
});
