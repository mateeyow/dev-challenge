import React, { useState } from 'react'
import {
  ChakraProvider,
  Box,
  extendTheme,
} from '@chakra-ui/react'
import fetch from './fetch'
import FilterBox from './components/FilterBox'
import Graph from './components/Graph'

const themeConfig = extendTheme({ config: { initialColorMode: 'dark', useSystemColorMode: false } })

function App() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] })

  const onSearch = async (obj) => {
    const { keyword, limit, link } = obj
    try {
      const response = await fetch.get(`/data?keyword=${keyword}&limit=${limit}&link=${link}`)
      setGraphData(response)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ChakraProvider theme={themeConfig}>
      <FilterBox onSearch={onSearch} />
      <Box mx="auto" w="min(100%, 1500px)" height="calc(100vh - 200px)">
        <Graph data={graphData} />
      </Box>
    </ChakraProvider>
  )
}

export default App
