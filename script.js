  $(function() {

    $(".sortable-left").sortable({
      items: "> li",
      handle: ".draggable",
      revert: true,
      revertDuration: 10,
      placeholder: "ui-sortable-placeholder",
      sort: function(event, ui){ 
        // ui.item.addClass("selected"); 
      },
      stop: function(event, ui){ 
        // ui.item.removeClass("selected"); 
      },
      update: function(e, ui) {
        //
      }
    }).disableSelection();

    var listItem = '<li class="ui-state-default allowable-answer"><span><span class="draggable"></span></span><span class="text-content"><input type="text" value="" class="allowable-answer-input" /></span><span class="remove" unselectable="on">×</span></li>';

    $(".btn.add").unbind("click").click(function(e) {
      var sortableList = $(".sortable-left");
      var lastItem = $(".sortable-left").find("li:last-child");
      $(sortableList).append(listItem);
    });

});