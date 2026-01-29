import { useEffect, useState } from "react";
import axios from "axios";
import Cards from '../components/Cards'
import Table from '../components/Table'
import Charts from '../components/Charts'
import SalesRep from '../components/SalesRep'
import Duration from '../components/Duration'
import DurationRecharts from '../components/DurationRecharts'
import {REACT_APP_BASEURL} from "../../config.js"

const SalesDashboard = () => {
 const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


// useEffect(() => {
//     const fetchSales = async () => {
//       try {
//         const res = await axios.get(`${REACT_APP_BASEURL}/sales/getSales`);
//         setSales(res.data);
//         // console.log("Your Dashbaord Data response are :",res);
//       } catch (err) {
//         setError(err.message || "Failed to fetch sales data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSales();
//   }, []);


//   // console.log("your sales data are here :",sales);

//   if (loading) return <p>Loading sales...</p>;
//   if (error) return <p>Error: {error}</p>;

  return (
    <>
    <div className=''>
    <Cards  />
    </div>
    <div className='grid grid-cols-2 gap-4 mt-5'>
    <Table  />
    <Charts  />
    </div>
    <div className='grid grid-cols-2 gap-4 mt-5'>
    <SalesRep  />
    <DurationRecharts  /> 
    </div>
   

    
    </>
  )
}

export default SalesDashboard
