let linkCount = 1;

function createLink() {
  $.get(`/api?url=${$("#url-input").val()}`, (data, status) => {
    linkCount++;
    $('#linkCount > span').html(parseInt($('#linkCount > span').html()) + 1);
    $('#message').html(data.message);
    $('.modal-body').append(`
      <div class="input-group mt-1">
        <input type="text" id="short${linkCount}" class="form-control text-dark" value="${data.short}"readonly>
        <div class="input-group-append">
          <button type="button" class="btn btn-primary" onclick="copyKey('short${linkCount}')">Copy</button>
        </div>
      </div>
      `);
    $('#shortModal').modal()
  });
}

function copyKey(element) {
  $(`#${element}`).select();
  document.execCommand('copy');
}

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

function checkURL() {
  if(validateUrl($('#url-input').val())) {
    $('.btn-lg').prop('disabled', false);
  } else {
    $('.btn-lg').prop('disabled', true);
  }
}
