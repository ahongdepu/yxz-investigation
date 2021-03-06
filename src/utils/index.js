const tools = {
  downLoad: (data, name = "导出文件.xls") => {
    if (!data) {return;}
    
    // var blob = new Blob([data], { type: 'application/vnd.ms-excel'});
    // // window.navigator.msSaveBlob(blob, '1.xls');

    // var elink = document.createElement('a');
    // elink.download = name;
    // elink.style.display = 'none';
    // // var blob = new Blob([data], {type: 'application/vnd.ms-excel'});

    // elink.href = URL.createObjectURL(blob);
    // document.body.appendChild(elink);
    // elink.click();
    // document.body.removeChild(elink);
    // return blob;


    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = (e) => {
      console.log(e);
      const a = document.createElement('a');
      a.download = name;
      // 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
      a.href = e.target.result;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };



  }
};

tools._keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
//base64编码
tools.encode = function (input) {
  let output = '';
  let chr1;
  let chr2;
  let chr3;
  let enc1;
  let enc2;
  let enc3;
  let
    enc4;
  let i = 0;
  input = this._utf8_encode(input);
  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output +
      this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
      this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
  }
  return output;
};
//base64解码
tools.decode = function (input) {
  let output = '';
  let chr1;
  let chr2;
  let
    chr3;
  let enc1;
  let enc2;
  let enc3;
  let
    enc4;
  let i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, ''); //eslint-disable-line
  while (i < input.length) {
    enc1 = this._keyStr.indexOf(input.charAt(i++));
    enc2 = this._keyStr.indexOf(input.charAt(i++));
    enc3 = this._keyStr.indexOf(input.charAt(i++));
    enc4 = this._keyStr.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output += String.fromCharCode(chr1);
    if (enc3 !== 64) {
      output += String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output += String.fromCharCode(chr3);
    }
  }
  output = this._utf8_decode(output);
  return output;
};

//UTF-8编码
tools._utf8_encode = function (string) {
  string = string.replace(/\r\n/g, '\n');
  let utftext = '';
  for (let n = 0; n < string.length; n++) {
    const c = string.charCodeAt(n);
    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }
  return utftext;
};
//UTF-8解码
tools._utf8_decode = function (utftext) {
  let string = '';
  let i = 0;
  let c;
  let c2;
  let
    c3;
  c = c2 = 0;
  while (i < utftext.length) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i + 1);
      c3 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }
  }
  return string;
};

export default tools;