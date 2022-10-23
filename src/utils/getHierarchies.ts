export interface Hierarchy {
  name: string;
  percent?: number;
  children?: Hierarchy[];
}
interface GetHierarchiesArgs {
  hierarchies?: Hierarchy[];
}
export function getHierarchies(args: GetHierarchiesArgs): string[] {
  const { hierarchies = [] } = args;

  const step = Math.random();
  let cStep = 0;

  for (const hierarchy of hierarchies) {
    if (hierarchy.percent) {
      cStep += hierarchy.percent;
      if (cStep >= step) {
        return [
          hierarchy.name,
          ...getHierarchies({ hierarchies: hierarchy.children }),
        ];
      }
    }
  }
  const idx = Math.floor(Math.random() * (hierarchies.length - 1));
  return idx !== -1 ? [
    hierarchies[idx].name,
    ...getHierarchies({ hierarchies: hierarchies[idx].children }),
  ] : [];
}
