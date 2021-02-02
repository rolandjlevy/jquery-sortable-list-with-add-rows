$(function() {

  /*****************/
  /* Answer Types */
  /*****************/

	$("#answer-types").chosen({ width:'200px' });

  $("#answer-types").unbind('change').change(function(e){
    ['dropdown', 'image', 'placeholder'].forEach(function(item) {
      if (e.target.value === item) {
        $("#" + item + ".section").removeClass('hidden');
        $("#" + item + ".section").addClass('fade-in');
      } else {
        $("#" + item + ".section").addClass('hidden');
      }
    });
	});

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
      $(".btn.save").removeAttr("disabled");
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

  // Reset default for one item
  function resetDefaultItemData(id) {
    var pos = items.findIndex(function(item) { return item.id == id; });
    items[pos].def = false;
    items[0].def = true;
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
  function updateDataDisplay() {
    var data = JSON.stringify(items, null, 2);
    $('.data').text(data);
    $('.list-items-count').text(items.length);
  }

  function customSerialize() {
    var formData = [];
    sortableList.find("li").each(function(index) {
      var id = Number($(this).attr('id'));
      var key = $(this).find(".key:input[type='text']").val().trim();
      var name = $(this).find(".name:input[type='text']").val().trim();
      var def = $(this).find(".def:input[type='radio']").prop("checked");
      formData.push({id:id, key:key, name:name, def:def});
    });
  }

  /********************/
  /* DOM Manipulation */
  /********************/

  // Create DOM item
  function createDomItem(id, index) {
    var checked = index == 0 ? ' checked' : '';
    var itemData = getItemData(id);
    return '<li id="' + id + '" class="ui-state-default allowable-answer-editable"><span class="draggable"></span><span class="text-content"><input type="text" class="key" value="' + itemData.key + '" placeholder="Enter a key..." maxlength="50" /><input type="text" class="name m-l-5" value="' + itemData.name + '" placeholder="Enter a name..."  maxlength="50" /><input type="radio" name="def" class="def" value="' + itemData.key + '"' + checked + '></span><span class="remove">×</span></li>';
  }

  var empty;

  function validateNameInput() {
    empty = 0;
    $("ul.sortable-left > li input.name").each(function() {
      if (!$(this).val().length) {
        empty++;
        $(this).addClass('error');
      } else {
        $(this).removeClass('error');
      }
    });
    if (empty > 0) {
      $(".btn.save").attr("disabled", true);
      $(".btn.add").attr("disabled", true);
    } else {
      $(".btn.save").removeAttr("disabled");
      $(".btn.add").removeAttr("disabled");
    }
  }

  // Append all DOM items

  items[0].def = true;

  items.forEach(function(item, index) {
    var newItem = createDomItem(item.id, index);
    sortableList.append(newItem);
  });

  updateDataDisplay();
  bindEventsDynamically();

  /**********/
  /* Events */
  /**********/

  // Add an empty item
  $(".btn.add").unbind("click").click(function(e) {
    var id = counter++; 
    items.push({ id:id, key:'', name:'', def:false });
    var newItem = createDomItem(id, items.length);
    sortableList.append(newItem);
    bindEventsDynamically();
    $("li#" + id + " .key:input[type=text]").focus();
    $("li#" + id + " .name:input[type=text]").addClass('error');
    $(".btn.add").attr("disabled", true);
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
    updateDataDisplay();
    $(".btn.save").attr("disabled", true);
  });

  // Reset default item
  $(".btn.reset-default").unbind("click").click(function(e) {
    sortableList.find("li").each(function(index) {
      var radio = $(this).find(".def:input[type='radio']");
      if (radio.prop("checked")) {
        radio.attr("checked", false);
        var id = $(this).attr('id');
        resetDefaultItemData(id);
        $(".btn.save").removeAttr("disabled");
      }
    });
    sortableList.find("li:first-child .def:input[type='radio']").prop("checked", true);
  });

  function bindEventsDynamically() {
    // Remove or set default then toggle Save button
    $(document).unbind("click").on("click", "ul.sortable-left > li", function(e) {
      if (e.target.className === 'def') {
        $(".btn.save").removeAttr("disabled");
      } else if (e.target.className === 'remove') {
        var id = $(this).attr("id");
        $(this).remove();
        removeItemData(id);
        $(".btn.save").removeAttr("disabled");
        validateNameInput();
      }
    });

    // Validate name input on keyup
    $(document).unbind("keyup").on("keyup", "ul.sortable-left > li input.name", function(e) {
      validateNameInput();
    });
  }

});