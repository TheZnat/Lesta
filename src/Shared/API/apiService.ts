import { gql } from "@apollo/client";

export const GET_ALL_DATA = gql`
  query Vehicles($languageCode: String = "ru") {
    vehicles(lang: $languageCode) {
      id
      title
      description
      icons {
        large
        medium
      }
      level
      type {
        name
        title
        icons {
          default
        }
      }
      nation {
        name
        title
        color
        icons {
          small
          medium
          large
        }
      }
    }
  }
`;
