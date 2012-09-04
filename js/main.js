$(document).ready(function(){


//--------------navbar link backgrounds

	$('nav a').on('click', function(){
		$('nav a').removeClass('greybackground');
		$(this).addClass('greybackground');
	});
	

//--------------navbar link backgrounds END




//--------------signup form animation

	$('.formholder').hide();

	$('#frontbutton, #signuplink').one('click', function(){
		$('.popup').hide();
		usernameInput.val('');
		emailInput.val('');
		passwordInput.val('');
		confirmInput.val('');
		$('.intro').animate({opacity: '0.5'}, 1000).delay(800).animate({
			left: "+=300px"
		});
		setTimeout(function(){
			$('.formholder').show()}, 2000);
		$('.toppic').animate({opacity: '0.5'}, 1000).delay(800).animate({
			top: "+=300px"
		});
		document.getElementById('frontbutton').disabled = true;
	});


//--------------signup form animation END


//--------------flickr search engine

	var keywordInput = $('#keyword'),
		submitButton = $('#submit'),
		keyword = '',
		content = '';

	keywordInput.focus(function(){
		keywordInput.val('');
	});		


	submitButton.on('click',function(){
		keywordVal = keywordInput.val();
		$('.leftcolumn').html('');
		$.getJSON('http://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags='+keywordVal+'&jsoncallback=?', function(data){
			$.each(data.photos.photo, function(i, value){
				content = '<a href="http://farm'+value.farm+'.staticflickr.com/'+value.server+'/'+value.id+'_'+value.secret+'.jpg" class="colorbox" rel="viewerimgs"><img src="http://farm'+value.farm+'.staticflickr.com/'+value.server+'/'+value.id+'_'+value.secret+'.jpg"></a>';
				$('.leftcolumn').append(content);
				$("a[rel='viewerimgs']").colorbox();
			})
		})
		

	});

//--------------flickr search engine END



//--------------menu for quick genre searches for flickr images

	$('.blackbar').on('mouseover', function(){
		var aindex = $('.tool a').index(this);
		$(this).addClass('genrebackground');
	});

	$('.blackbar').on('mouseleave', function(){
		var aindex = $('.tool a').index(this);
		$(this).removeClass('genrebackground');
	});


	$('#funny').on('click',function(e){
		e.preventDefault();
		$('.leftcolumn').html('');
		$('.rightcolumn').html('');
		$.getJSON('http://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags=funny&jsoncallback=?', function(data){
			$.each(data.photos.photo, function(i, value){
				content = '<a href="http://farm'+value.farm+'.staticflickr.com/'+value.server+'/'+value.id+'_'+value.secret+'.jpg" rel="viewerimgs"><img src="http://farm'+value.farm+'.staticflickr.com/'+value.server+'/'+value.id+'_'+value.secret+'.jpg"></a>';
				$('.leftcolumn').append(content);
				$("a[rel='viewerimgs']").colorbox();
				if (i == 19) {
					return false;
				};
			})
		});
		getContent('funnytext.html');
		$('.blackbar').css({ "font-size": "1em"});
		$('#funny').animate({fontSize: "2em"});
	});



	$('#memes').on('click',function(e){
		e.preventDefault();
		$('.leftcolumn').html('');
		$('.rightcolumn').html('');
		$.getJSON('http://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags=memes&jsoncallback=?', function(data){
			$.each(data.photos.photo, function(i, value){
				content = '<a href="http://farm'+value.farm+'.staticflickr.com/'+value.server+'/'+value.id+'_'+value.secret+'.jpg" rel="viewerimgs" class="mason"><img src="http://farm'+value.farm+'.staticflickr.com/'+value.server+'/'+value.id+'_'+value.secret+'.jpg"></a>';
				$('.leftcolumn').append(content);
				$("a[rel='viewerimgs']").colorbox();
				if (i == 19) {
					return false;
				};
			})
		
		});
		getContent('memetext.html');
		secondGetContent('memetext2.html');
		$('.blackbar').css({"font-size": "1em"});
		$('#memes').animate({fontSize: "2em"});
	});



	$('#scary').on('click',function(e){
		e.preventDefault();
		$('.leftcolumn').html('');
		$('.rightcolumn').html('');
		$.getJSON('http://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags=scary&jsoncallback=?', function(data){
			$.each(data.photos.photo, function(i, value){
				content = '<a href="http://farm'+value.farm+'.staticflickr.com/'+value.server+'/'+value.id+'_'+value.secret+'.jpg" rel="viewerimgs"><img src="http://farm'+value.farm+'.staticflickr.com/'+value.server+'/'+value.id+'_'+value.secret+'.jpg"></a>';
				$('.leftcolumn').append(content);
				$("a[rel='viewerimgs']").colorbox();
				if (i == 19) {
					return false;
				};
			});
		});
		getContent('scarytext.html');
		$('.secondright').html('');
		$('.blackbar').css({"font-size": "1em"});
		$('#scary').animate({fontSize: "2em"});
	});


	
	// $(".leftcolumn").masonry({
	// 	itemSelector: ".mason"
	// });

//--------------menu for quick genre searches for flickr images END



//--------------home page picture interaction

	$('.toppic').on('mouseover', function(){
		$('.toppic').css({"opacity": "0.5"});
		$(this).css({"opacity": "1"});
	});


	$('.toppic').on('mouseleave', function(){
		$('.toppic').css({"opacity": "1"});
	});


	$('.popup').hide();
	$('.logo').on('click', function(){
		$('.popup').toggle();
	});

//--------------home page picture interaction END



//--------------ajax for inserting specific image results on genre based flickr search
	
	function getContent(filename) {
		$.ajax({
			url: filename,
			type: "GET",
			dataType: "html",
			beforeSend: function(){
				$('.rightcolumn').html('<img src="images/loading.gif">');
			},
			success: function (data, textStatus, xhr) {
				console.log(data);
				setTimeout(function (){
					$('.rightcolumn').html(data);
				}, 2000);
			},
			error: function(xhr, textStatus, errorThrown) {
				$('.rightcolumn').html(textStatus);
			}
		});
	}

	function secondGetContent(filename) {
		$.ajax({
			url: filename,
			type: "GET",
			dataType: "html",
			beforeSend: function(){
				$('.secondright').html('<img src="images/loading.gif">');
			},
			success: function (data, textStatus, xhr) {
				setTimeout(function(){
					$('.secondright').html(data);
				}, 2500);
			},
			error: function(xhr, textStatus, errorThrown) {
				$('.secondright').html(textStatus);
			}
		});
	}

//--------------ajax for inserting specific image results on genre based flickr search END


//--------------submit form validation

	$('form span').hide();

	
	var emailregex = /[A-za-z]+[0-9]*[-]*[A-za-z0-9]+@[a-z0-9]+[-]*[a-z0-9]+\.[a-z]+/
	var passregex = /.*[0-9]+.*/

	var usernameInput = $('#username'),
		emailInput = $('#email'),
		passwordInput = $('#password'),
		confirmInput = $('#confirm_password'),

		usernameError = $('#username_error'),
		emailError = $('#email_error'),
		passwordError = $('#password_error'),
		confirmError = $('#confirm_error'),

		accountForm = $('#accountsubmit');

	accountForm.submit(function(){
	function validateUsername() {
		if (usernameInput.val().length < 3) {
			usernameError.show();
			usernameInput.addClass('redborder');
			return false
		} else {
			usernameError.hide();
			usernameInput.removeClass('redborder');
			return true;
		}
	}

	function validateEmail() {
		if (emailregex.test(emailInput.val())) {
			emailError.hide();
			emailInput.removeClass('redborder');
			return true;
		} else {
			emailError.show();
			emailInput.addClass('redborder');
			return false;
		}
	}

	function validatePassword() {
		if (passregex.test(passwordInput.val())) {
			passwordError.hide();
			passwordInput.removeClass('redborder');
			return true;
		} else {
			passwordError.show();
			passwordInput.addClass('redborder');
			return false;
		}
	}

	function validateConfirm() {
		if (confirmInput.val() == passwordInput.val()) {
			confirmError.hide();
			confirmInput.removeClass('redborder');
			return true;
		} else {
			confirmError.show();
			confirmInput.addClass('redborder');
			return false;
		}
	}



	if (validateUsername() & validateEmail() & validatePassword() & validateConfirm()) {
		var fields = $('#accountsubmit').serializeArray()
		$.each(fields, function(i, field){
			console.log(field.name + "= " + field.value);
		});
	}

	return false;

	});




});
