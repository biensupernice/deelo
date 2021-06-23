import { Alert, AlertIcon } from "@chakra-ui/alert";

export default function Bleed({ children }) {
  return (
    <Alert status="warning">
      <AlertIcon />
      {children}
    </Alert>
  );
}
