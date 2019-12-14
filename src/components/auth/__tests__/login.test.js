import React from "react"
import { MockedProvider } from "react-apollo/test-utils"
import { Button } from "reactstrap"
import renderer from "react-test-renderer"
import LOGIN from "../gql/login"
import Login from "../views/Login"

it("should render without error", () => {
  const component = renderer.create(
    <MockedProvider mocks={[]}>
      <Login />
    </MockedProvider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})

it("button is disabled if email & password is empty", () => {
  const component = renderer.create(
    <MockedProvider mocks={[]} addTypename={false}>
      <Login />
    </MockedProvider>
  )

  const button = component.root.findByType(Button)
  expect(button.props.disabled).toBeTruthy()
})

it("submit success get userToken", () => {
  const mocks = [
    {
      request: {
        query: LOGIN,
        variables: {
          email: "alan@4idps.com",
          password: "1234"
        }
      },
      result: {
        data: {
          userToken: "aaaaaa"
        }
      }
    }
  ]

  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Login />
    </MockedProvider>
  )

  const button = component.root.findByType(Button)

  expect(button.props.disabled).toBeTruthy()
})
