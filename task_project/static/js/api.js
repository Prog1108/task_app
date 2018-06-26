
const csrfToken = Cookies.get('csrftoken');
const requestHeader = {
  headers: {
    'X-CSRFToken': csrfToken
  }
};

/*
  APIリクエスト処理

  リクエストは、GET,POST,DELETE, PUT
  アクセスするAPIはTaskItem
*/
var vm = new Vue({
  el: '#tasklist',
  delimiters: ['${', '}'],
  data: {
    itemApiUrl: '/api/taskitem/',
    items: [],
    checkedItems: [],
    newItem: {'text': null},
  },
  mounted: function() {
    this.getItems();
  },
  methods: {
    getItems: function() {
      this.items = [];
      this.checkedItems = [];
      axios
        .get(this.itemApiUrl)
        .then((response) => {
          for(var item in response.data) {
            if(response.data[item].checked === false) {
              this.items.push(response.data[item]);
            }else {
              this.checkedItems.push(response.data[item]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
    },
    addItem: function() {
      axios
        .post(this.itemApiUrl, this.newItem, requestHeader)
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
      axios
        .delete(this.itemApiUrl + task_id, requestHeader)
        .then((response) => {
          this.getItems();
        })
        .catch((err) => {
          console.log(err);
        })
    },
    deleteAllItem: function() {
      for(var i = 0; i < this.checkedItems.length; i++) {
        this.deleteItem(this.checkedItems[i].task_id);
      }
      $('#deleteAllModal').modal('hide');
    },
    checkItem: function(taskItem, checked) {
      axios
        .patch(this.itemApiUrl + taskItem.task_id + '/', {'checked': checked}, requestHeader)
        .then((response) => {
          this.getItems();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
});
