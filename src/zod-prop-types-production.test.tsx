process.env.NODE_ENV = "production";

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as React from "react";
import { z } from "zod";
import { zodPropTypes } from "./zod-prop-types";

const TestComponentPropsSchema = z.object({
  a: z.string(),
});
type TestComponentProps = z.infer<typeof TestComponentPropsSchema>;

const TestComponent: React.FunctionComponent<TestComponentProps> = (props: {
  a: string;
}) => <div>{props.a}</div>;
TestComponent.propTypes = zodPropTypes(TestComponentPropsSchema);

const spy = jest.spyOn(console, "error").mockImplementation(() => {
  return undefined;
});

describe("NODE_ENV === 'production'", () => {
  it("doesn't log errors", () => {
    const props = { a: true as unknown as string };

    expect(spy).not.toHaveBeenCalled();
    render(<TestComponent {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });
});
