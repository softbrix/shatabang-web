import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | faces', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:faces');
    assert.ok(route);
  });
});
