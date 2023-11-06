import { zodPropTypes } from "./zod-prop-types";
import { z } from "zod";

describe("zodPropTypes", () => {
  it("should return an object with the same keys as the input schema", () => {
    const schema = z.object({
      a: z.string(),
      b: z.number(),
    });

    const propTypes = zodPropTypes(schema);

    expect(Object.keys(propTypes)).toEqual(["a", "b"]);
  });
});
