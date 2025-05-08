$(document).ready(function () {
	$("a").on("click", function (t) {
		t.preventDefault();
		window.location.replace(window.location.href);
	});

	$("#showHide").on("click", function () {
		if ($(this).hasClass("inputHidden")) {
			$(this).removeClass("inputHidden");
			$(this).addClass("inputShown");
			$(this).text("Hide");
			$(this).parent().prev().attr("type", "text");
		} else {
			$(this).removeClass("inputShown");
			$(this).addClass("inputHidden");
			$(this).text("Show");
			$(this).parent().prev().attr("type", "password");
		}
	});
	
	$(".input-group-field").on("keyup blur", function () {
		if ($(this).val().trim() == "") {
			$(this).parent().next().show();
		} else {
			$(this).parent().next().hide();
		}
	});

	$("#submitBtn").on("click", function (e) {
		$(".input-group-field").each(function () {
			if ($(this).val().trim() == "") {
				$(this).parent().next().show();
				e.preventDefault();
			}
		});
	});
});