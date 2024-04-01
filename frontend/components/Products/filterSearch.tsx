
// interface FilterProps {
//   path: string;
//   query: { [key: string]: string };
//   page?: string;
//   category?: string;
//   sort?: string;
//   search?: string;
// }

// const filterSearch = ({ path, query, page, category, sort, search }: FilterProps): string => {
//   const updatedQuery: Record<string, string> = { ...query };

//   if (category) updatedQuery.category = category.toLocaleLowerCase();
//   if (page) updatedQuery.page = page;
//   if (search) updatedQuery.search = search;
//   if (sort) updatedQuery.sort = sort;

//   const queryString = new URLSearchParams(updatedQuery).toString();

//   const fullPath = `${path}?${queryString}`;

//   return fullPath;
// };

// export default filterSearch;