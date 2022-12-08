import { useState, useMemo } from "react"
import { Box, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Rating, Select, SelectChangeEvent, Slider, Typography } from "@mui/material"

import ProductsList from "components/ProductsList"
import { IProduct } from "ts/interfaces/product"

const Home = ({ data }: { data: { products: IProduct[] } }) => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])
  const [brand, setBrand] = useState("")
  const [rating, setRating] = useState<number | null>(null)
  const [range, setRange] = useState<number[]>([0, 10000])

  const memoizedBrands = useMemo<string[]>(() => {
    return [...new Set(data.products.map((product: IProduct) => product.brand))]
  }, [])

  const memoizedPriceRange = useMemo<number[]>(() => {
    const prices: number[] = data.products.map((product: IProduct) => product.price)
    return [Math.min(...prices), Math.max(...prices)]
  }, [])

  const filtersApplied = useMemo<boolean>(() => {
    return [brand, rating].some(Boolean)
  }, [brand, rating])

  const handleBrandChange = (e: SelectChangeEvent) => {
    setBrand(e.target.value)
    setFilteredProducts(data.products.filter((product: IProduct) => product.brand === e.target.value))
  }

  const handleRatingChange = (value: number) => {
    setRating(value)
    setFilteredProducts(data.products.filter((product: IProduct) => product.rating >= value))
  }

  const handleRangeChange = (value: number[]) => {
    setRange(value)
    setFilteredProducts(data.products.filter((product: IProduct) => product.price >= range[0] && product.price <= range[1]));
  }

  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Typography variant='h5' gutterBottom>Filters</Typography>

          <FormControl fullWidth variant='filled'>
            <InputLabel>Brand</InputLabel>
            <Select value={brand} onChange={handleBrandChange}>
              { memoizedBrands.map((brand) => (
                <MenuItem key={brand} value={brand}>{brand}</MenuItem>
              )) }
            </Select>
          </FormControl>

          <Divider sx={{ mt: 3, mb: 2 }} />

          <Box sx={{ px: 1 }}>
            <Slider
              value={range}
              min={memoizedPriceRange[0]}
              max={memoizedPriceRange[1]}
              onChangeCommitted={(_, value) => handleRangeChange(value as number[])}
              valueLabelDisplay="auto"
            />
          </Box>

          <Divider sx={{ mt: 3, mb: 2 }} />

          <FormControl fullWidth variant='filled'>
            <Typography>Rating</Typography>
            <Rating
              size="large"
              value={rating}
              precision={0.2}
              onChange={(_, value: number | null) => handleRatingChange(value as number)}
            />
          </FormControl>
        </Grid>

        <Grid item xs={9}>
          {filtersApplied && !Boolean(filteredProducts.length) ? (
            <Typography>
              No products found
            </Typography>
          ) : (
            <ProductsList products={filteredProducts.length ? filteredProducts : data.products} />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://dummyjson.com/products')
  const data: IProduct[] = await res.json()

  return { props: { data } }
}

export default Home
