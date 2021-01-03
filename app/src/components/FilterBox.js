import React, { useState } from 'react'
import {
  Box,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  HStack,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import FormItem from './FormItem'

const options = [
  { value: 'registered_address', label: 'Registered Address' },
  { value: 'connected_to', label: 'Connected To' },
  { value: 'officer_of', label: 'Officer Of' },
  { value: 'same_as', label: 'Same As' },
  { value: 'same_id_as', label: 'Same Id As' },
  { value: 'same_name_as', label: 'Same Name As' },
]

const FilterBox = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('')
  const [link, setLink] = useState('registered_address')
  const [limit, setLimit] = useState(25)

  return (
    <Box p={4} width="min(750px, 100%)" border="1px" borderRadius={8} mx="auto" my={4} h="162px">
      <HStack>
        <FormItem label="Keyword" name="keyword">
          <Input
            autoFocus
            type="text"
            placeholder="LEVY MADURO, RENE DAVID"
            value={searchText}
            onChange={(evt) => setSearchText(evt.target.value)}
          />
        </FormItem>
        <FormItem label="Link" name="link">
          <Select onChange={(evt) => setLink(evt.target.value)} value={link}>
            {options.map((option, idx) => (
              <option key={idx} value={option.value}>{option.label}</option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="Limit" name="limit">
          <NumberInput
            value={limit}
            onChange={(str, num) => setLimit(num)}
            placeholder={1000}
            step={10}
            min={1}
            max={1000}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormItem>
      </HStack>
      <Button
        mt={4}
        w="100%"
        colorScheme="blue"
        onClick={() => onSearch({ keyword: searchText, link, limit })}
      >
        Search
      </Button>
    </Box>
  )
}

FilterBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default FilterBox
