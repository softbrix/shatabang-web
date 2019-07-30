import fetch from 'fetch';
import Controller from '@ember/controller';
import { debug } from '@ember/debug';

export default Controller.extend({
  addingPerson: false,
  selectedElement: undefined,
  selectedFace: undefined,
  selectedFaceIndex: undefined,
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
          this.removeSelectedFace();
          this.set('addingPerson', false);
          this.set('newPersonName', '');
        }, (error) => {
          this.set('addPersonError', error);
        });
      }
      this.set('addingPerson', !isAddingPerson);
    },
    confirmDelete: function(face, event) {
      if(event) {
        event.preventDefault();
      }
      this.set('selectedFace', face);
      this.set('selectedFace.deleting', true);
      let confirmed = window.confirm('Do you really want to delete this media file?');
      if(confirmed) {
        fetch('./api/faces/'+face.b, {
          method: 'delete',
          credentials: 'include'
        }).then(() => {
          this.removeSelectedFace();
        });
      }
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
  removeSelectedFace() {
    this.set('selectedFace.removed', true);
    this.resetSelectedFace();
  },
  resetSelectedFace() {
    this.set('highlightSelectFace', false);
    this.set('selectedFace', undefined);
  }
});
