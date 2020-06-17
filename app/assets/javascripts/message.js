$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message-data">
              <div class="message-data__name">
                ${message.user_name}
                <div class="message-data__date-time">
                ${message.created_at}
                </div>
              </div>
              <div class="message-data__text">
                <p class="Message__content">
                  ${message.content}
                </p>
                <img class="Message__image" src="${message.image}">
              </div>
            </div>`
      return html;
    } else {
      let html =
      `<div class="message-data">
      <div class="message-data__name">
        ${message.user_name}
        <div class="message-data__date-time">
        ${message.created_at}
        </div>
      </div>
      <div class="message-data__text">
        <p class="Message__content">
          ${message.content}
        </p>
        
      </div>
    </div>`
      return html;
    };
  }
  $('.form').on("submit", function(e){
    e.preventDefault();
      let formData = new FormData(this);
      let url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
    .done(function(data){
      let html = buildHTML(data);
      $('.Chat-main__message-list').append(html);      
      $('form')[0].reset();
      $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop('disabled', false);
    });
  });
});