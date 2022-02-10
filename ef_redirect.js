function redirect(fd, url, prot) {
  var args = {
    evt: fd.match(/evt:(\d+)/i),
    dst: fd.match(/dst:(.[^,]+)/i),
    utm: "&utm_source=" + fd.match(/cmp:(.+)/i)[1] + "&utm_medium=Email&utm_campaign=FUEL"
  };

  var tag = document.createElement('script');
  tag.src = url + '&evt=' + args.evt[1];
  tag.onload = function() {
    var dest = decodeURIComponent(args.dst[1]);

    if(dest.indexOf('?') == -1) {
      location = prot + '://' + dest + '?' + args.utm;
    } else {
      location = prot + '://' + dest + args.utm;
    }
  };
  document.head.appendChild(tag);
}