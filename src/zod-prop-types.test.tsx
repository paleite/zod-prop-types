import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { z } from "zod";
import { zodPropTypes } from "./zod-prop-types";

const TestComponentPropsSchema = z.object({
  a: z.string(),
  b: z.number(),
  arr: z.array(z.string()),
  nested: z.object({ c: z.boolean() }),
  createdAt: z.date(),
  updatedAt: z.date(),
});
type TestComponentProps = z.infer<typeof TestComponentPropsSchema>;

const TestComponent: React.FunctionComponent<TestComponentProps> = (props: {
  a: string;
  b: number;
}) => (
  <div>
    {props.a} {props.b}
  </div>
);
TestComponent.propTypes = zodPropTypes(TestComponentPropsSchema);

const validProps = {
  a: "hello",
  b: 123,
  arr: ["array-string"],
  nested: { c: true },
  createdAt: new Date(),
  updatedAt: new Date(),
};

const invalidDate = new Date("not a valid date");

const originalEnv = process.env.NODE_ENV;
const spy = jest.spyOn(console, "error").mockImplementation(() => {
  return undefined;
});

describe("zodPropTypes", () => {
  beforeEach(() => {
    process.env.NODE_ENV = originalEnv;
    spy.mockClear();
  });

  it("doesn't log errors when using valid props", () => {
    const props = validProps;

    expect(spy).not.toHaveBeenCalled();
    render(<TestComponent {...props} />);
    expect(spy).not.toHaveBeenCalled();

    expect(screen.getByText("hello 123")).toBeInTheDocument();
  });

  it("logs the correct path for array-errors", () => {
    const propsWithArrayError = {
      ...validProps,
      arr: ["valid", 123 as unknown as string],
    };

    expect(spy).not.toHaveBeenCalled();
    render(<TestComponent {...propsWithArrayError} />);
    expect(spy).toHaveBeenCalled();

    expect(spy.mock.calls[0]?.[2]).toContain("Invalid prop `arr[1]`");
  });

  it("logs the correct path for object-errors", () => {
    const propsWithObjectError = {
      ...validProps,
      nested: { c: 123 as unknown as boolean },
    };

    expect(spy).not.toHaveBeenCalled();
    render(<TestComponent {...propsWithObjectError} />);
    expect(spy).toHaveBeenCalled();

    expect(spy.mock.lastCall?.[2]).toContain("Invalid prop `nested.c`");
  });

  it("logs the supplied and expected types when available", () => {
    const propsWithSuppliedAndExpected = {
      ...validProps,
      a: 123 as unknown as string,
    };

    expect(spy).not.toHaveBeenCalled();
    render(<TestComponent {...propsWithSuppliedAndExpected} />);
    expect(spy).toHaveBeenCalled();

    expect(spy.mock.lastCall?.[2]).toContain("`number` supplied");
    expect(spy.mock.lastCall?.[2]).toContain("expected `string`");
  });

  it("logs error, even when no supplied and expected types are available", () => {
    const propsWithoutSuppliedAndExpected = {
      ...validProps,
      createdAt: invalidDate,
    };

    expect(spy).not.toHaveBeenCalled();
    expect(propsWithoutSuppliedAndExpected.createdAt.getTime()).toBeNaN();
    render(<TestComponent {...propsWithoutSuppliedAndExpected} />);
    expect(spy).toHaveBeenCalled();

    // No supplied and expected types
    expect(spy.mock.lastCall?.[2]).not.toContain("of type `");
    expect(spy.mock.lastCall?.[2]).not.toContain("expected `");
  });

  it("uses zod's error.message", () => {
    const propsWithoutSuppliedAndExpected = {
      ...validProps,
      updatedAt: invalidDate,
    };

    expect(spy).not.toHaveBeenCalled();
    expect(propsWithoutSuppliedAndExpected.updatedAt.getTime()).toBeNaN();
    render(<TestComponent {...propsWithoutSuppliedAndExpected} />);
    expect(spy).toHaveBeenCalled();

    // zod's error.message: "Invalid date"
    expect(spy.mock.lastCall?.[2]).toContain("Invalid date");
  });
});

describe("asd", () => {
  beforeAll(() => {
    // process.env.NODE_ENV = "production";
    spy.mockClear();
  });

  it("doesn't log errors when process.env.NODE_ENV === 'production'", () => {
    const props = { ...validProps, a: true as unknown as string };

    // spy.mockClear();

    const TestComponentProduction: React.FunctionComponent<
      TestComponentProps
    > = (props: { a: string; b: number }) => (
      <div>
        {props.a} {props.b}
      </div>
    );
    TestComponentProduction.propTypes = zodPropTypes(TestComponentPropsSchema);

    expect(spy).not.toHaveBeenCalled();
    render(<TestComponentProduction {...props} />);
    expect(spy).not.toHaveBeenCalled();

    // spy.mockClear();
    // expect(spy).not.toHaveBeenCalled();
    // render(<TestComponent {...props} />);
    // expect(spy).toHaveBeenCalled();
  });
});
