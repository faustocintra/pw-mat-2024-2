import { Routes, Route } from 'react-router-dom'

import Homepage from '../pages/Homepage'

import CustomersList from '../pages/customers/CustomersList'
import CustomersForm from '../pages/customers/CustomersForm'
import CarList from '../pages/car/CarList'
import CarForm from '../pages/car/CarForm'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/customers" element={<CustomersList />} />
      <Route path="/customers/new" element={<CustomersForm />} />
      <Route path="/customers/:id" element={<CustomersForm />} />
      <Route path="/car" element={<CarList />} />
      <Route path="/car/new" element={<CarForm />} />
      <Route path="/car/:id" element={<CarForm />} />
    </Routes>
  )
}