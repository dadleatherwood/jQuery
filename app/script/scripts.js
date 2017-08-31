$(document).ready(function(){
  $('#newTaskForm').hide();

//BASIC ARCHITECTURE
  var listo = [];

  var Task = function(task){
    this.task = task;
    this.id = 'new'
  }
//MAKING OUR ADDTASK FUNCTION
  var addTask = function(task){
    if(task){
      task = new Task(task);
      listo.push(task);

      $('#newItemInput').val('');

		    $('#newList').append(
          '<a href="#finish" class="" id="item">' +
            '<li class="list-group-item">' +
            '<h3>' + task.task + '</h3>'+
            '<span class="arrow pull-right">' +
            '<i class="glyphicon glyphicon-arrow-right">' +
            '</span>' +
            '</li>' +
            '</a>'
        );

    };
    $('#newTaskForm').slideToggle('fast', 'linear');
  };

  $('#saveNewItem').on('click', function (e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
});

  //open form
  $('#add-todo').on('click', function () {
      $('#newTaskForm').fadeToggle('fast', 'linear');
  });
  //closes form
  $('#cancel').on('click', function (e) {
      e.preventDefault();
      $('#newTaskForm').fadeToggle('fast', 'linear');
  });

  //STEP # 4
    var advanceTask = function(task) {
    var modified = task.innerText.trim()
    console.log(task.innerText);
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task === modified) {
        if (listo[i].id === 'new') {
          listo[i].id = 'inProgress';
        } else if (listo[i].id === 'inProgress') {
          listo[i].id = 'archived';
        } else {
          listo.splice(i, 1);
        }
        break;
      }
    }
    task.remove();
  };

//MOVE FROM 'NEW' TO 'IN PROGRESS'
  $(document).on('click', '#item', function(e){
      e.preventDefault();
    var task = this;
    console.log(this, task);
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
    console.log(this);
  });

  //MOVE FROM 'IN PROGRESS' TO 'ARCHIVED'
  $(document).on('click', '#inProgress', function (e) {
      e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });

  //DELETE AN ITEM FROM THE LIST
  $(document).on('click', '#archived', function (e) {
      e.preventDefault();
    var task = this;
    advanceTask(task);
  });
  //ADD LIST ITEMS TO LOCAL STORAGE
  var tempList = JSON.stringify(listo);
  localStorage.setItem('listo', tempList);
  localStorage.getItem('listo')


});
