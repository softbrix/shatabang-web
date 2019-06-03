import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | scroll almost down', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:scroll-almost-down');
    assert.ok(service);
  });
});
