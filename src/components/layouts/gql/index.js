import { gql } from "apollo-boost"

export const REVIEW_STORIES = gql`
  query Stories($filter: StoriesFilterInput) {
    stories(filter: $filter) {
      id
      content
      thumbnailUrl
      creator {
        id
        name
      }
      createdAt
    }
  }
`

export const ME = gql`
  query Me {
    me {
      id
      name
      email
      roleFeature {
        id
        name
      }
      avatar
    }
  }
`
