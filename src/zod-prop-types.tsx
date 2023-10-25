import type { z } from "zod";

// This implementation is trying to mimic prop-types as closely as possible.
const formatMessage = (
  error: z.ZodIssue,
  propName: string,
  componentName: string
) => {
  const propPath =
    propName +
    error.path
      .map((p) => (typeof p === "string" ? `.${p}` : `[${p}]`))
      .join("");

  const errorMessage = [
    `Invalid prop \`${propPath}\``,
    "received" in error && typeof error.received === "string"
      ? ` of type \`${error.received}\``
      : "",
    ` supplied to \`${componentName}\``,
    "expected" in error && typeof error.expected === "string"
      ? `, expected \`${error.expected}\`.`
      : `: ${error.message}`,
  ].join("");
  return errorMessage;
};

const validate = <TSchema extends z.ZodSchema>(schema: TSchema) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  return (
    props: Record<string, unknown>,
    propName: string,
    componentName: string
  ) => {
    const result = schema.safeParse(props[propName]);

    if (result.success) {
      return;
    }

    const message = formatMessage(
      result.error.errors[0],
      propName,
      componentName
    );

    return new Error(message);
  };
};

const transformZodSchema = <TSchema extends z.ZodSchema>(
  InputSchema: z.ZodObject<Record<string, TSchema>>
) =>
  Object.fromEntries(
    Object.entries(InputSchema.shape).map(([key, valueSchema]) => [
      key,
      validate(valueSchema),
    ])
  );

export { transformZodSchema as zodPropTypes };
