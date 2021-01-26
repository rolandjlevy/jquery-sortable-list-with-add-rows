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

    $(".btn.add").unbind("click").click(function(e) {
      var lastItem = $(".sortable-left").find(":last-child");
      console.log({lastItem})
    });

});