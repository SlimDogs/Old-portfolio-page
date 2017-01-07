/*
	Tautvydas Derzinskas (C)
	http://Gudr.us
*/

// Cookies
function eraseCookie(n) { createCookie(n,'',-1); }
function createCookie(n,v,d) {
	var ex;
	if (d) {
		var date = new Date();
		date.setTime(date.getTime()+(d*24*60*60*1000));
		ex = '; expires='+date.toGMTString();
	}
	document.cookie = n+'='+v+ex+'; path=/';
}
function readCookie(n) {
	var nameEQ = n + '=';
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return 'None';
}
if (readCookie('Gudrus[H]') == 'Yes') {
	var visits = parseFloat(readCookie('Gudrus[V]'))+1;
	createCookie('Gudrus[V]',visits,31);
}
// Tracking progress
var Tess = [0,0,0,0],
	BubbleRelease = 0,
	ProfileStatus = 0;
function Track(n) {
	var Coconuts = $('#Progress').children('li').length;
	Tess[n] = 1;
	$('#Progress').children('li:eq('+n+')').fadeIn(350, function() {
		if ((Tess[0] == 1) && (Tess[1] == 1) && (Tess[2] == 1) && (Tess[3] == 1)) {
			$('#Scene').show();
			if (readCookie('Gudrus[H]') == 'Yes') {
				$('#Scene').css('cursor','pointer');
				$('#Island').append('<div id="Belt"></div>');
			}
			$('#Loader').delay(250).fadeOut(450, function() {
				if (BubbleRelease == 0) {
					if (readCookie('Gudrus[H]') == 'Yes') $('#Bubble > p').html('<strong>Welcome back traveller!</strong><br><br>Thanks to You and the life belt you gave me I will leave this island soon!<br><br>You already visited me <strong>'+readCookie('Gudrus[V]')+'</strong> times.');

					setTimeout(function(){ $('#Bubble').fadeIn(350); },1500);
					if (readCookie('Gudrus[H]') == 'Yes') setTimeout(function(){ $('#Bubble').fadeOut(350); },12000);
					else setTimeout(function(){ BubbleChange() },4350);
					BubbleRelease = 1;
				}
			});
		}
	});
}
$(document).ready(function() { Track(2); });
$(window).load(function() { Track(3); });
// Animating clouds
$('#Cloud2').css('opacity',0);
function ReleaseCloud(n) {
	var Time, Left, Tranparency,
		Max = window.innerWidth;
	if (n == 1)  { Time = 30; Left = '-226'; Tranparency = 0; }
	if (n == 2)  { Time = 20; Left = 150; Tranparency = 1; }
	if (n == 3)  { Time = 60; Left = '-345'; Tranparency = 1; }
	$('#Cloud'+n).animate({'left':(window.innerWidth+'px'),'opacity':Tranparency}, Time*1000, function() {
		if (n == 3) Tranparency = 0;
		$('#Cloud'+n).css({'left':Left+'px','opacity':(1-Tranparency)});
		ReleaseCloud(n);
	});
	if (Tess[1] == 0) Track(1);
}
for (var i=1; i<4; i++) ReleaseCloud(i);
// Bubble messages + getting days
var d1 = new Date('21/Mar/2014 18:30:00'),
	d2 = new Date();
var diff = d2.getTime()-d1.getTime();
var days = Math.floor(diff/(1000*60*60*24));
var Messages = ['Hello, traveller!','Did you know that word "<strong>gudrus</strong>" in Lithuanian language means <strong>clever</strong>?<br /><br />I can assure you that I am "gudrus" web developer.','Nevertheless somehow I appeared in this small jobless island. It\'s been <strong>'+days+'</strong> days since I woke up here.<br />It\'s not easy to be alone in here.','I need something I could use to swim out of this island... Maybe you could help by throwing me a life belt?<br />I see you have one attached to your mouse cursor.','You can do it by clicking on me or any other place in this page.<br /><br /> I can\'t eat those coconuts anymore. Help me. Throw the life belt!','In return I could tell you under which palm is the secret treasure chest hidden.','Or at least provide some proffesional web development services.<br /><br /> You just need to throw that life belt.','Think about it. It\'s your choice.'],
	Intervals = [5000,15000,10000,12000,8000,5000,8000,10000],
	Number = 1,
	Timeris;
function BubbleChange() {
	if ($('#Bubble').css('display') != 'none') {
		$('#Bubble').fadeOut(350, function() { 
			if (Number < Messages.length) {
				$('#Bubble').children('p').html(Messages[Number]);
				$('#Bubble').fadeIn(350, function() {
					if (typeof Timeris !== 'undefined') clearTimeout(Timeris);
					Timeris = setTimeout(function(){ BubbleChange(); },Intervals[Number]);
					Number = Number+1;
				});
			}
		});
	}
}
// Waving animation
var s = 0;
function Wave() {
	var w = ['60','79'],
		w2 = ['-10','0'];
	if (s == 0) s = 1;
	else s = 0;
	$('#Back-Waves').animate({left: w2[s]+'px'},1500);
	$('#Front-Waves').animate({left: '-'+w[s]+'px'},1500, function() {
		Wave();
	});
	if (Tess[0] == 0) Track(0);
}
Wave();
// Contact map
function CreateMap() {
	var map;
		FocusedCoords = new google.maps.LatLng(51.5432695,-0.2394493),
		MarkerCoords = new google.maps.LatLng(51.5432695,-0.00187),
		MY_MAPTYPE_ID = 'Gudr.us location',
		Marker = "http://gudr.us/res/i/marker.png";
	var featureOpts = [{stylers: [{ hue: '#e9da97' }, { gamma: 1 }, { weight: 1 }]},{featureType: 'water', stylers: [{ color: '#76b2cc' }]},{featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#205e79' }]},{featureType: 'poi.park',stylers: [{ color: '#a7c75c' }]}];
	var mapOptions = {
		zoom: 10,
		center: FocusedCoords,
		panControl: false,
		zoomControl: false,
		scaleControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID] },
		mapTypeId: MY_MAPTYPE_ID
	};
	map = new google.maps.Map(document.getElementById('Google-Map'), mapOptions);
	var styledMapOptions = { name: 'Gudr.us style' };
	var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
	map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
	var marker = new google.maps.Marker({position: MarkerCoords, map: map, icon: Marker});
	
	setTimeout(function(){ $('#Contact-Form').animate({'left':'20px'}, 250); },1000);
}
// Other
$('#Scene, #Close-Profile').click(function() {
	if (readCookie('Gudrus[H]') != 'Yes') { 
		createCookie('Gudrus[H]','Yes',31);
		createCookie('Gudrus[V]',1,31);
		$('#Island').append('<div id="Belt"></div>');
	}
	if (ProfileStatus == 0) ProfileStatus = 1;
	else ProfileStatus = 0;
	if (ProfileStatus == 0) {
		if ($('#Bubble').css('display') != 'none') $('#Bubble').hide();
		$('#Content').animate({ scrollTop: 0 }, 5);
		$('#Navigation .Active').remove();
		$('#Navigation > li:eq(0)').prepend('<img src="res/i/coconut.png" width="14" height="14" class="Active" /> ');
	}
	$('#Profile').toggle(function() {
		if (ContentStatus[0] == 0) {
			$('#Scene').css('cursor','pointer');
			$('#Photo').fadeIn(500, function() {
				$('#Profile-Info').fadeIn(500, function() { ContentStatus[0] = 1; });
			});
		}
	});
});
var ContentStatus = [0,0,0,0,0];
$('#Navigation > li').click(function() {
	var i = $(this).index();
	var p = i*285;
	if ($(this).children('img').length == 0) {
		$('#Navigation .Active').remove();
		$(this).prepend('<img src="res/i/coconut.png" width="14" height="14" class="Active" /> ');
		$('#ProBar').animate({'width':(i*20+20)+'%'},350);
		$('#Content').animate({ scrollTop: p }, 350, function() {
			if ((i == 1) & (ContentStatus[i] == 0)) {
				$.each($('#Skills .Info'), function() {
					var t = $(this),
						w = t.children('span').text();
					$(this).parent().children('.Bar').animate({'width':w+'%'}, 500, function() { t.fadeIn(); });
				});
				ContentStatus[i] = 1;
			}
			if ((i == 2) & (ContentStatus[i] == 0)) {
				for (var j=0; j<4; j++) {
					var t = j*150;
					$('#Experience > .Companies > div:eq('+j+')').delay(t).fadeIn(350);
				}
				ContentStatus[i] = 1;
			}
			if ((i == 4) & (ContentStatus[i] == 0)) {
				CreateMap();
				ContentStatus[i] = 1;
			}
		});
	}
});
$('#Profile-Info > div').click(function() {
	$('#Navigation > li:eq(4)').trigger('click');
});
var ContactTimer = '';
$('#Contact-Form').mouseenter(function() {
	clearTimeout(ContactTimer);
	$('#Contact-Form').stop(true,true).animate({'width':'500px'}, 150);
}).mouseleave(function() {
	ContactTimer = setInterval(function() { if ($('#Contact-Form').css('width') == '500px') { $('#Contact-Form').animate({'width':'250px'}, 150); } }, 1000);
});

$('#Send-Message').click(function() {
	if (!$(this).hasClass('Sending')) {
		$(this).text('Sending... Please wait.').addClass('Sending').css({'cursor':'auto','background':'#d0d0d0'});
		$.ajax({
			url: "/mail.php",
			type: "post",
			data: {
				name: $('#Name').val(),
				email: $('#Email').val(),
				message: $('#Message').val(),
			}
		}).success(function(resp) {
			if (resp == "201") {
				$('#Name,#Email,#Message').val('')
				$('#Done').show();
			}
		});
	}
});