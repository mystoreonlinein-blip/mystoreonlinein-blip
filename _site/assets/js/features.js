document.addEventListener('DOMContentLoaded', function () {
  var tree = document.querySelector('.tree');
  var content = document.querySelector('.features__content');
  if (!tree || !content) return;

  // Expand/collapse
  tree.addEventListener('click', function (e) {
    var t = e.target;
    if (t.classList.contains('tree__toggle')) {
      var next = t.nextElementSibling;
      if (next && next.classList.contains('tree__children')) {
        var expanded = t.getAttribute('aria-expanded') === 'true';
        t.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        next.classList.toggle('is-collapsed');
      }
    }
  });

  // Activate a feature section
  function showSection(id) {
    var sections = content.querySelectorAll('.feature-section');
    sections.forEach(function (s) {
      if (s.id === id) { s.hidden = false; s.classList.add('is-visible'); }
      else { s.hidden = true; s.classList.remove('is-visible'); }
    });

    // Update active link
    tree.querySelectorAll('.tree__link').forEach(function (a) {
      if (a.getAttribute('href') === '#' + id) a.classList.add('is-active');
      else a.classList.remove('is-active');
    });

    // Ensure the parent group is expanded for the active link
    var activeLink = tree.querySelector('.tree__link.is-active');
    if (activeLink) {
      var children = activeLink.closest('.tree__children');
      if (children) {
        children.classList.remove('is-collapsed');
        var toggle = children.previousElementSibling;
        if (toggle && toggle.classList.contains('tree__toggle')) {
          toggle.setAttribute('aria-expanded', 'true');
        }
      }
    }
  }

  tree.addEventListener('click', function (e) {
    var a = e.target.closest('a.tree__link');
    if (!a) return;
    e.preventDefault();
    var id = (a.getAttribute('href') || '').replace('#', '');
    if (id) {
      history.replaceState(null, '', '#' + id);
      showSection(id);
    }
  });

  // Initialize: hash > a marked as active > first link > first section
  var fromHash = (location.hash || '').replace('#','');
  var marked = tree.querySelector('.tree__link.is-active');
  var firstLink = tree.querySelector('.tree__link');
  var firstSection = content.querySelector('.feature-section');
  var initial = fromHash || (marked && (marked.getAttribute('href')||'').replace('#',''))
                 || (firstLink && (firstLink.getAttribute('href')||'').replace('#',''))
                 || (firstSection && firstSection.id) || '';
  if (initial) showSection(initial);
});
