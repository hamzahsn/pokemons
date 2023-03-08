import React from "react";
import { render, screen } from "@testing-library/react";

import { Image } from ".";

describe("Image component", () => {
  it("should render the Pokemon image", () => {
    render(<Image />);
    const imageElement = screen.getByAltText("pokemon");

    expect(imageElement).toBeInTheDocument();
  });
});
