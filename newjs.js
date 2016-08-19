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
	console.log(an[i-1]+al[i-1]);
	
	}
	
});

function orshmpi() {
for(i=0;i<4;i++)
{console.log(an[i]+al[i]+"внешний");

$.ajax({ url: "http://api.unit-online.ru/item?id="+aid[i], dataType: "jsonp"  }).done(function (result1){
	console.log(an[i]+al[i]+"sdasdasdasdasdasdasdasdadas");
	});
}	
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