// URL、コメントのコピー処理
let currentVisibleButton = null;

function createCopyButton(commentElement) {
  const btn = document.createElement("button");
  btn.innerText = "Copy";
  btn.className = "copy-comment-btn";

  btn.onclick = (e) => {
    e.stopPropagation();
    const commentText = commentElement.innerText;
    const url = window.location.href;
    const fullText = `URL: ${url}\ncomment『 ${commentText}』`;
    navigator.clipboard.writeText(fullText);
    btn.style.display = "none";
    currentVisibleButton = null;
  };
  return btn;
}

// マウスオーバーでボタン出現処理
function addHoverListeners() {
  const comments = document.querySelectorAll("#content-text");
  comments.forEach((comment) => {
    // 重複禁止
    if (!comment.dataset.copyAttached) {
      const btn = createCopyButton(comment);
      btn.style.display = "none";
      comment.style.position = "relative";
      comment.appendChild(btn);

      comment.dataset.copyAttached = "true";

      comment.addEventListener("mouseenter", (e) => {
        // 他のボタンが表示中なら非表示にする
        if (currentVisibleButton && currentVisibleButton !== btn) {
          currentVisibleButton.style.display = "none";
        }
        btn.style.display = "inline-block";
        currentVisibleButton = btn;
      });
    }
  });
}

// クリックでボタン非表示処理
document.addEventListener("click", (e) => {
  const isInsideComment = e.target.closest("#content-text");
  if (!isInsideComment && currentVisibleButton) {
    currentVisibleButton.style.display = "none";
    currentVisibleButton = null;
  }
});

// スクロール、新着順切り替えに対して監視
addHoverListeners();

// commentsを監視
function observeCommentsContainer() {
  const commentsContainer = document.querySelector("#comments");

  //読み込まれてない場合
  if (!commentsContainer) {
    setTimeout(observeCommentsContainer, 1000);
    return;
  }

  const observer = new MutationObserver(() => {
    addHoverListeners();
  });

  observer.observe(commentsContainer, {
    childList: true,
    subtree: true,
  });
}

observeCommentsContainer();
