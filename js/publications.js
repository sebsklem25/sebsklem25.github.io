/* js/publications.js
   Search + topic chips + year select + TYPE segmented control (All/Refereed/Workshops)
*/
(function () {
  const q        = document.getElementById('q');
  const yearSel  = document.getElementById('year');
  const chips    = Array.from(document.querySelectorAll('.chip'));
  const segs     = Array.from(document.querySelectorAll('.seg'));
  const results  = document.getElementById('results');
  const items    = results ? Array.from(results.querySelectorAll('.pub')) : [];
  const countEl  = document.getElementById('count');
  const clearBtn = document.getElementById('clear');

  let activeTopics = new Set();
  let activeType   = 'all'; // 'all' | 'refereed' | 'workshop'

  function apply() {
    const query = (q?.value || '').toLowerCase().trim();
    const y     = yearSel?.value || '';
    let shown   = 0;

    items.forEach(li => {
      const text    = li.textContent.toLowerCase();
      const topics  = (li.dataset.topics || '').toLowerCase();
      const yearOk  = !y || li.dataset.year === y;
      const textOk  = !query || text.includes(query);

      // topic chips: all selected chips must be present
      const topicsOk = activeTopics.size === 0 ||
        [...activeTopics].every(t => topics.includes(t.toLowerCase()));

      // type segmented:
      const typeOk = activeType === 'all' || (li.dataset.type === activeType);

      const visible = textOk && yearOk && topicsOk && typeOk;
      li.style.display = visible ? '' : 'none';
      if (visible) shown++;
    });

    if (countEl) countEl.textContent = `${shown} result${shown === 1 ? '' : 's'}`;
  }

  // search + year
  q?.addEventListener('input', apply);
  yearSel?.addEventListener('change', apply);

  // topic chips
  chips.forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.topic;
      if (btn.classList.toggle('on')) activeTopics.add(t);
      else activeTopics.delete(t);
      apply();
    });
  });

  // segmented type control
  segs.forEach(btn => {
    btn.addEventListener('click', () => {
      segs.forEach(b => { b.classList.remove('on'); b.setAttribute('aria-pressed','false'); });
      btn.classList.add('on');
      btn.setAttribute('aria-pressed','true');
      activeType = btn.dataset.type; // 'all' | 'refereed' | 'workshop'
      apply();
    });
  });

  // clear
  clearBtn?.addEventListener('click', () => {
    if (q) q.value = '';
    if (yearSel) yearSel.value = '';
    chips.forEach(c => c.classList.remove('on'));
    segs.forEach((b,i) => { b.classList.toggle('on', i===0); b.setAttribute('aria-pressed', i===0 ? 'true' : 'false'); });
    activeTopics.clear();
    activeType = 'all';
    apply();
  });

  apply();
})();
