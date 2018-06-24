
const csrfToken = Cookies.get('csrftoken')
const requestHeader = {
  headers: {
    'X-CSRFToken': csrfToken
  }
}
axios.defaults.headers['X-CSRFToken'] = '{{ csrf_token }}';

var vm = new Vue({
  el: '#tasklist',
  delimiters: ['${', '}'],
  data: {
    api_url: '/api/taskitem/',
    items: [],
    currentItem: {},
    newItem: {'text': null},
    done_items: [],
  },
  mounted: function() {
    this.getItems();
  },
  methods: {
    getItems: function() {
      axios
        .get(this.api_url)
        .then((response) => {
          this.items = response.data;
        })
        .catch((err) => {
          consolo.log(err);
          consolo.log('called from tasklist');
        })
    },
    addItem: function() {
      axios
        .post(this.api_url, this.newItem, requestHeader)
        .then((response) => {
          this.getItems();
          this.newItem.text = null;
        })
        .catch((err) => {
          this.newItem.text = null;
          console.log(err);
        })
    },
    deleteItem: function(task_id) {
      let item;
      for(var i in this.items) {
        if(this.items[i].task_id === task_id) {
          item = this.items[i];
        }
      }
      axios
        .delete(this.api_url + task_id, requestHeader)
        .then((response) => {
          this.done_items.push(item);
          this.getItems();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
});
