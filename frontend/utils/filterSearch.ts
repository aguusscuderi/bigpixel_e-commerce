import { NavigateFunction, Location } from 'react-router-dom'; 

interface FilterProps {
    navigate: NavigateFunction;
    location: Location;
    page?: string;
    category?: string;
    sort?: string;
    search?: string;
}

const filterSearch = ({ navigate, location, page, category, sort, search }: FilterProps) => {
    try {
       
        // const location = useLocation(); // Inicializa el hook useHistory
        // const navigate = useNavigate()
        // console.log(search, 'DESDE FILTER SEARCH')

        const query: any = {}; // Define un objeto vacío para la query
      
        if (category) query.category = category.toLocaleLowerCase();
        if (page) query.page = page;
        if (search) query.name = search;
        if (sort) query.sort = sort;
      
        const queryString = new URLSearchParams(query).toString(); // Convierte el objeto query en una cadena de consulta
        const path = location.pathname; // Obtiene el pathname actual

        // console.log(location, 'REACT ROUTER LOCATION')
        // console.log(queryString, path, 'DESDE FILTER SEARCH') 

        navigate({
          pathname: path,
          search: queryString, // Utiliza la cadena de consulta generada
        });
    } catch (error) {
        console.log(error, "ERROR DESDE EL FILTERSEARCH")
    }
 
};

export default filterSearch;