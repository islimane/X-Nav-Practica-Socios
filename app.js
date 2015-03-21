$(document).ready(function() {
	$.getJSON("timeline.json", function(data) {
		for(var i=0;i<data.length;i+=1){
			msg = '<div class="msg">';
			msg += '<spam class="date">' + data[i].Fecha + '</spam>';
			msg += '<p class="text">';
			msg += '<img class="' + data[i].Autor + '" height="42" width="42">@';
			msg += data[i].Autor + ': ' + data[i].Titulo + '<p>';
			msg += '<p class="text">' + data[i].Contenido + '<p>';
			msg += '</div>';
			$("#log").append(msg);
		}
	});

	$.getJSON("myline.json", function(data) {
		for(var i=0;i<data.length;i+=1){
			msg = '<div class="msg">';
			msg += '<spam class="date">' + data[i].Fecha + '</spam>';
			msg += '<p class="text">';
			msg += '<img class="' + data[i].Autor + '" height="42" width="42">@';
			msg += data[i].Autor + ': ' + data[i].Titulo + '<p>';
			msg += '<p class="text">' + data[i].Contenido + '<p>';
			msg += '</div>';
			$("#mylog").append(msg);
			console.log("setImg: " + data[i].Autor);
		}
	});

	var updateData;

	$.getJSON("update.json", function(data){
		updateData = data;
		if(updateData.length>0){
			$('#btn').html('<button id="showMsgs">' + updateData.length + ' New Messages</button>');
		}
	});

	$("#btn").on('click', function(){
		var msg = "";
		for(var i=0;i<updateData.length;i+=1){
			msg += '<div class="msg">';
			msg += '<p class="text">';
			msg += '<img class="' + updateData[i].Autor + '" height="42" width="42">@';
			msg += updateData[i].Autor + ': ' + updateData[i].Titulo + '<p>';
			msg += '<p class="text">' + updateData[i].Contenido + '<p>';
			msg += '</div>'
		}
		$("#newMsgs").replaceWith(msg);
		setUserImgs(users);
	});

	var users = ['subject1', 'subject2', 'subject3', 'subject4', 'islimane'];

	var setUserImgs = function(users){
		for(user in users){
			setImg(users[user]);
		}
	}

	var setImg = function(user){
		$.ajax({
			type:"GET",
			contentType: "image/png",
			cache: false,
			url: "img/" + user + ".png",
			success: function (img){
				$('.' + user).attr('src', "img/" + user + ".png");
			}
		});
	}

	setUserImgs(users);
});
