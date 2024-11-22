import { Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import CarsForm from '../pages/cars/CarsForm'
import CarsList from '../pages/cars/CarsList'
import CustomersList from '../pages/customers/CustomersList'
import CustomersForm from '../pages/customers/CustomersForm' 
import Autor from '../pages/autor' 


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Homepage /> } />

      <Route path="/customers" element={ <CustomersList /> } />
      <Route path="/cars" element={<CarsList />} />
      <Route path="/cars/new" element={ <CarsForm /> } />
      <Route path="/cars/:id" element={ <CarsForm /> } />
      <Route path="/customers/new" element={ <CustomersForm /> } />
      <Route path="/customers/:id" element={ <CustomersForm /> } />
      <Route path="/autor" element={<Autor />} />
    </Routes>
  )
}
