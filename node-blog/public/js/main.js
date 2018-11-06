(function() {

    $('.fn-delete').on("click", function() {

        let id = $(this).attr("data-id");
        $.ajax({
            type: 'delete',
            url: '/articles/' + id,
            cache: false,
            success() {
                alert('Delete Article!');
                window.location.href = "/";
            },
            error(msg) {
                console.log(msg);
            }
        })
    })

}())