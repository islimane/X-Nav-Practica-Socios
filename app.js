$(document).ready(function() {
	$.getJSON("timeline.json", function(data) {
		for(var i=0;i<data.length;i+=1){
			msg = '<div class="msg">';
			msg += ' <img class="' + data[i].Autor + '" height="42" width="42"> '
			msg += '<spam class="date">' + data[i].Fecha + '</spam>'
			msg += '<p class="text">@' + data[i].Autor + ': ' + data[i].Titulo + '<p>'
			msg += '<p class="text">' + data[i].Contenido + '<p>'
			msg += '</div>'
			$("#log").append(msg);
			setImg(data[i].Autor);
		}
	});

	$.getJSON("myline.json", function(data) {
		for(var i=0;i<data.length;i+=1){
			msg = '<div class="msg">';
			msg += '<spam class="date">' + data[i].Fecha + '</spam>'
			msg += '<p class="text">@' + data[i].Autor + ': ' + data[i].Titulo + '<p>'
			msg += '<p class="text">' + data[i].Contenido + '<p>'
			msg += '</div>'
			$("#mylog").append(msg);
		}
	});

	var updateData;

	$.getJSON("update.json", function(data) {
		updateData = data;
		if(updateData.length>0){
			$('#btn').html('<button id="showMsgs">' + updateData.length + ' New Messages</button>');
		}
	});

	$("#btn").on('click', function(){
		var msg = "";
		for(var i=0;i<updateData.length;i+=1){
			msg += '<div class="msg">';
			msg += '<p class="text">@' + updateData[i].Autor + ': ' + updateData[i].Titulo + '<p>'
			msg += '<p class="text">' + updateData[i].Contenido + '<p>'
			msg += '</div>'
		}
		$("#newMsgs").replaceWith(msg);
	});

	var setImg = function(user){
		$.ajax({
			type:"GET",
			dataType: "image/png",
			url: "img/" + user + ".png",
			success: function (img) {
				console.log('.' + user);
				$('.' + user).attr('src', img);
			  }
		});
	}
});
