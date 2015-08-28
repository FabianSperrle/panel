(function($) {

  var Structure = function(element) {

    var element = $(element);
    var list    = element.find('.structure-entries');
    var entries = element.find('.structure-entry');
    var api     = element.data('api');

    if(element.data('sortable') == true && list.find('.structure-entry').length > 1) {

      var drag = dragula([list[0]]);

      drag.on('drop', function(e, target, source) {

        var ids = [];

        $(target).find('.structure-entry').each(function() {
          ids.push($(this).attr('id').replace('structure-entry-', ''));
        });

        $.post(api, {ids: ids}, function() {
          app.content.reload();
        });

      });

    }

  };

  $.fn.structure = function() {

    return this.each(function() {

      if($(this).data('structure')) {
        return $(this).data('structure');
      } else {
        var structure = new Structure(this);
        $(this).data('structure', structure);
        return structure;
      }

    });

  };

})(jQuery);