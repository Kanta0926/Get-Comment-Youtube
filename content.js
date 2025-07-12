// URL、コメントのコピー処理
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

      comment.addEventListener("mouseenter", () => {
        btn.style.display = "inline-block";
      });
      comment.addEventListener("mouseleave", () => {
        btn.style.display = "none";
      });
    }
  });
}

// スクロール表示に対し監視
const observer = new MutationObserver(addHoverListeners);
observer.observe(document.body, { childList: true, subtree: true });

addHoverListeners();
