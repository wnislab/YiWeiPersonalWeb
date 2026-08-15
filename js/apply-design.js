(function () {
  const c = window.DESIGN_CONFIG;
  if (!c) return;
  const values = {
    '--cfg-primary': c.colors.primary,
    '--cfg-dark': c.colors.dark,
    '--cfg-accent': c.colors.accent,
    '--cfg-pale': c.colors.pale,
    '--cfg-light-bg': c.colors.lightBackground,
    '--cfg-page-bg': c.colors.pageBackground,
    '--cfg-body-text': c.colors.bodyText,
    '--cfg-subtle-text': c.colors.subtleText,
    '--cfg-border': c.colors.border,
    '--cfg-body-size': c.typography.bodySize,
    '--cfg-nav-size': c.typography.navigationSize,
    '--cfg-hero-min': c.typography.heroTitleMin,
    '--cfg-hero-preferred': c.typography.heroTitlePreferred,
    '--cfg-hero-max': c.typography.heroTitleMax,
    '--cfg-section-min': c.typography.sectionTitleMin,
    '--cfg-section-preferred': c.typography.sectionTitlePreferred,
    '--cfg-section-max': c.typography.sectionTitleMax,
    '--cfg-card-title': c.typography.cardTitleSize,
    '--cfg-line-height': c.typography.lineHeight,
    '--cfg-content-width': c.layout.contentWidth,
    '--cfg-section-desktop': c.layout.sectionSpacingDesktop,
    '--cfg-section-mobile': c.layout.sectionSpacingMobile,
    '--cfg-card-gap': c.layout.cardGap,
    '--cfg-header-desktop': c.layout.headerHeightDesktop,
    '--cfg-header-mobile': c.layout.headerHeightMobile
  };
  Object.entries(values).forEach(([name, value]) => {
    if (value) document.documentElement.style.setProperty(name, value);
  });
})();
