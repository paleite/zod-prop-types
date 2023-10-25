import { zodPropTypes } from "./zod-props";
import { z } from "zod";

// Define your Zod schema
const MyComponentPropsSchema = z.object({
  name: z.string(),
  age: z.number(),
  contact: z
    .object({
      email: z.string().email(),
      phone: z.string().optional(),
      postAddress: z.object({
        street: z.string(),
        number: z.string(),
      }),
    })
    .optional(),
});

// Your component
const MyComponent: React.FunctionComponent<
  z.infer<typeof MyComponentPropsSchema>
> = ({ name, age }) => <div>{`Hello, ${name}. You are ${age} years old.`}</div>;

// Assign transformed Zod schema as propTypes
MyComponent.propTypes = zodPropTypes(MyComponentPropsSchema);

export { MyComponent };
