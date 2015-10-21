console.log("Test");

$(document).ready(function() {

	$('#signup-form').on('submit', function(e) {
		e.preventDefault();

		$.ajax ({
			url: '/users',
			type: 'POST',
			data: $('#signup-form').serialize()
		})
		.done(function(data){
			console.log(data);
		});
	});

	$('#signup-form').validate();

	$('#login-form').on('submit', function(e) {
		// e.preventDefault();
		console.log($('#login-form').serialize());
		$.ajax ({
			url: '/login',
			type: 'POST',
			data: $('#login-form').serialize()
		})
		.done(function(data){
			console.log("logged in");
			// window.location.href="/profile";
		})
		.fail(function(data){
			console.log("failed to login");
		});
	});

	$('#login-form').validate();





});

