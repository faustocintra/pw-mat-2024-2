import { Routes, Route } from 'react-router-dom'

import Homepage from '../pages/Homepage'

import CustomersList from '../pages/customers/CustomersList'
import CustomersForm from '../pages/customers/CustomersForm' 
import CarsList from '../pages/cars/CarsList'
import CarsForm from '../pages/cars/CarsForm'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Homepage /> } />

      <Route path="/cars" element={ <CustomersList /> } />
      <Route path="/cars/new" element={ <CustomersForm /> } />
      <Route path="/cars/:id" element={ <CustomersForm /> } />
      <Route path="/cars" element={ <CarsList /> } />
      <Route path="/cars/new" element={ <CarsForm /> } />
      <Route path="/cars/:id" element={ <CarsForm /> } />
    </Routes>
  )
}