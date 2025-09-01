// Animación inicial para la tarjeta
window.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.card');
  if (!card) return;
  card.style.opacity = '0';
  card.style.transform = 'translateY(8px)';
  requestAnimationFrame(() => {
    card.style.transition = 'opacity .35s ease, transform .35s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });
});

// Tabs logic
(function(){
  const tabs = document.querySelectorAll('.tabs .tab');
  const panels = {
    about: document.getElementById('about'),
    resume: document.getElementById('resume'),
    portfolio: document.getElementById('portfolio'),
    blog: document.getElementById('blog'),
    contact: document.getElementById('contact')
  };

  function setActive(tabName){
    const name = panels[tabName] ? tabName : 'about';

    // Marcar la pestaña activa
    tabs.forEach(t => {
      const isActive = t.dataset.tab === name;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Ocultar todos los paneles y mostrar solo el actual
    Object.values(panels).forEach(p => { 
      if(p) p.hidden = true;
    });
    if(panels[name]) panels[name].hidden = false;
  }

  // Click en pestañas
  tabs.forEach(t => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      const name = t.dataset.tab;
      if(!name) return;
      history.replaceState(null, '', `#${name}`);
      setActive(name);
    });
  });

  // Navegación por hash (ej: #resume)
  window.addEventListener('hashchange', () => {
    const name = location.hash.replace('#','');
    setActive(name || 'about');
  });

  // Estado inicial
  const initial = location.hash.replace('#','') 
    || document.querySelector('.tabs .tab.active')?.dataset.tab 
    || 'about';
  setActive(initial);
})();
