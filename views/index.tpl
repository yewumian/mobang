<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>魔棒</title>
<link rel="stylesheet" type="text/css" href="/css/common.css" />
<link rel="stylesheet" type="text/css" href="/css/animate.css" />
<link rel="stylesheet" type="text/css" href="/css/dialog/ui-dialog.css">
<link rel="stylesheet" type="text/css" href="/css/uploadifive/uploadifive.css">
<script type="text/javascript" src="/js/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="/js/dialog/dialog.js"></script>
<script type="text/javascript" src="/js/uploadifive/jquery.uploadifive.min.js"></script>
</head>
<body>
<div id="tinybox" class="animated jello">
  <header><a href="/"><i class="icons"><i class="big loading sun icon"></i><i class="wizard icon"></i></i>魔棒<sup>beta</sup></a></header>
  <section class="clearfix">
    <div class="file-fields" title="拖拽文件到此处">
      <i class="download icon"></i>
      <i class="refresh loading icon"></i>
      <div class="file-field">
        <p><input class="text" id="file" type="file" name="file" size="40" /></p>
      </div>
    </div>
    <div class="file-details">
      <h4>压缩结果</h4>
      <table class="table table-condensed table-striped">
        <colgroup>
          <col width="80"></col>
          <col width="*"></col>
        </colgroup>
        <tbody>
          <tr><th>文件名</th><td>-</td></tr>
          <tr><th>尺寸</th><td>-</td></tr>
          <tr><th>原始大小</th><td>-</td></tr>
          <tr><th>压缩后大小</th><td>-</td></tr>
          <tr><th>节省</th><td>-</td></tr>
          <tr><th>压缩比</th><td>-</td></tr>
          <tr><th>输出</th><td>-</td></tr>
        </tbody>
      </table>
    </div>
  </section>
  <div class="copyright">
    由于计算量较大，压缩过程可能需要十几秒的时间，请耐心等候
  </div>
</div>
<div id="history-list">
  <table class="table table-condensed table-striped table-text-center">
    <thead>
      <tr>
        <th>文件名</th>
        <th>尺寸</th>
        <th>原始大小</th>
        <th>压缩后大小</th>
        <th>节省</th>
        <th>压缩比</th>
        <th>输出</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</div>
<script type="text/javascript" src="/js/index.js"></script>
</body>
</html>