/* Optional site identity bootstrap. Suspension MUST be enforced at the gateway,
   not with this script: browsers can bypass JS and access cached HTML. */
(() => {
  const c = window.MAJORGLORY_CONFIG;
  if (!c) return;
  document.documentElement.dataset.managedSite = c.siteSlug;
})();
