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

  // Get item data
  function getItemData(id) {
    return items.find(function(item) { return item.id == id; })
  }

  // Remove item data
  function removeItemData(id) {
    items = items.filter(function(item) { return item.id != id; });
  }

  /********************/
  /* DOM Manipulation */
  /********************/

  // Create DOM item
  function createDomItem(id) {
    var itemData = getItemData(id);
    var content = itemData.text.length ? itemData.text : '<input type="text" value="" class="allowable-answer-input" />';
    var itemClass = itemData.text.length ? 'allowable-answer' : 'allowable-answer-editable'
    return '<li id="' + id + '" class="ui-state-default ' + itemClass + '"><span><span class="draggable"></span></span><span class="text-content">' + content + '</span><span class="remove">×</span></li>';
  }

  // Append all DOM items
  items.forEach(function(item) {
    var newItem = createDomItem(item.id);
    sortableList.append(newItem);
  });
  
  eventsForDynamicElements();

  /**********/
  /* Events */
  /**********/

  $(".btn.add").unbind("click").click(function(e) {
    var id = items.length + 1; 
    items.push({ id: id, text: '' });
    var newItem = createDomItem(id);
    sortableList.append(newItem);
    eventsForDynamicElements();
    $(this).attr("disabled", "disabled");
  });

  $(".btn.save").unbind("click").click(function(e) {
    var unsavedInput = $(":input[type=text]");
    var unsavedListItemId = $(unsavedInput).parent().parent().attr('id');
    var dataItem = getItemData(unsavedListItemId);
    console.log({dataItem, items});
    $(this).attr("disabled", "disabled");
    $(".btn.add").removeAttr("disabled");
  });

  function eventsForDynamicElements() {
    $(document).on("click", "ul.sortable-left > li > .remove", function(e) {
      var listItemId = $(this).parent().attr('id');
      removeItemData(listItemId);
      $(this).parent().remove();
    });
    $(document).on("keyup", "ul.sortable-left > li :input", function(e) {
      if (e.target.value.length) {
        $(".btn.save").removeAttr("disabled");
      } else {
        $(".btn.save").attr("disabled", "disabled");
      }
    });
  }

});