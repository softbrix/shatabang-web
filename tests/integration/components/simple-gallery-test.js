import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | simple gallery', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{simple-gallery}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#simple-gallery}}
        template block text
      {{/simple-gallery}}
    `);

    assert.dom('*').hasText('template block text');
  });
});
