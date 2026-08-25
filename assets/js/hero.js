(function () {
  var stage = document.querySelector("[data-hero-stage]");
  if (!stage) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarse = window.matchMedia("(pointer: coarse)").matches;
  if (reduce || coarse) return;

  var visual = stage.closest(".hero-visual");
  if (!visual) return;

  var current = { x: 0, y: 0 };
  var target = { x: 0, y: 0 };
  var raf = null;

  function apply() {
    current.x += (target.x - current.x) * 0.08;
    current.y += (target.y - current.y) * 0.08;
    stage.style.transform =
      "rotateX(" + current.y + "deg) rotateY(" + current.x + "deg)";
    if (Math.abs(target.x - current.x) > 0.01 || Math.abs(target.y - current.y) > 0.01) {
      raf = requestAnimationFrame(apply);
    } else {
      raf = null;
    }
  }

  function onMove(event) {
    var rect = visual.getBoundingClientRect();
    var px = (event.clientX - rect.left) / rect.width - 0.5;
    var py = (event.clientY - rect.top) / rect.height - 0.5;
    target.x = px * 14;
    target.y = py * -10;
    if (!raf) raf = requestAnimationFrame(apply);
  }

  function onLeave() {
    target.x = 0;
    target.y = 0;
    if (!raf) raf = requestAnimationFrame(apply);
  }

  window.addEventListener("mousemove", onMove, { passive: true });
  visual.addEventListener("mouseleave", onLeave);
})();
