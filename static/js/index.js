var loading = $('#tinybox section i.loading'),
  dropFields = $('#tinybox section .file-fields'),
  fileTbody = $('#tinybox section .file-details .table tbody'),
  listTbody = $('#history-list .table tbody');

function showLoading() {
  loading.show();
  $('#tinybox section .uploadifive-button').addClass('hidden');
}

function hideLoading() {
  loading.hide();
  $('#tinybox section .uploadifive-button').removeClass('hidden');
}

function showResult(file, data) {
  if (data.flag == 1) {
    var html = [],
      filename = file.replace(/\\/g, '/').split('/').reverse().slice(0, 1).join('');
    data = data.data;
    html.push('<tr class="animated bounceInLeft"><th>文件名</th><td>' + filename + '</td></tr>');
    html.push('<tr class="animated bounceInRight"><th>尺寸</th><td>' + data.output.width + ' * ' + data.output.height + '</td></tr>');
    html.push('<tr class="animated bounceInLeft"><th>原始大小</th><td>' + data.input.size.toLocaleString() + '字节 (' + parseInt(data.input.size / 1024) + 'k)</td></tr>');
    html.push('<tr class="animated bounceInRight"><th>压缩后大小</th><td>' + data.output.size.toLocaleString() + '字节 (' + parseInt(data.output.size / 1024) + 'k)</td></tr>');
    html.push('<tr class="animated bounceInLeft"><th>节省</th><td>' + (data.input.size - data.output.size).toLocaleString() + '字节 (' + parseInt((data.input.size - data.output.size) / 1024) + 'k)</td></tr>');
    html.push('<tr class="animated bounceInRight"><th>压缩比</th><td>' + (1 - data.output.ratio) * 100 + '%' + '</td></tr>');
    html.push('<tr class="animated bounceInLeft"><th>输出</th><td><a href="/download/' + data.output.url + '/' + filename + '">下载</a></td></tr>');
    fileTbody.html(html.join(''));
    html = [];
    html.push('<tr class="animated bounceIn">');
    html.push('<td>' + filename + '</td>');
    html.push('<td>' + data.output.width + ' * ' + data.output.height + '</td>');
    html.push('<td>' + data.input.size.toLocaleString() + '</td>');
    html.push('<td>' + data.output.size.toLocaleString() + '</td>');
    html.push('<td>' + (data.input.size - data.output.size).toLocaleString() + '</td>');
    html.push('<td>' + (1 - data.output.ratio) * 100 + '%' + '</td>');
    html.push('<td><a href="/download/' + data.output.url + '/' + filename + '">下载</a></td>');
    html.push('</tr>');
    listTbody.append(html.join(''));
  } else {
    dialog({
      title: '错误提示',
      content: data.message,
      ok: true
    }).showModal();
  }
}

dropFields.on({
  contextmenu: function (e) {
    e.preventDefault();
  },
  dragleave: function (e) { //拖离
    e.preventDefault();
  },
  drop: function (e) { //拖后放
    e.preventDefault();
  },
  dragenter: function (e) { //拖进
    e.preventDefault();
  },
  dragover: function (e) { //拖来拖去
    e.preventDefault();
  }
});

dropFields.get(0).addEventListener("drop", function (e) {
  var fileList = e.dataTransfer.files,
    files = [],
    filetype,
    errs = [];
  if (fileList.length == 0) {
    return false;
  }
  for (var i = 0; i < fileList.length; i++) {
    filetype = fileList[i].type.split('/');
    if (filetype.indexOf('image') !== -1) {
      var filename = fileList[i].name;
      var filesize = Math.floor(fileList[i].size / 1024);
      if (filesize > 2000) {
        errs.push('上传大小不能超过2M');
      } else {
        files.push(fileList[i]);
      }
    } else {
      errs.push(fileList[i].type + '格式不被支持，' + fileList[i].name + '未上传');
    }
  }
  if (errs.length > 0) {
    dialog({
      title: '错误提示',
      content: errs.join('<br />'),
      okValue: '确定',
      ok: true,
      cancelValue: '取消',
      cancel: true
    }).show();
    return false;
  }
  if (files.length > 1) {
    dialog({
      title: '错误提示',
      content: '一次只能上传一个文件',
      okValue: '确定',
      ok: true,
      cancelValue: '取消',
      cancel: true
    }).show();
    return false;
  }
  //上传
  files = files[0];
  var formdata = new FormData();
  formdata.append('file_name[0]', files);
  /*var xhr = new XMLHttpRequest();
  xhr.open("post", "/api/uploadTemplateFile", true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send(formdata);*/
  showLoading();
  $.ajax({
    url: '/upload',
    type: 'POST',
    data: formdata,
    processData: false,
    contentType: false,
    success: function (data) {
      showResult(files.name, data);
      hideLoading();
    }
  });
});

$('input[type=file]').uploadifive({
  height: 20,
  uploadScript: '/upload',
  width: 100,
  buttonText: '选择图片',
  buttonClass: 'uploadifive-button-image',
  onSelect: function () {
    showLoading();
  },
  onUploadComplete: function (file, data, response) {
    try {
      data = JSON.parse(data);
      showResult(file.name, data);
      $('.uploadifive-queue').addClass('animated bounceOutUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).remove();
      });
    } catch (e) {}
    hideLoading();
  }
});