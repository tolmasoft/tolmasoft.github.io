function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var foo = getParameterByName('i');
if(foo != null) {
    document.getElementById("paymentpurpose").value = 'Замовлення #' + foo;
}
else {
    document.getElementById("paymentpurpose").value = 'Замовлення {номер вашого замовлення}';
}



function copyTextInClipboard(e) {
    
    var copyText = e.target.parentNode.parentNode.getElementsByTagName('input')[0].value;
    navigator.clipboard.writeText(copyText);
  
  }

