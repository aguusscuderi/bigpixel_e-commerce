
interface FilterProps {
    // router: string;
    page?: string;
    category?: string;
    sort?: string;
    search?: string;
}

const filterSearch = ({page, category, sort, search}: FilterProps) => {
  const path = '/';
  const query = { category: category, page: '', search: '', sort: ''};

  console.log(path, query)

  if (category) query.category = category.toLocaleLowerCase();
  if (page) query.page = page;
  if (search) query.search = search;
  if (sort) query.sort = sort;

//   router.push({
//     pathname: path,
//     query: query,
//   });
};

export default filterSearch;
