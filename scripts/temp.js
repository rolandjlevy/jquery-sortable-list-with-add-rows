// sortableList.find("span.remove").unbind("click").click(function(e) {
//   $(this).parent().remove();
// });

// $(".btn.add").unbind("click").click(function(e) {
//   var lastItem = $(".sortable-left").find("li:last-child");
//   $(lastItem).find(":input").focus();
// });

// 1. Not working
// $(newItem).on("click", ".remove", function(e) {
//   console.log('removedBtn');
// });
// 2. Not working
// $(newItem).find(".remove").unbind("click").click(function(e) {
//   console.log('removedBtn');
// });
// var removeBtn = $(newItem).find(".remove");


  // function createDomItem(id) {
  //   var itemData = getItemData(id);
  //   var content = itemData.text.length ? itemData.text : '<input type="text" value="" class="allowable-answer-input" />';
  //   var itemClass = itemData.text.length ? 'allowable-answer' : 'allowable-answer-editable'
  //   return '<li id="' + id + '" class="ui-state-default ' + itemClass + '"><span><span class="draggable"></span></span><span class="text-content">' + content + '</span><span class="remove">×</span></li>';
  // }