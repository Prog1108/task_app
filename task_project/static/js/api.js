
const csrfToken = Cookies.get('csrftoken');
const requestHeader = {
  headers: {
    'X-CSRFToken': csrfToken
  }
};

/*
  APIリクエスト処理

  リクエストは、GET,POST,DELETE
  アクセスするAPIはTaskItem, TaskItemDone
*/
var vm = new Vue({
  el: '#tasklist',
  delimiters: ['${', '}'],
  data: {
    itemApiUrl: '/api/taskitem/',
    doneItemApiUrl: '/api/taskitemdone/',
    items: [],
    doneItems: [],
    currentItem: {},
    newItem: {'text': null},
    newDoneItem: {'text': null},
  },
  mounted: function() {
    this.getItems();
    this.getDoneItems();
  },
  methods: {
    getItems: function() {
      axios
        .get(this.itemApiUrl)
        .then((response) => {
          this.items = response.data;
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
    addNewItem: function(task_text) {
      this.newItem.text = task_text;
      this.addItem();
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
    getDoneItems: function() {
      axios
        .get(this.doneItemApiUrl)
        .then((response) => {
          this.doneItems = response.data;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    addDoneItem: function(task_text) {
      this.newDoneItem.text = task_text;
      axios
        .post(this.doneItemApiUrl, this.newDoneItem, requestHeader)
        .then((response) => {
          this.getDoneItems();
          this.newDoneItem.text = null;
        })
        .catch((err) => {
          this.newDoneItem.text = null;
          console.log(err);
        })
    },
    deleteDoneItem: function(done_task_id) {
      axios
        .delete(this.doneItemApiUrl + done_task_id, requestHeader)
        .then((response) => {
          this.getDoneItems();
        })
        .catch((err) => {
          console.log(err);
        })
    },
    deleteAllDoneItem: function() {
      for(var i = 0; i < this.doneItems.length; i++) {
        this.deleteDoneItem(this.doneItems[i].task_id);
      }
      $('#deleteAllModal').modal('hide');
    },
  }
});
