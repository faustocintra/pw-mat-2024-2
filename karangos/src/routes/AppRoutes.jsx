import { Routes, Route } from 'react-router-dom'

import Homepage from '../pages/Homepage'

import CustomersList from '../pages/customers/CustomersList'
import CustomersForm from '../pages/customers/CustomersForm' 
import CarsList from '../pages/cars/CarsList'
import CarsForm from '../pages/cars/CarsForm'
<<<<<<< HEAD
import Autor from '../pages/eu'
=======
import Autor from '../pages/autor/autor'
>>>>>>> 8dc5c3e5b1e85d274df790488c18df38379da14e

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Homepage /> } />

      <Route path="/customers" element={ <CustomersList /> } />
      <Route path="/customers/new" element={ <CustomersForm /> } />
      <Route path="/customers/:id" element={ <CustomersForm /> } />

      <Route path="/autor" element={<Autor /> } />

      <Route path="/cars" element={ < CarsList /> } />
      <Route path="/cars/new" element={ < CarsForm /> } />
      <Route path="/cars/:id" element={ < CarsForm /> } />

      <Route path='/autor' element={ < Autor /> } />
    </Routes>
    
  )
}