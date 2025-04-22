export const normalize = (ele) => {
  ele.cas.split(/\s|-/).map((cas) => ({ ...ele, cas }));
};
