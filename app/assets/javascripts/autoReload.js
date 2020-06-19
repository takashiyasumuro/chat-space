$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="MessageBox" data-message-id=${message.id}>
          <div class="message-data">
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
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="message-data">
          <div class="message-data__name">
            ${message.user_name}
          </div>
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

  let reloadMessages = function() {
    let last_message_id = $('.MessageBox:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする 1
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        let insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.Chat-main__message-list').append(insertHTML);
        $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});