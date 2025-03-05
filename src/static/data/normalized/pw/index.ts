async function importPages() {
  const pageNumbers = Array.from({ length: 42 }).map((e, i) => i + 1); // Add or remove numbers as needed
  const importPromises = pageNumbers
    .map((num) => {
      return import(`./page${num}.json`, { assert: { type: "json" } });
    })
    .filter(Boolean);

  const pages = await Promise.all(importPromises);
  const normalizedPW = pages.map((module) => (module as any)?.default).flat();
  return normalizedPW;
}

export default importPages();
