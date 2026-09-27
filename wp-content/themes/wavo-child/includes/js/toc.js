function generateTableOfContents() {
  const toc = document.createElement('div');
  toc.id = 'table-of-contents';

  const tocHeader = document.createElement('p');
  tocHeader.textContent = 'Content';
  toc.appendChild(tocHeader);

  const tocList = document.createElement('ul');

  document.querySelectorAll('h2').forEach((header, index) => {
    const id = `section-${index + 1}`;
    header.id = id;

    // Obtiene el texto del encabezado y elimina el punto final si existe
    let headerText = header.textContent;
    if (headerText.endsWith('.')) {
      headerText = headerText.slice(0, -1); // Elimina el último carácter (el punto)
    }

    const tocItem = document.createElement('li');
    const tocLink = document.createElement('a');
    tocLink.href = `#${id}`;
    tocLink.textContent = headerText; // Usa el texto ajustado sin el punto final

    tocLink.addEventListener('click', function (event) {
      event.preventDefault();

      const targetElement = document.getElementById(id);
      const headerHeight = 112; // Altura del header en píxeles

      // Calcula la posición ajustada
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      history.replaceState(null, null, `#${id}`);
    });

    tocItem.appendChild(tocLink);
    tocList.appendChild(tocItem);
  });

  toc.appendChild(tocList);
  document.body.appendChild(toc);

  const tocItems = toc.querySelectorAll('li');
  
  // Evento de scroll para cambiar el highlight
  window.addEventListener('scroll', () => {
    let activeSection = null;
    const windowHeight = window.innerHeight;
    const headerHeight = 112; // Altura del header en píxeles

    let topMostSectionIndex = null;

    document.querySelectorAll('h2').forEach((header, index) => {
      const rect = header.getBoundingClientRect();
      const nextHeader = document.querySelectorAll('h2')[index + 1];
      const nextHeaderRect = nextHeader ? nextHeader.getBoundingClientRect() : null;

      // Verifica si la sección es la más cercana a la parte superior de la ventana
      if (rect.top < windowHeight - headerHeight && rect.bottom > headerHeight) {
        // Prioriza la sección más cercana a la parte superior de la ventana
        if (topMostSectionIndex === null || rect.top < document.querySelectorAll('h2')[topMostSectionIndex].getBoundingClientRect().top) {
          topMostSectionIndex = index;
        }
      } else if (nextHeaderRect && rect.top <= windowHeight / 2 && nextHeaderRect.top > windowHeight / 2) {
        topMostSectionIndex = index;
      }
    });

    if (topMostSectionIndex !== null) {
      activeSection = tocItems[topMostSectionIndex];
    }

    tocItems.forEach(item => item.classList.remove('active'));
    if (activeSection) {
      activeSection.classList.add('active');
    }
  });

  // Manually trigger the scroll event to highlight the correct section on load
  window.dispatchEvent(new Event('scroll'));
}

document.addEventListener('DOMContentLoaded', generateTableOfContents);
