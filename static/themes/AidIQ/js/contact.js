/**
 * Used by contact() in private/templates/AidIQ/controllers.py
 */

$(document).ready(function() {
    $('#mailform').validate({
        errorClass: 'req',
        rules: {
            name: {
                required: true
            },
            subject: {
                required: true
            },
            message: {
                required: true
            },
            name: {
                required: true
            },
            address: {
                required: true,
                email: true
            }
        },
        messages: {
            // @ToDo: i18n if-required
            name: "Enter your name",
            subject: "Enter a subject",
            message: "Enter a message",
            address: {
                required: "Please enter a valid email address",
                email: "Please enter a valid email address"
            }
        },
        errorPlacement: function(error,element) {
            error.appendTo(element.parents('tr')
                                  .prev()
                                  .children()
                                  );
        },
        submitHandler: function(form) {
            form.submit();
        }
    });

    $('textarea.resizable:not(.textarea-processed)').each(function() {
        // Avoid non-processed teasers.
        if ($(this).is(('textarea.teaser:not(.teaser-processed)'))) {
            return false;
        }
        var textarea = $(this).addClass('textarea-processed'), staticOffset = null;
        // When wrapping the text area, work around an IE margin bug. See:
        // http://jaspan.com/ie-inherited-margin-bug-form-elements-and-haslayout
        $(this).wrap('<div class="resizable-textarea"><span></span></div>')
               .parent()
               .append($('<div class="grippie"></div>')
               .mousedown(startDrag));
        var grippie = $('div.grippie', $(this).parent())[0];
        grippie.style.marginRight = (grippie.offsetWidth - $(this)[0].offsetWidth) +'px';
        function startDrag(e) {
            staticOffset = textarea.height() - e.pageY;
            textarea.css('opacity', 0.25);
            $(document).mousemove(performDrag).mouseup(endDrag);
            return false;
        }
        function performDrag(e) {
            textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
            return false;
        }
        function endDrag(e) {
            $(document).unbind("mousemove", performDrag).unbind("mouseup", endDrag);
            textarea.css('opacity', 1);
        }
    });
});