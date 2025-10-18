document.addEventListener('DOMContentLoaded', function () {
  var list = document.querySelector('.steps');
  if (!list) return;

  var items = Array.prototype.slice.call(list.children).filter(function (el) {
    return el.tagName && el.tagName.toLowerCase() === 'li';
  });

  items.forEach(function (li, idx) {
    var h2 = li.querySelector('h2');
    if (!h2) return;

    // Create an accessible toggle button inside the heading
    var btn = document.createElement('button');
    btn.className = 'step__toggle';
    btn.type = 'button';
    var title = h2.textContent.trim();
    h2.textContent = '';
    btn.textContent = title;
    btn.setAttribute('aria-expanded', idx === 0 ? 'true' : 'false');
    h2.appendChild(btn);

    // Wrap the rest of the step content in a panel
    var content = document.createElement('div');
    content.className = 'step__content';
    content.id = 'step-' + (idx + 1);

    var toMove = [];
    var node = h2.nextSibling;
    while (node) {
      toMove.push(node);
      node = node.nextSibling;
    }
    toMove.forEach(function (n) { content.appendChild(n); });
    li.appendChild(content);

    if (idx !== 0) content.hidden = true;
    if (idx === 0) li.classList.add('is-open');

    btn.setAttribute('aria-controls', content.id);
  });

  var toggles = list.querySelectorAll('.step__toggle');
  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('aria-controls');
      var panel = document.getElementById(id);
      var li = btn.closest('li');
      var wasOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all steps
      toggles.forEach(function (b) {
        var pid = b.getAttribute('aria-controls');
        var p = document.getElementById(pid);
        b.setAttribute('aria-expanded', 'false');
        if (p) p.hidden = true;
        var pli = b.closest('li');
        if (pli) pli.classList.remove('is-open');
      });

      // If previously open, leave all closed. Otherwise, open this one.
      if (!wasOpen) {
        btn.setAttribute('aria-expanded', 'true');
        if (panel) panel.hidden = false;
        if (li) li.classList.add('is-open');
      }
    });
  });
});
