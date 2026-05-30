/* ════════════════════════════════════════════
   GenAI Chatbot Portfolio — script.js
   Soumen Karmakar
════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Stat counter animation ── */
  const statValues = document.querySelectorAll('.stat-value');

  const animateCounter = (el) => {
    const raw = el.dataset.target;
    if (!raw) return;

    const isInfinity = raw === '∞';
    const isLt       = raw.startsWith('<');
    const isPct      = raw.endsWith('%');

    if (isInfinity || isLt) return; // already displayed as symbol

    const target   = parseInt(raw, 10);
    const duration = 1200;
    const start    = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current  = Math.round(eased * target);
      el.textContent = isPct ? current + '%' : current + '+';
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = raw; // snap to exact value
    };

    requestAnimationFrame(tick);
  };

  /* Trigger counter when card enters viewport */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => observer.observe(el));


  /* ── Highlight list stagger on scroll ── */
  const listItems = document.querySelectorAll('.highlights-list li');

  const listObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${i * 60}ms`;
        entry.target.classList.add('visible');
        listObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  listItems.forEach(li => {
    li.style.opacity = '0';
    li.style.transform = 'translateX(-12px)';
    li.style.transition = 'opacity .4s ease, transform .4s ease';
    listObserver.observe(li);
  });

  /* Apply visible state */
  document.addEventListener('animationend', () => {}, { once: true });

  const applyVisible = (el) => {
    el.style.opacity   = '1';
    el.style.transform = 'translateX(0)';
  };

  // Re-run with MutationObserver isn't needed — use a small IntersectionObserver callback
  const itemRevealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => applyVisible(entry.target), parseFloat(entry.target.style.animationDelay || '0') * 1000 / 60);
        itemRevealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  listItems.forEach(li => itemRevealObs.observe(li));


  /* ── Detail block tilt effect ── */
  const detailBlocks = document.querySelectorAll('.detail-block');

  detailBlocks.forEach(block => {
    block.addEventListener('mousemove', (e) => {
      const rect   = block.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rotX   = (-dy * 4).toFixed(2);
      const rotY   = ( dx * 4).toFixed(2);
      block.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
    });

    block.addEventListener('mouseleave', () => {
      block.style.transform = '';
    });
  });


  /* ── Stat card tilt effect ── */
  const statCards = document.querySelectorAll('.stat-card');

  statCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(500px) rotateX(${(-dy * 5).toFixed(2)}deg) rotateY(${(dx * 5).toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ── Copy email to clipboard on click ── */
  const emailCard = document.querySelector('.contact-card.email');

  if (emailCard) {
    const emailVal = emailCard.querySelector('.c-value');
    const origText = emailVal ? emailVal.textContent : '';

    emailCard.addEventListener('click', (e) => {
      // Only intercept if not navigating (i.e. mailto: is the href)
      const href = emailCard.getAttribute('href') || '';
      if (!href.startsWith('mailto:')) return;

      e.preventDefault();
      const address = href.replace('mailto:', '');

      navigator.clipboard.writeText(address).then(() => {
        if (emailVal) {
          emailVal.textContent = 'Copied!';
          emailCard.style.borderColor = 'rgba(0,179,126,.4)';
          setTimeout(() => {
            emailVal.textContent = origText;
            emailCard.style.borderColor = '';
          }, 2000);
        }
      }).catch(() => {
        // Fallback: open mailto as normal
        window.location.href = href;
      });
    });
  }


  /* ── Tech pill ripple ── */
  const pills = document.querySelectorAll('.tech-pill');

  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      const rect   = pill.getBoundingClientRect();

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.35);
        transform: scale(0);
        animation: rippleAnim .5s linear;
        width: 60px; height: 60px;
        left: ${e.clientX - rect.left - 30}px;
        top:  ${e.clientY - rect.top  - 30}px;
        pointer-events: none;
      `;

      pill.style.position = 'relative';
      pill.style.overflow = 'hidden';
      pill.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* inject ripple keyframe once */
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes rippleAnim {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

});
