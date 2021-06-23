import { Alert, AlertIcon } from '@chakra-ui/alert';

export default function Callout({ children }) {
  return (
    <Alert status="warning">
      <AlertIcon />
      {children}
    </Alert>
  );
}
