$(function() {

  /*****************/
  /* Sortable List */
  /*****************/

  var sortableList = $(".sortable-left");

  sortableList.sortable({
    items: "> li",
    handle: ".draggable",
    revert: false,
    revertDuration: 50,
    placeholder: "ui-sortable-placeholder",
    sort: function(event, ui){ 
      // ui.item.addClass("selected");
    },
    stop: function(event, ui){ 
      // ui.item.removeClass("selected"); 
      var tempItems = sortItemsData();
      items = tempItems.slice();
      updateDataDisplay(items);
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
      key: '10_dbm',
      name: '10mm DBM',
      def: false
    },
    {
      id: 2,
      key: '10_dbm_red',
      name: '10mm DBM Red',
      def: false
    },
    {
      id: 3,	
      key: '10_sma',
      name: '10mm SMA',
      def: false
    },
    {
      id: 4,
      key: '10_sma_red',
      name: '10mm SMA Red',
      def: false
    }
  ];

  var counter = items.length + 1;

  // Get data for one item
  function getItemData(id) {
    return items.find(function(item) { return item.id == id; });
  }

  // Update data for one item
  function updateItemData(id, key, name, def) {
    var pos = items.findIndex(function(item) { return item.id == id; });
    items[pos] = { id:Number(id), key:key, name:name, def:def }
  }


  // Clear default for one item
  function clearDefaultItemData(id) {
    var pos = items.findIndex(function(item) { return item.id == id; });
    items[pos].def = false;
  }

  // Remove data for one item
  function removeItemData(id) {
    items = items.filter(function(item) { return item.id != id; });
  }

  // Sort all items on sortable update event
  function sortItemsData() {
    var sortableArray = sortableList.sortable('toArray');
    return sortableArray.map(function(id) {
      var found = items.find(function(item) { return id == item.id; });
      return { id:Number(id), key:found.key, name:found.name, def:found.def };
    });
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
    return '<li id="' + id + '" class="ui-state-default allowable-answer-editable"><span class="draggable"></span><span class="text-content"><input type="text" class="key" value="' + itemData.key + '" /><input type="text" class="name m-l-5" value="' + itemData.name + '" /><input type="radio" name="def" class="def" value="' + itemData.key + '"></span><span class="remove">×</span></li>';
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
    var id = counter++; 
    items.push({ id:id, key:'', name:'', def:false });
    var newItem = createDomItem(id);
    sortableList.append(newItem);
    bindEventsDynamically();
    updateDataDisplay(items);
    $("li#" + id + " .key:input[type=text]").focus();
    // TODO: validation
    // $(this).attr("disabled", "disabled");
  });

  // Save items
  $(".btn.save").unbind("click").click(function(e) {
    sortableList.find("li").each(function(index) {
      var id = $(this).attr('id');
      var key = $(this).find(".key:input[type='text']").val().trim();
      var name = $(this).find(".name:input[type='text']").val().trim();
      var def = $(this).find(".def:input[type='radio']").prop("checked");
      updateItemData(id, key, name, def);
    });
    updateDataDisplay(items);
    // TODO: validate Save buttons
    // $(this).attr("disabled", "disabled");
    // $(".btn.add").removeAttr("disabled");
  });

  // Save items
  $(".btn.clear-default").unbind("click").click(function(e) {
    sortableList.find("li").each(function(index) {
      var radio = $(this).find(".def:input[type='radio']");
      if (radio.prop("checked")) {
        radio.attr("checked", false);
        var id = $(this).attr('id');
        clearDefaultItemData(id);
        updateDataDisplay(items);
      }
    });
  });

  function bindEventsDynamically() {
    // Remove an item
    $(document).unbind("click").on("click", "ul.sortable-left > li > .remove", function(e) {
      var listItemId = $(this).parent().attr('id');
      removeItemData(listItemId);
      $(this).parent().remove();
      updateDataDisplay(items);
      // TODO: validate Save and buttons
      // var inputElement = $("li#" + listItemId + " :input[type=text]");
      // if (inputElement.length) {
      //   $(".btn.save").attr("disabled", "disabled");
      //   $(".btn.add").removeAttr("disabled");
      // }
    });
    // Validate item input
    // TODO: validate Save button
    // $(document).unbind("keyup").on("keyup", "ul.sortable-left > li :input", function(e) {
      // if (e.target.value.length) {
      //   $(".btn.save").removeAttr("disabled");
      // } else {
      //   $(".btn.save").attr("disabled", "disabled");
      // }
    // });
  }

});