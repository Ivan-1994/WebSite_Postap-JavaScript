/*menuh*/
function menuh12()
{
	menuh12='<div class="menu1" align="left">';
	menuh12+='<div id="menuh">';
	menuh12+='<ul class="pos">';
	menuh12+='<li><a href="#" class="top_parent">О Клане</a> ';
	menuh12+='<ul>';
	
	menuh12+='<li><a href="onas.html">О Нас</a></li>';
	menuh12+='<li><a href="sostavclan.html">Состав клана</a></li>';
	menuh12+='<li><a href="legenda.html">Легенда</a></li>';
	menuh12+='<li><a href="ustav.html">Устав</a></li>';
	menuh12+='<li><a href="vstup.html">Вступ</a></li>';
	menuh12+='<li><a href="diplomati.html" class="brd">Дипломатия</a></li>';
	menuh12+='</ul>';
	menuh12+='</li>';
	menuh12+='</ul>';
	menuh12+='<ul class="pos">';
	menuh12+='<li><a href="#" class="top_parent">U.N.I.T. Online</a>';
	menuh12+='<ul>';
	menuh12+='<li><a href="news.html">Новости</a></li>';
	menuh12+='<li><a href="http://www.unit-online.ru/" target="_blank">Официальный Сайт</a></li>';
	menuh12+='<li><a href="http://forum.unit-online.ru/" target="_blank">Форум Игры</a></li>';
	menuh12+='<li><a href="http://www.unit-online.ru/?r=10343284&qreg=1" target="_blank">Регистрация</a></li>';
	menuh12+='<li><a href="http://unit-online.ru/download/264/setup.exe" target="_blank">Скачать Клиент</a></li>';
	menuh12+='<li><a href="http://forum.unit-online.ru/15/" target="_blank" class="brd">Вопросы по игре</a></li>';
	menuh12+='</ul>';
	menuh12+='</li>';
	menuh12+='</ul>';
	menuh12+='<ul class="pos">';
	menuh12+='<li><a href="#" class="top_parent">Библиотека знаний</a>';
	menuh12+='<ul>';
	menuh12+='<li><a href="etikap.html">Этика пустошей</a></li>';
	menuh12+='<li><a href="#" class="parent">Квесты</a>';
	menuh12+='<ul>';
	menuh12+='<li><a href="qvest1-3.html">1-3</a></li>';
	menuh12+='<li><a href="qvest4-7.html">4-7</a></li>';
	menuh12+='<li><a href="qvest8-10.html">8-10</a></li>';
	menuh12+='<li><a href="qvest11-14.html">11-14</a></li>';
	menuh12+='</ul>';
	menuh12+='</li>';
	menuh12+='<li><a href="orkraft.html">Крафт Оружия</a></li>';
	menuh12+='<li><a href="oruzhzv.html">Ремонт *Оружия</a></li>';
	menuh12+='<li><a href="remor.html">Ремонт Оружия</a></li>';
	menuh12+='<li><a href="efect.html">Эфекты</a></li>';
	menuh12+='<li><a href="tresh.html">Трешь</a></li>';
	menuh12+='<li><a href="nzh.html">НЖ Магазин</a></li>';
	menuh12+='<li><a href="#" class="parent">Видео</a>';
	menuh12+='<ul>';
	menuh12+='<li><a href="vobuchenie.html">Обучение</a></li>';
	menuh12+='<li><a href="vgaid.html">Гайд по Рейдам и Событиям</a></li>';
	menuh12+='<li><a href="http://vk.com/videos-38665577?section=album_50762961">Будни Мини-Тестеров</a></li>';
	menuh12+='<li><a href="http://vk.com/videos-38665577?section=album_46607678">Лига получночников 3</a></li>';
	menuh12+='<li><a href="vpostrelushki.html" class="brd">Пострелушки</a></li>';
	menuh12+='</ul>';
	menuh12+='</li>';
	menuh12+='<li><a href="ng2014podarki.html" class="brd">НГ 2014 О Подарках</a></li>';
	menuh12+='</ul>';
	menuh12+='</li>';
	menuh12+='</ul>';
	menuh12+='<ul class="pos">';
	menuh12+='<li><a href="#" class="top_parent">Сервисы</a> ';
	menuh12+='<ul>';
	menuh12+='<li><a href="poiskprs.html">Поиск персонажа</a></li>';
	menuh12+='<li><a href="zones.html">Захваченные Территории</a></li>';
	menuh12+='<li><a href="orshm.html">Оружие</a></li>';
	menuh12+='<li><a href="Nonline.html">Нижнеатомск online</a></li>';
	menuh12+='<li><a href="sostavS.html">Состав Клана</a></li>';
	menuh12+='</ul>';
	menuh12+='</li>';
	menuh12+='</ul>';
	menuh12+='</div>';
	menuh12+='</div>';
	document.getElementById('menuh12').innerHTML = menuh12;
}
$.ajax({ url: "http://api.unit-online.ru/zones", dataType: "jsonp" }).done(function (result) {
var mass=["Химлаб «Муховни»","Химлаб «ФармКо-1»","ТЭС «Запад»","ТЭС «Восток»","ГЭС-1","ГЭС-3","АЭС «Плутон-1»"
,"АЭС «Протон-2»","АЭС им. Ленина","МСЗ им. Дегтярёва","МСЗ им. Симонова","МСЗ им. Никонова","МЗС \"Стрелково\"",
"НИЛ им. Вернадского","Зона 375"
,"Городская свалка","Комаровский рынок","Старый завод","Кладбище","Пригородный лес",
"Деревня Большие Комары","Стадион","Вертолетная площадка","Мотель"];
	for(i=0;i<24;i++)
	{
		
		for(j=0;j<result.count;j++)
		{
		a=$("#zones").html();
		if(result.zones[j].name==mass[i])
		$("#zones").html(a+"<img src=\"http://unit-online.ru/icons/icon/clan"+result.zones[j].clan + ".png\"> "+result.zones[j].name+" _ _ _ Захвачена: "+result.zones[j].captured.substr(0,4)+"."+result.zones[j].captured.substr(5,2)+"."+result.zones[j].captured.substr(8,2)+"<br>");
		}
	}
	
		});
function sostavScalc() {
			var arr = ["Глава","Зам. главы","Глава БО","Казначей","Офицер","Снайпер","Танк","Штурмовик","Ремесленник","Журналист","Скаут","Рекрутер","Дипломат","Разведчик","Рядовой"];
            c = parseFloat(document.getElementById('sostavSselect').value);
			$.ajax({ url: "http://api.unit-online.ru/online", dataType: "jsonp"  }).done(function (result1) {
			if(c<10)
			{
				$.ajax({ url: "http://api.unit-online.ru/clan?id=100"+c, dataType: "jsonp"  }).done(function (result){
					$("#sostavS").html(" ");
					
					var temp = [];// 0-й Clan 1-й Name 2-й Level 3-й ID
					for(var i=0;;i++)
					{
					
					if(result.users[i+1]!=undefined)
						{
							for(var j=0;;j++)
							{
							if(result.users[j+1]!=undefined)
								{
								if(result.users[j].level<result.users[j+1].level)
								{
									temp[0]=result.users[j].position;
									temp[1]=result.users[j].name;
									temp[2]=result.users[j].level;
									temp[3]=result.users[j].id;
									result.users[j].position=result.users[j+1].position;
									result.users[j].name=result.users[j+1].name;
									result.users[j].level=result.users[j+1].level;
									result.users[j].id=result.users[j+1].id;
									result.users[j+1].position=temp[0];
									result.users[j+1].name=temp[1];
									result.users[j+1].level=temp[2];
									result.users[j+1].id=temp[3];
								}
								}
								else
								break;
								
							}
						}
						else
						break;
					}
					
				   for(var i=0;i<16;i++)
					{
					for(var j=0;;j++)
					{
					if(result.users[j]!=undefined)
					{
					if(result.users[j].position==arr[i])
					{
					a = $("#sostavS").html();
					$("#sostavS").html(a+"<img src="+result.icon + "> " + result.users[j].name+" ["+result.users[j].level+"]"+"<a href=\"http://unit-online.ru/character?id="+result.users[j].id+"\" target=\"_blank\"> <img src=http://forum.unit-online.ru/static/img/info.gif></a>   - "+ result.users[j].position +"<br>");
					}
					}
					else
					break;
					}
					}
				});
				}
				else
				{
				$.ajax({ url: "http://api.unit-online.ru/clan?id=10"+c, dataType: "jsonp"  }).done(function (result) {
					$("#sostavS").html(" ");
					var temp = [];// 0-й Clan 1-й Name 2-й Level 3-й ID
					for(var i=0;;i++)
					{
					
					if(result.users[i+1]!=undefined)
						{
							for(var j=0;;j++)
							{
							if(result.users[j+1]!=undefined)
								{
								if(result.users[j].level<result.users[j+1].level)
								{
									temp[0]=result.users[j].position;
									temp[1]=result.users[j].name;
									temp[2]=result.users[j].level;
									temp[3]=result.users[j].id;
									result.users[j].position=result.users[j+1].position;
									result.users[j].name=result.users[j+1].name;
									result.users[j].level=result.users[j+1].level;
									result.users[j].id=result.users[j+1].id;
									result.users[j+1].position=temp[0];
									result.users[j+1].name=temp[1];
									result.users[j+1].level=temp[2];
									result.users[j+1].id=temp[3];
								}
								}
								else
								break;
								
							}
						}
						else
						break;
					}
					
				   for(var i=0;i<16;i++)
					{
					for(var j=0;;j++)
					{
					if(result.users[j]!=undefined)
					{
					if(result.users[j].position==arr[i])
					{
					a = $("#sostavS").html();
					$("#sostavS").html(a+"<img src="+result.icon + "> " + result.users[j].name+" ["+result.users[j].level+"]"+"<a href=\"http://unit-online.ru/character?id="+result.users[j].id+"\" target=\"_blank\"> <img src=http://forum.unit-online.ru/static/img/info.gif></a>   - "+ result.users[j].position +"<br>");
					}
					}
					else
					break;
					}
					}
				});}});
			}
function poiprscalc() {
c = document.getElementById('poiprsv').value;
console.log(c);
$.ajax({ url: "http://api.unit-online.ru/online?type=user&name="+c, dataType: "jsonp" }).done(function (result) {

if(result.user.name!=undefined)
{

if(result.online==true)
{
a = $("#poiprs").html();
$("#poiprs").html(a+"<br><strong><img src=http://unit-online.ru/icons/icon/clan"+result.user.clan + ".png> " +result.user.name+" ["+result.user.level+"]"+"<a href=\"http://unit-online.ru/character?id="+result.user.id+"\" target=\"_blank\"> <img src=http://forum.unit-online.ru/static/img/info.gif></a>"+"&nbsp;&nbsp; Online</strong>");
}
else
{
a = $("#poiprs").html();
$("#poiprs").html(a+"<br><strong><img src=http://unit-online.ru/icons/icon/clan"+result.user.clan + ".png> " +result.user.name+" ["+result.user.level+"]"+"<a href=\"http://unit-online.ru/character?id="+result.user.id+"\" target=\"_blank\"> <img src=http://forum.unit-online.ru/static/img/info.gif></a>"+"&nbsp;&nbsp; Ofline</strong>");
}
}
else
{
a = $("#poiprs").html();
$("#poiprs").html(a+"Введен не верно Никнейм персонажа!!!");
}
});
}





var an=[];
var aid=[];
var al=[];
var aimg;
$.ajax({ url: "http://api.unit-online.ru/items?type=оружие", dataType: "jsonp" }).done(function (result) {
	/*var mass=["\"Томагавк\"","\"Перфоратор\"","Battle Axe","КСП \"Отбой\"","Катана","\"R-trail\"",
	"M1 Carabine","М16","ПП-91 \"Кедр\"","Винтовка Мосина","AH-94 \"Абакан\"",
	"HK UMP","\"Ivory\"","AH-94 \"Абакан\"","ER-09 \"Sting\"",".Magnum PRO","FAMAS","ОЦ-14 \"Гроза\"","ПП \"Тайфун\"","HK PSG-418",
	"Бекас 12м","Wrath","Saintrow","ПТРД","Гудвин","Расcтрел","Doomsday","Nova Tactical","MGS EX-40",
	"Lasmitter","t-blinker","Harrier",
	"ИП \"Укол\"","ИА \"Донор\"","ИА \"Склиф\"","ИО \"Панацея\"",
	"ОСА-66","Weasel SL","T3 Phalanx","ТЭР \"Ренегат\""];*/
	var temp = [];
	for(var i=0;i<result.count-1;i++)
	{
		for(var j=0;j<result.count-1;j++)
		{
			if(result.items[j].level>result.items[j+1].level)
			{
				temp[0]=result.items[j].name;
				temp[1]=result.items[j].level;
				temp[2]=result.items[j].id;
				result.items[j].name=result.items[j+1].name;
				result.items[j].level=result.items[j+1].level;
				result.items[j].id=result.items[j+1].id;
				result.items[j+1].name=temp[0];
				result.items[j+1].level=temp[1];
				result.items[j+1].id=temp[2];
			}
		}
	}
	for(var i=0;i<result.count;i++)
	{
	an[i]=result.items[i].name;
	aid[i]=result.items[i].id;
	al[i]=result.items[i].level;
	}
});
function orshmpi() {
	n=0;
    orshmpi = '';
    orshmpi += '<select id=\'orshmclans\' class=\'textbox\' >';
	orshmpi+= '<option value=\'-1\'> - Выберите оружие - </option>';
	
    for (j = 0;; j++) {
	if(an[j]!=undefined)
		{
		if(al[j]==n)
		{
		n+=1;
		 orshmpi+='<option disabled>'+al[j]+'</option>';
		}
		else
		{
        orshmpi+='<option value='+aid[j]+' >'+an[j]+'</option>';
		}
		}
		else
		break;
    }
    orshmpi += '</select>';
		n=0;
	orshmpi += '<select id=\'orshmclans1\' class=\'textbox\' >';
	orshmpi+= '<option value=\'-1\'> - Выберите оружие - </option>';
	
    for (j = 0;; j++) {
	if(an[j]!=undefined)
		{
		if(al[j]==n)
		{
		n+=1;
		 orshmpi+='<option disabled>'+al[j]+'</option>';
		}
		else
		{
        orshmpi+='<option value='+aid[j]+' >'+an[j]+'</option>';
		}
		}
		else
		break;
    }
    document.getElementById('orshmha').innerHTML = orshmpi;
}
function orshmcalc() 
{$("#orshm").html(" ");
$("#orshm1").html(" ");
		c = parseFloat(document.getElementById('orshmclans').value);
		$.ajax({ url: "http://api.unit-online.ru/item?id="+c, dataType: "jsonp"  }).done(function (result){
		b=$("#orshm").html();
		$("#orshm").html(b+"<img src=\""+result.item.image+"\"><br>");
		for(var i=0;;i++)
		{
		if(result.item.params[i]!=undefined)
		{
		b=$("#orshm").html();
		$("#orshm").html(b+result.item.params[i].name+" "+result.item.params[i].value+"<br>");
		}
		else
		break;
		}
		});
			
		d = parseFloat(document.getElementById('orshmclans1').value);
		$.ajax({ url: "http://api.unit-online.ru/item?id="+d, dataType: "jsonp"  }).done(function (result){
			
		b=$("#orshm1").html();
		$("#orshm1").html(b+"<img src=\""+result.item.image+"\" ><br>");
		for(var i=0;;i++)
		{
		if(result.item.params[i]!=undefined)
		{
		b=$("#orshm1").html();
		$("#orshm1").html(b+result.item.params[i].name+" "+result.item.params[i].value+"<br>");
		}
		else
		break;
		}
		});
}
$.ajax({ url: "http://api.unit-online.ru/online", dataType: "jsonp"  }).done(function (result) {
	var arr = [1007,1001,1052,1021,1030,1010,1004,1002,1016,1045,1043,1034,1006,1020,1033,1039];
	var arr1=["Dark Jokers","Invisibles","Царапычи","Легион Смерти","Стражи Яра","Equilibrium","Soldiers of Fortune","Братство Стали","Бригада","ГУВД","Миротворцы","Орден Джада","Особый Комитет","S.Corp","СПЕЦНАЗ","ХэД Хантерс"];
	$("#nonlinecount1").html(result.count);
	$("#nonlinecount2").html(result.invisible);
	var a;
	var b;
	var c=0;
	var temp = [];// 0-й Clan 1-й Name 2-й Level 3-й ID
	for(var i=0;i<result.count-result.invisible;i++)
	{
			for(var j=0;j<(result.count-1)-result.invisible;j++)
			{
				if(result.users[j].level<result.users[j+1].level)
				{
					temp[0]=result.users[j].clan;
					temp[1]=result.users[j].name;
					temp[2]=result.users[j].level;
					temp[3]=result.users[j].id;
					result.users[j].clan=result.users[j+1].clan;
					result.users[j].name=result.users[j+1].name;
					result.users[j].level=result.users[j+1].level;
					result.users[j].id=result.users[j+1].id;
					result.users[j+1].clan=temp[0];
					result.users[j+1].name=temp[1];
					result.users[j+1].level=temp[2];
					result.users[j+1].id=temp[3];
				}
			}
	}
	/*СМОТРИ ВЫШЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕ*/
	for(var i=0;i<16;i++)
	{
		for(var j=0;j<result.count-result.invisible;j++)
		{
			if(result.users[j].clan==arr[i])
			{	
			if(b!=i)
			{
			a = $("#nonlinePPS").html(); 
			$("#nonlinePPS").html(a+"<br><b>"+arr1[i]+":</b>");
			}
			if(result.users[j].clan!=undefined)
			{
				a = $("#nonlinePPS").html();
				if(b!=i)
				{
				$("#nonlinePPS").html(a+ "<br><img src=http://unit-online.ru/icons/icon/clan" + result.users[j].clan + ".png> " + result.users[j].name+" ["+result.users[j].level+"]"+"<a href=\"http://unit-online.ru/character?id="+result.users[j].id+"\"target=\"_blank\"> <img src=http://forum.unit-online.ru/static/img/info.gif></a><br>");
				b=i;
				}
				else
				$("#nonlinePPS").html(a+ "<img src=http://unit-online.ru/icons/icon/clan" + result.users[j].clan + ".png> " + result.users[j].name+" ["+result.users[j].level+"]"+"<a href=\"http://unit-online.ru/character?id="+result.users[j].id+"\"target=\"_blank\"> <img src=http://forum.unit-online.ru/static/img/info.gif></a><br>");
			}
			}
		}
	}
	a = $("#nonlinePPS").html();
	$("#nonlinePPS").html(a+"<br>");
	for(var i=0;i<result.count-result.invisible;i++)
	{
	if(result.users[i].clan==undefined)
	{
	a = $("#nonlinePPS").html();
		$("#nonlinePPS").html(a+ "" + result.users[i].name+" ["+result.users[i].level+"]"+"<a href=\"http://unit-online.ru/character?id="+result.users[i].id+"\"target=\"_blank\"> <img src=http://forum.unit-online.ru/static/img/info.gif></a><br>");
			}
			}
});
function sostavclancalc() {
			var arr = ["Глава","Зам. главы","Глава БО","Казначей","Офицер","Снайпер","Танк","Штурмовик","Ремесленник","Журналист","Скаут","Рекрутер","Дипломат","Разведчик","Рядовой"];
            c = 37;
				$.ajax({ url: "http://api.unit-online.ru/clan?id=10"+c, dataType: "jsonp"  }).done(function (result){
					$("#sostavclan").html(" ");
					
					var temp = [];// 0-й Clan 1-й Name 2-й Level 3-й ID
					for(var i=0;;i++)
					{
					
					if(result.users[i+1]!=undefined)
						{
							for(var j=0;;j++)
							{
							if(result.users[j+1]!=undefined)
								{
								if(result.users[j].level<result.users[j+1].level)
								{
									temp[0]=result.users[j].position;
									temp[1]=result.users[j].name;
									temp[2]=result.users[j].level;
									temp[3]=result.users[j].id;
									result.users[j].position=result.users[j+1].position;
									result.users[j].name=result.users[j+1].name;
									result.users[j].level=result.users[j+1].level;
									result.users[j].id=result.users[j+1].id;
									result.users[j+1].position=temp[0];
									result.users[j+1].name=temp[1];
									result.users[j+1].level=temp[2];
									result.users[j+1].id=temp[3];
								}
								}
								else
								break;
								
							}
						}
						else
						break;
					}
					
				   for(var i=0;i<16;i++)
					{
					for(var j=0;;j++)
					{
					if(result.users[j]!=undefined)
					{
					if(result.users[j].position==arr[i])
					{
					a = $("#sostavclan").html();
					$("#sostavclan").html(a+"<img src="+result.icon + "> " + result.users[j].name+" ["+result.users[j].level+"]"+"<a href=\"http://unit-online.ru/character?id="+result.users[j].id+"\" target=\"_blank\"> <img src=http://forum.unit-online.ru/static/img/info.gif></a>   - "+ result.users[j].position +"<br>");
					}
					}
					else
					break;
					}
					}
				});
				}