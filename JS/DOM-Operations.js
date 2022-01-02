"use strict";

let countTasks=0;

/**
 * [Dynamically creates tasks, filters them by date, priority or category.
 * It's possible to delete certain tasks, delete all tasks or reset the
 * filter.]
 */
$(document).ready(function() {
  $("#newTask").click(function() {
    checkTaskInput();
  });
  
  /**
   * [Filter by priority.]
   */
  $("#prioBtn").click(function() {
    let priority=$("input[name='prio']:checked").val();
    if(priority!==undefined) {
      let len=priority.length;
      let prio=priority.substr(0, len-1);
      let stringPrio="."+prio;
      for(let tr of $(".taskEntry")) {
        $(".taskEntry").addClass("hide");
        $(stringPrio).removeClass("hide");
      }
    } else {
      alert("Please select a priority");
    }
  });
  
  /**
   * [Deletes all tasks.]
   */
  $("#deleteAllTasks").click(function() {
    $(".taskEntry").remove();
    countTasks=0;
  });
  
  /**
   * [Filters by Category. High, low or middle.]
   */
  $("#categoryBtn").click(function() {
    let cat=$("#categoryFilter option:selected").val();
    for(let i=0; i<countTasks; i++) {
      let taskID="task"+i;
      let selector=$(`.taskEntry[id=${taskID}]`);
      if(selector.hasClass(cat)) {
        selector.removeClass("hide");
      } else {
        selector.addClass("hide");
      }
    }
  });
  
  /**
   * [Resets all the filters.]
   */
  $("#resetFilter").click(function() {
    for(let i=0; i<countTasks; i++) {
      $(".taskEntry").removeClass("hide");
    }
  });
  
  /**
   * [Date Filter. Filters the date. Date of the task that gets filtered
   * has to be equal to, greater or less than the input dates.]
   */
  $("#dateBtn").click(function() {
    let from=$("#from").val();
    let fromDate=new Date(from);
    let to=$("#to").val();
    let toDate=new Date(to);
    if(toDate<fromDate)
      alert("Second date is smaller than first date");
    for(let i=0; i<countTasks; i++) {
      let due="task"+i+"Date";
      let taskDate=$(`.taskEntry td[id=${due}]`).text();
      let dueDate=new Date(taskDate);
      let taskID="task"+i;
      if(dueDate>=fromDate && dueDate<=toDate) {
        $(`.taskEntry[id=${taskID}]`).removeClass("hide");
      } else {
        $(`.taskEntry[id=${taskID}]`).addClass("hide");
      }
    }
  });
});

/**
 * [Checks the inputs from the form. Everything needs to be selected. The
 * date has to be higher or equal to the current date.]
 */
function checkTaskInput() {
  let title=$("#title").val();
  let desc=$("#description").val();
  let due=$("#dueDate").val();
  let cat=$("#category option:selected").val(); //.text()
  let prio=$("input[name='priority']:checked").val();
  let today=new Date();
  today.setHours(0, 0, 0, 0);
  let date=new Date(due);
  if(title!=="" && desc!=="" && prio!==undefined && due!=="" && date>=today) {
    createNewTask(title, desc, due, cat, prio);
  } else if(title==="" || desc==="" || prio===undefined || due==="") {
    alert("Please fill out all fields");
  } else if(date<today) {
    alert("Please select today or a future date");
  }
}

/**
 * [Creates a new Task with what was read from the form.]
 * @param title [title of the task]
 * @param desc [description of the Task]
 * @param due [due date of the task]
 * @param cat [category of the task.]
 * @param prio [priority of task.]
 */
function createNewTask(title, desc, due, cat, prio) {
  $("table").append(`<tr id="task${countTasks}" class="${prio} taskEntry ${cat} ${due}"></tr>`);
  let tr=`#task${countTasks}`;
  $(tr).append(`<td id="task${countTasks}Date">${due}</td>`);
  $(tr).append(`<td>${title}</td>`);
  $(tr).append(`<td>${desc}</td>`);
  $(tr).append(`<td>${cat}</td>`);
  $(tr).append(`<td>${prio}</td>`);
  $(tr).append(`<td class="delete"><button onclick="deleteTD(${countTasks})">Delete</button></td>`);
  countTasks++;
}

/**
 * [Deletes the corresponding task of the delete button.]
 *
 * @param taskNr [task Nr where delete was clicked.]
 */
function deleteTD(taskNr) {
  let taskDel="#task"+taskNr;
  let conf=confirm("Do you really want to delete this line?");
  if(conf===true) {
    $(taskDel).remove();
  }
}