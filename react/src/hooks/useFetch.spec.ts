import { renderHook } from "@testing-library/react-hooks";
import useFetch from "./useFetch";

describe("useFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data from the API", async () => {
    const limit = 10;
    const page = 2;
    const url = `${process.env.REACT_APP_POKEMON_API}?limit=${limit}&offset=${
      (page - 1) * limit
    }`;

    const mockData = [
      { id: 1, name: "pokemon1" },
      { id: 2, name: "pokemon2" },
    ];
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    };
    const mockFetch = jest.fn().mockResolvedValue(mockResponse);

    jest.spyOn(window, "fetch").mockImplementation(mockFetch);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch({ limit, page })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitForNextUpdate();

    expect(window.fetch).toHaveBeenCalledWith(url);
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
  });

  it("should handle fetch error", async () => {
    const limit = 10;
    const page = 2;
    const url = `${process.env.REACT_APP_POKEMON_API}?limit=${limit}&offset=${
      (page - 1) * limit
    }`;

    const mockError = new Error("Data could not be fetched!");

    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({ mockError }),
    };
    const mockFetch = jest.fn().mockResolvedValue(mockResponse);

    jest.spyOn(window, "fetch").mockImplementation(mockFetch);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch({ limit, page })
    );

    expect(await result.current.loading).toBe(true);
    expect(await result.current.data).toBe(null);

    await waitForNextUpdate();
    expect(await window.fetch).toHaveBeenCalledWith(url);
    expect(await result.current.loading).toBe(false);
    expect(await result.current.data).toBe(undefined);
    //@ts-ignore
    expect(await result.current.error.message).toBe("Data could not be fetched!");
  });
});
