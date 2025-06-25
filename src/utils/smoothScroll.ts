export const smoothScrollTo = (id: string, offset: number = 0) => {
  const element = document.getElementById(id);
  if (element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - offset;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }
};

export const handleSmoothScroll = (
  e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  id: string,
  offset: number = 340
) => {
  e.preventDefault();
  smoothScrollTo(id, offset);
  if (window.history.pushState) {
    window.history.pushState(null, '', `#${id}`);
  } else {
    window.location.hash = `#${id}`;
  }
};
