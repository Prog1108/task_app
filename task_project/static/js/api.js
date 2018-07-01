
const csrfToken = Cookies.get('csrftoken');
const requestHeader = {
  headers: {
    'X-CSRFToken': csrfToken
  }
};

/*
  APIリクエスト処理

  リクエストは、GET,POST,DELETE, PATCH
  アクセスするAPIはTaskItem
*/
var vm = new Vue({
  el: '#tasklist',
  delimiters: ['${', '}'],
  data: {
    itemApiUrl: '/api/taskitem/',
    items: [],
    newItem: {'text': null},
    loading: false,
    errMsg: false,
  },
  mounted: function() {
    this.getItems();
  },
  methods: {
    getItems: function() {
      this.loading = true;
      axios
        .get(this.itemApiUrl)
        .then((response) => {
          this.items = response.data;
          this.loading = false;
          this.errMsg = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.errMsg = false;
        })
    },
    addItem: function() {
      this.loading = true;
      for(var i = 0; i < this.items.length; i++) {
        if(this.newItem.text === this.items[i].text) {
          this.newItem.text = null;
          this.loading = false;
          this.errMsg = true;
          return false;
        }
      }
      axios
        .post(this.itemApiUrl, this.newItem, requestHeader)
        .then((response) => {
          this.getItems();
          this.newItem.text = null;
          this.loading = false;
        })
        .catch((err) => {
          this.newItem.text = null;
          console.log(err);
          this.loading = false;
        })
    },
    deleteItem: function(task_id) {
      this.loading = true;
      axios
        .delete(this.itemApiUrl + task_id + '/', requestHeader)
        .then((response) => {
          this.getItems();
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        })
    },
    checkItem: function(taskItem, checked) {
      this.loading = true;
      axios
        .patch(this.itemApiUrl + taskItem.task_id + '/', {'checked': checked}, requestHeader)
        .then((response) => {
          this.getItems();
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        })
    }
  }
});
