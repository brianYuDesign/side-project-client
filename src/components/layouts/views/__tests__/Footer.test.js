import React from "react"
import { mount } from "enzyme"
import App from "App"
import Footer from "../Footer"

let wrapped

beforeEach(() => {
  wrapped = mount(
    <App>
      <Footer />
    </App>
  )
})

afterEach(() => {
  wrapped.unmount()
})

it("has one footer container", () => {
  expect(wrapped.find("footer").length).toEqual(1)
})
