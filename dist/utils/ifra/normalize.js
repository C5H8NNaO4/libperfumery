export const normalize = (ele) => {
    return ele.cas.split(/\s|-/).map((cas) => ({ ...ele, cas }));
};
