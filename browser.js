module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  // START - replacement of relative mi24-player-font path with the absolute one
  var scripts = document.querySelectorAll('script[src$="embed.js"],script[src$="embed.debug.js"],script[src$="player.js"],script[src$="player.min.js"]');
  var currentScript = scripts[scripts.length - 1].src;
  var currentScriptChunks = currentScript.split('/');
  var currentScriptFile = currentScriptChunks[currentScriptChunks.length - 1];
  var absolutePath = currentScript.replace(currentScriptFile, '');
  css = css.replace(/mi24-player-font\./g, absolutePath + 'mi24-player-font.');
  // END - replacement of relative mi24-player-font path with the absolute one

  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet();
    sheet.cssText = css;
    return sheet.ownerNode;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }

    head.appendChild(style);
    return style;
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode;
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
    return link;
  }
};
