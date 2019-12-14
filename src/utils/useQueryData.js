import { useState, useEffect } from "react"
import { useApolloClient, useQuery } from "@apollo/react-hooks"
import _ from "lodash"

const useQueryData = (query, options = null, defaultValue = null) => {
  const [isFirstInit, setIsFirstInit] = useState(true)
  const [values, setValues] = useState(defaultValue)
  const client = useApolloClient()
  const queryObject = useQuery(query, options)

  useCache(query, options, defaultValue, isFirstInit, setIsFirstInit, client)

  const writeData = (key, value) => {
    if (options.skip && defaultValue) {
      const q = client.readQuery({ query })

      _.assign(q[Object.keys(defaultValue)[0]], {
        [key]:
          typeof value === "object" && !Array.isArray(value)
            ? {
                ...value,
                __typename: `${key.charAt(0).toUpperCase()}${key.slice(1)}`
              }
            : value
      })

      client.writeQuery({
        query,
        data: q
      })

      setValues(client.readQuery({ query }))
    } else {
      client.writeData({
        data: {
          [Object.keys(queryObject.data)[0]]: {
            ...Object.values(queryObject.data)[0],
            [key]:
              typeof value === "object" && !Array.isArray(value)
                ? {
                    ...value,
                    __typename: `${key.charAt(0).toUpperCase()}${key.slice(1)}`
                  }
                : value
          }
        }
      })
    }
  }

  if (options.skip && defaultValue) {
    return {
      ...queryObject,
      writeData,
      data: values
    }
  }

  return {
    ...queryObject,
    writeData
  }
}

const useCache = (
  query,
  options,
  defaultValue,
  isFirstInit,
  setIsFirstInit,
  client
) => {
  useEffect(() => {
    if (options.skip && defaultValue && isFirstInit) {
      const objAssign = obj => {
        // eslint-disable-next-line no-restricted-syntax
        for (const prop in obj) {
          // eslint-disable-next-line no-prototype-builtins
          if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] === "object" && !objEmpty(obj[prop])) {
              objAssign(obj[prop])
            } else {
              obj.__typename = ""
            }
          }
        }
      }

      const objEmpty = obj => {
        // eslint-disable-next-line no-restricted-syntax
        for (const prop in obj) {
          // eslint-disable-next-line no-prototype-builtins
          if (obj.hasOwnProperty(prop)) return false
        }
        return true
      }

      objAssign(defaultValue)

      client.writeQuery({
        query,
        data: defaultValue
      })

      setIsFirstInit(false)
    }
  }, [client, defaultValue, isFirstInit, options.skip, query, setIsFirstInit])
}

export default useQueryData
