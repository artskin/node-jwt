
/**
 * Created by wendy on 2017/4/13.
 * 4/14 可以正常播放，但是花屏。。。效果不好啊
 */
const WebSocket = require('ws');
const wsserver = new WebSocket.Server({port:1104})
//var wsserver = new (require('ws').Server)({port:1104});

var net = require('net');

var channelIndex = 1;
wsserver.on("close", function () {
  console.log("close",conn);
});
var channelsocket = {};
wsserver.on('connection',function(conn) {
    console.log("protocol",conn.protocol);
    var protocol = conn.protocol;
    if(protocol == "control") {
      conn.onmessage = function (msg) {
        var res = wspParse(msg.data);
        if(res.msg == "INIT"){
          var ipIndex = _ip2int(res.data.host);

          var channel = channelIndex++;
          conn.channel = channel;
          InitChannel(channel,ipIndex,res.data.host,res.data.port,function(){
            var msg = wspMsg("200","INIT OK",res.data.seq,{"channel":channel});
            conn.send(msg);
          },function(msgFail){
            var msg = wspMsg("501",msgFail,res.data.seq);
            conn.send(msg);
          });
        }
        else if(res.msg == "WRAP"){
          //console.log(res.payload);
          if(channelsocket[conn.channel])
          {
            channelsocket[conn.channel].outControlData = true;
            channelsocket[conn.channel].once('data',function(data){
              console.log(data.toString('utf8'));
              var msg = wspMsg("200","WRAP OK",res.data.seq,{"channel":conn.channel},data);
              conn.send(msg);
            });
            channelsocket[conn.channel].write(res.payload);
          }
        }
      }
    }
    else if(protocol == "data"){
      //建立pipe
      conn.onmessage = function (msg) {
        //console.log(msg.data);
        var res = wspParse(msg.data);
        if(res.msg == "JOIN") {
          channelsocket[res.data.channel].on('rtpData', function (data) {
            console.log(data);
            conn.send(data);
          });

          var msg = wspMsg("200", "JOIN OK", res.data.seq);
          conn.send(msg);
        }
      }
    }
});
function _ip2int(ip){
  var num = 0;
  ip = ip.split(".");
  num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
  num = num >>> 0;
  return num;
}
function InitChannel(channel,ipIndex,ip,prt,okFunc,failFunc){
    var sock =  net.connect({host:ip,port:prt},function(){
      channelsocket[channel] = sock;
      okFunc();
      sock.connectInfo = true;

      sock.rtpBuffer = new Buffer(2048);
      sock.on('data',function(data){
        if(sock.outControlData)
        {
          sock.outControlData = false;
          return;
        }

        var flag = 0;
        if(sock.SubBuffer && sock.SubBufferLen>0){
          flag = sock.SubBuffer.length - sock.SubBufferLen;
          //data.copy(sock.SubBuffer,sock.SubBufferLen, 0, flag - 1);
          data.copy(sock.SubBuffer,sock.SubBufferLen, 0, flag + 4);
          sock.emit("rtpData",sock.SubBuffer);

          sock.SubBufferLen = 0;
        }

        while(flag < data.length) {
          var len = data.readUIntBE(flag + 2, 2);
          sock.SubBuffer = new Buffer(4 + len);

          if ((flag+4+len) <= data.length)
          {
            //data.copy(sock.SubBuffer, 0, flag, flag + len - 1);
            data.copy(sock.SubBuffer, 0, flag, flag + len + 4);
            sock.emit("rtpData",sock.SubBuffer);
            sock.SubBufferLen = 0;
          }
          else {
            //data.copy(sock.SubBuffer, 0, flag,data.length - 1);
            data.copy(sock.SubBuffer, 0, flag,data.length + 4);
            sock.SubBufferLen = data.length - flag;
          }
          flag += 4;
          flag += len;
        }
      });

    }).on('error',function(e){
      //clean all client;
      console.log(e);
    });
    sock.setTimeout(1000 * 3,function() {
      if(!sock.connectInfo) {
        console.log("time out");
        failFunc("relink host[" + ip + "] time out");
        sock.destroy();
      }
    });

    sock.on('close',function(code){
      //关闭所有子项目
    });
}

function wspParse(data){
    var payIdx = data.indexOf('\r\n\r\n');
    var lines = data.substr(0, payIdx).split('\r\n');
    var hdr = lines.shift().match(new RegExp('WSP/1.1\\s+(.+)'));
    if (hdr) {
      var res = {
        msg:  hdr[1],
        data: {},
        payload: ''
      };
      while (lines.length) {
        var line = lines.shift();
        if (line) {
          var subD = line.split(':');
          res.data[subD[0]] = subD[1].trim();
        } else {
          break;
        }
      }
      res.payload = data.substr(payIdx+4);
      return res;
    }
    return null;
}
function wspMsg(code,msg,seq,data,play){

  var msg = "WSP/1.1 " + code + " " + msg + "\r\n";
  msg += "seq:" + seq ;
  if(data) {
    for (var i in data) {
      msg += "\r\n";
      msg += i.toString() + ":" + data[i].toString();
    }
  }
  msg += "\r\n\r\n";
  if(play)
  msg += play;

  return msg;
}
