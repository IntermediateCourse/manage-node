$(function(){
	String.prototype.strim = function(){
		return this.replace(/^\s*|\s*$/,'');
	}

	function login(e){
		var $name = $('[name="user[name]"]'),
			$password = $('[name="user[password]"]');

		$.post('/users/login',{name:$name.val().strim(),password:$password.val().strim()},function(json){
			if(!json.success){
				$('.help-block').text(json.msg).removeClass('hide');
				$('.form-group').addClass('has-error');
			}else{
				window.location.reload();
			}
		});

		e.preventDefault()
	}

	$('form').submit(login)
});

