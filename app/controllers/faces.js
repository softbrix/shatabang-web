import Controller from '@ember/controller';
import { debug } from '@ember/debug';

export default Controller.extend({
  addingPerson: false,
  selectedElement: undefined,
  selectedFace: undefined,
  actions: {
    addPerson() {
      var isAddingPerson = this.addingPerson;
      if(isAddingPerson) {
        if(!this.selectedFace) {
          this.set('highlightSelectFace', true);
          return;
        }
        var person = this.store.createRecord('person', {
          name: this.newPersonName,
          thumbnail: this.get('selectedFace.b')
        });
        return person.save().then(() => {
          this.resetSelectedFace();
          this.set('addingPerson', false);
          this.set('newPersonName', '');
        }, (error) => {
          this.set('addPersonError', error);
        });
      }
      this.set('addingPerson', !isAddingPerson);
    },
    cancelAddPerson() {
      this.resetSelectedFace();
      this.set('addingPerson', false);
    },
    imageClicked(face, event) {
      if(this.addingPerson) {
        this.resetSelectedFace();
        this.set('selectedFace', face);
      } else {
        // TODO: Lookup media
        debug(JSON.stringify(face));
        debug(JSON.stringify(event));
        this.set('activeMedia', face);
      }
    },
    personClicked(person) {
      debug(person);
    }
  },
  resetSelectedFace() {
    this.set('highlightSelectFace', false);
    this.set('selectedFace', undefined);
  }
});
