/* Algo Visualizer helpers — plain DOM, no framework. Replaces the repo's random 50-colour pick with a fixed, ordered 10-tile palette. */
(function () {
  var TILE_COUNT = 10;
  var MIN_H = 36, MAX_H = 180;

  function tileClass(index) { return 'av-tile av-tile--' + ((index % TILE_COUNT) + 1); }

  function heightFor(value, max) {
    var top = Math.max(max || 100, 1);
    return Math.round(MIN_H + (Math.max(0, value) / top) * (MAX_H - MIN_H)) + 'px';
  }

  /* Render values into a .av-stage__floor. Each value keeps its colour as it moves (colour = identity, not position). */
  function renderStage(floor, values, opts) {
    opts = opts || {};
    var max = opts.max || 100;
    floor.innerHTML = '';
    values.forEach(function (v, i) {
      var slot = document.createElement('div');
      slot.className = 'av-slot';
      slot.innerHTML = '<div class="av-arrow"></div>' +
        '<div class="' + tileClass(i) + '" data-value="' + v + '" style="--h:' + heightFor(v, max) + '">' + v + '</div>' +
        '<div class="av-pointer"></div>';
      floor.appendChild(slot);
    });
    return Array.prototype.slice.call(floor.querySelectorAll('.av-slot'));
  }

  function setPointer(slot, on) { slot.querySelector('.av-pointer').classList.toggle('av-pointer--on', !!on); }
  function setState(slot, state) {
    var t = slot.querySelector('.av-tile');
    if (state) t.setAttribute('data-state', state); else t.removeAttribute('data-state');
  }
  /* Swap two slots' tiles (and so their colours) in place. */
  function swap(a, b) {
    var ta = a.querySelector('.av-tile'), tb = b.querySelector('.av-tile');
    var pa = ta.nextSibling, pb = tb.nextSibling;
    a.insertBefore(tb, pa); b.insertBefore(ta, pb);
  }

  window.AlgoViz = {
    TILE_COUNT: TILE_COUNT,
    tileClass: tileClass,
    heightFor: heightFor,
    renderStage: renderStage,
    setPointer: setPointer,
    setState: setState,
    swap: swap
  };
})();
