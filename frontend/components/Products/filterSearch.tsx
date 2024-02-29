// import { NextRouter } from "next/router";

// interface FilterProps {
//     router: NextRouter;
//     page?: string;
//     category?: string;
//     sort?: string;
//     search?: string;
// }

// const filterSearch = ({router, page, category, sort, search}: FilterProps) => {
//   const path = router.pathname;
//   const query = router.query;

//   if (category) query.category = category.toLocaleLowerCase();
//   if (page) query.page = page;
//   if (search) query.search = search;
//   if (sort) query.sort = sort;

//   router.push({
//     pathname: path,
//     query: query,
//   });
// };

// export default filterSearch;
