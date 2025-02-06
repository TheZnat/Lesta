import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CardList from "./CardList";
import { Vehicle } from "../../Shared/types/Vehicle";


// Mock store
const mockStore = configureStore([]);

const mockPaginatedItems: Vehicle[] = [
  {
    id: "1",
    title: "I-54",
    description: "Описание корабля I-54",
    icons: {
      large: "mock-image-url-1-large",
      medium: "mock-image-url-1-medium",
    },
    level: 5,
    type: {
      name: "submarine",
      title: "Подводная лодка",
      icons: {
        default: "mock-type-icon",
      },
    },
    nation: {
      name: "japan",
      title: "Япония",
      color: "#ff0000",
      icons: {
        small: "mock-nation-icon-small",
        medium: "mock-nation-icon-medium",
        large: "mock-nation-icon-large",
      },
    },
  },
  {
    id: "2",
    title: "Hogg",
    description: "Описание корабля Hogg",
    icons: {
      large: "mock-image-url-2-large",
      medium: "mock-image-url-2-medium",
    },
    level: 3,
    type: {
      name: "destroyer",
      title: "Эсминец",
      icons: {
        default: "mock-type-icon",
      },
    },
    nation: {
      name: "usa",
      title: "США",
      color: "#0000ff",
      icons: {
        small: "mock-nation-icon-small",
        medium: "mock-nation-icon-medium",
        large: "mock-nation-icon-large",
      },
    },
  },
];
describe("CardList Component", () => {
  it("renders 'Ничего не найдено' when paginatedItems is empty", () => {
    const store = mockStore({
      data: { paginatedItems: [] },
    });

    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(screen.getByText("Ничего не найдено")).toBeInTheDocument();
  });

  it("renders the correct number of Card components when paginatedItems is not empty", () => {
    const store = mockStore({
      data: { paginatedItems: mockPaginatedItems },
    });

    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );
  
    const cards = screen.getAllByTestId("card");
    expect(cards).toHaveLength(mockPaginatedItems.length);


    mockPaginatedItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });
});
