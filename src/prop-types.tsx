import { z } from "zod";

// Custom validator using Zod
const validateWithZod = <TSchema extends z.ZodSchema>(schema: TSchema) => {
  if (process.env.NODE_ENV === "production") return;

  return (
    props: Record<string, unknown>,
    propName: string,
    componentName: string
  ) => {
    const propValue = props[propName];
    const result = schema.safeParse(propValue);

    if (!result.success) {
      console.warn(
        `Component: ${componentName}\nProp: ${propName}\nValidation Error: ${result.error}`
      );
    }
  };
};

// Function to transform Zod schema into propTypes
const zodPropTypes = <TSchema extends z.ZodSchema>(
  InputSchema: z.ZodObject<Record<string, TSchema>>
) =>
  Object.fromEntries(
    Object.entries(InputSchema.shape).map(([key, valueSchema]) => [
      key,
      validateWithZod(valueSchema),
    ])
  );

// const ZodProps: React.FunctionComponent = (props) => {
//   return <div {...props}></div>;
// };

export { zodPropTypes };
