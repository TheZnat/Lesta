
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Search from "./Search";
import { vi } from "vitest";

const mockStore = configureStore([]);
const mockDispatch = vi.fn(); 

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

describe("Search Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      data: {
        dataVehicleType: ["Type 1", "Type 2"],
        dataVehicleNations: ["Nation 1", "Nation 2"],
        dataVehiclelevel: [1, 2, 3],
      },
      filter: {
        type: "Type 1",
        level: 1,
        nation: "Nation 1",
      },
    });
  });

  it("dispatches the correct actions on search input change", () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "New search" } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "filters/setSearch",
      payload: "New search",
    });

    
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it("dispatches the correct actions on dropdown changes", () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const levelDropdown = screen.getByLabelText("Уровень");
    const nationDropdown = screen.getByLabelText("Нация");
    const typeDropdown = screen.getByLabelText("Класс");

    fireEvent.change(levelDropdown, { target: { value: "2" } });
    fireEvent.change(nationDropdown, { target: { value: "Nation 2" } });
    fireEvent.change(typeDropdown, { target: { value: "Type 2" } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "filters/setLevel",
      payload: "2",
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "filters/setNation",
      payload: "Nation 2",
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "filters/setType",
      payload: "Type 2",
    });
  });

  it("dispatches resetFilters action when reset button is clicked", () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const resetButton = screen.getByRole("button", { name: /Сбросить/i });
    fireEvent.click(resetButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "filters/resetFilters",
    });
  });

  it("renders correct options for dropdowns", () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    // Уровень
    const levelDropdown = screen.getByLabelText("Уровень");
    expect(levelDropdown).toHaveTextContent("1");
    expect(levelDropdown).toHaveTextContent("2");
    expect(levelDropdown).toHaveTextContent("3");

    // Нации
    const nationDropdown = screen.getByLabelText("Нация");
    expect(nationDropdown).toHaveTextContent("Nation 1");
    expect(nationDropdown).toHaveTextContent("Nation 2");

    // Классы
    const typeDropdown = screen.getByLabelText("Класс");
    expect(typeDropdown).toHaveTextContent("Type 1");
    expect(typeDropdown).toHaveTextContent("Type 2");
  });
});
