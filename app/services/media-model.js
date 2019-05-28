import fetch from 'fetch';
import Service from '@ember/service';

export default Service.extend({
  deleteMedia(realtivePath) {
    return fetch( './api/images/delete', {
      method: 'post',
      headers: {
        'Content-Type': "application/json; charset=utf-8"
      },
      body: JSON.stringify([realtivePath])
    });
  }
});
