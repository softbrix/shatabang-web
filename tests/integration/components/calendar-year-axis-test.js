import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | calendar year axis', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{calendar-year-axis}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#calendar-year-axis}}
        template block text
      {{/calendar-year-axis}}
    `);

    assert.dom('*').hasText('template block text');
  });
});
