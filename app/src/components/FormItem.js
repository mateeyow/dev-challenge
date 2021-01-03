import React from 'react'
import { FormControl, FormLabel } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const FormItem = ({ label, children, name }) => (
  <FormControl id={name}>
    <FormLabel>{label}</FormLabel>
    {children}
  </FormControl>
)

FormItem.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default FormItem
