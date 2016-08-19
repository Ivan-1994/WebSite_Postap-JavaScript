 //Составы кланов
 var clansMembership = {};
 clansMembership._construct = function() {
    var clanArr = Array(), clanInfo = Array(), currSort;
    function drawTable() {
      $('#sort').show();
      $('#list').html('');
      table = $('<table>').attr({width:'100%',id:'clanTable'}).appendTo('#list');
      var row, cell;
      row = $('<tr>').attr('class','tbl2').appendTo(table);
      cell = $('<td height=20 valign=middle>').attr({colspan:4,align:'center',width:'100%'}).html("Состав клана " + makeClanString(clanInfo['id'], clanInfo['name'])).appendTo(row);
      row = $('<tr>').attr('class','tbl2').appendTo(table);
      cell = $('<td>').attr({colspan:4,width:'100%'}).appendTo(row);
      var tbl1 = $('<table>').attr('width','100%').appendTo(cell);
      row = $('<tr>').attr({class:'tbl1',align:'center'}).appendTo(tbl1);
      cell = $('<td>').attr('width','50%').html("Персонажей в клане: " + clanArr.length).appendTo(row);
      cell = $('<td>').attr('width','50%').html("Средний уровень: " + calculateAverageLevel(clanArr)).appendTo(row);
      row = $('<tr>').attr('class','tbl2').appendTo(table).appendTo(table);
      cell = $('<td>').attr({colspan:4,width:'100%'}).appendTo(row);
      var tbl1 = $('<table>').attr({width:'100%',align:'center'}).appendTo(cell);
      row = $('<tr>').attr({class:'tbl1',align:'center'}).appendTo(tbl1);
      cell = $('<td>').attr('width','50%').html("<a href='" + clanInfo['site'] + "' target='_blank'>[сайт клана]</a>").appendTo(row);
      cell = $('<td>').attr('width','50%').html("<a href='http://unit-news.ru.mastertest.ru/viewpage.php?page_id=6&clan_id=" + clanInfo['cid'] + "'>[события клана]</a>").appendTo(row);
      row = $('<tr>').attr({class:'tbl1',align:'center'}).appendTo(table);
      cell = $('<td height=20 valign=middle align=center>').attr('width','30%').html("Ник").appendTo(row);
      cell = $('<td height=20 valign=middle align=center>').attr('width','15%').html("Звание").appendTo(row);
      cell = $('<td height=20 valign=middle align=center>').attr('width','35%').html("Статус").appendTo(row);
      cell = $('<td height=20 valign=middle align=center>').attr('width','20%').html("События персонажа").appendTo(row);
      for(var i = 0; i < clanArr.length; i++) {
        row = $('<tr>').attr('class',(i % 2 ? 'tbl1' : 'tbl2')).appendTo(table);
        cell = $('<td height=20 valign=middle>').attr('width','30%').html("&nbsp;" + makeUserString(clanArr[i]['id'], clanArr[i]['name'], clanArr[i]['level'], clanArr[i]['clan']) + "").appendTo(row);
        cell = $('<td height=20 valign=middle align=center>').attr('width','20%').html(clanArr[i]['position']).appendTo(row);
        if(clanArr[i]['position_id'] == 2) {
          cell.css('fontWeight','bold');
        } else if(clanArr[i]['position_id'] == 1) {
          cell.css({color:'red',fontWeight:'bold'});
        }
        cell = $('<td height=20 valign=middle align=center>').attr('width','35%').html(clanArr[i]['last_online']==0?"<span style='color:green'><b>Online</b></span>":"Последний online: " + clanArr[i]['last_online']).appendTo(row);
        cell = $('<td height=20 valign=middle>').attr({width:'20%',align:'center'}).html("<a href='http://unit-news.ru.mastertest.ru/viewpage.php?page_id=6&pid=" + clanArr[i]['id'] + "'>[смотреть]</a>").appendTo(row);
      }
    }
  function calculateAverageLevel(clanArr) {
    var sum = 0;
    for( var i = 0; i < clanArr.length; i++ ) {
      sum += clanArr[i]['level'];
    }
    return ( sum / clanArr.length ).toFixed(2);
  }
  function sort(type) {
    currSort = type;
    switch(type) {
      case 'level':
        $('#level').css('fontWeight','bold');
        $('#position').css('fontWeight','normal');
        $('#online').css('fontWeight','normal');
        clanArr.sort(sortByLevel);
      break;
      case 'online':
        $('#online').css('fontWeight','bold');
        $('#level').css('fontWeight','normal');
        $('#position').css('fontWeight','normal');
        clanArr.sort(sortByOnline);
      break;
      case 'position':
        $('#position').css('fontWeight','bold');
        $('#level').css('fontWeight','normal');
        $('#online').css('fontWeight','normal');
        clanArr.sort(sortByPosition);
      break;
    }
    if( clanArr.length == 0 )
      return;
    drawTable();
  }
  function sortByPosition(a, b) {
    if( a['position_id'] < b['position_id'] ) {
      if( a['position_id'] == 0 ) {
        return 1;
      } else {
        return -1;
      }
    } else if( a['position_id'] > b['position_id'] ) {
      if( b['position_id'] == 0 ) {
        return -1;
      } else {
        return 1;
      }
    } else {
      if( a['level'] != b['level'] ) {
        return b['level'] - a['level'];
      } else {
        return a['name'].localeCompare(b['name']);
      }
    }
  }
  function sortByLevel(a, b) {
    if( a['level'] != b['level'] ) {
      return b['level'] - a['level'];
    } else {
      return a['name'].localeCompare(b['name']);
    }
  }
  function sortByOnline(a, b) {
    if( a['last_online'] == 0 && b['last_online'] == 0 ) {
      if( a['level'] != b['level'] ) {
        return b['level'] - a['level'];
      } else {
        return a['name'].localeCompare(b['name']);
      }
    } else if( a['last_online'] != 0 && b['last_online'] != 0 ){
      return b['last_online'].localeCompare(a['last_online']);
    } else if( a['last_online'] == 0 ) {
     return -1;
    } else {
     return 1;
    }
  }
  function update() {
      if ($("#clans").attr('selectedIndex') == 0) {
        return;
      }
      $('#sort').hide();
      requestList();
   }
  function callback(responseText) {
    $('#list').html('');
    clanInfo = Array();
    clanArr = Array();
    clanInfo['id'] = $('logo',responseText).text();
    clanInfo['cid'] = $('cid',responseText).text();
    clanInfo['name'] = $('clan_name',responseText).text();
    clanInfo['site'] = $('clan_site',responseText).text();
    var players = $('player',responseText);
    for(var i = 0; i < players.length; i++) {
      clanArr[i] = Array();
      clanArr[i]['id'] = $('id',players[i]).text();
      clanArr[i]['name'] = $('name',players[i]).text();
      clanArr[i]['level'] = parseInt($('level',players[i]).text());
      clanArr[i]['clan'] = clanInfo['id'];
      clanArr[i]['position'] = $('position',players[i]).text();
      clanArr[i]['last_online'] = $('last_online',players[i]).text();
      clanArr[i]['position_id'] = parseInt($('position_id',players[i]).text());
    }
    sort(currSort);
  }
  this.callback = callback;
  this.update = update;
  this.sort=sort;
}
clansMembership._construct();

//Нижнеатомск онлайн
var unitOnline = {};
unitOnline._construct = function() {
  function update() {
    if ($("#clans").attr('selectedIndex') == 0) {
      return;
    }
    requestList();
  }
  function callback(responseText) {
    $('#list').html('');
    var table = $('<table>').attr('width','100%').appendTo('#list');
    var cell, row;
    var clans = $('clan',responseText);
    var clan_id, id;
    for( var i = 0; i < clans.length; i++ ) {
      row = $('<tr>').attr({class:'tbl2',align:'center',height:'20'}).appendTo(table);
      cell = $('<td>').attr('colspan',2).appendTo(row);
      clan_id = $('clan_id',clans[i]).text();
      id = $('id',clans[i]).text();
      var online = $('player',clans[i]);
      if(clan_id != 0) {
        if(online.length != 0) {
          cell.html(makeClanString(clan_id, clans[i].getElementsByTagName('clan_name').item(0).firstChild.nodeValue) + "");
        } else {
          cell.html("Все игроки клана " + makeClanString(clan_id, clans[i].getElementsByTagName('clan_name').item(0).firstChild.nodeValue) + " находятся <span style='color:red'>offline</span>.");
        }
        row = $('<tr>').attr({class:'tbl1',align:'center',height:'20'}).appendTo(table);
        cell = $('<td>').html("<a href='viewpage.php?page_id=4&clan_id=" + id + "'>[состав клана]</a>").appendTo(row);
        cell = $('<td>').html("<a href='viewpage.php?page_id=6&clan_id=" + id + "'>[события клана]</a>").appendTo(row);
      } else {
        cell.html("<strong>" + $('clan_name',clans[i]).text() + "</strong>");
      }
      for( var j = 0; j < online.length; j++ ) {
        row = $('<tr>').appendTo(table);
        cell = $('<td>').attr('width', '50%').html(makeUserString($('pid',online[j]).text(), 
                                        $('name',online[j]).text(),
                                        $('level',online[j]).text(),
                                        clan_id)).appendTo(row);
        cell = $('<td>').attr('width', '50%').html("В игре с " + $('login',online[j]).text());
      }
    }
  }
  this.update = update;
  this.callback = callback;
}
unitOnline._construct();

//История событий
var unitEvents = {};
unitEvents._construct = function() {
  function update(clear) {
    $("#navigation").html('');
    if(clear) {
      pageNav.reset();
    }
    requestList();
  }
  function callback(responseText) {
    $("#navigation").html('');
    $("#list").html('');
    var table = $('<table>').attr('width','100%').appendTo('#list');
    var cell, row, pid, clan_id, level, name, clan_name;
    var events = $('event', responseText);
    for(var i = 0; i < events.length; i++) {
      row = $('<tr>').attr('class', i % 2 ? 'tbl1' : 'tbl2').appendTo(table);
      pid = $('pid',events[i]).text();
      clan_id = $('clan_id',events[i]).text();
      level = $('level',events[i]).text();
      name = $('name',events[i]).text();
      clan_name = $('clan_name',events[i]).text();
      cell = $('<td height=20 valign=middle>').attr('width', '25%').html($('time',events[i]).text()).appendTo(row);
      cell = $('<td height=20 valign=middle>').attr('width', '75%').appendTo(row);
      switch( $('type',events[i]).text() ) {
        case '1': {
          cell.html('&nbsp;Персонаж ' + makeUserString(pid, name, level, clan_id) + ' перешел с ' + (level - 1) + ' на ' + level + ' уровень.');
          break;
        }
        case '2': {
          cell.html('&nbsp;Персонаж ' + makeUserString(pid, name, level, 0) + ' покинул клан ' + makeClanString(clan_id, clan_name) + '.');
          break;
        }
        case '3': {
          cell.html('&nbsp;Персонаж ' + makeUserString(pid, name, level, clan_id) + ' вступил в клан ' + makeClanString(clan_id, clan_name) + '.');
          break;
        }
      }
    }
    $("#navigation").html(pageNav.makepagenav(parseInt($('start',responseText).text()),
                           parseInt($('count',responseText).text()),
                           parseInt($('total',responseText).text()), 2, unitEvents.update));
  }
  this.update = update;
  this.callback = callback;
}
unitEvents._construct();

var unitRating = {};
unitRating._construct = function() {
  function update() {
    requestList();
  }
  function callback(responseText) {
    $("#list").html('');
    var table = $('<table>').attr('width','100%').appendTo("#list");
    var cell, row, pid, clan_id, level, name, clan_name, diff;
    var maroders = $('maroders > person',responseText);
    var killers = $('killers > person',responseText);
    row = $('<tr>').appendTo(table);
    cell = $('<td>').attr({colspan:2,align:'center'}).html('Мародеры').appendTo(row);
    cell = $('<td>').attr({colspan:2,align:'center'}).html('Убийцы').appendTo(row);
    for(var i = 0; i < maroders.length; i++) {
      row = $('<tr>').attr('class', i % 2 ? 'tbl1' : 'tbl2').appendTo(table);
      pid = $('pid',maroders[i]).text();
      clan_id = $('clan_id',maroders[i]).text();
      level = $('level',maroders[i]).text();
      name = $('name',maroders[i]).text();
      diff = $('diff',maroders[i]).text();
      cell = $('<td>').attr('width', '10%').html((i + 1) + ' ' + makeDiff(diff)).appendTo(row);
      cell = $('<td>').attr('width', '40%').html(makeUserString(pid, name, level, clan_id)).appendTo(row);
      pid = $('pid',killers[i]).text();
      clan_id = $('clan_id',killers[i]).text();
      level = $('level',killers[i]).text();
      name = $('name',killers[i]).text();
      diff = $('diff',killers[i]).text();
      cell = $('<td>').attr('width', '10%').html((i + 1) + ' ' + makeDiff(diff)).appendTo(row);
      cell = $('<td>').attr('width', '40%').html(makeUserString(pid, name, level, clan_id)).appendTo(row);
    }
  }
  function makeDiff(diff) {
    if(diff < 0) {
      return '<font color=\'red\'>' + diff + '</font>';
    } else if (diff > 0){
      return '<font color=\'green\'>+' + diff + '</font>';
    } else {
      return '<font color=\'green\'>' + diff + '</font>';
    }
  }
  this.update = update;
  this.callback = callback;
}
unitRating._construct();

var zones = {};
zones._construct = function() {
  var zonesInfo, currSort;
  function drawTable() {
    $('#list').html('');
    $('#sort').css('display','block');
    var table = $('<table>').attr('width','100%').appendTo('#list');
    var row, cell;
    row = $('<tr>').attr('align','center').css('fontWeight','bold').appendTo(table);
    cell = $('<td>').attr('width','30%').html('Локация').appendTo(row);
    cell = $('<td>').attr('width','20%').html('Координаты').appendTo(row);
    cell = $('<td>').attr('width','30%').html('Владелец').appendTo(row);
    cell = $('<td>').attr('width','20%').html('Владеет с').appendTo(row);
    for(var i = 0; i < zonesInfo.length; i++) {
      row = $('<tr>').attr('class', i%2 ?'tbl1':'tbl2').appendTo(table);
      cell = $('<td height=20 valign=middle>').html(zonesInfo[i]['name']).appendTo(row);
      cell = $('<td height=20 valign=middle align=center>').html('('+zonesInfo[i]['x']+';'+zonesInfo[i]['y']+')').appendTo(row);
      cell = $('<td height=20 valign=middle>').html(makeClanString(zonesInfo[i]['clan_id'],zonesInfo[i]['clan_name'])).appendTo(row);
      cell = $('<td height=20 valign=middle align=center>').html(zonesInfo[i]['time']).appendTo(row);
    }
  }
  function update() {
    $('#sort').css('display','none');
    requestList();
  }
  function callback(responseText) {
    var zones = $('zone',responseText);
    zonesInfo = Array();
    for(var i = 0; i < zones.length; i++) {
      zonesInfo[i] = Array();
      zonesInfo[i]['name'] = $('name',zones[i]).text();
      zonesInfo[i]['x'] = $('x',zones[i]).text();
      zonesInfo[i]['y'] = $('y',zones[i]).text();
      zonesInfo[i]['clan_id'] = $('clan_id',zones[i]).text();
      zonesInfo[i]['clan_name'] = $('clan_name',zones[i]).text();
      zonesInfo[i]['time'] = $('time',zones[i]).text();
    }
    sort(currSort);
  }
  function sort(type) {
    currSort = type;
    switch(type) {
      case 'loc':
        $('#loc').css('fontWeight','bold');
        $('#own').css('fontWeight','normal');
        $('#tim').css('fontWeight','normal');
        zonesInfo.sort(sortByLoc);
      break;
      case 'own':
        $('#own').css('fontWeight','bold');
        $('#loc').css('fontWeight','normal');
        $('#tim').css('fontWeight','normal');
        zonesInfo.sort(sortByOwn);
      break;
      case 'time':
        $('#tim').css('fontWeight','bold');
        $('#loc').css('fontWeight','normal');
        $('#own').css('fontWeight','normal');
        zonesInfo.sort(sortByTime);
      break;
    }
    if( zonesInfo.length == 0 ) {
      $('#list').css('text-align','center').html('По Вашему запросу ничего не найдено');
      return;
    }
    drawTable();
  }
  function sortByLoc(a, b) {
    return a['name'].localeCompare(b['name']);
  }
  function sortByOwn(a, b) {
    return a['clan_name'].localeCompare(b['clan_name']);
  }
  function sortByTime(a, b) {
    return a['time'].localeCompare(b['time']);
  }
  function historyCallback(responseText) {
    $("#navigation").html('');
    $('#zonesHistory').html('');
    var table = $('<table>').attr('width','100%').appendTo('#zonesHistory');
    var events = $('event', responseText);
    var row;
    for(var i = 0; i < events.length; i++) {
      row = $('<tr>').appendTo(table);
      $('<td>').attr('width','30%').html($('time',events[i]).text()).appendTo(row);
      $('<td>').attr('width','70%').html(locHistoryStr($('name',events[i]).text(),$('from > clan_id',events[i]).text(),$('from > clan_name',events[i]).text(),
                                                       $('to > clan_id',events[i]).text(), $('to > clan_name',events[i]).text())).appendTo(row);
    }
    $("#navigation").html(pageNav.makepagenav(parseInt($('start',responseText).text()),
                           parseInt($('count',responseText).text()),
                           parseInt($('total',responseText).text()), 2, zones.historyUpdate));
  }
  function historyUpdate(clear) {
    $("#navigation").html('');
    if(clear) {
      pageNav.reset();
    }
    requestHistory();
  }
  this.update = update;
  this.callback = callback;
  this.sort = sort;
  this.historyCallback = historyCallback;
  this.historyUpdate = historyUpdate;
}
zones._construct();

var unitLatestEvents = {};
unitLatestEvents._construct = function() {
  function show(arr, type) {
    $('#show').html('');
    switch(type) {
      case 'events':
      $('#events').css('fontWeight','bold');
      $('#zones').css('fontWeight','normal');
      var table = $('<table>').attr('width','100%').appendTo('#show');
      var row;
      for(var i = 0; i < events[0].length; i++) {
        row = $('<tr>').appendTo(table);
        $('<td>').attr('width','20%').html(events[0][i][5]).appendTo(row);
        $('<td>').attr('width','80%').html(makeEventString(events[0][i])).appendTo(row);
      }
      $('<div>').attr('width','100%').css('text-align','right').html('<a href="http://unit-news.ru.mastertest.ru/viewpage.php?page_id=1">Подробнее...</a>').appendTo('#show');
      break;

      case 'zones':
      $('#events').css('fontWeight','normal');
      $('#zones').css('fontWeight','bold');
      var table = $('<table>').attr('width','100%').appendTo('#show');
      for(var i = 0; i < events[1].length; i++) {
        var row = $('<tr>').appendTo(table);
        $('<td>').attr('width','20%').html(events[1][i][3]).appendTo(row);
        $('<td>').attr('width','80%').html(locHistoryStr(events[1][i][0],events[1][i][1][0],events[1][i][1][1],events[1][i][2][0],events[1][i][2][1])).appendTo(row);
      }
      $('<div>').attr('width','100%').css('text-align','right').html('<a href="http://unit-news.ru.mastertest.ru/viewpage.php?page_id=2">Подробнее...</a>').appendTo('#show');
      break;
    }
  }
  function makeEventString(arr) {
    switch( arr[3] )
    {
      case 1: {
        return "Персонаж " + makeUserString(arr[0], arr[1], arr[4], arr[6]) + " перешел с " + (arr[4] - 1) + " на " + arr[4] + " уровень.";
      }
      break;

      case 2: {
        return "Персонаж " + makeUserString(arr[0], arr[1], arr[4], 0) + " покинул клан " + makeClanString(arr[6], arr[7]) + ".";
      }
      break;

      case 3: {
        return "Персонаж " + makeUserString(arr[0], arr[1], arr[4], arr[6]) + " вступил в клан " + makeClanString(arr[6], arr[7]) + ".";
      }
      break;

      case 4: {
        return "Персонаж " + makeUserString(arr[0], arr[1], arr[4], arr[6]) + " сменил ник на <b>" + arr[2] + "</b>.";
      }
      break;

      case 5: {
        return "Зарегистрирован клан " + makeClanString(arr[6], arr[7]) + ".";
      }
      break;

      case 6: {
        return "Расформирован клан " + makeClanString(arr[6], arr[7]) + ".";
      }
      break;

      default:
        return "";
      break;
    }
  }
  this.show = show;
}
unitLatestEvents._construct();

var clanTop = {};
clanTop._construct = function() {
  var sort;
  function sort(type) {
    sort = type;
    switch(type) {
      case 'count':
        $('#count').css('fontWeight','bold');
        $('#avg').css('fontWeight','normal');
        $('#zones').css('fontWeight','normal');
        $('#online').css('fontWeight','normal');
        $('#online_avg').css('fontWeight','normal');
        clans.sort(countSort);
      break;
      case 'avg':
        $('#count').css('fontWeight','normal');
        $('#avg').css('fontWeight','bold');
        $('#zones').css('fontWeight','normal');
        $('#online').css('fontWeight','normal');
        $('#online_avg').css('fontWeight','normal');
        clans.sort(avgSort);
      break;
      case 'zones':
        $('#count').css('fontWeight','normal');
        $('#avg').css('fontWeight','normal');
        $('#zones').css('fontWeight','bold');
        $('#online').css('fontWeight','normal');
        $('#online_avg').css('fontWeight','normal');
        clans.sort(zonesSort);
      break;
      case 'online':
        $('#count').css('fontWeight','normal');
        $('#avg').css('fontWeight','normal');
        $('#zones').css('fontWeight','normal');
        $('#online').css('fontWeight','bold');
        $('#online_avg').css('fontWeight','normal');
        clans.sort(onlineSort);
      break;
      case 'online_avg':
        $('#count').css('fontWeight','normal');
        $('#avg').css('fontWeight','normal');
        $('#zones').css('fontWeight','normal');
        $('#online').css('fontWeight','normal');
        $('#online_avg').css('fontWeight','bold');
        clans.sort(onlineAvgSort);
      break;
    }
    drawTable();
  }
  function countSort(a,b) {
    if(a[3] == b[3]) {
      return a[1].localeCompare(b[1]);
    } else {
      return b[3] - a[3];
    }
  }
  function avgSort(a,b) {
    if(a[2] == b[2]) {
      return a[1].localeCompare(b[1]);
    } else {
      return b[2] - a[2];
    }
  }
  function zonesSort(a,b) {
    if(a[4] == b[4]) {
      return a[1].localeCompare(b[1]);
    } else {
      return b[4] - a[4];
    }
  }
  function onlineSort(a,b) {
    if(a[5] == b[5]) {
      return a[1].localeCompare(b[1]);
    } else {
      return b[5] - a[5];
    }
  }
  function onlineAvgSort(a,b) {
    if(a[6] == b[6]) {
      return a[1].localeCompare(b[1]);
    } else {
      return b[6] - a[6];
    }
  }
  function drawTable() {
    $('#rating').html('');
    var table = $('<table>').attr('width','100%').appendTo('#rating');
    var row = $('<tr>').attr('align','center').css('fontWeight','bold').appendTo(table);
    $('<td>').attr('width','10%').css('align','center').html('').appendTo(row);
    $('<td>').attr('width','50%').html('Клан').appendTo(row);
    switch(sort) {
      case 'count':
        $('<td>').attr('width','40%').html('Количество персонажей').appendTo(row);
      break;
      case 'avg':
        $('<td>').attr('width','40%').html('Средний уровень').appendTo(row);
      break;
      case 'zones':
        $('<td>').attr('width','40%').html('Количество территорий').appendTo(row);
      break;
      case 'online':
        $('<td>').attr('width','20%').html('Количество персонажей онлайн').appendTo(row);
        $('<td>').attr('width','20%').html('Средний уровень персонажей онлайн').appendTo(row);
      break;
      case 'online_avg':
        $('<td>').attr('width','20%').html('Количество персонажей онлайн').appendTo(row);
        $('<td>').attr('width','20%').html('Средний уровень персонажей онлайн').appendTo(row);
      break;
    }
    for(var i = 0; i < clans.length; i++) {
      var row = $('<tr>').attr('class',i%2?'tbl1':'tbl2').appendTo(table);
      $('<td valign=middle align=center>').css('align','center').html(i+1).appendTo(row);
      $('<td valign=middle> ').html(makeClanString(clans[i][0],clans[i][1])).appendTo(row);
      switch(sort) {
        case 'count':
          $('<td height=20 valign=middle align=center>').html(clans[i][3]).appendTo(row);
        break;
        case 'avg':
          $('<td height=20 valign=middle align=center>').html(clans[i][2]).appendTo(row);
        break;
        case 'zones':
          $('<td height=20 valign=middle align=center>').html(clans[i][4]).appendTo(row);
        break;
        case 'online':
          $('<td height=20 valign=middle align=center>').html(clans[i][5]).appendTo(row);
          $('<td height=20 valign=middle align=center>').html(clans[i][6]).appendTo(row);
        break;
        case 'online_avg':
          $('<td height=20 valign=middle align=center>').html(clans[i][5]).appendTo(row);
          $('<td height=20 valign=middle align=center>').html(clans[i][6]).appendTo(row);
        break;
      }
    }
  }
  this.sort = sort;
}
clanTop._construct();

var weapon = {};
weapon._construct = function() {
  var _type;
  function update(type) {
    _type = type;
    $('#bb').css('fontWeight','normal');
    $('#e').css('fontWeight','normal');
    $('#l').css('fontWeight','normal');
    $('#t').css('fontWeight','normal');
    switch(type) {
      case 'bb':
        $('#bb').css('fontWeight','bold');
      break;
      case 'l':
        $('#l').css('fontWeight','bold');
      break;
      case 't':
        $('#t').css('fontWeight','bold');
      break;
      case 'e':
        $('#e').css('fontWeight','bold');
      break;
    }
    requestList();
  }
  function callback(responseText) {
    $('#list').html('');
    var w = $('w',responseText);
    if(w.length == 0) {
      $('<div>').attr('align','center').html('<br><br>По Вашему запросу ничего не найдено.').appendTo('#list');
      return;
    }
    var table = $('<table>').attr('width','100%').appendTo('#list');
    var row;
    for(var i = 0; i < w.length; i++) {
      row = $('<tr>').attr('class','tbl1').appendTo(table);
      $('<td>').attr({align:'center',width:'20%'}).css('fontWeight','bold').html($('name',w[i])).appendTo(row);
      $('<td>').attr('width','80%').html('Свойства и требования').appendTo(row);
      row = $('<tr>').attr('class','tbl2').appendTo(table);
      $('<td>').attr({align:'center',width:'20%'}).html($('<img>').attr('src','img/inv/'+$('image',w[i]).text())).appendTo(row);
      $('<td>').attr('width','80%').html('Уровень: ' + $('level',w[i]).text() + '<br />Стоимость: ' + $('cost',w[i]).text()+'<br />Вес: '+$('weight',w[i]).text()+
                                         '<br />Тип атаки: '+$('type',w[i]).text()+'<br />Урон: '+$('min_damage',w[i]).text()+' - '+$('max_damage',w[i]).text()+
                                         '<br />Точность: '+$('accuracy',w[i]).text()+'<br />Пробой брони: '+$('armor_breakdown',w[i]).text()+'<br />Дальность: '+
                                         $('distance',w[i]).text()+'<br />Скорость атаки: '+$('shooting_speed',w[i]).text()+'<br />Перезарядка: '+$('rechange_speed',w[i]).text()+
                                         ($('cage',w[i]).text() != '0' ? ('<br />Вместимость магазина: '+$('cage',w[i]).text()+'<br />Тип патронов: '+$('ammunition',w[i]).text()):'')+
                                         ($('grouping',w[i]).text() != 'None' ? ('<br />Кучность: '+$('grouping',w[i]).text()):'')+
                                         ($('critical_point',w[i]).text() != '0' ? ('<br />Критическая точка: '+$('critical_point',w[i]).text()):'')+
                                         ($('count',w[i]).text() != '0' ? ('<br />Патронов в очереди: '+$('count',w[i]).text()):'')+
                                         '<br />Необходимый навык: '+$('skill',w[i]).text()+'<br />Мин. сила: '+$('strength',w[i]).text()+'<br />Прочность: '+
                                         $('robustness',w[i]).text()).appendTo(row);
    }
  }
  function type() {
    return _type;
  }
  this.type = type;
  this.callback = callback;
  this.update = update;
}
weapon._construct();

var presents = {};
presents._construct = function() {
  var _type = 'count';
  var _cat;
  function update(clear) {
    $('#navigation').html('');
    $('#total').html('');
    if(clear) {
      pageNav.reset();
    }
    requestData();
  }
  function callback(responseText) {
    $('#list').html('');
    var table = $('<table>').attr('width','100%').appendTo('#list');
    var row, cell;
    var parr = $('p',responseText);
    var types = $('t',responseText);
    row = $('<tr>').attr('align','center').appendTo(table);
    $('<td height=20 valign=middle align=center>').attr('width','6%').appendTo(row);
    $('<td height=20 valign=middle>').attr('width','34%').html('Персонаж').appendTo(row);
    for(var i = 0; i < types.length; i++) {
      cell = $('<td>').attr('width',60/types.length+'%').appendTo(row);
      $('<img>').attr({onClick:'presents.sort(\"'+$('type',types[i]).text()+'\");',id:'p'+$('type',types[i]).text(),src:'img/presents/p'+$('type',types[i]).text()+'.png',title:$('cost',types[i]).text()+($('real',types[i]).text()=='0'?' руб':' кр')}).css('cursor','pointer').appendTo(cell);
    }
    for(var i = 0; i < parr.length; i++) {
      row = $('<tr>').attr('class',(i%2?'tbl1':'tbl2')).appendTo(table);
      $('<td height=20 valign=middle align=center>').html(parseInt($('start',responseText).text())+i+1).appendTo(row);
      $('<td height=20 valign=middle>').html(makeUserString($('pid',parr[i]).text(), $('name',parr[i]).text(), $('level',parr[i]).text(), $('clan_id',parr[i]).text())).appendTo(row);
      for(var j = 0; j < types.length; j++) {
	    var count = $('p'+$('type',types[j]).text(),parr[i]).text();
        $('<td>').html(count == '' ? 0 : count).appendTo(row);
      }
    }
    $("#navigation").html(pageNav.makepagenav(parseInt($('start',responseText).text()),
                           parseInt($('count',responseText).text()),
                           parseInt($('total',responseText).text()), 2, presents.update));
    table = $('<table>').attr('width','100%').appendTo('#total');
    row = $('<tr>').attr('class','tbl1').appendTo(table);
    $('<td>').css('fontWeight','bold').attr({align:'center',colspan:'10'}).html("Всего подарено").appendTo(row);
    row = $('<tr>').attr('align','center').appendTo(table);
    for(var j = 0; j < types.length; j++) {
      cell = $('<td>').attr('width',100/types.length+'%').appendTo(row);
      $('<img>').attr({src:'img/presents/p'+$('type',types[j]).text()+'.png',title:$('cost',types[j]).text()+($('real',types[j]).text()=='0'?' руб':' кр')}).appendTo(cell);
    }
    row = $('<tr>').attr('align','center').appendTo(table);
    for(var j = 0; j < types.length; j++) {
      cell = $('<td>').html($('tp'+$('type',types[j]).text(),responseText).text()).appendTo(row);
    }
    row = $('<tr>').attr('align','center').appendTo(table);
    $('<td>').css('fontWeight','bold').attr({align:'center',colspan:'10'}).html("Всего игроками было потрачено на подарки " + $('tcr',responseText).text() + " кредитов и " + $('tru',responseText).text() + " рублей.").appendTo(row);
  }
  function sort(type) {
    if(_type == type) {
      return;
    }
    _type = type;
    $('#navigation').html('');
    $('#total').html('');
    pageNav.reset();
    requestData();
  }
  function cat(cat) {
    if(_cat == cat) {
      return;
    }
	_type = 'count';
    _cat = cat;
    $('a[id^="cat"]').css('font-weight', 'normal');
    $('#cat'+_cat).css('font-weight', 'bold');
    $('#navigation').html('');
    $('#total').html('');
    pageNav.reset();
    requestData();
  }
  function getSort() {
    return _type;
  }
  function getCat() {
    return _cat;
  }
  this.update = update;
  this.callback = callback;
  this.sort = sort;
  this.getSort = getSort;
  this.getCat = getCat;
  this.cat = cat;
}
presents._construct();

naim = {};
naim._construct = function() {
  var parr = Array();
  var cinfo = Array();
  var carr = Array();
  var sort = 'clan';
  function update() {
    if ($("#nanim").attr('selectedIndex') == 0) {
      return;
    }
    $('#sort').css('display','none');
    requestList();
  }
  function callback(xml) {
    parr = Array();
    carr = Array();
    cinfo['clan_id'] = $('cid',xml).text();
    cinfo['clan_name'] = $('cname',xml).text();
    var p = $('p',xml);
    for(var i=0;i<p.length;i++) {
      parr[i] = Array();
      parr[i]['id'] = $('pid',p[i]).text();
      parr[i]['name'] = $('name',p[i]).text();
      parr[i]['level'] = $('level',p[i]).text();
      parr[i]['clan_id'] = $('clan_id',p[i]).text();
      parr[i]['clan_name'] = $('clan_name',p[i]).text();
      parr[i]['online'] = parseInt($('last_online',p[i]).text());
    }
    var c = $('c',xml);
    for(var i=0;i<c.length;i++) {
      carr[i] = Array();
      carr[i]['id'] = $('pid',c[i]).text();
      carr[i]['name'] = $('name',c[i]).text();
      carr[i]['level'] = $('level',c[i]).text();
      carr[i]['clan_id'] = $('clan_id',c[i]).text();
      carr[i]['clan_name'] = $('clan_name',c[i]).text();
      carr[i]['online'] = parseInt($('last_online',c[i]).text());
    }
    _sort(sort);
  }
  function _sort(type) {
    sort = type;
    switch(type) {
      case 'clan':
        $('#clan').css('fontWeight', 'bold');
        $('#level').css('fontWeight', 'normal');
        $('#online').css('fontWeight', 'normal');
        parr.sort(clanSort);
        carr.sort(clanSort);
      break;
      case 'level':
        $('#level').css('fontWeight', 'bold');
        $('#clan').css('fontWeight', 'normal');
        $('#online').css('fontWeight', 'normal');
        parr.sort(levelSort);
        carr.sort(levelSort);
      break;
      case 'online':
        $('#level').css('fontWeight', 'normal');
        $('#clan').css('fontWeight', 'normal');
        $('#online').css('fontWeight', 'bold');
        parr.sort(onlineSort);
        carr.sort(onlineSort);
      break;
    }
    drawTable();
  }
  function clanSort(a,b) {
    if(a['clan_id'] == b['clan_id']) {
      if(a['level'] == b['level']) {
        return a['name'].localeCompare(b['name']);
      } else {
        return b['level'] - a['level'];
      }
    } else {
      return a['clan_name'].localeCompare(b['clan_name']);
    }
  }
  function levelSort(a,b) {
    if(a['level'] == b['level']) {
      if(a['clan_id'] == b['clan_id']) {
        return b['name'].localeCompare(a['name']);
      } else {
        return a['clan_name'].localeCompare(b['clan_name']);
      }
    } else {
      return b['level'] - a['level'];
    }
  }
  function onlineSort(a,b) {
    if(a['online'] == b['online']) {
      return clanSort(a, b);
    } else {
      return b['online'] - a['online'];
    }
  }
  function drawTable() {
    $('#list').html('');
    if(parr.length == 0) {
      $('#list').attr('align','center').html('По Вашему запросу ничего не найдено.');
      return;
    }
    $('#sort').css('display','block');
    var table = $('<table>').attr('width','100%').appendTo('#list');
    var row = $('<tr>').appendTo(table);
    if(cinfo['clan_id'] != -1){
      $('<td>').attr({align:'center',colspan:'2'}).css('fontWeight','bold').html('Наемники клана '+makeClanString(cinfo['clan_id'], cinfo['clan_name'])).appendTo(row);
    } else {
      $('<td>').attr({align:'center',colspan:'2'}).css('fontWeight','bold').html('Свободные наемники').appendTo(row);
    }
    for(var i = 0; i < parr.length; i++) {
      row = $('<tr>').attr('class',i % 2 ? 'tbl1' : 'tbl2').appendTo(table);
      $('<td>').attr('width','50%').html(makeUserString(parr[i]['id'], parr[i]['name'], parr[i]['level'], parr[i]['clan_id'])).appendTo(row);
      $('<td>').attr({width:'50%',align:'center'}).html(parr[i]['online'] == 0 ? "<span style='color:red'>Offline</span>" : "<span style='color:green'>Online</span>").appendTo(row);
    }
    if(cinfo['clan_id'] != -1 && carr.length != 0){
      row = $('<tr>').appendTo(table);
      $('<td>').attr({align:'center',colspan:'2'}).css('fontWeight','bold').html('Online клана '+makeClanString(cinfo['clan_id'], cinfo['clan_name'])).appendTo(row);
      for(var i=0;i<carr.length;i++) {
        row = $('<tr>').attr('class',i % 2 ? 'tbl1' : 'tbl2').appendTo(table);
        $('<td>').attr('width','50%').html(makeUserString(carr[i]['id'], carr[i]['name'], carr[i]['level'], carr[i]['clan_id'])).appendTo(row);
        $('<td>').attr({width:'50%',align:'center'}).html(carr[i]['online'] == 0 ? "<span style='color:red'>Offline</span>" : "<span style='color:green'>Online</span>").appendTo(row);
      }
    }
  }
  this.update = update;
  this.callback = callback;
  this._sort = _sort;
}
naim._construct();

siteRating = {};
siteRating.construct = function() {
  function update() {
    requestList();
  }
  function callback(xml) {
    $('#list').html('');
    var items = $('item',xml);
    if(items.length == 0) {
      $('#list').attr('align','center').html('По Вашему запросу ничего не найдено.');
      return;
    }
    var table = $('<table>').attr({width:'100%'}).appendTo('#list');
    var row = $('<tr>').css('font-weight','bold').attr({align:'center',class:'tbl'}).appendTo(table);
    $('<td height=20 valign=middle align=center>').attr({width:'5%'}).appendTo(row);
    $('<td height=20 valign=middle>').attr({width:'55%'}).html('Сайт').appendTo(row);
    $('<td height=20 valign=middle>').attr({width:'20%'}).html('Хосты').appendTo(row);
    $('<td height=20 valign=middle>').attr({width:'20%'}).html('Хиты').appendTo(row);
    for(var i=0;i<items.length;i++) {
      row = $('<tr>').attr({class:(i%2?'tbl1':'tbl2')}).appendTo(table);
      $('<td height=20 valign=middle align=center>').html(i+1).appendTo(row);
      $('<td height=20>').css('font-weight','bold').html('<a href="http://'+$('site',items[i]).text()+'" target="_blank">'+$('name',items[i]).text()+'</a>').appendTo(row);
      $('<td height=20>').attr({align:'center'}).html($('hosts',items[i]).text()).appendTo(row);
      $('<td height=20>').attr({align:'center'}).html($('hits',items[i]).text()).appendTo(row);
    }
  }
  this.update = update;
  this.callback = callback;
}
siteRating.construct();

function makeUserString(id, name, level, clan) {
  var output = '';
  if(clan != 0) {
    output += "<img src='img/icon/clan" + clan + ".png' /> ";
  }
  output += "<b>" + name + "</b> [" + level + "] <a href='http://www.unit-online.ru/info.php?id=" + id + "' target='_blank'><img src='images/ico_info.gif' /></a>";
  return output;
}
function makeClanString(id, name) {
  return "<img src='img/icon/clan" + id + ".png' /> <b>" + name + "</b>";
}
function locHistoryStr(name, f_id, f_name, t_id, t_name) {
  return "Территория <b>" + name + "</b> перешла от " + makeClanString(f_id,f_name) + " к " + makeClanString(t_id,t_name) + ".";
}
var pageNav = {};
pageNav._construct = function() {
  var _curr = 0;
  var _action;
  function makepagenav(start, count, total, range, action) {
    _action = action;
    var pg_cnt = Math.ceil(total / count);
    if (pg_cnt <= 1) { return ""; }

    var idx_back = start - count;
    var idx_next = start + count;
    var cur_page = Math.ceil((start + 1) / count);

    var res = "Страница " + cur_page + " из " + pg_cnt + ": ";
    if (idx_back >= 0) {
      if (cur_page > (range + 1)) {
        res += "<a onClick='pageNav.changeCurr(0)' style='cursor:hand;cursor:pointer;'>1</a>";
        if (cur_page != (range + 2)) {
          res += "...";
        }
      }
    }
    var idx_fst = Math.max(cur_page - range, 1);
    var idx_lst = Math.min(cur_page + range, pg_cnt);
    if (range == 0) {
      idx_fst = 1;
      idx_lst = pg_cnt;
    }
    for (var i = idx_fst; i <= idx_lst; i++) {
      var offset_page = (i - 1) * count;
      if (i == cur_page) {
        res += "<span><strong>" + i + "</strong></span>";
      } else {
        res += "<a onClick='pageNav.changeCurr(" + offset_page + ")' style='cursor:hand;cursor:pointer;'>" + i + "</a>";
      }
    }
    if (idx_next < total) {
      if (cur_page < (pg_cnt - range)) {
        if (cur_page != (pg_cnt - range - 1)) {
          res += "...";
        }
        res += "<a onClick='pageNav.changeCurr(" + (pg_cnt - 1) * count + ")' style='cursor:hand;cursor:pointer;'>" + pg_cnt + "</a>\n";
      }
    }

    return res;
  }
  function changeCurr(next) {
    _curr = next;
    _action.call(false);
  }
  function curr() {
    return _curr;
  }
  function reset() {
    _curr = 0;
  }
  this.makepagenav = makepagenav;
  this.curr = curr;
  this.changeCurr = changeCurr;
  this.reset = reset;
 }
 pageNav._construct();
 
var weaponCompare = {};
weaponCompare._construct = function() {
  var attr = Array('', 'Изображение', 'Уровень', 'Стоимость', 'Вес', 'Тип атаки', 'Урон', 'Точность', 'Пробой брони', 'Дальность', 'Скорость атаки', 'Перезарядка', 'Вместимость магазина', 'Тип патронов', 'Кучность', 'Критическая точка', 'Патронов в очереди', 'Необходимый навык', 'Мин. сила', 'Прочность');
  function addField() {
    var count = $('#weaponCompareSelect select').length;
	if(count < 4) {
      $('#weaponCompareSelect').append('<br /><br />' + (count + 1) + '. ').append($('#weaponCompareSelect select:first').clone().attr('name','w'+(count + 1)).val(-1));
    }
  }
  function makeParam() {
    var param = "";
    $('#weaponCompareSelect option:selected').each(function(i) {param += ($(this).val()+',')});
    return param.substr(0, param.length-1);
  }
  function compare() {
    requestList();
  }
  function callback(xml) {
    $('#result').empty();
    var w = $('w',xml);
    if(w.length == 0) {
      $('<div>').attr('align','center').html('Выберите оружие из списка.').appendTo('#result');
      return;
    }
    var table = $('<table>').attr('width','100%').appendTo('#result');
    var row;
    for(var i = 0; i < attr.length; i++) {
      row = $('<tr>').attr('class','tbl'+(i%2+1)).appendTo(table);
        $('<td>').attr({width:'20%'}).css('fontWeight','bold').html(attr[i]).appendTo(row);
	}
    for(var i = 0; i < w.length; i++) {
      $('<td>').attr('width', 80/w.length+'%').css('fontWeight','bold').html($('name',w[i]).text()).appendTo('#result tr:eq(0)');
      $('<td>').html($('<img>').attr('src','img/inv/'+$('image',w[i]).text())).appendTo('#result tr:eq(1)');
      $('<td>').html($('level',w[i]).text()).appendTo('#result tr:eq(2)');
      $('<td>').html($('cost',w[i]).text()).appendTo('#result tr:eq(3)');
      $('<td>').html($('weight',w[i]).text()).appendTo('#result tr:eq(4)');
      $('<td>').html($('type',w[i]).text()).appendTo('#result tr:eq(5)');
      $('<td>').html($('min_damage',w[i]).text()+' - '+$('max_damage',w[i]).text()).appendTo('#result tr:eq(6)');
      $('<td>').html($('accuracy',w[i]).text()).appendTo('#result tr:eq(7)');
      $('<td>').html($('armor_breakdown',w[i]).text()).appendTo('#result tr:eq(8)');
      $('<td>').html($('distance',w[i]).text()).appendTo('#result tr:eq(9)');
      $('<td>').html($('shooting_speed',w[i]).text()).appendTo('#result tr:eq(10)');
      $('<td>').html($('rechange_speed',w[i]).text()).appendTo('#result tr:eq(11)');
      $('<td>').html($('cage',w[i]).text()).appendTo('#result tr:eq(12)');
      $('<td>').html($('ammunition',w[i]).text()).appendTo('#result tr:eq(13)');
      $('<td>').html($('grouping',w[i]).text()!='None'?$('grouping',w[i]).text():'').appendTo('#result tr:eq(14)');
      $('<td>').html($('critical_point',w[i]).text()).appendTo('#result tr:eq(15)');
      $('<td>').html($('count',w[i]).text()).appendTo('#result tr:eq(16)');
      $('<td>').html($('skill',w[i]).text()).appendTo('#result tr:eq(17)');
      $('<td>').html($('strength',w[i]).text()).appendTo('#result tr:eq(18)');
      $('<td>').html($('robustness',w[i]).text()).appendTo('#result tr:eq(19)');
    }
    /*$('#result tr').each(function(i) {
	  if($('td:gt(1):empty', $(this)).length > 0 && $('td:empty', $(this)).length == $('td', $(this)).length)
	    $(this).remove();
	});*/
  }
  this.addField = addField;
  this.compare = compare;
  this.makeParam = makeParam;
  this.callback = callback;
}
weaponCompare._construct();

var armor = {};
armor._construct = function() {
  var _type;
  function update(type) {
    _type = type;
    $('#type1').css('fontWeight','normal');
    $('#type2').css('fontWeight','normal');
    $('#type3').css('fontWeight','normal');
    $('#type4').css('fontWeight','normal');
    $('#'+type).css('fontWeight','bold');
    requestList();
  }
  function callback(responseText) {
    $('#list').html('');
    var a = $('a',responseText);
    if(a.length == 0) {
      $('<div>').attr('align','center').html('<br><br>По Вашему запросу ничего не найдено.').appendTo('#list');
      return;
    }
    var table = $('<table>').attr('width','100%').appendTo('#list');
    var row;
    for(var i = 0; i < a.length; i++) {
      row = $('<tr>').attr('class','tbl1').appendTo(table);
      $('<td>').attr({align:'center',width:'20%'}).css('fontWeight','bold').html($('title',a[i])).appendTo(row);
      $('<td>').attr('width','80%').html('Свойства и требования').appendTo(row);
      row = $('<tr>').attr('class','tbl2').appendTo(table);
      $('<td>').attr({align:'center',width:'20%'}).html($('<img>').attr('src','img/inv/'+$('image',a[i]).text())).appendTo(row);
      $('<td>').attr('width','80%').html('Уровень: ' + $('level',a[i]).text() + '<br />Стоимость: ' + $('cost',a[i]).text()+'<br />Вес: '+$('weight',a[i]).text()+
                                         '<br />Класс брони: '+$('armor',a[i]).text()+'<br />Поглощение радиации: '+$('rad',a[i]).text()+'<br />Поглощение норма: '+$('norm',a[i]).text()+'<br />Поглощение огонь: '+$('fire',a[i]).text()+'<br />Поглощение плазма: '+
                                         $('plasm',a[i]).text()).appendTo(row);
    }
  }
  function type() {
    return _type;
  }
  this.type = type;
  this.callback = callback;
  this.update = update;
}
armor._construct();

var forumSearch = {};
forumSearch._construct = function() {
  function search(clear) {
    $('#search').attr('disabled', 'disabled');
    $('#navigation').html('');
    if(clear)
      pageNav.reset();
    requestData();
  }
  function callback(responseText) {
    $('#searchResults').html('');
    $('#search').removeAttr('disabled');
    var items = $('item',responseText);
    if(items.length == 0) {
      $('<div>').attr('align','center').html('По Вашему запросу ничего не найдено.').appendTo('#searchResults');
      return;
    }
    var table = $('<table>').attr('width','100%').appendTo('#searchResults');
    var row;
    var cell;
    var str;
    for(var i = 0; i < items.length; i++) {
      str = '';
      row = $('<tr>').attr({width:'100%', class:'tbl2'}).appendTo(table);
      cell = $('<td>').attr({align:'center', rowspan:'2', width:'20%'}).appendTo(row);
      if($('author_avatar',items[i]).text() != 0) {
        str += '<img src = \'img/avatar/av'+$('author_avatar',items[i]).text()+'.jpg\'><br />';
      }
      if($('author_clan_image',items[i]).text() != 0) {
        str += '<img src = \'img/icon/clan'+$('author_clan_image',items[i]).text()+'.png\'> ';
      }
      str += '<b>' + $('author_name',items[i]).text() + '</b> [' + $('author_level',items[i]).text() + ']<br />' + $('time',items[i]).text();
      cell.html(str);
      $('<td>').css('fontWeight', 'bold').html('<a href=\'http://forum.unit-online.ru/'+$('section_id',items[i]).text()+'/1/'+$('theme_id',items[i]).text()+'/'+$('theme_page',items[i]).text()+'/\' target=\'_blank\'>'+$('message_title',items[i]).text()+'</a>').appendTo(row);
      row = $('<tr>').attr('class', 'tbl1').appendTo(table);
      $('<td>').html($('message',items[i]).text()).appendTo(row);
    }
    $("#navigation").html(pageNav.makepagenav(parseInt($('start',responseText).text()),
                           parseInt($('count',responseText).text()),
                           parseInt($('total',responseText).text()), 2, forumSearch.search));
  }
  this.callback = callback;
  this.search = search;
}
forumSearch._construct();

var pvp = {};
pvp._construct = function() {
  var _type = 'pvp_base';
  var _cat;
  function update(clear) {
    $('#navigation').html('');
    if(clear) {
      pageNav.reset();
    }
    requestData();
  }
  function callback(responseText) {
    $('#list').html('');
    var table = $('<table>').attr('width','100%').appendTo('#list');
    var row, cell;
    var parr = $('p',responseText);
    row = $('<tr>').attr('align','center').appendTo(table);
    $('<td height=20 valign=middle align=center>').appendTo(row);
    $('<td height=20 valign=middle>').html('Персонаж').appendTo(row);
    $('<td height=20 valign=middle>').html('Абсолютный рейтинг').attr({onClick:'pvp.sort(\"pvp_curr\")'}).css({cursor: 'pointer', fontWeight : (_type == 'pvp_curr' ? "bold" : "normal")}).appendTo(row);
    $('<td height=20 valign=middle>').html('Относительный рейтинг').attr({onClick:'pvp.sort(\"delta\")'}).css({cursor: 'pointer', fontWeight : (_type == 'delta' ? "bold" : "normal")}).appendTo(row);
    for(var i = 0; i < parr.length; i++) {
      row = $('<tr>').attr('class',(i%2?'tbl1':'tbl2')).appendTo(table);
      $('<td height=20 valign=middle align=center>').html(parseInt($('start',responseText).text())+i+1).appendTo(row);
      $('<td height=20 valign=middle>').html(makeUserString($('pid',parr[i]).text(), $('name',parr[i]).text(), $('level',parr[i]).text(), $('clan_id',parr[i]).text())).appendTo(row);
      $('<td height=20 valign=middle>').html((+$('pvp_curr',parr[i]).text()).toFixed(2)).appendTo(row);
      $('<td height=20 valign=middle>').css({color : colorDiff($('delta',parr[i]).text())}).html((+$('delta',parr[i]).text()).toFixed(2)).appendTo(row);
    }
    $("#navigation").html(pageNav.makepagenav(parseInt($('start',responseText).text()),
                           parseInt($('count',responseText).text()),
                           parseInt($('total',responseText).text()), 2, pvp.update));
  }
  function colorDiff(diff)
  {
    return diff < 0 ? 'red' : (diff > 0 ? 'green' : '');
  }
  function sort(type) {
    if(_type == type) {
      return;
    }
    _type = type;
    $('#navigation').html('');
    pageNav.reset();
    requestData();
  }
  function getSort() {
    return _type;
  }
  this.update = update;
  this.callback = callback;
  this.sort = sort;
  this.getSort = getSort;
}
pvp._construct();