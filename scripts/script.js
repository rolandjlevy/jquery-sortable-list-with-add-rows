$(function() {

  /*****************/
  /* Sortable List */
  /*****************/

  var sortableList = $(".sortable-left");

  sortableList.sortable({
    items: "> li",
    handle: ".draggable",
    revert: true,
    revertDuration: 10,
    placeholder: "ui-sortable-placeholder",
    sort: function(event, ui){ 
      ui.item.addClass("selected");
    },
    stop: function(event, ui){ 
      ui.item.removeClass("selected"); 
    },
    update: function(e, ui) { }
  }).disableSelection();

  /********/
  /* Data */
  /********/

  // Set data for all items
  var items = [
    {
      id: 1,
      text: 'Additional coning details'
    },
    {
      id: 2,
      text: 'Fitting tightened?'
    },
    {
      id: 3,
      text: 'Any other site restrictions?'
    }
  ];

  // Get data for one item
  function getItemData(id) {
    return items.find(function(item) { return item.id == id; });
  }

  // Update data for one item
  function updateItemData(id, text) {
    var pos = items.findIndex(function(item) { return item.id == id; });
    items[pos].text = text;
    updateDataDisplay(items);
  }

  // Remove data for one item
  function removeItemData(id) {
    items = items.filter(function(item) { return item.id != id; });
    updateDataDisplay(items);
  }

  // Update displayed data
  function updateDataDisplay(obj) {
    var data = JSON.stringify(obj, null, 2);
    $('.data').text(data);
  }

  /********************/
  /* DOM Manipulation */
  /********************/

  // Create DOM item
  function createDomItem(id) {
    var itemData = getItemData(id);
    return '<li id="' + id + '" class="ui-state-default allowable-answer-editable"><span><span class="draggable"></span></span><span class="text-content"><input type="text" value="' + itemData.text + '" class="allowable-answer-input" /></span><span class="remove">×</span></li>';
  }

  // Append all DOM items
  items.forEach(function(item) {
    var newItem = createDomItem(item.id);
    sortableList.append(newItem);
  });
  
  updateDataDisplay(items);
  bindEventsDynamically();

  /**********/
  /* Events */
  /**********/

  // Add an empty item
  $(".btn.add").unbind("click").click(function(e) {
    var id = items.length + 1; 
    items.push({ id: id, text: '' });
    var newItem = createDomItem(id);
    sortableList.append(newItem);
    updateDataDisplay(items);
    bindEventsDynamically();
    $(this).attr("disabled", "disabled");
    // $(".btn.save").removeAttr("disabled");
  });

  // Save a new item
  $(".btn.save").unbind("click").click(function(e) {
    var inputElement = $(":input[type=text]");
    var listItemId = $(inputElement).parent().parent().attr('id');
    var dataItem = getItemData(listItemId);
    console.log(dataItem, inputElement.val());
    updateItemData(listItemId, inputElement.val())
    $(this).attr("disabled", "disabled");
    $(".btn.add").removeAttr("disabled");
  });

  function bindEventsDynamically() {
    // Remove an item
    $(document).unbind("click").on("click", "ul.sortable-left > li > .remove", function(e) {
      var listItemId = $(this).parent().attr('id');
      removeItemData(listItemId);
      var inputElement = $(":input[type=text]");
      $(this).parent().remove();
      if (inputElement.length) {
        $(".btn.save").attr("disabled", "disabled");
        $(".btn.add").removeAttr("disabled");
      }
    });
    // Validate item input
    $(document).unbind("keyup").on("keyup", "ul.sortable-left > li :input", function(e) {
      if (e.target.value.length) {
        $(".btn.save").removeAttr("disabled");
      } else {
        $(".btn.save").attr("disabled", "disabled");
      }
    });
  }

});