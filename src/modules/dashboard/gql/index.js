import gql from "graphql-tag"

export const GET_ANNOUNCEMENT_LIST = gql`
  query Announcements {
    announcements {
      id
      title
      content
      startTime
      creator {
        id
        name
      }
    }
  }
`
export const GET_MAINTAINSERVICES = gql`
  query MaintainServices_Dashboard {
    maintainServices {
      id
      status
      description
      device {
        id
        name
      }
      companyDevice {
        id
      }
    }
  }
`
