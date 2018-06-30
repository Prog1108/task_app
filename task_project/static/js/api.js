
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
      axios
        .get(this.itemApiUrl)
        .then((response) => {
          this.items.length = 0;
          this.checkedItems.length = 0;
          dataList = response.data;
          for(var item in dataList) {
            if(dataList[item].checked === false) {
              this.items.push(dataList[item]);
            }else {
              this.checkedItems.push(dataList[item]);
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
