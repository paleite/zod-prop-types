import PropTypes from "prop-types";

interface MyComponentWithPropTypesProps {
  name: string;
  age: number;
  contact?:
    | {
        email: string;
        phone?: string | null | undefined;
        postAddress: {
          street: string;
          number: string;
        };
      }
    | undefined;
}

const MyComponentWithPropTypes: React.FunctionComponent<
  // Your component
  MyComponentWithPropTypesProps
> = ({ name, age }) => <div>{`Hello, ${name}. You are ${age} years old.`}</div>;

MyComponentWithPropTypes.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  contact: PropTypes.shape({
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    postAddress: PropTypes.shape({
      street: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export { MyComponentWithPropTypes };
