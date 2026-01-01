import DataTable from '@/components/tables/DataTable'
import { CountriesProvider } from '@/context/CountriesContext'
import { fetchCountries } from '@/lib/api'

async function page() {
  const countries = await fetchCountries();  
 
  return (
    <CountriesProvider countries={countries}>
      <DataTable />
    </CountriesProvider>
  )
}

export default page