import { Routes, Route } from 'react-router-dom'

import Homepage from '../pages/Homepage'

import CustomersList from '../pages/customers/CustomersList'
import CustomersForm from '../pages/customers/CustomersForm' 

import CarForm from '../pages/car/CarForm'
import CarList from '../pages/car/CarList'

import Sobre from '../pages/sobre/Sobre'
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Homepage /> } />

      <Route path="/customers" element={ <CustomersList /> } />
      <Route path="/customers/new" element={ <CustomersForm /> } />
      <Route path="/customers/:id" element={ <CustomersForm /> } />

      <Route path="/cars" element={ <CarList /> } />
      <Route path="/cars/new" element={ <CarForm /> } />
      <Route path="/cars/:id" element={ <CarForm /> } />

      <Route path="/sobre" element={ <Sobre/> } />

    </Routes>
  )
}